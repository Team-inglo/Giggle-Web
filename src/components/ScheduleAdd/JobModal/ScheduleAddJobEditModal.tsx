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
  SubmitButton,
  Title,
} from "./style";
import { ColorPicker, useColor } from "react-color-palette";
import { useEffect, useRef, useState } from "react";
import { PartTimeDetail } from "../../../interfaces/calendar/partTime";

const partTimes: PartTimeDetail[] = [
  {
    id: 1,
    name: "알바1",
    hourlyRate: 10000,
    color: "#FFB65A",
  },
  {
    id: 2,
    name: "알바2",
    hourlyRate: 11000,
    color: "#7DD0B6",
  },
  {
    id: 3,
    name: "알바3",
    hourlyRate: 12000,
    color: "#c17dd0",
  },
  {
    id: 4,
    name: "알바4",
    hourlyRate: 13000,
    color: "#b6d07d",
  },
];

type ModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  partTimeId: number | null;
};

const ScheduleAddJobEditModal = ({ setIsModal, partTimeId }: ModalProps) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>(""); // 나중에 숫자로 변환하기
  const [color, setColor] = useColor("#fff");

  const [isColorPicker, setIsColorPicker] = useState<boolean>(false);

  const onClickSubmit = () => {
    // 알바 생성하기 로직 추가
    // const body = {
    //   name: name,
    //   hourly_rate: Number(hourlyRate),
    //   color: color,
    // };
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

  useEffect(() => {
    const findPartTime = partTimes.find((value) => value.id === partTimeId);
    setName(findPartTime?.name || "");
    setHourlyRate(findPartTime?.hourlyRate.toString() || "");
    setColor({ ...color, hex: findPartTime?.color || "#fff" });
  }, [partTimeId]);

  return (
    <Container>
      <Title>알바 수정</Title>
      <InputBox>
        <InputTitle>알바 이름</InputTitle>
        <Input placeholder="이름" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input placeholder="시급" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
        <InputText>원</InputText>
      </InputBox>
      <ColorInput>
        <InputTitle>대표 색상</InputTitle>
        <PaletteButton onClick={openColorPicker}>
          <PaletteColor color={color.hex}></PaletteColor>
        </PaletteButton>
      </ColorInput>
      {isColorPicker && (
        <ColorPickerWrapper ref={colorPickerRef}>
          <ColorPicker
            height={70}
            color={color}
            onChange={setColor}
            hideAlpha={true} // 투명도 조절바 숨김 (디폴트: 안숨김)
            hideInput={["rgb", "hsv", "rgb"]} // 컬러 코드 숨김 (디폴트: 안숨김)
          />
        </ColorPickerWrapper>
      )}
      <SubmitButton onClick={onClickSubmit}>알바 수정하기</SubmitButton>
    </Container>
  );
};

export default ScheduleAddJobEditModal;
