import { BackButton, Container } from "./style";
import BackIcon from "../../../assets/icons/back_icon.svg?react";

const BackBtnHeader = () => {
  return (
    <Container>
      <BackButton>
        <BackIcon />
      </BackButton>
    </Container>
  );
};

export default BackBtnHeader;
