export const calculateDays = (date: string): number => {
  const targetTime = new Date(date);
  const currentTime = new Date();

  // 시간 정보 제거 (자정을 기준으로 계산)
  targetTime.setHours(0, 0, 0, 0);
  currentTime.setHours(0, 0, 0, 0);

  const differenceDays = Math.ceil(
    (targetTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24),
  );

  return differenceDays;
};
