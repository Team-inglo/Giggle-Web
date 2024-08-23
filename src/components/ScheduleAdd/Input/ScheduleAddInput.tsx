import { CalenderTitle, ColorInput, Input, InputBox, InputText, InputTitle, PaletteButton, SubmitButton } from "./style";
import "react-color-palette/css";
import ScheduleAddCalendar from "../Calendar/ScheduleAddCalendar";
import ScheduleAddDropDown from "../DropDown/ScheduleAddDropDown";
import { useState } from "react";
import ScheduleAddCalendarDays from "../Calendar/ScheduleAddCalendarDays";

const ScheduleAddInput = () => {
  const [showCalendarDays, setShowCalendarDays] = useState<boolean>(false);

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
        <ScheduleAddDropDown />
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input placeholder="시급 입력" readOnly />
        <InputText>원</InputText>
      </InputBox>
      <ColorInput>
        <InputTitle>대표 색상</InputTitle>
        <PaletteButton>{/* {isChooseColor ? <PaletteColor color={color.hex}></PaletteColor> : <PaletteImg src={paletteImg} />} */}</PaletteButton>
      </ColorInput>
      <CalenderTitle>날짜 선택하기</CalenderTitle>
      {showCalendarDays ? <ScheduleAddCalendarDays closeCalendarDays={closeCalendarDays} /> : <ScheduleAddCalendar openCalendarDays={openCalendarDays} />}
      <SubmitButton>근로 기록하기</SubmitButton>
    </>
  );
};

export default ScheduleAddInput;
