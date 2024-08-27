import { Dispatch, SetStateAction, useState } from "react";
import { partTimeRecruitPostRequest } from "./types";
import { InputBox, InputTitle, SubmitButton, TextArea } from "./style";
import CompleteModal from "./CompleteModal";
import { useNavigate } from "react-router-dom";

interface Props {
  setPageNum: () => void;
  recruitInfo: partTimeRecruitPostRequest;
  setRecruitInfo: Dispatch<SetStateAction<partTimeRecruitPostRequest>>;
}

const EmployerRegistrationFourth = ({ recruitInfo, setRecruitInfo }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canGoNext = recruitInfo.content !== "";
  const navigate = useNavigate();
  const handleClick = () => {
    canGoNext && setIsModalOpen(true);
  };
  return (
    <>
      <InputBox>
        <InputTitle>상세 요강</InputTitle>
        <TextArea
          placeholder="알바생에게 전달할 상세 내용을 입력해주세요."
          value={recruitInfo.content}
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              content: e.currentTarget.value,
            })
          }
        />
      </InputBox>
      <SubmitButton
        className={canGoNext ? "activated" : "disabled"}
        onClick={handleClick}
      >
        완료
      </SubmitButton>
      <CompleteModal
        visible={isModalOpen}
        onClose={() => navigate("/")}
        title="등록 완료되었습니다."
      />
    </>
  );
};

export default EmployerRegistrationFourth;
