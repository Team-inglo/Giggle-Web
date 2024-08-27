import { useState } from "react";
import { NoticeContainer, Tab, TabContainer } from "./style";
import EmployerDocumentNotice from "../Notice/EmployerDocumentNotice";
import { EmployerNotice } from "../../../interfaces/document/employerNotice";

type EmployerDocumentTabProp = {
  completeNoticeList: EmployerNotice[];
  ongoingNoticeList: EmployerNotice[];
};

const EmployerDocumentTab = ({ completeNoticeList, ongoingNoticeList }: EmployerDocumentTabProp) => {
  // 진행 중과 완료 메뉴 존재
  const [showOngoingMenu, setShowOngoingMenu] = useState<boolean>(true);

  const onClickOngoingMenu = () => {
    setShowOngoingMenu(true);
  };

  const onClickCompleteMenu = () => {
    setShowOngoingMenu(false);
  };

  return (
    <>
      <TabContainer>
        <Tab $isSelected={showOngoingMenu} onClick={onClickOngoingMenu}>
          진행 중({ongoingNoticeList.length})
        </Tab>
        <Tab $isSelected={!showOngoingMenu} onClick={onClickCompleteMenu}>
          완료({completeNoticeList.length})
        </Tab>
      </TabContainer>
      <NoticeContainer>
        {showOngoingMenu
          ? ongoingNoticeList.map((value) => <EmployerDocumentNotice key={value.announcementId} noticeData={value} />)
          : completeNoticeList.map((value) => <EmployerDocumentNotice key={value.announcementId} noticeData={value} />)}
      </NoticeContainer>
    </>
  );
};

export default EmployerDocumentTab;
