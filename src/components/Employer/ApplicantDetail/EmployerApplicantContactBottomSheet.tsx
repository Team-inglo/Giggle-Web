import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import PhoneIcon from '@/assets/icons/PhoneIcon.svg?react';

type EmployerApplicantContactBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployerApplicantContactBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: EmployerApplicantContactBottomSheetType) => {
  const onClickComplete = () => {
    // 6.11 호출
    window.location.reload();
  };
  return (
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[0.75rem] head-2 text-[#1E1926]">
          지원자에게 연락하여
          <br />
          면접을 진행해보세요.
        </h3>
        <p className="mb-[1.25rem] body-3 text-[#656565]">
          지원자와 지원 조건을 확인해보세요
        </p>
        <div className="mt-[0.5rem] mb-[1.5rem] max-w-[15.438rem] w-full px-[1rem] flex items-center gap-[0.75rem] py-[0.75rem] rounded-[1rem] bg-[#F4F4F9]">
          <div className="p-[0.375rem] bg-white rounded-[0.5rem]">
            <PhoneIcon />
          </div>
          <div>
            <h5 className="button-2 text-black text-start">지원자명</h5>
            <p className="caption-1 text-[#656565] text-start">전화번호</p>
          </div>
        </div>
        <p className="body-3 text-[#7872ED]">
          면접을 완료했다면 버튼을 클릭해 다음 단계로 넘어가세요.
        </p>
      </div>
      <div className="w-full py-[1.5rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title={'면접 완료'}
          onClick={onClickComplete}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default EmployerApplicantContactBottomSheet;