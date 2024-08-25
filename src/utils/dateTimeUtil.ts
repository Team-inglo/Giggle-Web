// 서버에서 [year, month, day] 숫자 배열로 받은 것을 YYYY-MM-DD 형태로 변환하기
export const parseArrToDate = (dateArr: number[]) => {
  const [year, month, day] = dateArr;
  const formattedMonth = String(month).padStart(2, "0"); // 두 자릿수로 맞춤
  const formattedDay = String(day).padStart(2, "0"); // 두 자릿수로 맞춤
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const parseArrToTime = (dateArr: number[]) => {
  const formattedHour = String(dateArr[3]).padStart(2, "0"); // 두 자릿수로 맞춤
  const formattedMinute = String(dateArr[4]).padStart(2, "0"); // 두 자릿수로 맞춤
  return `${formattedHour}:${formattedMinute}`;
};
