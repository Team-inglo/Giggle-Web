import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useState } from 'react';
import EmployerPostDeleteBottomSheet from '@/components/Employer/PostDetail/EmployerPostDeleteBottomSheet';
import { useNavigate, useParams } from 'react-router-dom';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

const EmployerPostDetailButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenDeleteBottomSheet, setIsOpenDeleteBottomSheet] =
    useState<boolean>(false);
  return (
    <>
      <BottomButtonPanel>
        <div className="w-full flex justify-center gap-2 z-20">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#BDBDBD]"
            isBorder={false}
            title="Delete"
            onClick={() => setIsOpenDeleteBottomSheet(true)}
          />
          <Button
            type={buttonTypeKeys.CONTINUE}
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            isBorder={false}
            title="Edit"
            onClick={() =>
              navigate(`/employer/post/edit/${id}`, {
                state: {
                  isEdit: true,
                },
              })
            }
          />
        </div>
      </BottomButtonPanel>
      <EmployerPostDeleteBottomSheet
        isShowBottomsheet={isOpenDeleteBottomSheet}
        setIsShowBottomSheet={setIsOpenDeleteBottomSheet}
      />
    </>
  );
};

export default EmployerPostDetailButton;
