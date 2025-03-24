import { useNavigate } from 'react-router-dom';
import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useState } from 'react';
import EmployerApplicantContactBottomSheet from './EmployerApplicantContactBottomSheet';
import { findCurrentStep } from '@/utils/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { APPLICATION_STEP } from '@/constants/application';
import SuccessIcon from '@/assets/icons/ApplicationDetail/SuccessIcon.svg?react';
import RejectIcon from '@/assets/icons/ApplicationDetail/RejectIcon.svg?react';

type EmployerApplicantDetailButtonPropsType = {
  applicant_id: number;
  step: ApplicationStepType;
};

const EmployerApplicantDetailButton = ({
  applicant_id,
  step,
}: EmployerApplicantDetailButtonPropsType) => {
  const navigate = useNavigate();
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const renderCurrentStepButton = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={'bg-primary-normal'}
            fontColor="text-surface-invert"
            title="이력서 확인하기"
            isBorder={false}
            onClick={() =>
              navigate(`/employer/applicant/${applicant_id}/resume/accept`)
            }
          />
        );
      case 2:
        return (
          <>
            <Button
              type={buttonTypeKeys.LARGE}
              bgColor={'bg-primary-normal'}
              fontColor="text-surface-invert"
              title="면접 일정 조율하기"
              isBorder={false}
              onClick={() => setIsShowBottomSheet(true)}
            />
            <EmployerApplicantContactBottomSheet
              isShowBottomsheet={isShowBottomsheet}
              setIsShowBottomSheet={setIsShowBottomSheet}
            />
          </>
        );
      case 3:
        return (
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-primary-normal'}
            fontColor="text-surface-invert"
            title="신청 서류 확인하기"
            isBorder={false}
            onClick={() =>
              navigate(`/employer/applicant/document-detail/${applicant_id}`)
            }
          />
        );
      case 4:
        return (
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-surface-secondary'}
            fontColor="text-text-disabled"
            title="담당자에게 서류를 검토받고 있어요"
            isBorder={false}
          />
        );
      case 5:
        return (
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-surface-secondary'}
            fontColor="text-text-disabled"
            title="담당자에게 서류를 검토받고 있어요"
            isBorder={false}
          />
        );
      case 6:
        return (
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-surface-secondary'}
            fontColor="text-text-disabled"
            title="지원자 결과를 기다리고 있어요"
            isBorder={false}
          />
        );
      case 7:
        return (
          <>
            {step === APPLICATION_STEP.APPLICATION_SUCCESS ? (
              <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#0066FF]/10 rounded">
                <SuccessIcon />
                <p className="caption text-text-success">
                  시간제취업허가 성공, 지원자와 이후 일정을 이야기해보세요.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
                <RejectIcon />
                <p className="caption text-text-error">
                  시간제취업허가 실패, 원인을 찾고 재신청 할 수 있습니다.
                </p>
              </div>
            )}
          </>
        );
      default:
        return (
          <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
            <RejectIcon />
            <p className="caption text-text-error">
              {step === APPLICATION_STEP.PENDING
                ? '2주 이상 대기 중입니다.'
                : '이력서를 거절했습니다.'}
            </p>
          </div>
        );
    }
  };

  return (
    <section className="w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem]">
      {renderCurrentStepButton(findCurrentStep(step))}
    </section>
  );
};

export default EmployerApplicantDetailButton;
