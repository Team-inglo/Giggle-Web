import { CalenderTitle, ColorInput, Input, InputBox, InputText, InputTitle, PaletteColor, PaletteImg, SubmitButton } from "./style";
import "react-color-palette/css";
import ScheduleAddCalendar from "../Calendar/ScheduleAddCalendar";
import ScheduleAddDropDown from "../DropDown/ScheduleAddDropDown";
import { useState } from "react";
import ScheduleAddCalendarDays from "../Calendar/ScheduleAddCalendarDays";
import paletteImg from "../../../assets/images/palette_image.png";
import { PartTimeDetail } from "../../../interfaces/calendar/partTime";
import { Calendar, Schedule } from "../../../interfaces/calendar/totalSchedule";

const schedules: Schedule[] = [
  {
    id: 3,
    partTimeName: "파리바게트",
    hourlyRate: 11000,
    startAt: [2024, 8, 11, 15, 0],
    endAt: [2024, 8, 11, 16, 0],
  },
  {
    id: 4,
    partTimeName: "파리바게트",
    hourlyRate: 11000,
    startAt: [2024, 8, 10, 7, 0],
    endAt: [2024, 8, 10, 12, 0],
  },
];

const ScheduleAddInput = () => {
  const [partTimeId, setPartTimeId] = useState<number | null>(null); // 선택된 알바 id
  const [partTimeData, setPartTimeData] = useState<PartTimeDetail | null>(null); // 선택된 알바 상세 정보
  const [showCalendarDays, setShowCalendarDays] = useState<boolean>(false);
  const [changedSchedules, setChangedSchedules] = useState<Calendar[]>([]); // 이거 어떻게 변경할 지를 정해야 함!
  // 이미 한번이라도 수정한 적 있으면 해당 달은 불러오면 안 됨...!!!! -> 바로 changedSchedules 값 전달하기

  const closeCalendarDays = () => {
    setShowCalendarDays(false);
  };

  const openCalendarDays = () => {
    setShowCalendarDays(true);
  };

  return (
    <>
      <InputBox>
        <InputTitle>알바 선택</InputTitle>
        <ScheduleAddDropDown setPartTimeId={setPartTimeId} />
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input placeholder="시급 입력" readOnly value={partTimeData?.hourlyRate || ""} />
        <InputText>원</InputText>
      </InputBox>
      <ColorInput>
        <InputTitle>대표 색상</InputTitle>
        {partTimeData?.color ? <PaletteColor color={partTimeData?.color}></PaletteColor> : <PaletteImg src={paletteImg} />}
      </ColorInput>
      <CalenderTitle>날짜 선택하기</CalenderTitle>
      {showCalendarDays ? (
        <ScheduleAddCalendarDays closeCalendarDays={closeCalendarDays} />
      ) : (
        <ScheduleAddCalendar openCalendarDays={openCalendarDays} />
      )}
      <SubmitButton>근로 기록하기</SubmitButton>
    </>
  );
};

export default ScheduleAddInput;
