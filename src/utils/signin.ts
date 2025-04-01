import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

// ID 유효성 검사 함수
export const validateId = (
  id: string,
  setIdError: (error: string | null) => void,
  pathname: string,
): boolean => {
  const idRegex = /^[a-zA-Z0-9]{5,20}$/;
  if (!idRegex.test(id)) {
    setIdError(signInputTranclation.invalidId[isEmployer(pathname)]);
    return false;
  }
  setIdError(null);
  return true;
};

// 비밀번호 유효성 검사 함수
export const validatePassword = (
  password: string,
  setPasswordError: (error: string | null) => void,
  language: 'ko' | 'en',
): boolean => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(signInputTranclation.invalidPassword[language]);
    return false;
  }
  setPasswordError(null);
  return true;
};

// 비밀번호 확인 유효성 검사 함수
export const validatedConfirmPassword = (
  password: string,
  confirmPassword: string,
  setConfirmPasswordError: (error: string | null) => void,
  language: 'ko' | 'en',
): boolean => {
  if (confirmPassword !== password) {
    setConfirmPasswordError(
      signInputTranclation.invalidConfirmPassword[language],
    );
    return false;
  }
  setConfirmPasswordError(null);
  return true;
};

// 이메일 유효성 검사 함수
export const validateEmail = (
  email: string,
  setEmailError: (error: string | null) => void,
  pathname: string,
): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    setEmailError(signInputTranclation.invalidEmail[isEmployer(pathname)]);
    return false;
  }
  setEmailError(null);
  return true;
};

// 인증 코드 유횽성 검사 함수
export const validateCode = (code: string): boolean => {
  const codeRegex = /^\d$/;
  if (!codeRegex.test(code)) {
    return false;
  }
  return true;
};
