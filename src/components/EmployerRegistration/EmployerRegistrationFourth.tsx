import { Dispatch, SetStateAction, useState } from "react";
import { partTimeRecruitPostRequest } from "./types";
import { InputBox, InputTitle, SubmitButton, TextArea } from "./style";
import CompleteModal from "./CompleteModal";
import { useNavigate } from "react-router-dom";
import { usePostRecruitPartTime } from "../../hooks/services/employer/mutations";

interface Props {
  setPageNum: () => void;
  recruitInfo: partTimeRecruitPostRequest;
  setRecruitInfo: Dispatch<SetStateAction<partTimeRecruitPostRequest>>;
}

const EmployerRegistrationFourth = ({ recruitInfo, setRecruitInfo }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canGoNext = recruitInfo.content !== "";
  const navigate = useNavigate();

  // service api 정의
  const mutation = usePostRecruitPartTime();

  const handleClick = () => {
    canGoNext && setIsModalOpen(true);

    // console.log(recruitInfo);

    // 아르바이트 공고 생성 api 실행?
    const body = recruitInfo;
    mutation.mutate(body, {
      onSuccess: (data) => {
        console.log("success: ", data);
      },
      onError: (error) => {
        // I will fire second!
        console.error("error: ", error.message);
      },
    });
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
      {
      <CompleteModal
        visible={isModalOpen}
        onClose={() => navigate("/")}
        title="등록 완료되었습니다."
      />
}
    </>
  );
};

export default EmployerRegistrationFourth;
