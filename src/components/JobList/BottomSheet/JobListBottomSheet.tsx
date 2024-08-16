import { useState } from "react";
import useBottomSheet from "../../../hooks/useBottomSheet";
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
} from "./style";
import { JOB_SEARCH_FILTER } from "../../../constants/jobSearchFilter";

const JobListBottomSheet = () => {
  // bottomSheet가 isOpen이면 뒤쪽 스크롤 막기!
  const { onDragEnd, controls } = useBottomSheet();
  // 이 데이터는 Page 컴포넌트에서 관리해야할 듯!
  const [recommend, setRecommend] = useState<string>(JOB_SEARCH_FILTER[0].filters[0]);
  const [arrange, setArrange] = useState<string>(JOB_SEARCH_FILTER[1].filters[0]);
  const [region, setRegion] = useState<string[]>([]);
  const [period, setPeriod] = useState<string[]>([JOB_SEARCH_FILTER[3].filters[0]]);
  const [interest, setInterest] = useState<string>(JOB_SEARCH_FILTER[4].filters[0]);

  const onClickPeriod = (newPeriod: string) => {
    if (period.includes(newPeriod)) {
      // 만약 기간 선택이 없으면 기본값이 전체로 선택하기!
      const result = period.filter((value) => value !== newPeriod);
      result.length ? setPeriod(result) : setPeriod([JOB_SEARCH_FILTER[3].filters[0]]);
    } else {
      setPeriod([...period, newPeriod]);
    }
  };

  return (
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
          <Title>{JOB_SEARCH_FILTER[0].title}</Title>
        </TitleBox>
        <FilterBox>
          {JOB_SEARCH_FILTER[0].filters.map((value) => (
            <Button key={value} $isSelected={recommend === value} onClick={() => setRecommend(value)}>
              {value}
            </Button>
          ))}
        </FilterBox>
        <TitleBox>
          <Title>{JOB_SEARCH_FILTER[1].title}</Title>
        </TitleBox>
        <FilterBox>
          {JOB_SEARCH_FILTER[1].filters.map((value) => (
            <Button key={value} $isSelected={arrange === value} onClick={() => setArrange(value)}>
              {value}
            </Button>
          ))}
        </FilterBox>
        <TitleBox>
          <Title>
            {JOB_SEARCH_FILTER[2].title}
            <SubTitle>* 중복 선택 가능</SubTitle>
          </Title>
        </TitleBox>
        <RegionButton>{JOB_SEARCH_FILTER[2].filters[0]}</RegionButton>
        <TitleBox>
          <Title>
            {JOB_SEARCH_FILTER[3].title}
            <SubTitle>* 중복 선택 가능</SubTitle>
          </Title>
        </TitleBox>
        <FilterBox>
          {JOB_SEARCH_FILTER[3].filters.map((value) => (
            <Button key={value} $isSelected={period.includes(value)} onClick={() => onClickPeriod(value)}>
              {value}
            </Button>
          ))}
        </FilterBox>
        <TitleBox>
          <Title>{JOB_SEARCH_FILTER[4].title}</Title>
        </TitleBox>
        <FilterBox>
          {JOB_SEARCH_FILTER[4].filters.map((value) => (
            <Button key={value} $isSelected={interest === value} onClick={() => setInterest(value)}>
              {value}
            </Button>
          ))}
        </FilterBox>
        <SubmitButton>완료하기</SubmitButton>
      </ContentWrapper>
    </Wrapper>
  );
};

export default JobListBottomSheet;
