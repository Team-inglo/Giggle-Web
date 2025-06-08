import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SmallCheckIcon from '@/assets/icons/SmallCheckIcon.svg?react';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useNavigate, useParams } from 'react-router-dom';

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
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[2rem] heading-20-semibold text-[#1E1926]">
          Are you sure you want to proceed with this application?
        </h3>
        <p className="px-[1.625rem] pb-[0.25rem] button-14-semibold text-[#7872ED]">
          Based on the information in your resume, it might be difficult to
          obtain a part-time work permit for this job posting. Would you still
          like to proceed?
        </p>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-[#464646]">
            You can update or create a new resume.
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.75rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-[#464646]">
            Check out recommended job postings on the main page
          </p>
        </div>
      </div>
      <div className="w-full py-[3rem] flex flex-col gap-[0.5rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Check other announcements"
          onClick={() => navigate('/search')}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Proceed with Application"
          onClick={() => navigate(`/post/apply/${id}`)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default PostDetailConfirmBottomSheet;
