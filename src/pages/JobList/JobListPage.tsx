import MainHeader from "../../components/Common/Header/MainHeader";
import Menu from "../../components/Common/Menu/Menu";
import JobListCategory from "../../components/JobList/Category/JobListCategory";
import DropDownIcon from "../../assets/icons/dropdown_icon.svg?react";
import { Container, FilterButton, JobListContainer } from "./style";
import JobListFilter from "../../components/JobList/Filter/JobLIstFilter";
import JobListNotice from "../../components/JobList/Notice/JobListNotice";
import JobListBottomSheet from "../../components/JobList/BottomSheet/JobListBottomSheet";

const JobListPage = () => {
  return (
    <>
      <Container>
        <MainHeader />
        <JobListCategory />
        <FilterButton>
          정렬 조건 선택
          <DropDownIcon />
        </FilterButton>
        <JobListFilter />
        <JobListContainer>
          <JobListNotice />
          <JobListNotice />
          <JobListNotice />
          <JobListNotice />
        </JobListContainer>
      </Container>
      <JobListBottomSheet />
      <Menu />
    </>
  );
};

export default JobListPage;
