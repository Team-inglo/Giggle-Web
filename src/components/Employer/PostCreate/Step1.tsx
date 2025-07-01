import InputLayout from '@/components/WorkExperience/InputLayout';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/formFields';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { Path } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import { validateDateInput } from '@/utils/information';

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const validatePostInfo = (data: JobPostingForm) => {
    const {
      body: { title, job_category, recruitment_dead_line },
    } = data;

    const isFormValid =
      title !== '' && job_category !== '' && recruitment_dead_line !== '';
    // 빈 문자열, null, 유효한 날짜 모두 처리
    const isDeadLineValid =
      recruitment_dead_line === null || // 상시모집
      (typeof recruitment_dead_line === 'string' &&
        recruitment_dead_line !== '' &&
        validateDateInput(recruitment_dead_line));
    return isFormValid && isDeadLineValid;
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PostFormField) => {
    return renderField<JobPostingForm>({
      field,
      name: field.name as Path<JobPostingForm>,
    });
  };

  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-6">
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
          <Button title="다음" isFullWidth type={Button.Type.PRIMARY} />
        </ValidatedSubmitButton>
      </BottomButtonPanel>
    </div>
  );
};

export default Step1;
