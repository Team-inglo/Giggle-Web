import {
  Input,
  InputBox,
  InputText,
  InputTitle,
  TotalSalaryBox,
  TotalSalaryText,
} from "./style";

const ScheduleEditInput = () => {
  return (
    <>
      <InputTitle>알바 선택</InputTitle>
      <Input />
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input />
        <InputText>원</InputText>
      </InputBox>
      <InputTitle>시작시간</InputTitle>
      <Input />
      <InputTitle>종료시간</InputTitle>
      <Input />
      <TotalSalaryBox>
        <TotalSalaryText>일급</TotalSalaryText>
        <TotalSalaryText>19,560원</TotalSalaryText>
      </TotalSalaryBox>
    </>
  );
};

export default ScheduleEditInput;
