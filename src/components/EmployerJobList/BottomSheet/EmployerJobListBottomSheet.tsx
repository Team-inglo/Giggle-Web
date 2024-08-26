import { useState } from "react";
import {
  Button,
  ContentWrapper,
  FilterBox,
  HandleBar,
  HeaderTitle,
  HeaderWrapper,
  Title,
  SubTitle,
  TitleBox,
  Wrapper,
  SubmitButton,
  RegionButton,
  RegionContainer,
  RegionSelectButton,
  RegionDeleteButton,
  SlideRegionWrapper,
} from "./style";
import { EMPLOYER_JOB_SEARCH_FILTER } from "../../../constants/jobSearchFilter";
import { AnimationControls, PanInfo, useCycle } from "framer-motion";
import JobListRegion from "../../JobList/Region/JobListRegion";

type JobListBottomSheetProps = {
  onDragEnd: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  controls: AnimationControls;
  setIsOpen: (isOpen: boolean) => void;
  setJobFilter: (jobFilter: string[]) => void;
};

const EmployerJobListBottomSheet = ({ onDragEnd, controls, setIsOpen, setJobFilter }: JobListBottomSheetProps) => {
  // 지역 선택 메뉴창
  const [isRegionOpen, toggleRegionOpen] = useCycle(false, true);

  const [recommend, setRecommend] = useState<string>(EMPLOYER_JOB_SEARCH_FILTER[0].filters[0]);
  const [arrange, setArrange] = useState<string>(EMPLOYER_JOB_SEARCH_FILTER[1].filters[0]);
  const [region, setRegion] = useState<string[]>([]);
  const [period, setPeriod] = useState<string[]>([EMPLOYER_JOB_SEARCH_FILTER[3].filters[0]]);

  const onClickPeriod = (newPeriod: string) => {
    const totalKeyword = EMPLOYER_JOB_SEARCH_FILTER[3].filters[0];
    if (period.includes(newPeriod)) {
      // 만약 기간 선택이 없으면 기본값이 전체로 선택하기!
      const result = period.filter((value) => value !== newPeriod);
      result.length ? setPeriod(result) : setPeriod([totalKeyword]);
      return;
    }

    if (newPeriod === totalKeyword) setPeriod([totalKeyword]);
    else setPeriod([...period.filter((value) => value !== totalKeyword), newPeriod]);
  };

  // 지역 추가하기
  const addRegion = (newRegion: string) => {
    setRegion([...region, newRegion]);
  };

  // 선택한 지역 삭제하기
  const deleteRegion = (selectedRegion: string) => {
    setRegion(region.filter((value) => value !== selectedRegion));
  };

  const onClickSubmit = () => {
    setJobFilter([recommend, arrange, ...region, ...period]);
    setIsOpen(false);
  };

  return (
    <SlideRegionWrapper initial={false} animate={isRegionOpen ? "open" : "closed"}>
      <Wrapper
        drag="y"
        initial="hidden"
        onDragEnd={onDragEnd}
        animate={controls}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: "100%" },
        }}
        dragConstraints={{ top: 0 }} // 상단과 하단 드래그 제한 설정
        dragElastic={0.2}
      >
        <HeaderWrapper>
          <HandleBar />
          <HeaderTitle>정렬 조건 선택</HeaderTitle>
        </HeaderWrapper>
        <ContentWrapper>
          <TitleBox>
            <Title>{EMPLOYER_JOB_SEARCH_FILTER[0].title}</Title>
          </TitleBox>
          <FilterBox>
            {EMPLOYER_JOB_SEARCH_FILTER[0].filters.map((value) => (
              <Button key={value} $isSelected={recommend === value} onClick={() => setRecommend(value)}>
                {value}
              </Button>
            ))}
          </FilterBox>
          <TitleBox>
            <Title>{EMPLOYER_JOB_SEARCH_FILTER[1].title}</Title>
          </TitleBox>
          <FilterBox>
            {EMPLOYER_JOB_SEARCH_FILTER[1].filters.map((value) => (
              <Button key={value} $isSelected={arrange === value} onClick={() => setArrange(value)}>
                {value}
              </Button>
            ))}
          </FilterBox>
          <TitleBox>
            <Title>
              {EMPLOYER_JOB_SEARCH_FILTER[2].title}
              <SubTitle>* 중복 선택 가능</SubTitle>
            </Title>
          </TitleBox>

          <RegionSelectButton onClick={() => toggleRegionOpen()}>{EMPLOYER_JOB_SEARCH_FILTER[2].filters[0]}</RegionSelectButton>
          <RegionContainer>
            {region.map((value, idx) => (
              <RegionButton key={`${value}_${idx}`}>
                {value}
                <RegionDeleteButton onClick={() => deleteRegion(value)}>X</RegionDeleteButton>
              </RegionButton>
            ))}
          </RegionContainer>
          <TitleBox>
            <Title>
              {EMPLOYER_JOB_SEARCH_FILTER[3].title}
              <SubTitle>* 중복 선택 가능</SubTitle>
            </Title>
          </TitleBox>
          <FilterBox>
            {EMPLOYER_JOB_SEARCH_FILTER[3].filters.map((value) => (
              <Button key={value} $isSelected={period.includes(value)} onClick={() => onClickPeriod(value)}>
                {value}
              </Button>
            ))}
          </FilterBox>
          <SubmitButton onClick={onClickSubmit}>완료하기</SubmitButton>
        </ContentWrapper>
      </Wrapper>
      <JobListRegion toggle={toggleRegionOpen} addRegion={addRegion} />
    </SlideRegionWrapper>
  );
};

export default EmployerJobListBottomSheet;
