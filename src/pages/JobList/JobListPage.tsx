import MainHeader from "../../components/Common/Header/MainHeader";
import Menu from "../../components/Common/Menu/Menu";
import JobListCategory from "../../components/JobList/Category/JobListCategory";
import DropDownIcon from "../../assets/icons/dropdown_icon.svg?react";
import { Container, FilterButton, JobListContainer } from "./style";
import JobListFilter from "../../components/JobList/Filter/JobLIstFilter";
import JobListNotice from "../../components/JobList/Notice/JobListNotice";
import JobListBottomSheet from "../../components/JobList/BottomSheet/JobListBottomSheet";
import useBottomSheet from "../../hooks/useBottomSheet";
import { useState } from "react";

const JobListPage = () => {
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
          <JobListNotice />
          <JobListNotice />
          <JobListNotice />
          <JobListNotice />
        </JobListContainer>
      </Container>
      <JobListBottomSheet onDragEnd={onDragEnd} controls={controls} setIsOpen={setIsOpen} setJobFilter={setJobFilter} />
      <Menu />
    </>
  );
};

export default JobListPage;
