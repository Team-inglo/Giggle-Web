import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { buttonTypeKeys } from '@/constants/components';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { Path } from 'react-hook-form';
import { renderField } from '@/components/Document/write/renderField';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/formFields';
import { MINIMUM_WAGE } from '@/constants/wage';

const Step2 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const validatePostInfo = (data: JobPostingForm) => {
    const {
      body: { hourly_rate, work_period, work_day_times, address },
    } = data;

    const isFormValid =
      !Number.isNaN(Number(hourly_rate)) &&
      Number(hourly_rate) >= MINIMUM_WAGE[2025] &&
      work_period !== '' &&
      work_day_times?.length > 0 &&
      !!address.address_name &&
      !!address.address_detail &&
      address.address_detail.length <= 50;

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
    <div className="w-full h-full pb-6 flex flex-col">
      <>
        <div className="[&>*:last-child]:mb-40 flex flex-col gap-6">
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
              <Button title="다음" type={Button.Type.DISABLED} />
            </ValidatedSubmitButton>
          </div>
        </BottomButtonPanel>
      </>
    </div>
  );
};

export default Step2;
