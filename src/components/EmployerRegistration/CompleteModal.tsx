import styled from "styled-components";
import InfoIcon from "../../assets/icons/info_icon.svg?react";
import CloseIcon from "../../assets/icons/X.svg?react";

interface CustomModalPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
}

const ModalBackground = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 16px;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  max-width: 400px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  line-height: 22.4px;
  color: #1e1e1e;
  margin-left: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
`;

export const CompleteModal = ({
  visible,
  onClose,
  title,
}: CustomModalPopupProps) => {
  return (
    <ModalBackground visible={visible} onClick={onClose}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <InfoIcon />
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ButtonContainer onClick={onClose}>
          <CloseIcon />
        </ButtonContainer>
      </ModalView>
    </ModalBackground>
  );
};

export default CompleteModal;
