import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { buttonTypeKeys } from '@/constants/components';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/post';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { Path } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';

const Step3 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const validatePostInfo = (data: JobPostingForm) => {
    const {
      body: { education_level, age_restriction, recruitment_number, visa },
    } = data;
    const isFormValid =
      recruitment_number >= 0 &&
      (age_restriction === null ||
        (typeof age_restriction === 'number' && age_restriction !== 0)) &&
      education_level !== '' &&
      Array.isArray(visa) &&
      visa.length > 0;

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
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {PostFormFields.step3.map((field) => (
          <InputLayout key={field.name} title={field.title} isEssential>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
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
            fieldNames={POST_REQUIRED_FIELDS.step3 as (keyof JobPostingForm)[]}
            validationFn={validatePostInfo}
            onClick={() => onNext()}
          >
            <Button type="large" isBorder={false} title="다음" />
          </ValidatedSubmitButton>
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step3;
