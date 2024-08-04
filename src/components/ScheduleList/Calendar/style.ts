import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Container = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  .react-calendar {
    width: 100%;
    border: none;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.colors.black};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    /* padding: 0 1.5rem; */
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 700;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.colors.gray};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    //flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    /* background-color: ${(props) => props.theme.colors.lightGray};
    border-radius: 1rem; */
    background-color: ${(props) => props.theme.colors.white};
    abbr {
      color: ${(props) => props.theme.colors.mainColor};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  /* .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: red;
    padding: 0;
  } */

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    /* background-color: ${(props) => props.theme.colors.mainColor}; */
    abbr {
      color: ${(props) => props.theme.colors.mainColor};
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.colors.lightGray};
    border-radius: 1rem;
  }
`;

export const CalendarStyled = styled(Calendar)``;

export const DotStyled = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;
