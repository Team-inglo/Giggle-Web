import ModalLayout from "../../Common/ModalLayout/ModalLayout";
import { Container, Input, InputBox, InputText, InputTitle, SubmitButton, Title } from "./style";

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleAddJobModal = ({ isModal, setIsModal }: ModalProps) => {
  const onClickSubmit = () => {
    setIsModal(false);
  };
  return (
    <ModalLayout isModal={isModal} setIsModal={setIsModal}>
      <Container>
        <Title>알바 생성</Title>
        <InputBox>
          <InputTitle>알바 이름</InputTitle>
          <Input placeholder="이름" />
        </InputBox>
        <InputBox>
          <InputTitle>시급</InputTitle>
          <Input placeholder="시급" />
          <InputText>원</InputText>
        </InputBox>
        <SubmitButton onClick={onClickSubmit}>알바 생성하기</SubmitButton>
      </Container>
    </ModalLayout>
  );
};

export default ScheduleAddJobModal;
