import { initialPartTimePermitForm } from '@/constants/documents';
import {
  DocumentType,
  PartTimePermitData,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { InputType } from '@/types/common/input';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { validatePartTimePermit } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import {
  usePostPartTimeEmployPermit,
  usePutPartTimeEmployPermit,
} from '@/hooks/api/useDocument';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DocumentFormInput from '../Document/write/input/DocumentFormInput';
import ValidatedSubmitButton from '../Document/write/ValidatedSubmitButton';
import PhoneNumberInput from '../Document/write/input/PhoneNumberInput';
import DropdownInput from '../Document/write/input/DropdownInput';
import {
  PartTimePermitFormProperty,
  PartTimePermitFormInfo,
} from '@/constants/documents';

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
  userOwnerPostId: number;
};

// 폼 필드 타입 정의
type FormField = {
  type: 'text' | 'phone' | 'dropdown';
  name: keyof PartTimePermitFormRequest | 'phone';
  title: string;
  placeholder: string;
  options?: string[];
  format?: string;
};

const PartTimePermitWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: PartTimePermitFormProps) => {
  const currentDocumentId = useParams().id;
  const { control, handleSubmit } = useForm<PartTimePermitFormRequest>({
    values: document
      ? {
          first_name: document.employee_information.first_name,
          last_name: document.employee_information.last_name,
          major: document.employee_information.major,
          term_of_completion: document.employee_information.term_of_completion,
          email: document.employee_information.email,
          phone: parsePhoneNumber(document.employee_information.phone_number),
          phone_number: document.employee_information.phone_number,
        }
      : initialPartTimePermitForm,
  });
  const { mutate: postDocument, isPending: postPending } =
    usePostPartTimeEmployPermit(Number(userOwnerPostId)); // 작성된 문서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutPartTimeEmployPermit(Number(currentDocumentId), userOwnerPostId); // 수정된 문서 제출 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: PartTimePermitFormRequest) => {
    const finalDocument = {
      ...data,
      phone_number: formatPhoneNumber(
        data.phone as { start: string; middle: string; end: string },
      ),
    };
    delete finalDocument.phone;
    const payload = {
      id: Number(isEdit ? currentDocumentId : userOwnerPostId),
      document: finalDocument,
    };

    if (isEdit) {
      updateDocument(payload);
      return;
    }
    postDocument(payload);
  };

  // 폼 필드 정의
  const formFields: FormField[] = [
    {
      type: 'text',
      name: PartTimePermitFormProperty.FIRST_NAME,
      title: PartTimePermitFormInfo[PartTimePermitFormProperty.FIRST_NAME].name,
      placeholder: 'First Name',
    },
    {
      type: 'text',
      name: PartTimePermitFormProperty.LAST_NAME,
      title: PartTimePermitFormInfo[PartTimePermitFormProperty.LAST_NAME].name,
      placeholder: 'Last Name',
    },
    {
      type: 'phone',
      name: 'phone',
      title:
        PartTimePermitFormInfo[PartTimePermitFormProperty.PHONE_NUMBER].name,
      placeholder: '', // PhoneNumberInput에서 자체적으로 처리
    },
    {
      type: 'text',
      name: PartTimePermitFormProperty.MAJOR,
      title: PartTimePermitFormInfo[PartTimePermitFormProperty.MAJOR].name,
      placeholder: 'Department (major)',
    },
    {
      type: 'dropdown',
      name: PartTimePermitFormProperty.TERM_OF_COMPLETION,
      title:
        PartTimePermitFormInfo[PartTimePermitFormProperty.TERM_OF_COMPLETION]
          .name,
      placeholder: 'Term of completion',
      options: Array.from({ length: 12 }, (_, i) => String(i + 1)),
    },
    {
      type: 'text',
      name: PartTimePermitFormProperty.EMAIL,
      title: PartTimePermitFormInfo[PartTimePermitFormProperty.EMAIL].name,
      placeholder: 'email@email.com',
    },
  ];

  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <DocumentFormInput
            inputType={InputType.TEXT}
            placeholder={field.placeholder}
            canDelete={false}
            name={field.name as keyof PartTimePermitFormRequest}
            control={control}
            format={field.format}
          />
        );
      case 'phone':
        return (
          <PhoneNumberInput control={control} name={field.name as 'phone'} />
        );
      case 'dropdown':
        return (
          <DropdownInput
            control={control}
            name={field.name as keyof PartTimePermitFormRequest}
            placeholder={field.placeholder}
            options={field.options || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form
        className={`w-full p-4 flex flex-col ${postPending || updatePending ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleNext);
        }}
      >
        <div className="[&>*:last-child]:mb-24 flex flex-col gap-4">
          {formFields.map((field) => (
            <InputLayout key={field.name} title={field.title} isEssential>
              {renderField(field)}
            </InputLayout>
          ))}

          {/* 고용주 정보가 있다면 표시 */}
          {document?.employer_information && (
            <EmployerInfoSection
              employ={document.employer_information}
              type={DocumentType.PART_TIME_PERMIT}
            />
          )}
        </div>

        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            control={control}
            fieldNames={[
              'first_name',
              'last_name',
              'phone',
              'major',
              'term_of_completion',
              'email',
            ]}
            validationFn={validatePartTimePermit}
            buttonText={isEdit ? 'Modify' : 'Create'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </form>
    </>
  );
};

export default PartTimePermitWriteForm;
