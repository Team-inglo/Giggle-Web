import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import ScheduleListPage from "./pages/ScheduleList/ScheduleListPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<ScheduleListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
