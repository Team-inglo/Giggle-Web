import {
  ContentContainer,
  ContentText,
  ContentTitle,
  ExtraInfoContent,
  ExtraInfoText,
  ExtraInfoTitle,
  ExtraInfoWrapper,
  InfoContainer,
  InfoContent,
  InfoTitle,
  InfoWrapper,
  SubTitle,
  Title,
} from "./style";
import InfoIcon from "../../../assets/icons/info_icon.svg?react";
import { useParams } from "react-router-dom";
import { JobNotice } from "../../../interfaces/notice/jobNotice";

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

const dummyData = [
  {
    title: "근무기간",
    content: "2024.06~2024.08",
  },
  {
    title: "성별",
    content: "무관",
  },
  {
    title: "근무요일",
    content: "화,목",
  },
  {
    title: "연령",
    content: "20세 이상",
  },
  {
    title: "근무시간",
    content: "12:00~16:00",
  },
  {
    title: "학력",
    content: "무관",
  },
];

const JobDetailInfo = () => {
  const params = useParams();
  const jobNotice = jobNoticeList.find((value) => value.id === Number(params.id));

  return (
    <>
      <Title>{jobNotice?.title}</Title>
      <SubTitle>{jobNotice?.addressName}</SubTitle>
      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>모집마감</InfoTitle>
          <InfoContent>2024.10.10</InfoContent>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>시급</InfoTitle>
          <InfoContent>{jobNotice?.hourlyWage}원</InfoContent>
        </InfoWrapper>
        {dummyData.map((value, index) => (
          <ExtraInfoWrapper key={index}>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>{value.title}</ExtraInfoTitle>
              <ExtraInfoContent>{value.content}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
        ))}
      </InfoContainer>
      <ExtraInfoWrapper>
        <InfoIcon />
        <ExtraInfoText>
          <ExtraInfoTitle>근무지역</ExtraInfoTitle>
          <ExtraInfoContent>{jobNotice?.addressName}</ExtraInfoContent>
        </ExtraInfoText>
      </ExtraInfoWrapper>
      <ContentContainer>
        <ContentTitle>상세요강</ContentTitle>
        <ContentText>
          가. 한국장학재단에 2024년도 하계방학 국가근로장학을 신청하여 근로순위를 부여받은 학생 나. 직전학기 성적이 백분율 70점(평점평균
          1.88)이상인 학부 재학생(휴학/학점등록자 등 제외) 성실하게 일할 사람을 찾습니다. 문의사항은 아래로 연락 주세요.
        </ContentText>
      </ContentContainer>
    </>
  );
};

export default JobDetailInfo;
