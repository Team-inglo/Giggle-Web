import { TimeString } from "./types";

export const handleInput = (
  input: string,
  setTarget: (input: number) => void
) => {
  const numberedInput = Number(input);
  if (Number.isNaN(numberedInput)) return;
  setTarget(numberedInput);
};

export function isTimeString(value: string): value is TimeString {
  // 정규 표현식을 사용하여 "HH:MM" 형식인지 확인
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(value)) {
    return false;
  }

  // 추가적인 유효성 검사 (선택적)
  const [hours, minutes] = value.split(":").map(Number);

  // 시간이 0-23 사이, 분이 0-59 사이인지 확인
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return false;
  }

  return true;
}

export const handleTimeInput = (
  //ToDo: 현재 한 번 시간 입력 후 수정이 이루어지지 않음. 자유롭게 수정 가능하도록
  input: string,
  setTarget: (input: TimeString) => void
) => {
  console.log(input)
  if (isTimeString(input) === false) return;
  setTarget(input);
};
