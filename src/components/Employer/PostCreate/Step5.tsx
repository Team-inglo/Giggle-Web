import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/formFields';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { Path } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';

const Step5 = ({
  onSubmit,
  onPrev,
}: {
  onSubmit: () => void;
  onPrev: () => void;
}) => {
  // 유효성 검사 함수
  const validatePostInfo = (data: JobPostingForm) => {
    const { body, images } = data;
    const { description } = body;

    return (
      description.trim() !== '' &&
      description.length <= 1000 &&
      images.length > 0
    );
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PostFormField) => {
    return renderField<JobPostingForm>({
      field,
      name: field.name as Path<JobPostingForm>,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // form 제출 로직을 부모 컴포넌트로 위임
    onSubmit();
  };

  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-6">
        {PostFormFields.step5.map((field) => (
          <InputLayout
            key={field.name}
            title={field.title}
            isOptional={field.isOptional}
          >
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        <div className="w-full flex gap-2">
          <Button
            type={Button.Type.NEUTRAL}
            layout={Button.Layout.SMALL_BUTTON}
            size={Button.Size.LG}
            title="이전"
            onClick={() => onPrev()}
          />
          <ValidatedSubmitButton
            fieldNames={POST_REQUIRED_FIELDS.step5 as (keyof JobPostingForm)[]}
            validationFn={validatePostInfo}
            onClick={handleSubmit}
          >
            <Button type={Button.Type.DISABLED} title="완료" size={Button.Size.LG} />
          </ValidatedSubmitButton>
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step5;
