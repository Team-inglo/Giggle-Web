import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { buttonTypeKeys } from '@/constants/components';
import { validateDateInput } from '@/utils/information';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { Path } from 'react-hook-form';
import { renderField } from '@/components/Document/write/renderField';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/post';

const Step2 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const validatePostInfo = (data: JobPostingForm) => {
    const {
      body: { address, recruitment_dead_line },
    } = data;

    // 빈 문자열, null, 유효한 날짜 모두 처리
    const isDeadLineValid =
      recruitment_dead_line === null || // 상시모집
      (typeof recruitment_dead_line === 'string' &&
        (recruitment_dead_line !== '' &&
          validateDateInput(recruitment_dead_line)));

    const isFormValid =
      !!address.address_name &&
      !!address.address_detail &&
      address.address_detail.length <= 50 &&
      isDeadLineValid;

    return !!isFormValid;
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PostFormField) => {
    return renderField<JobPostingForm>({
      field,
      name: field.name as Path<JobPostingForm>,
    });
  };

  return (
    <div className="w-full h-full py-6 flex flex-col">
      <>
        <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
          {PostFormFields.step2.map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
            </InputLayout>
          ))}
        </div>
        <BottomButtonPanel>
          {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
          <div className="w-full flex gap-2">
            <Button
              type={buttonTypeKeys.BACK}
              bgColor="bg-surface-secondary"
              fontColor="text-text-normal"
              isBorder={false}
              title="이전"
              onClick={() => onPrev()}
            />
            <ValidatedSubmitButton
              fieldNames={
                POST_REQUIRED_FIELDS.step2 as (keyof JobPostingForm)[]
              }
              validationFn={validatePostInfo}
              onClick={() => onNext()}
            >
              <Button type="large" isBorder={false} title="다음" />
            </ValidatedSubmitButton>
          </div>
        </BottomButtonPanel>
      </>
    </div>
  );
};

export default Step2;
