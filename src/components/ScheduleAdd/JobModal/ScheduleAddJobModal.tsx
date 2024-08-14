import ModalLayout from "../../Common/ModalLayout/ModalLayout";
import {
  ColorInput,
  ColorPickerWrapper,
  Container,
  Input,
  InputBox,
  InputText,
  InputTitle,
  PaletteButton,
  PaletteColor,
  PaletteImg,
  SubmitButton,
  Title,
} from "./style";
import paletteImg from "../../../assets/images/palette_image.png";
import { ColorPicker, useColor } from "react-color-palette";
import { useEffect, useRef, useState } from "react";

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleAddJobModal = ({ isModal, setIsModal }: ModalProps) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useColor("#fff");

  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);
  const [isChooseColor, setIsChooseColor] = useState<boolean>(false);

  const onClickSubmit = () => {
    setIsModal(false);
  };

  const openColorPicker = () => {
    setIsColorPicker(true);
  };

  const closeColorPicker = () => {
    setIsColorPicker(false);
  };

  // 컬러피커 외부 영역 클릭 시 닫히도록 설정
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        closeColorPicker();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [colorPickerRef]);

  return (
    <ModalLayout isModal={isModal} setIsModal={setIsModal}>
      <Container>
        <Title>알바 생성</Title>
        <InputBox>
          <InputTitle>알바 이름</InputTitle>
          <Input placeholder="이름" />
        </InputBox>
        <InputBox>
          <InputTitle>시급</InputTitle>
          <Input placeholder="시급" />
          <InputText>원</InputText>
        </InputBox>
        <ColorInput>
          <InputTitle>대표 색상</InputTitle>
          <PaletteButton onClick={openColorPicker}>
            {isChooseColor ? <PaletteColor color={color.hex}></PaletteColor> : <PaletteImg src={paletteImg} />}
          </PaletteButton>
        </ColorInput>
        {isColorPicker && (
          <ColorPickerWrapper ref={colorPickerRef}>
            <ColorPicker
              height={70}
              color={color}
              onChange={setColor}
              onChangeComplete={() => setIsChooseColor(true)}
              hideAlpha={true} // 투명도 조절바 숨김 (디폴트: 안숨김)
              hideInput={["rgb", "hsv", "rgb"]} // 컬러 코드 숨김 (디폴트: 안숨김)
            />
          </ColorPickerWrapper>
        )}
        <SubmitButton onClick={onClickSubmit}>알바 생성하기</SubmitButton>
      </Container>
    </ModalLayout>
  );
};

export default ScheduleAddJobModal;
