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
  return (
    <>
      <Title>파리바게트 파트타이머 모집</Title>
      <SubTitle>서울시 강북구 수유동</SubTitle>
      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>모집마감</InfoTitle>
          <InfoContent>2024.10.10</InfoContent>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>시급</InfoTitle>
          <InfoContent>100000원</InfoContent>
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
          <ExtraInfoContent>서울특별시 중구 필동로 1길</ExtraInfoContent>
        </ExtraInfoText>
      </ExtraInfoWrapper>
      <ContentContainer>
        <ContentTitle>상세요강</ContentTitle>
        <ContentText>
          가. 한국장학재단에 2024년도 하계방학 국가근로장학을 신청하여 근로순위를 부여받은 학생 나. 직전학기 성적이 백분율 70점(평점평균 1.88)이상인 학부
          재학생(휴학/학점등록자 등 제외) 성실하게 일할 사람을 찾습니다. 문의사항은 아래로 연락 주세요.
        </ContentText>
      </ContentContainer>
    </>
  );
};

export default JobDetailInfo;
