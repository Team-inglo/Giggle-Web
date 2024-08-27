import { Dispatch, SetStateAction, useState } from "react";
import {
  DayList,
  DayTitle,
  Input,
  InputBox,
  InputBoxContainer,
  InputText,
  InputTitle,
  JobSelect,
  SubmitButton,
  WorkDayBox,
  WorkDayRow,
  WorkTime,
  WorkTimeBox,
} from "./style";
import {
  DateString,
  partTimeRecruitPostRequest,
  TimeString,
  workDay,
} from "./types";
import { handleInput, handleTimeInput } from "./utils";
interface Props {
  setPageNum: () => void;
  recruitInfo: partTimeRecruitPostRequest;
  setRecruitInfo: Dispatch<SetStateAction<partTimeRecruitPostRequest>>;
}

const EmployerRegistrationInputSecond = ({
  setPageNum,
  recruitInfo,
  setRecruitInfo,
}: Props) => {
  const weekDays = [
    { weekCode: "MONDAY", name: "월" },
    { weekCode: "TUESDAY", name: "화" },
    { weekCode: "WEDNESDAY", name: "수" },
    { weekCode: "THURSDAY", name: "목" },
    { weekCode: "FRIDAY", name: "금" },
    { weekCode: "SATURDAY", name: "토" },
    { weekCode: "SUNDAY", name: "일" },
  ];
  const [newWorkDays, setNewWorkDays] = useState<workDay[]>([
    {
      day: "MONDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "TUESDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "WEDNESDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "THURSDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "FRIDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "SATURDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
    {
      day: "SUNDAY",
      workStartTime: undefined,
      workEndTime: undefined,
    },
  ]);
  const [current, setCurrent] = useState<number>(0);
  const canGoNext =
    recruitInfo.workStartDate !== undefined &&
    recruitInfo.workingPeriod !== undefined &&
    !newWorkDays.every(
      (day) => day.workStartTime == undefined || day.workEndTime == undefined
    );

  const handleClick = () => {
    canGoNext && setPageNum();
  };
  return (
    <>
      <InputBox>
        <InputTitle>근무 시작일자</InputTitle>
        <Input
          type="date"
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              workStartDate: e.target.value as DateString,
            })
          }
        />
      </InputBox>
      <InputBox>
        <InputTitle>근무 기간</InputTitle>
        <Input
          placeholder="근무 기간 선택"
          value={recruitInfo.workingPeriod}
          onChange={(e) =>
            handleInput(e.currentTarget.value, () =>
              setRecruitInfo({
                ...recruitInfo,
                workingPeriod: Number(e.currentTarget.value),
              })
            )
          }
        />
        <InputText>개월</InputText>
      </InputBox>
      <InputBox>
        <InputTitle>요일</InputTitle>
        <DayList>
          {weekDays.map((day, idx: number) => (
            <JobSelect
              key={idx}
              onClick={() => setCurrent(idx)}
              className={
                newWorkDays[idx].workEndTime !== undefined &&
                newWorkDays[idx].workStartTime !== undefined
                  ? "selected"
                  : ""
              }
              id={current === idx ? "current" : ""}
            >
              {day.name}
            </JobSelect>
          ))}
        </DayList>
      </InputBox>
      <InputBoxContainer>
        <InputBox>
          <InputTitle>근무 시작시간</InputTitle>
          <Input
            value={newWorkDays[current].workStartTime as string}
            placeholder="00:00"
            onChange={(e) =>
              handleTimeInput(e.target.value, () => {
                const updatedWorkDays = [...newWorkDays];
                updatedWorkDays[current] = {
                  ...updatedWorkDays[current],
                  workStartTime: e.target.value as TimeString,
                };
                setNewWorkDays(updatedWorkDays);
              })
            }
          />
        </InputBox>
        <InputBox>
          <InputTitle>근무 종료시간</InputTitle>
          <Input
            value={newWorkDays[current].workEndTime as string}
            placeholder="00:00"
            onChange={(e) =>
              handleTimeInput(e.target.value, () => {
                const updatedWorkDays = [...newWorkDays];
                updatedWorkDays[current] = {
                  ...updatedWorkDays[current],
                  workEndTime: e.target.value as TimeString,
                };
                setNewWorkDays(updatedWorkDays);
              })
            }
          />
        </InputBox>
      </InputBoxContainer>
      <WorkDayRow>
        {weekDays.map((day) => (
          <WorkDayBox>
            <DayTitle>{day.name}</DayTitle>
          </WorkDayBox>
        ))}
      </WorkDayRow>
      <WorkDayRow>
        {newWorkDays.map((day) => (
          <WorkTimeBox>
            <WorkTime>{day.workStartTime}</WorkTime>
            <WorkTime>{day.workEndTime}</WorkTime>
          </WorkTimeBox>
        ))}
      </WorkDayRow>

      <SubmitButton
        className={canGoNext ? "activated" : "disabled"}
        onClick={handleClick}
      >
        다음
      </SubmitButton>
    </>
  );
};

export default EmployerRegistrationInputSecond;
