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
import { KOREA_REGIONS } from "../../../constants/koreaRegion";

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

type JobListRegionProps = {
  toggle: (i?: number) => void;
  addRegion: (region: string) => void;
};

const JobListRegion = ({ toggle, addRegion }: JobListRegionProps) => {
  // 우선은 한 번에 한 개만 선택 가능하도록 함!
  const [step, setStep] = useState<number>(1); // 1, 2단계
  const [region, setRegion] = useState<string | null>(null);
  const [secondRegion, setSecondRegion] = useState<string | null>(null);

  const onClickBeforeStep = () => {
    // 이전 단계로 되돌아가기
    setSecondRegion(null);
    setStep(1);
  };

  const onClickRegion = (region: string) => {
    if (step === 1) {
      setRegion(region);
      setStep(2);
    } else {
      setSecondRegion(region);
    }
  };

  const onClickSubmit = () => {
    if (region) {
      addRegion(secondRegion ? `${region} ${secondRegion}` : region);
      toggle();
      // 다시 초기화해야 함
      setRegion(null);
      setSecondRegion(null);
      setStep(1);
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
          <RegionTypeButton onClick={onClickBeforeStep}>{region}</RegionTypeButton>
          <RegionArrowIcon />
          <RegionTypeButton>{secondRegion}</RegionTypeButton>
        </RegionContainer>
        {step === 1 ? (
          <RegionInfoContainer>
            {KOREA_REGIONS.map((value, idx) => (
              <RegionInfoButton key={`${value}_${idx}`} onClick={() => onClickRegion(value.region)} $isSelected={region === value.region}>
                {value.region}
              </RegionInfoButton>
            ))}
          </RegionInfoContainer>
        ) : (
          <RegionInfoContainer>
            {KOREA_REGIONS.find((value) => value.region === region)?.subregions.map((value, idx) => (
              <RegionInfoButton key={`${value}_${idx}`} onClick={() => onClickRegion(value)} $isSelected={secondRegion === value}>
                {value}
              </RegionInfoButton>
            ))}
          </RegionInfoContainer>
        )}

        <SubmitButton onClick={onClickSubmit} disabled={region ? false : true}>
          추가하기
        </SubmitButton>
      </ContentContainer>
    </Wrapper>
  );
};

export default JobListRegion;
