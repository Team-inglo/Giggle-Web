import { ColorPicker, useColor } from "react-color-palette";
import {
  CalenderTitle,
  ColorInput,
  ColorPickerWrapper,
  Input,
  InputBox,
  InputText,
  InputTitle,
  PaletteButton,
} from "./style";
import PaletteIcon from "../../../assets/icons/palette_icon.svg?react";
import "react-color-palette/css";

const ScheduleAddInput = () => {
  const [color, setColor] = useColor("#561ecb");
  return (
    <>
      <InputTitle>알바 선택</InputTitle>
      <Input placeholder="알바 선택 또는 생성" />
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input placeholder="시급 입력" />
        <InputText>원</InputText>
      </InputBox>
      <ColorInput>
        <InputTitle>대표 색상</InputTitle>
        <PaletteButton>
          <PaletteIcon />
        </PaletteButton>
      </ColorInput>
      {/* <ColorPickerWrapper>
        <ColorPicker
          height={150}
          color={color}
          onChange={setColor}
          hideAlpha={true} // 투명도 조절바 숨김 (디폴트: 안숨김)
          hideInput={["rgb", "hsv", "rgb"]} // 컬러 코드 숨김 (디폴트: 안숨김)
        />
      </ColorPickerWrapper> */}
      <CalenderTitle>날짜 선택하기</CalenderTitle>
    </>
  );
};

export default ScheduleAddInput;
