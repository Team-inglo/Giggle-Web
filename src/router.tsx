import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import MapPage from './pages/Map/MapPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/map" element={<MapPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
