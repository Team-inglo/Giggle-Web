import { BackButton, Container } from "./style";
import BackIcon from "../../../assets/icons/back_icon.svg?react";
import { useNavigate } from "react-router-dom";

const BackBtnHeader = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <BackIcon />
      </BackButton>
    </Container>
  );
};

export default BackBtnHeader;
