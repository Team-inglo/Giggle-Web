import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import ArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Button from '@/components/Common/Button';
import { TermType } from '@/types/api/users';
import { Dispatch, SetStateAction, useState } from 'react';

type AgreeModalInnerProps = {
  onPolicyPreview: (termType: TermType) => void;
  onNext: Dispatch<SetStateAction<boolean>>;
  accountType: 'USER' | 'EMPLOYER';
};

const AgreeModalInner = ({
  onPolicyPreview,
  onNext,
  accountType,
}: AgreeModalInnerProps) => {
  const [essentialAgreeList, setEssentialAgreeList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const handleCheckboxChange = (index: number) => {
    setEssentialAgreeList((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      return newList;
    });
  };
  const handleNext = () => {
    onNext(false);
  };
  return (
    <div className="w-full flex flex-col items-center justify-start gap-[2.5rem] text-left body-16-regular">
      <div className="relative w-full flex flex-col items-start justify-start gap-y-6 text-left text-[#33384b] heading-20-semibold">
        <div className="w-full flex flex-col items-start justify-start px-1.5">
          <div className="w-full flex items-center ">약관동의*</div>
        </div>
        <div className="w-full border-b border-[#F4F4F6]"></div>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-6 text-left body-14-regular">
        <div className="w-full relative flex flex-col items-start justify-center gap-2 pb-2 text-left body-16-regular border-b border-[#F4F4F6]">
          <div className="flex items-start justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList.includes(false) ? 'bg-white' : 'bg-[#1e1926]'} border-[#F4F4F9]`}
                onClick={() => {
                  setEssentialAgreeList(
                    essentialAgreeList.includes(false)
                      ? [true, true, true, true]
                      : [false, false, false, false],
                  );
                }}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="w-full flex items-center">전체동의</div>
              <div className="w-full caption-12-regular text-[#bdbdbd] flex items-center">
                선택항목 포함 모든 약관에 동의합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-4 text-left body-14-regular">
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[0] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(0)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 서비스 이용약관동의
              </div>
              <div
                onClick={() =>
                  onPolicyPreview(
                    accountType === 'USER'
                      ? TermType.PERSONAL_SERVICE_TERMS
                      : TermType.ENTERPRISE_SERVICE_TERMS,
                  )
                }
              >
                <ArrowIcon />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[1] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(1)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 개인정보 수집 및 이용 동의
              </div>
              <div onClick={() => onPolicyPreview(TermType.PRIVACY_POLICY)}>
                <ArrowIcon />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <div className="flex items-center justify-start py-0.5">
              <div
                className={`w-6 h-6 relative flex items-center justify-center border ${essentialAgreeList[2] ? 'bg-[#1e1926]' : 'bg-white'} border-[#F4F4F9]`}
                onClick={() => handleCheckboxChange(2)}
              >
                <CheckIcon />
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <div className="w-full flex items-center">
                (필수) 위치정보 이용동의
              </div>
              <div
                onClick={() => onPolicyPreview(TermType.LOCATION_BASED_TERMS)}
              >
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="large"
        bgColor={
          essentialAgreeList.slice(0, 3).includes(false)
            ? 'bg-[#F4F4F9]'
            : 'bg-[#fef387]'
        }
        fontColor={
          essentialAgreeList.slice(0, 3).includes(false) ? '' : 'text-[#222]'
        }
        isBorder={false}
        title="Agree"
        onClick={
          essentialAgreeList.slice(0, 3).includes(false)
            ? undefined
            : handleNext
        }
      />
    </div>
  );
};

export default AgreeModalInner;
