import {
  BackButton,
  ContentContainer,
  HeaderContainer,
  RegionContainer,
  RegionInfoButton,
  RegionInfoContainer,
  RegionTypeButton,
  SubmitButton,
  Title,
  Wrapper,
} from "./style";
import BackIcon from "../../../assets/icons/back_icon.svg?react";
import RegionArrowIcon from "../../../assets/icons/region_arrow_icon.svg?react";
import { useState } from "react";

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: innerWidth,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

// 지역 더미데이터
const dummyData = ["1지역", "2지역", "3지역", "4지역", "5지역", "6지역", "7지역", "8지역", "9지역"];

type JobListRegionProps = {
  toggle: (i?: number) => void;
  addRegion: (region: string) => void;
};

const JobListRegion = ({ toggle, addRegion }: JobListRegionProps) => {
  // 우선은 한 번에 한 개만 선택 가능하도록 함!
  const [currentStep, setCurrentStep] = useState<number>(1); // 1, 2, 3단계
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [step, setStep] = useState<(string | null)[]>([null, null, null]);

  const onClickStep = (type: number) => {
    // 이전 단계면 되돌아 가기(다른 건 무시!)
    if (currentStep <= type) return;

    setStep(step.map((value, index) => (index + 1 >= type ? null : value)));
    setCurrentStep(type);
    setSelectedRegion(null);
  };

  const onClickRegion = (region: string) => {
    setStep(step.map((value, index) => (index + 1 === currentStep ? region : value)));

    // 전체...라는 값을 어떻게 처리할지 더 고민해봐야함!
    if (!region.includes("전체") && currentStep !== 3) {
      // 다음 단계를 다시 조회해야 함
      setCurrentStep(currentStep + 1);
      setSelectedRegion(null);
    } else {
      setSelectedRegion(region);
    }
  };

  const onClickSubmit = () => {
    if (selectedRegion) {
      addRegion(selectedRegion);
      toggle();
      // 다시 초기화해야 함
      setCurrentStep(1);
      setSelectedRegion(null);
      setStep([null, null, null]);
    }
  };

  return (
    <Wrapper variants={variants}>
      <HeaderContainer>
        <BackButton onClick={() => toggle()}>
          <BackIcon />
        </BackButton>
      </HeaderContainer>
      <ContentContainer>
        <Title>근무 지역 추가하기</Title>
        <RegionContainer>
          <RegionTypeButton onClick={() => onClickStep(1)}>{step[0]}</RegionTypeButton>
          <RegionArrowIcon />
          <RegionTypeButton onClick={() => onClickStep(2)}>{step[1]}</RegionTypeButton>
          <RegionArrowIcon />
          <RegionTypeButton onClick={() => onClickStep(3)}>{step[2]}</RegionTypeButton>
        </RegionContainer>
        <RegionInfoContainer>
          <RegionInfoButton onClick={() => onClickRegion("전체")} $isSelected={selectedRegion === "전체"}>
            전체
          </RegionInfoButton>
          {dummyData.map((value, idx) => (
            <RegionInfoButton key={`${value}_${idx}`} onClick={() => onClickRegion(value)} $isSelected={selectedRegion === value}>
              {value}
            </RegionInfoButton>
          ))}
        </RegionInfoContainer>
        <SubmitButton onClick={onClickSubmit} disabled={selectedRegion ? false : true}>
          추가하기
        </SubmitButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default JobListRegion;
