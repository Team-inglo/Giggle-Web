import { signInputTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

// 비밀번호 유효성 검사 함수
export const validatePassword = (
  password: string,
  setPasswordError: (error: string | null) => void,
  language: 'ko' | 'en',
): boolean => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(signInputTranslation.invalidPassword[language]);
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
      signInputTranslation.invalidConfirmPassword[language],
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
    setEmailError(signInputTranslation.invalidEmail[isEmployer(pathname)]);
    return false;
  }
  setEmailError(null);
  return true;
};
