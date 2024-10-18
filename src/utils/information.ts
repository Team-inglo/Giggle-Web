// Regular expression for first name validation
// Allows 1-50 characters, only letters (no numbers or special characters)
export const firstNameRegex = /^[A-Za-z]{1,50}$/;

// Regular expression for last name validation
// Allows 1-100 characters, only letters (no numbers or special characters)
export const lastNameRegex = /^[A-Za-z]{1,100}$/;

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

// 3개의 dropdown, input으로 나눠 받고 있는 state 통합하는 함수
export const formatPhoneNumber = (phone: {
  start: string;
  middle: string;
  end: string;
}) => `${phone.start}-${phone.middle}-${phone.end}`;
