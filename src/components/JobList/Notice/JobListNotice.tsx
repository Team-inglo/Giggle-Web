import { JobNotice } from "../../../interfaces/notice/jobNotice";
import { BottomContainer, Container, DayTag, Location, MoneyTag, RecruitingNum, TagContainer, Title } from "./style";
import { useLocation, useNavigate } from "react-router-dom";

const JobListNotice = ({ jobNotice }: { jobNotice: JobNotice }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToDetailPage = () => {
    navigate(`${location.pathname}/detail/${jobNotice.id}`);
  };

  return (
    <Container onClick={goToDetailPage}>
      <TagContainer>
        <DayTag>마감 D-{jobNotice.deadlineDDay}</DayTag>
        <MoneyTag>시급 {jobNotice.hourlyWage}원</MoneyTag>
      </TagContainer>
      <Title>{jobNotice.title}</Title>
      <Location>{jobNotice.addressName}</Location>
      <BottomContainer>
        <RecruitingNum>모집인원 {jobNotice.numberRecruited}명</RecruitingNum>
      </BottomContainer>
    </Container>
  );
};

export default JobListNotice;
