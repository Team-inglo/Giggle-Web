/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/auth';
import axios, { AxiosInstance } from 'axios';
import { reIssueToken } from '@/api/auth';

// 리다이렉션 처리 함수 (전역)
let redirectToSignin: () => void = () => {
  console.warn('리다이렉션 함수가 설정되지 않았습니다.');
};

// 리다이렉션 함수 설정
export function setRedirectToLogin(callback: () => void) {
  redirectToSignin = callback;
}

/**
 * Axios 인스턴스에 인터셉터를 설정하는 함수
 *
 * @function setInterceptors
 * @param {AxiosInstance} instance - 인터셉터를 설정할 Axios 인스턴스
 * @returns {AxiosInstance} 인터셉터가 설정된 Axios 인스턴스
 *
 * @description
 * 이 함수는 요청 인터셉터를 설정하여 각 API 요청에 인증 토큰을 추가합니다.
 * 클라이언트 사이드에서만 토큰을 추가하며, 서버 사이드 렌더링 시에는 토큰을 추가하지 않습니다.
 */
function setInterceptors(instance: AxiosInstance, type: string) {
  instance.interceptors.request.use(
    (config) => {
      if (type === 'kakao') {
        if (typeof window !== 'undefined' && config.headers) {
          config.headers.Authorization = `KakaoAK ${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
        }
        return config;
      }
      if (typeof window !== 'undefined' && config.headers) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  /**
   * api instance의 반환값에 대한 처리
   *
   * 에러코드 40101이 반환되었을 경우,
   * access token 만료되어 refresh token으로 토큰 재발행이 필요합니다.
   *
   * 반환되는 에러 참고 - error: {code: 40101, message: "만료된 토큰입니다."}
   */
  let isTokenRefreshing = false;
  let failedRequestsQueue: any[] = [];

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (
          error.response.data.error.code === 40101 ||
          error.response.data.error.code === 40102
        ) {
          console.log('401');

          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            console.error('Refresh Token이 없습니다.');
            setAccessToken(null);
            setRefreshToken(null);
            redirectToSignin();
            return Promise.reject('Refresh Token이 없습니다.');
          }

          // 토큰 재발급 중인 상태일 때
          if (isTokenRefreshing) {
            // 재발급이 완료될 때까지 대기하고, 완료 후 요청을 재시도
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({ resolve, reject });
            });
          }

          // JWT 재발급
          try {
            // 토큰 재발급 시작
            isTokenRefreshing = true;
            // 1. Refresh Token을 사용하여 새로운 Access Token 발급
            const response = await reIssueToken(refreshToken);
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            // 2. 새로운 Access Token, Refresh Token 저장
            setAccessToken(access_token);
            setRefreshToken(refresh_token);

            // 3. 모든 대기 중인 요청을 새로운 Access Token과 함께 처리
            failedRequestsQueue.forEach((request: any) => request.resolve()); // 요청 재시도
            failedRequestsQueue = []; // 큐 비우기

            // 4. 원래 요청을 새로운 Access Token과 함께 재시도
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            return instance.request(error.config); // 재시도
          } catch (e) {
            // 재발급 실패 시
            console.error('토큰 재발급 실패:', e);
            // 토큰 초기화 및 로그인 페이지로 이동
            setAccessToken(null);
            setRefreshToken(null);
            redirectToSignin(); // 로그인 페이지로 이동
            // 실패한 요청 큐 에러 처리
            failedRequestsQueue.forEach((request: any) => request.reject(e)); // 실패한 요청들에 대해 에러 처리
            failedRequestsQueue = [];
            return Promise.reject(e);
          } finally {
            // 토큰 재발급 프로세스 완료
            isTokenRefreshing = false;
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}

/**
 * 인증이 필요한 API 요청을 위한 Axios 인스턴스를 생성하는 함수
 *
 * @function createInstance
 * @returns {AxiosInstance} 인터셉터가 설정된 Axios 인스턴스
 *
 * @description
 * 이 함수는 기본 URL이 설정된 Axios 인스턴스를 생성하고,
 * setInterceptors 함수를 통해 인증 토큰을 자동으로 추가하는 인터셉터를 설정합니다.
 */
function createInstance(type: string) {
  const instance = axios.create({
    baseURL:
      type === 'kakao'
        ? import.meta.env.VITE_APP_KAKAO_API_BASE_URL
        : import.meta.env.VITE_APP_API_GIGGLE_API_BASE_URL,
  });
  return setInterceptors(instance, type);
}

/**
 * 인증이 필요하지 않은 API 요청을 위한 Axios 인스턴스를 생성하는 함수
 *
 * @function createInstanceWithoutAuth
 * @returns {AxiosInstance} 기본 설정만 된 Axios 인스턴스
 *
 * @description
 * 이 함수는 기본 URL만 설정된 Axios 인스턴스를 생성합니다.
 * 인증 토큰이 필요하지 않은 API 요청(예: 로그인, 회원가입 등)에 사용됩니다.
 */
// Todo: .env 파일에서 환경변수로 api 주소를 가져오고 있지만, 서버 주소가 나오면 env 파일 없이도 사용 가능하게 수정해야 함.
function createInstanceWithoutAuth() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_GIGGLE_API_BASE_URL,
  });
  return instance;
}

/**
 * 인증이 필요한 API 요청에 사용할 Axios 인스턴스
 * @const {AxiosInstance}
 */
export const api = createInstance('server');

/**
 * 인증이 필요하지 않은 API 요청에 사용할 Axios 인스턴스
 * @const {AxiosInstance}
 */
export const apiWithoutAuth = createInstanceWithoutAuth();

/**
 * Kakao API 요청에 사용할 Axios 인스턴스
 * @const {AxiosInstance}
 */
export const apiKaKao = createInstance('kakao');

/**
 * Kakao API 요청에 사용할 Axios 인스턴스
 * @const {AxiosInstance}
 */
export const externalAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_EXTERNAL_API_BASE_URL,
});
