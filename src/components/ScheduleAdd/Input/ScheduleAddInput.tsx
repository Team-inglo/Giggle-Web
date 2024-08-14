import {
  CalenderTitle,
  ColorInput,
  CycleBox,
  CycleButton,
  CycleTitle,
  EditButton,
  Input,
  InputBox,
  InputText,
  InputTitle,
  PaletteButton,
  SubmitButton,
} from "./style";
import EditIcon from "../../../assets/icons/circle_pencil_icon.svg?react";
import "react-color-palette/css";
import ScheduleAddCalendar from "../Calendar/ScheduleAddCalendar";
import ScheduleAddDropDown from "../DropDown/ScheduleAddDropDown";

const ScheduleAddInput = () => {
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
      <CycleButton>+ 추가하기</CycleButton>
      {/* 주기 목록도 컴포넌트로 분리하면 좋을듯?*/}
      <CycleBox>
        <CycleTitle>주기1</CycleTitle>
        <EditButton>
          <EditIcon />
        </EditButton>
      </CycleBox>
      <ScheduleAddCalendar />
      <SubmitButton>근로 기록하기</SubmitButton>
    </>
  );
};

export default ScheduleAddInput;
