import { useState } from "react";
import {
  Input,
  InputBox,
  InputText,
  InputTitle,
  JobList,
  JobSelect,
  SubmitButton,
} from "./style";
import { DateString, partTimeRecruitPostRequest, workType } from "./types";
import { handleInput } from "./utils";
interface Props {
  setPageNum: () => void;
  recruitInfo: partTimeRecruitPostRequest;
  setRecruitInfo: () => void;
}

const EmployerRegistrationInput = ({ setPageNum }: Props) => {
  const [recruitInfo, setRecruitInfo] = useState<partTimeRecruitPostRequest>({
    title: "",
    job_type: "ANY",
    dead_line: '2024-08-24',
    hourly_wage: 0,
    work_start_date: '2024-08-24',
    working_period: 0,
    work_days: [],
    age: 0,
    gender: "ANY",
    education: "ANY",
    number_recruited: 0,
    content: "",
  });
  const jobList = [
    { jobCode: "ANY", name: "전체" },
    { jobCode: "FOOD_INDUSTRY", name: "음식업보조" },
    { jobCode: "OFFICE", name: "사무" },
    { jobCode: "ENGLISH", name: "영어" },
    { jobCode: "TOURIST_INFORMATION", name: "관광안내" },
    { jobCode: "MANUDACTURING_INDUSTRY", name: "제조업" },
    { jobCode: "DAY_WORK", name: "일용근로" },
    { jobCode: "INTERNSHIP", name: "인턴" },
  ];
  const canGoNext =
    recruitInfo.title !== "" &&
    recruitInfo.job_type !== undefined &&
    recruitInfo.hourly_wage !== 0 &&
    recruitInfo.dead_line !== undefined;

  const handleClick = () => {
    canGoNext && setPageNum();
  };
  
  return (
    <>
      <InputBox>
        <InputTitle>공고 제목</InputTitle>
        <Input
          placeholder="제목 입력"
          value={recruitInfo.title}
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              title: e.currentTarget.value,
            })
          }
        />
      </InputBox>
      <InputBox>
        <InputTitle>업직종</InputTitle>
        <JobList>
          {jobList.map((job) => (
            <JobSelect
              onClick={() =>
                setRecruitInfo({
                  ...recruitInfo,
                  job_type: job.jobCode as workType,
                })
              }
              className={recruitInfo.job_type === job.jobCode ? "selected" : ""}
            >
              {job.name}
            </JobSelect>
          ))}
        </JobList>
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input
          placeholder="시급 입력"
          value={recruitInfo.hourly_wage}
          onChange={(e) =>
            handleInput(e.currentTarget.value, () =>
              setRecruitInfo({
                ...recruitInfo,
                hourly_wage: Number(e.currentTarget.value),
              })
            )
          }
        />
        <InputText>원</InputText>
      </InputBox>
      <InputBox>
        <InputTitle>공고 마감일자</InputTitle>
        <Input
          type="date"
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              dead_line: e.target.value as DateString,
            })
          }
        />
      </InputBox>
        <SubmitButton
          className={canGoNext ? "activated" : "disabled"}
          onClick={handleClick}
        >
          다음
        </SubmitButton>
    </>
  );
};

export default EmployerRegistrationInput;
