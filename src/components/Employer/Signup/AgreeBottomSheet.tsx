import ArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Button from '@/components/Common/Button';
import Icon from '@/components/Common/Icon';
import { signInputTranslation } from '@/constants/translation';
import { TermType } from '@/types/api/users';
import { isEmployer } from '@/utils/signup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckIconWithFill from '@/assets/icons/CheckIconWithFill.svg?react';
import { BottomSheet } from '@/components/Common/BottomSheet';

type AgreeBottomSheetProps = {
  isShowBottomsheet: boolean;
  onPolicyPreview: (termType: TermType) => void;
  onNext: Dispatch<SetStateAction<boolean>>;
};

type AgreementItemProps = {
  isChecked: boolean;
  onToggle: () => void;
  label: string;
  onPreview: () => void;
};

const AgreementItem = ({
  isChecked,
  onToggle,
  label,
  onPreview,
}: AgreementItemProps) => {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <div className="flex items-center justify-start py-0.5">
        <div
          className={`w-6 h-6 relative flex items-center justify-center`}
          onClick={onToggle}
        >
          <Icon
            icon={CheckIconWithFill}
            fillColor={
              isChecked ? 'text-surface-invert' : 'text-surface-tertiary'
            }
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-1">
        <div className="w-full flex items-center">{label}</div>
        <div onClick={onPreview}>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

const AgreeBottomSheet = ({
  isShowBottomsheet,
  onPolicyPreview,
  onNext,
}: AgreeBottomSheetProps) => {
  const { pathname } = useLocation();
  const [essentialAgreeList, setEssentialAgreeList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const isEmployerUser = isEmployer(pathname);

  const agreementItems = [
    {
      label: signInputTranslation.serviceTerms[isEmployerUser],
      termType:
        pathname === '/signup'
          ? TermType.PERSONAL_SERVICE_TERMS
          : TermType.ENTERPRISE_SERVICE_TERMS,
    },
    {
      label: signInputTranslation.privacyPolicy[isEmployerUser],
      termType: TermType.PRIVACY_POLICY,
    },
    {
      label: signInputTranslation.locationBasedTerms[isEmployerUser],
      termType: TermType.LOCATION_BASED_TERMS,
    },
  ];

  const handleCheckboxChange = (index: number) => {
    setEssentialAgreeList((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      return newList;
    });
  };

  const handleNext = () => {
    if (essentialAgreeList.slice(0, 3).includes(false)) {
      return;
    }
    onNext(false);
  };

  return (
    <BottomSheet
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <BottomSheet.Header
        title={signInputTranslation.essentialAgree[isEmployerUser]}
      />
      <BottomSheet.Content>
        <div className="w-full flex flex-col items-start justify-start gap-6 text-left body-14-regular">
          <div className="w-full relative flex flex-col items-start justify-center gap-2 pb-2 text-left body-16-regular border-b border-[#F4F4F6]">
            <div className="flex items-start justify-center gap-3">
              <div className="flex items-center justify-start py-0.5">
                <div
                  className={`w-6 h-6 relative flex items-center justify-center`}
                  onClick={() => {
                    setEssentialAgreeList(
                      essentialAgreeList.includes(false)
                        ? [true, true, true, true]
                        : [false, false, false, false],
                    );
                  }}
                >
                  <Icon
                    icon={CheckIconWithFill}
                    fillColor={
                      essentialAgreeList.includes(false)
                        ? 'text-surface-tertiary'
                        : 'text-surface-invert'
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="w-full flex items-center">
                  {signInputTranslation.essentialAgreeContent[isEmployerUser]}
                </div>
                <div className="w-full caption-12-regular text-text-assistive flex items-center">
                  {signInputTranslation.essentialAgreeAssistive[isEmployerUser]}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-4 text-left body-14-regular">
            {agreementItems.map((item, index) => (
              <AgreementItem
                key={index}
                isChecked={essentialAgreeList[index]}
                onToggle={() => handleCheckboxChange(index)}
                label={item.label}
                onPreview={() => onPolicyPreview(item.termType)}
              />
            ))}
          </div>
        </div>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup>
        <Button
          type={
            essentialAgreeList.slice(0, 3).includes(false)
              ? Button.Type.DISABLED
              : Button.Type.PRIMARY
          }
          size={Button.Size.LG}
          isFullWidth
          title={signInputTranslation.agree[isEmployerUser]}
          onClick={handleNext}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default AgreeBottomSheet;
