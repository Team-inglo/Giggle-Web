import MainHeader from "../../components/Common/Header/MainHeader";
import JobListCategory from "../../components/JobList/Category/JobListCategory";
import DropDownIcon from "../../assets/icons/dropdown_icon.svg?react";
import { Container, FilterButton, JobListContainer } from "./style";
import JobListFilter from "../../components/JobList/Filter/JobLIstFilter";
import JobListNotice from "../../components/JobList/Notice/JobListNotice";
import JobListBottomSheet from "../../components/JobList/BottomSheet/JobListBottomSheet";
import useBottomSheet from "../../hooks/useBottomSheet";
import { useState } from "react";
import { JobNotice } from "../../interfaces/notice/jobNotice";
import EmployerMenu from "../../components/Common/EmployerMenu/EmployerMenu";

const jobNoticeList: JobNotice[] = [
  {
    id: 1,
    restOfDay: 25,
    hourlyWage: 10000,
    title: "파리바게트 파트타이머 모집",
    addressName: "서울시 강북구 수유동",
    numberRecruited: 1,
  },
  {
    id: 2,
    restOfDay: 15,
    hourlyWage: 11000,
    title: "베스킨라빈스 파트타이머 모집",
    addressName: "서울시 강북구 솔샘로",
    numberRecruited: 3,
  },
  {
    id: 3,
    restOfDay: 5,
    hourlyWage: 10000,
    title: "이마트 판촉 파트타이머 모집",
    addressName: "서울시 강북구 한천로",
    numberRecruited: 5,
  },
  {
    id: 4,
    restOfDay: 10,
    hourlyWage: 11000,
    title: "고등학생 영어 조교 모집",
    addressName: "서울시 강북구 덕릉로",
    numberRecruited: 2,
  },
  {
    id: 5,
    restOfDay: 30,
    hourlyWage: 10000,
    title: "롯데시네마 영화관 파트타이머 모집",
    addressName: "서울시 중구",
    numberRecruited: 4,
  },
];

const EmployerJobListPage = () => {
  const { onDragEnd, controls, setIsOpen } = useBottomSheet();

  const [jobFilter, setJobFilter] = useState<string[]>([]); // 정렬 조건 -> 남아있도록 하려면 상태 관리 필요할듯? + bottomSheet에도 기존 선택값 반영 필요

  return (
    <>
      <Container>
        <MainHeader />
        <JobListCategory />
        <FilterButton onClick={() => setIsOpen(true)}>
          정렬 조건 선택
          <DropDownIcon />
        </FilterButton>
        <JobListFilter jobFilter={jobFilter} />
        <JobListContainer>
          {jobNoticeList.map((jobNotice) => (
            <JobListNotice key={jobNotice.id} jobNotice={jobNotice} />
          ))}
        </JobListContainer>
      </Container>
      <JobListBottomSheet onDragEnd={onDragEnd} controls={controls} setIsOpen={setIsOpen} setJobFilter={setJobFilter} />
      <EmployerMenu />
    </>
  );
};

export default EmployerJobListPage;
