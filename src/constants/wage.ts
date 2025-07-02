// 최저임금 정보
export const MINIMUM_WAGE = {
  2025: 10030,
};

// 현재 최저임금 반환
export const getCurrentMinimumWage = () => {
  const currentYear = new Date().getFullYear();
  return (
    MINIMUM_WAGE[currentYear as keyof typeof MINIMUM_WAGE] ||
    MINIMUM_WAGE['2025']
  );
};
