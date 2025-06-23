import InputLayout from '@/components/WorkExperience/InputLayout';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/post';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { MINIMUM_HOURLY_RATE } from '@/utils/document';
import { Path } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';

const Step1 = ({
  onNext,
}: {
  onNext: () => void;
}) => {
  const validatePostInfo = (data: JobPostingForm) => {
    const {
      body: { title, job_category, work_day_times, hourly_rate, work_period },
    } = data;

    const isFormValid =
      title !== '' &&
      job_category !== '' &&
      work_day_times?.length > 0 &&
      work_period !== '' &&
      !Number.isNaN(Number(hourly_rate)) &&
      hourly_rate >= MINIMUM_HOURLY_RATE;

    return isFormValid;
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PostFormField) => {
    return renderField<JobPostingForm>({
      field,
      name: field.name as Path<JobPostingForm>,
    });
  };

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {PostFormFields.step1.map((field) => (
          <InputLayout key={field.name} title={field.title}>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <ValidatedSubmitButton
          fieldNames={POST_REQUIRED_FIELDS.step1 as (keyof JobPostingForm)[]}
          validationFn={validatePostInfo}
          onClick={() => onNext()}
        >
          <Button type="large" isBorder={false} title="다음" />
        </ValidatedSubmitButton>
      </BottomButtonPanel>
    </div>
  );
};

export default Step1;
