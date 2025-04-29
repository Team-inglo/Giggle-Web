import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS,
  initialPartTimePermitEmployerForm,
  PartTimePermitEmployerFormField,
  PartTimePermitEmployerFormFields,
} from '@/constants/documents';
import {
  EmployerInformation,
  PartTimePermitData,
  Phone,
} from '@/types/api/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { usePutPartTimeEmployPermitEmployer } from '@/hooks/api/useDocument';
import { useParams } from 'react-router-dom';
import { validateEmployerInformation } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { useForm } from 'react-hook-form';
import { renderField } from '@/components/Document/write/renderField';

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
  userOwnerPostId: number;
};

const EmployerPartTimePermitForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: PartTimePermitFormProps) => {
  const currentDocumentId = useParams().id;
  // useForm 훅 사용
  const { control, handleSubmit } = useForm<EmployerInformation>({
    values: document?.employer_information
      ? createInitialValues(document.employer_information)
      : initialPartTimePermitEmployerForm,
  });

  // 초기값 생성 함수
  function createInitialValues(doc: EmployerInformation): EmployerInformation {
    return {
      ...doc,
      phone: parsePhoneNumber(doc.phone_number as string),
    };
  }

  // 입력 완료 시 제출
  const { mutate: putDocument, isPending } = usePutPartTimeEmployPermitEmployer(
    Number(currentDocumentId),
    Number(userOwnerPostId),
  );

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: EmployerInformation) => {
    const finalDocument = prepareDocumentForSubmission(data);

    const payload = {
      id: Number(isEdit ? currentDocumentId : userOwnerPostId),
      document: finalDocument,
    };

    putDocument(payload);
  };

  // 데이터 제출 전 가공 함수
  const prepareDocumentForSubmission = (data: EmployerInformation) => {
    const { phone, ...rest } = data;
    return {
      ...rest,
      phone_number: formatPhoneNumber(phone as Phone),
    };
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: PartTimePermitEmployerFormField) => {
    return renderField<EmployerInformation>({
      field,
      control,
      name: field.name as keyof EmployerInformation,
    });
  };
  return (
    <>
      <div
        className={`w-full flex flex-col ${isPending ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="p-4 [&>*:last-child]:mb-40 flex flex-col gap-4">
          {/** 고용주 작성 정보 */}
          {PartTimePermitEmployerFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title} isEssential>
              {renderFormField(field)}
            </InputLayout>
          ))}
        </div>
        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            control={control}
            fieldNames={EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS}
            validationFn={validateEmployerInformation}
            buttonText={'작성완료'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default EmployerPartTimePermitForm;
