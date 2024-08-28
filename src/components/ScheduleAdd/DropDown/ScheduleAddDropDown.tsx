import { useState } from "react";
import MenuIcon from "../../../assets/icons/menu_icon.svg?react";
import { AddOption, DropDown, DropDownButton, Option, OptionButton, OptionText } from "./style";
import { PartTimeList } from "../../../interfaces/calendar/partTime";
import ModalLayout from "../../Common/ModalLayout/ModalLayout";
import ScheduleAddJobCreateModal from "../JobModal/ScheduleAddJobCreateModal";
import ScheduleAddJobEditModal from "../JobModal/ScheduleAddJobEditModal";
import { useGetPartTimeList } from "../../../hooks/services/calendar/queries";

// const jobData: PartTimeList = [
//   {
//     id: 1,
//     name: "알바1",
//   },
//   {
//     id: 2,
//     name: "알바2",
//   },
//   {
//     id: 3,
//     name: "알바3",
//   },
//   {
//     id: 4,
//     name: "알바4",
//   },
// ];

const ScheduleAddDropDown = ({ onClickPartTime }: { onClickPartTime: (parTimeId: number) => void }) => {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editPartTimeId, setEditPartTimeId] = useState<number | null>(null);

  const { isLoading, error, data } = useGetPartTimeList();

  if (isLoading) return <div></div>;
  if (error) return <div>에러남: {error.message}</div>;
  const jobData: PartTimeList = data?.data?.data;

  const onClickShowEditModal = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setEditPartTimeId(id);
    setShowEditModal(true);
  };

  const onClickShowAddModal = () => {
    setShowAddModal(true);
  };

  const openDropDown = () => {
    setIsDropDown(true);
  };

  const onClickOption = (id: number, name: string) => {
    onClickPartTime(id);
    setSelectedJob(name);
    setIsDropDown(false);
  };

  return (
    <>
      <DropDownButton onClick={openDropDown}>{selectedJob ?? "알바 선택 또는 생성"}</DropDownButton>
      {isDropDown && (
        <DropDown>
          <AddOption onClick={onClickShowAddModal}>+ 알바 생성하기</AddOption>
          {jobData?.map((data) => (
            <Option key={data.id} onClick={() => onClickOption(data.id, data.name)}>
              <OptionText>{data.name}</OptionText>
              <OptionButton onClick={(e) => onClickShowEditModal(e, data.id)}>
                <MenuIcon />
              </OptionButton>
            </Option>
          ))}
          <ModalLayout isModal={showEditModal} setIsModal={setShowEditModal}>
            {editPartTimeId && <ScheduleAddJobEditModal setIsModal={setShowEditModal} partTimeId={editPartTimeId} />}
          </ModalLayout>
        </DropDown>
      )}
      <ModalLayout isModal={showAddModal} setIsModal={setShowAddModal}>
        <ScheduleAddJobCreateModal setIsModal={setShowAddModal} />
      </ModalLayout>
    </>
  );
};

export default ScheduleAddDropDown;
