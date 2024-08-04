import { Container, ContentBox, EditButton, Text, Title } from "./style";
import EditIcon from "../../../assets/icons/circle_pencil_icon.svg?react";
import { useNavigate } from "react-router-dom";

const ScheduleListDetail = () => {
  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate("/calendar/edit");
  };

  return (
    <Container>
      <ContentBox>
        <Title>10000원</Title>
        <Text>파리바게트</Text>
        <Text>9:00 ~ 11:00</Text>
      </ContentBox>
      <EditButton onClick={goToEditPage}>
        <EditIcon />
      </EditButton>
    </Container>
  );
};

export default ScheduleListDetail;
