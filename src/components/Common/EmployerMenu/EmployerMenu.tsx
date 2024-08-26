import { Container, MenuBox, MenuText } from "./style";

import DocumentIcon from "../../../assets/icons/document_icon.svg?react";
import NoticeIcon from "../../../assets/icons/notice_icon.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { menuItem } from "../../../interfaces/common/menuItem";

const EmployerMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenu = useMemo<menuItem[]>(
    () => [
      {
        name: "서류",
        src: "/document-employer",
        icon: <DocumentIcon />,
      },
      {
        name: "공고",
        src: "/notice-employer",
        icon: <NoticeIcon />,
      },
    ],
    []
  );

  return (
    <Container>
      {mainMenu.map((item, idx) => (
        <MenuBox
          key={`${item.name}_${idx}`}
          $currentmenu={location.pathname === item.src ? true : false}
          onClick={() => navigate(item.src)}
        >
          {item.icon}
          <MenuText>{item.name}</MenuText>
        </MenuBox>
      ))}
    </Container>
  );
};

export default EmployerMenu;
