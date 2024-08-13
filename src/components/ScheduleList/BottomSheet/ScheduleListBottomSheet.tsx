import { BOTTOM_SHEET_HEIGHT } from "../../../constants/bottomSheet";
import useBottomSheet from "../../../hooks/useBottomSheet";
import { ContentWrapper, HandleBar, HeaderWrapper, Title, TitleBox, Wrapper } from "./style";
import CalendarIcon from "../../../assets/icons/black_calendar_icon.svg?react";
import ScheduleListDetail from "../Detail/ScheduleListDetail";
import moment from "moment";

const ScheduleListBottomSheet = ({ date }: { date: Date }) => {
  const { controls } = useBottomSheet();

  const handleDate = () => {
    // 요일 계산하기
    const dayOfWeek = new Date(date).getDay();
    const week = ["일", "월", "화", "수", "목", "금", "토", "일"];
    return week[dayOfWeek];
  };

  return (
    <Wrapper
      drag="y"
      initial="hidden"
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
      dragConstraints={{ top: (-1 * BOTTOM_SHEET_HEIGHT) / 2, bottom: 0 }} // 상단과 하단 드래그 제한 설정
      dragElastic={0.2}
    >
      <HeaderWrapper>
        <HandleBar />
      </HeaderWrapper>
      <ContentWrapper>
        <TitleBox>
          <CalendarIcon />
          <Title>
            {moment(date).format("MM월 DD일")} {handleDate()}요일
          </Title>
        </TitleBox>
        <ScheduleListDetail />
        <ScheduleListDetail />
      </ContentWrapper>
    </Wrapper>
  );
};

export default ScheduleListBottomSheet;
