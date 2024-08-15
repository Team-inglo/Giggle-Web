import { BottomContainer, Container, DayTag, LikeButton, Location, MoneyTag, RecruitingNum, TagContainer, Title } from "./style";
import LikeIcon from "../../../assets/icons/like_icon.svg?react";
import { useState } from "react";

const JobListNotice = () => {
  const [like, setLike] = useState<boolean>(false);

  const onClickLike = () => {
    setLike(!like);
  };

  return (
    <Container>
      <TagContainer>
        <DayTag>마감 D-25</DayTag>
        <MoneyTag>시급 10,000원</MoneyTag>
      </TagContainer>
      <Title>파리바게트 파트타이머 모집</Title>
      <Location>서울시 강북수 수유동</Location>
      <BottomContainer>
        <RecruitingNum>모집인원 1명</RecruitingNum>
        <LikeButton onClick={onClickLike} $like={like}>
          <LikeIcon />
        </LikeButton>
      </BottomContainer>
    </Container>
  );
};

export default JobListNotice;
