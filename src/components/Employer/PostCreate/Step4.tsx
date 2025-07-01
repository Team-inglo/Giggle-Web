import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { buttonTypeKeys } from '@/constants/components';
import {
  POST_REQUIRED_FIELDS,
  PostFormField,
  PostFormFields,
} from '@/constants/formFields';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { Path } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import { isValidPhoneNumber } from '@/utils/information';

const Step4 = ({
  onNext,
  onPrev,
  isEdit,
}: {
  onNext: () => void;
  onPrev: () => void;
  isEdit?: boolean;
}) => {
  // 유효성 검사 함수
  const validatePostInfo = (data: JobPostingForm) => {
    const { body } = data;
    const { recruiter_name, recruiter_email, recruiter_phone } = body;

    // 이메일 유효성 검사 정규식
    const basicEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 전화번호 유효성 검사
    const isPhoneValid = recruiter_phone && isValidPhoneNumber(recruiter_phone);
    const isFormValid =
      recruiter_name !== '' &&
      basicEmailRegex.test(recruiter_email) &&
      isPhoneValid;

    return !!isFormValid;
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PostFormField) => {
    // 이미지 업로드 필드에 isEdit 속성 전달
    const updatedField = field.name === 'images' ? { ...field, isEdit } : field;

    return renderField<JobPostingForm>({
      field: updatedField,
      name: field.name as Path<JobPostingForm>,
    });
  };

  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-6">
        {PostFormFields.step4.map((field) => (
          <InputLayout key={field.name} title={field.title}>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        <div className="w-full flex gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-text-normal"
            title="이전"
            onClick={() => onPrev()}
          />
          <ValidatedSubmitButton
            fieldNames={POST_REQUIRED_FIELDS.step4 as (keyof JobPostingForm)[]}
            validationFn={validatePostInfo}
            onClick={() => onNext()}
          >
            <Button type={Button.Type.LARGE} title="다음" />
          </ValidatedSubmitButton>
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step4;
