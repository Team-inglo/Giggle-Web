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
            bgColor="bg-surface-secondary"
            fontColor="text-text-normal"
            isBorder={false}
            title="삭제"
            onClick={() => setIsOpenDeleteBottomSheet(true)}
          />
          <Button
            type={buttonTypeKeys.CONTINUE}
            bgColor="bg-surface-primary"
            fontColor="text-text-normal"
            isBorder={false}
            title="편집"
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
