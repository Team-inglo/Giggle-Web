import { useState } from "react";
import MenuIcon from "../../../assets/icons/menu_icon.svg?react";
import { AddOption, DropDown, DropDownButton, Option, OptionButton, OptionText } from "./style";
import ScheduleAddJobModal from "../JobModal/ScheduleAddJobModal";
import { PartTimeList } from "../../../interfaces/calendar/partTime";
import ModalLayout from "../../Common/ModalLayout/ModalLayout";

const jobData: PartTimeList = [
  {
    id: 1,
    name: "알바1",
  },
  {
    id: 2,
    name: "알바2",
  },
  {
    id: 3,
    name: "알바3",
  },
  {
    id: 4,
    name: "알바4",
  },
];

const ScheduleAddDropDown = ({ setPartTimeId }: { setPartTimeId: (parTimeId: number) => void }) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);

  const addOption = () => {
    setIsModal(true);
  };

  const editOption = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    console.log(id);
    // 수정하기 모달 컴포넌트 호출하기
  };

  const openDropDown = () => {
    setIsDropDown(true);
  };

  const onClickOption = (id: number, name: string) => {
    setPartTimeId(id);
    setSelectedJob(name);
    setIsDropDown(false);
  };

  return (
    <>
      <DropDownButton onClick={openDropDown}>{selectedJob ?? "알바 선택 또는 생성"}</DropDownButton>
      {isDropDown && (
        <DropDown>
          <AddOption onClick={addOption}>+ 알바 생성하기</AddOption>
          {jobData.map((data) => (
            <Option key={data.id} onClick={() => onClickOption(data.id, data.name)}>
              <OptionText>{data.name}</OptionText>
              <OptionButton onClick={(e) => editOption(e, data.id)}>
                <MenuIcon />
              </OptionButton>
            </Option>
          ))}
        </DropDown>
      )}
      <ModalLayout isModal={isModal} setIsModal={setIsModal}>
        <ScheduleAddJobModal setIsModal={setIsModal} />
      </ModalLayout>
    </>
  );
};

export default ScheduleAddDropDown;
