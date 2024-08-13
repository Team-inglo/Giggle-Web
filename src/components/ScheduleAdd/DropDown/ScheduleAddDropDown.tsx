import { useState } from "react";
import MenuIcon from "../../../assets/icons/menu_icon.svg?react";
import { AddOption, DropDown, DropDownButton, Option, OptionButton, OptionText } from "./style";
import ScheduleAddJobModal from "../JobModal/ScheduleAddJobModal";

const jobData = [
  {
    id: 1,
    name: "알바1",
    money: 10000,
    color: "#fff",
  },
  {
    id: 2,
    name: "알바2",
    money: 10000,
    color: "#fff",
  },
  {
    id: 3,
    name: "알바3",
    money: 10000,
    color: "#fff",
  },
  {
    id: 4,
    name: "알바4",
    money: 10000,
    color: "#fff",
  },
];

const ScheduleAddDropDown = () => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);

  const addOption = () => {
    setIsModal(true);
  };

  const editOption = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    console.log(id);
  };

  const openDropDown = () => {
    setIsDropDown(true);
  };

  const onClickOption = (job: string) => {
    setSelectedJob(job);
    setIsDropDown(false);
  };

  return (
    <>
      <DropDownButton onClick={openDropDown}>{selectedJob ?? "알바 선택 또는 생성"}</DropDownButton>
      {isDropDown && (
        <DropDown>
          <AddOption onClick={addOption}>+ 알바 생성하기</AddOption>
          {jobData.map((data) => (
            <Option key={data.id} onClick={() => onClickOption(data.name)}>
              <OptionText>{data.name}</OptionText>
              <OptionButton onClick={(e) => editOption(e, data.id)}>
                <MenuIcon />
              </OptionButton>
            </Option>
          ))}
        </DropDown>
      )}
      <ScheduleAddJobModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default ScheduleAddDropDown;
