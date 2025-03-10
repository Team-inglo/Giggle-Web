export const calculateDDay = (date: string): string => {
  const targetTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  const differenceDays = Math.ceil(
    (targetTime - currentTime) / (1000 * 60 * 60 * 24),
  );

  if (differenceDays > 0) {
    return `D-${differenceDays}`;
  } else if (differenceDays === 0) {
    return 'D-Day';
  } else {
    return `D+${Math.abs(differenceDays)}`;
  }
};

export const calculateDays = (date: string): number => {
  const targetTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  const differenceDays = Math.ceil(
    (targetTime - currentTime) / (1000 * 60 * 60 * 24),
  );

  return differenceDays;
};
