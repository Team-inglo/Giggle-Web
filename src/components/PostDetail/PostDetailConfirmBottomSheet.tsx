import SmallCheckIcon from '@/assets/icons/SmallCheckIcon.svg?react';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomSheet } from '@/components/Common/BottomSheet';

type PostDetailConfirmBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostDetailConfirmBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: PostDetailConfirmBottomSheetType) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="Are you sure you want to proceed with this application?" />
      <BottomSheet.Content>
        <p className="px-[1.625rem] pb-[0.25rem] button-14-semibold text-[#7872ED]">
          Based on the information in your resume, it might be difficult to
          obtain a part-time work permit for this job posting. Would you still
          like to proceed?
        </p>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-text-normal">
            You can update or create a new resume.
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.75rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-text-normal">
            Check out recommended job postings on the main page
          </p>
        </div>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title="Check other announcements"
          onClick={() => navigate('/search')}
        />
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Proceed with Application"
          onClick={() => navigate(`/post/apply/${id}`)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default PostDetailConfirmBottomSheet;
