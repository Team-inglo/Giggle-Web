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
import { useGetNoticeDetail } from "../../../hooks/services/notice/queries";
import { JobNoticeDetail } from "../../../interfaces/notice/jobNoticeDetail";

const JobDetailInfo = () => {
  const params = useParams();

  const { isLoading, error, data } = useGetNoticeDetail(1, Number(params.id));

  if (isLoading) return <div></div>;
  if (error) return <div>에러남: {error.message}</div>;
  if (data) {
    const jobNotice: JobNoticeDetail = data?.data;
    return (
      <>
        <Title>{jobNotice?.title}</Title>
        <SubTitle>{jobNotice?.addressName}</SubTitle>
        <InfoContainer>
          <InfoWrapper>
            <InfoTitle>모집마감</InfoTitle>
            <InfoContent>{jobNotice?.deadLine}</InfoContent>
          </InfoWrapper>
          <InfoWrapper>
            <InfoTitle>시급</InfoTitle>
            <InfoContent>{jobNotice?.hourlyWage}원</InfoContent>
          </InfoWrapper>

          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>근무기간</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.workingPeriod}개월</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>성별</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.gender}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>근무요일</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.workDays}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>연령</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.age}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>근무시간</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.workTime}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
          <ExtraInfoWrapper>
            <InfoIcon />
            <ExtraInfoText>
              <ExtraInfoTitle>학력</ExtraInfoTitle>
              <ExtraInfoContent>{jobNotice?.education}</ExtraInfoContent>
            </ExtraInfoText>
          </ExtraInfoWrapper>
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
  }
};

export default JobDetailInfo;
