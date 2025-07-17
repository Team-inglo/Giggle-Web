import Button from '@/components/Common/Button';
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
            type={Button.Type.NEUTRAL}
            layout={Button.Layout.SMALL_BUTTON}
            size={Button.Size.LG}
            title="삭제"
            onClick={() => setIsOpenDeleteBottomSheet(true)}
          />
          <Button
            type={Button.Type.PRIMARY}
            layout={Button.Layout.FLEX_BUTTON}
            size={Button.Size.LG}
            isFullWidth
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
