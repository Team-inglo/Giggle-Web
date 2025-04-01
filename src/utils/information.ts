// Regular expression for first name validation
// Allows 1-50 characters, only letters (no numbers or special characters)
export const firstNameRegex = /^[A-Za-z가-힣]{1,50}$/;

// Regular expression for last name validation
// Allows 1-100 characters, only letters (no numbers or special characters)
export const lastNameRegex = /^[A-Za-z가-힣]{1,50}$/;

// Function to test if a string matches the first name criteria
export const isValidFirstName = (name: string): boolean => {
  return firstNameRegex.test(name);
};

// Function to test if a string matches the last name criteria
export const isValidLastName = (name: string): boolean => {
  return lastNameRegex.test(name);
};

// 이름 유효성 검사 함수
export const isValidName = (name: string) =>
  name.trim() !== '' && (isValidFirstName(name) || isValidLastName(name));

// 전화번호 유효성 검사 함수
export const isValidPhoneNumber = (phone: {
  start: string;
  middle: string;
  end: string;
}) =>
  phone.start !== '' &&
  /^[0-9]{4}$/.test(phone.middle) &&
  /^[0-9]{4}$/.test(phone.end);

// input에서 maxLength만큼 값을 제한하는 함수
export const limitInputValueLength = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value;

  return value.slice(0, maxLength);
};

// 3개의 dropdown, input으로 나눠 받고 있는 state 통합하는 함수
export const formatPhoneNumber = (phone: {
  start: string;
  middle: string;
  end: string;
}) => `${phone.start}-${phone.middle}-${phone.end}`;

export const parsePhoneNumber = (phoneNumber: string) => {
  const [start, middle, end] = phoneNumber.split('-');
  return {
    start,
    middle,
    end,
  };
};

// 사업자 등록번호 입력 시 000/00/00000 형태로 슬래시 추가하기
const validateCompanyRegistrationNumber = (value: string): boolean => {
  if (value.length > 12) return false;

  for (let i = 0; i < value.length; i++) {
    if (i === 3 || i === 6) {
      if (value[i] !== '/') return false; // 3, 6번째는 / 필수
    } else if (!/^\d$/.test(value[i])) {
      return false; // 나머지는 숫자만 가능
    }
  }
  return true;
};

export const formatCompanyRegistrationNumber = (value: string) => {
  if (validateCompanyRegistrationNumber(value)) return value;

  const numberValue = value.replace(/\D/g, '').slice(0, 10);

  const formatValue =
    numberValue
      .match(/(\d{1,3})(\d{1,2})?(\d{1,5})?/)
      ?.slice(1)
      .filter(Boolean)
      .join('/') || '';

  return formatValue;
};

// 날짜값 입력 시 YYYY-MM-DD 형식으로 만들기
const validateDateInput = (value: string) => {
  if (value.length > 10) return false;

  for (let i = 0; i < value.length; i++) {
    if (i === 4 || i === 7) {
      if (value[i] !== '-') return false;
    } else if (!/^\d$/.test(value[i])) {
      return false;
    }
  }
  return true;
};

export const formatDateInput = (value: string) => {
  if (validateDateInput(value)) return value;

  const numberValue = value.replace(/\D/g, '').slice(0, 8);

  const formatValue =
    numberValue
      .match(/(\d{1,4})(\d{1,2})?(\d{1,2})?/)
      ?.slice(1)
      .filter(Boolean)
      .join('-') || '';

  return formatValue;
};
