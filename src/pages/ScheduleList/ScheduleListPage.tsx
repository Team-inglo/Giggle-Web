import ScheduleListSalary from "../../components/ScheduleList/Salary/ScheduleListSalary";
import MainHeader from "../../components/Common/MainHeader/MainHeader";
import Menu from "../../components/Common/Menu/Menu";
import { Container } from "./style";

const ScheduleListPage = () => {
  return (
    <>
      <Container>
        <MainHeader />
        <ScheduleListSalary />
      </Container>
      <Menu />
    </>
  );
};

export default ScheduleListPage;
