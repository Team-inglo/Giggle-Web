import { CalenderTitle, ColorInput, Input, InputBox, InputText, InputTitle, PaletteColor, PaletteImg, SubmitButton } from "./style";
import "react-color-palette/css";
import ScheduleAddCalendar from "../Calendar/ScheduleAddCalendar";
import ScheduleAddDropDown from "../DropDown/ScheduleAddDropDown";
import { useState } from "react";
import ScheduleAddCalendarDays from "../Calendar/ScheduleAddCalendarDays";
import paletteImg from "../../../assets/images/palette_image.png";
import { PartTimeDetail } from "../../../interfaces/calendar/partTime";
import { Calendar, Schedule, TimeScheduleList } from "../../../interfaces/calendar/totalSchedule";
import moment from "moment";
import { parseArrToDate, parseArrToTime } from "../../../utils/dateTimeUtil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostSchedules } from "../../../hooks/services/calendar/mutations";

// const schedules: Schedule[] = [
//   {
//     id: 3,
//     partTimeName: "파리바게트",
//     hourlyRate: 11000,
//     startAt: [2024, 8, 6, 15, 0],
//     endAt: [2024, 8, 6, 16, 0],
//   },
//   {
//     id: 4,
//     partTimeName: "파리바게트",
//     hourlyRate: 11000,
//     startAt: [2024, 8, 13, 7, 0],
//     endAt: [2024, 8, 13, 12, 0],
//   },
//   {
//     id: 5,
//     partTimeName: "파리바게트",
//     hourlyRate: 11000,
//     startAt: [2024, 8, 20, 7, 0],
//     endAt: [2024, 8, 20, 12, 0],
//   },
//   {
//     id: 6,
//     partTimeName: "파리바게트",
//     hourlyRate: 11000,
//     startAt: [2024, 8, 27, 7, 0],
//     endAt: [2024, 8, 27, 12, 0],
//   },
// ];

// const partTimes: PartTimeDetail[] = [
//   {
//     id: 1,
//     name: "알바1",
//     hourlyRate: 10000,
//     color: "#FFB65A",
//   },
//   {
//     id: 2,
//     name: "알바2",
//     hourlyRate: 11000,
//     color: "#7DD0B6",
//   },
//   {
//     id: 3,
//     name: "알바3",
//     hourlyRate: 12000,
//     color: "#c17dd0",
//   },
//   {
//     id: 4,
//     name: "알바4",
//     hourlyRate: 13000,
//     color: "#b6d07d",
//   },
// ];

const ScheduleAddInput = () => {
  const navigate = useNavigate();

  const mutation = usePostSchedules();

  const today = new Date();

  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  const [partTimeId, setPartTimeId] = useState<number | null>(null); // 선택된 알바 id
  const [partTimeData, setPartTimeData] = useState<PartTimeDetail | null>(null); // 선택된 알바 상세 정보
  const [showCalendarDays, setShowCalendarDays] = useState<boolean>(false);
  //const [prevSchedules, setPrevSchedules] = useState<Calendar[]>([]); // 한 번이라도 조회한 달의 데이터
  const [changedSchedules, setChangedSchedules] = useState<Calendar[]>([]); // 이거 어떻게 변경할 지를 정해야 함!

  const getPartTimeCalendar = async (prevSchdule: Calendar[], partTimeId: number, _year: number, _month: number) => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
    };

    const params = {
      year: _year,
      month: _month,
    };

    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules/${partTimeId}`, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        console.log("success:", res.data);
        const newSchedule = res?.data?.data?.map((value: Schedule) => {
          const date = parseArrToDate(value.startAt);
          const startAt = parseArrToTime(value.startAt);
          const endAt = parseArrToTime(value.endAt);
          return { date: date, startAt: startAt, endAt: endAt };
        });
        setChangedSchedules([...prevSchdule, ...newSchedule]);
      })
      .catch((err) => console.error(err));
  };

  // 캘린더 년,월 변경 시 새로 조회하기
  const onChangeCalendarView = (newDate: Date) => {
    if (!partTimeId) return;
    // 이미 한번이라도 수정(조회)한 적 있으면 해당 달은 불러오면 안 됨...!!!! -> 바로 changedSchedules 값 전달하기
    const newYear = moment(newDate).format("YYYY");
    const newMonth = moment(newDate).format("MM");
    if (!changedSchedules.some((value) => value.date.split("-")[0] === newYear && value.date.split("-")[1] === newMonth)) {
      // 새로 조회하기...
      getPartTimeCalendar(changedSchedules, partTimeId, Number(newYear), Number(newMonth));
    }
    setYear(Number(newYear));
    setMonth(Number(newMonth));
  };

  const closeCalendarDays = () => {
    setShowCalendarDays(false);
  };

  const openCalendarDays = () => {
    setShowCalendarDays(true);
  };

  const onClickSubmit = () => {
    if (!partTimeId) return;
    const newSchedule: TimeScheduleList = changedSchedules?.map((value: Calendar) => {
      const startAt = `${value.date}T${value.startAt}:00`;
      const endAt = `${value.date}T${value.endAt}:00`;
      return { start_at: startAt, end_at: endAt };
    });

    mutation.mutate(
      { partTimeId: partTimeId, schedules: newSchedule },
      {
        onSuccess: () => {
          // I will fire second!
          navigate(`/calendar`);
        },
        onError: (error) => {
          // I will fire second!
          console.error("error: ", error.message);
        },
      }
    );
  };

  // 특정 상황에서 UseQuery 쓰는 법 추후에 찾아보기!
  const getPartTimeDetail = async (id: number | null) => {
    if (!id) return;

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
    };
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times/${id}`, {
        headers: headers,
      })
      .then((res) => {
        setPartTimeData(res?.data?.data);
        getPartTimeCalendar([], id, year, month);
      })
      .catch((err) => console.log(err));
  };

  const onClickPartTime = (id: number) => {
    setPartTimeId(id);
    getPartTimeDetail(id);
  };

  // useEffect(() => {
  //   const calendarData = schedules.map((value) => {
  //     return { date: parseArrToDate(value.startAt), startAt: parseArrToTime(value.startAt), endAt: parseArrToTime(value.endAt) };
  //   });
  //   setChangedSchedules(calendarData);
  // }, []);

  return (
    <>
      <InputBox>
        <InputTitle>알바 선택</InputTitle>
        <ScheduleAddDropDown onClickPartTime={onClickPartTime} />
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input placeholder="시급 입력" readOnly value={partTimeData?.hourlyRate || ""} />
        <InputText>원</InputText>
      </InputBox>
      <ColorInput>
        <InputTitle>대표 색상</InputTitle>
        {partTimeData?.color ? <PaletteColor color={partTimeData?.color}></PaletteColor> : <PaletteImg src={paletteImg} />}
      </ColorInput>
      <CalenderTitle>날짜 선택하기</CalenderTitle>
      {showCalendarDays ? (
        <ScheduleAddCalendarDays
          closeCalendarDays={closeCalendarDays}
          onChangeCalendarView={onChangeCalendarView}
          changedSchedules={changedSchedules}
          setChangedSchedules={setChangedSchedules}
          color={partTimeData?.color || null}
        />
      ) : (
        <ScheduleAddCalendar
          openCalendarDays={openCalendarDays}
          onChangeCalendarView={onChangeCalendarView}
          changedSchedules={changedSchedules}
          setChangedSchedules={setChangedSchedules}
          color={partTimeData?.color || null}
        />
      )}
      <SubmitButton onClick={onClickSubmit}>근로 기록하기</SubmitButton>
    </>
  );
};

export default ScheduleAddInput;
