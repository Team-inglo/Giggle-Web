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
import { NoticeListFilter } from "../../../interfaces/notice/noticeListFilter";
import JobListRegion from "../../JobList/Region/JobListRegion";

type JobListBottomSheetProps = {
  onDragEnd: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  controls: AnimationControls;
  setIsOpen: (isOpen: boolean) => void;
  setJobFilter: (jobFilter: string[]) => void;
  setSearchFilter: (searchFilter: NoticeListFilter) => void;
};

type searchFilterType = { key: string; name: string };

const EmployerJobListBottomSheet = ({ onDragEnd, controls, setIsOpen, setJobFilter, setSearchFilter }: JobListBottomSheetProps) => {
  // 지역 선택 메뉴창
  const [isRegionOpen, toggleRegionOpen] = useCycle(false, true);

  const [recommend, setRecommend] = useState<searchFilterType>(EMPLOYER_JOB_SEARCH_FILTER[0].filters[0]);
  const [arrange, setArrange] = useState<searchFilterType>(EMPLOYER_JOB_SEARCH_FILTER[1].filters[0]);
  const [region, setRegion] = useState<string[]>([]);
  const [period, setPeriod] = useState<searchFilterType>(EMPLOYER_JOB_SEARCH_FILTER[3].filters[0]);

  // 지역 추가하기
  const addRegion = (newRegion: string) => {
    setRegion([...region, newRegion]);
  };

  // 선택한 지역 삭제하기
  const deleteRegion = (selectedRegion: string) => {
    setRegion(region.filter((value) => value !== selectedRegion));
  };

  const onClickSubmit = () => {
    setJobFilter([recommend.name, arrange.name, ...region, period.name]);
    setSearchFilter({ isOwner: recommend.key, sortOrder: arrange.key, region: region, period: period.key });
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
              <Button key={value.key} $isSelected={recommend.key === value.key} onClick={() => setRecommend(value)}>
                {value.name}
              </Button>
            ))}
          </FilterBox>
          <TitleBox>
            <Title>{EMPLOYER_JOB_SEARCH_FILTER[1].title}</Title>
          </TitleBox>
          <FilterBox>
            {EMPLOYER_JOB_SEARCH_FILTER[1].filters.map((value) => (
              <Button key={value.key} $isSelected={arrange.key === value.key} onClick={() => setArrange(value)}>
                {value.name}
              </Button>
            ))}
          </FilterBox>
          <TitleBox>
            <Title>
              {EMPLOYER_JOB_SEARCH_FILTER[2].title}
              <SubTitle>* 중복 선택 가능</SubTitle>
            </Title>
          </TitleBox>

          <RegionSelectButton onClick={() => toggleRegionOpen()}>{EMPLOYER_JOB_SEARCH_FILTER[2].filters[0].name}</RegionSelectButton>
          <RegionContainer>
            {region.map((value, idx) => (
              <RegionButton key={`${value}_${idx}`}>
                {value}
                <RegionDeleteButton onClick={() => deleteRegion(value)}>X</RegionDeleteButton>
              </RegionButton>
            ))}
          </RegionContainer>
          <TitleBox>
            <Title>{EMPLOYER_JOB_SEARCH_FILTER[3].title}</Title>
          </TitleBox>
          <FilterBox>
            {EMPLOYER_JOB_SEARCH_FILTER[3].filters.map((value) => (
              <Button key={value.key} $isSelected={period.key === value.key} onClick={() => setPeriod(value)}>
                {value.name}
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
