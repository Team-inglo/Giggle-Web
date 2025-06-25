import {
  initialPartTimePermitForm,
  PartTimePermitFormField,
  PartTimePermitFormFields,
} from '@/constants/documents';
import {
  DocumentType,
  PartTimePermitData,
  PartTimePermitFormRequest,
  Phone,
} from '@/types/api/document';
import { validatePartTimePermit } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import {
  usePostPartTimeEmployPermit,
  usePutPartTimeEmployPermit,
} from '@/hooks/api/useDocument';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '../Common/Button';

// 필수 검증 필드 목록
const REQUIRED_FIELDS: Array<keyof PartTimePermitFormRequest> = [
  'first_name',
  'last_name',
  'phone',
  'major',
  'term_of_completion',
  'email',
];

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
  userOwnerPostId: number;
};

const PartTimePermitWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: PartTimePermitFormProps) => {
  const currentDocumentId = useParams().id;
  const methods = useForm<PartTimePermitFormRequest>({
    values: document
      ? createInitialValues(document)
      : initialPartTimePermitForm,
  });

  const { handleSubmit } = methods;

  // 초기값 생성 함수
  function createInitialValues(
    doc: PartTimePermitData,
  ): PartTimePermitFormRequest {
    return {
      ...doc.employee_information,
      phone: parsePhoneNumber(doc.employee_information.phone_number),
    };
  }

  const { mutate: postDocument, isPending: postPending } =
    usePostPartTimeEmployPermit(Number(userOwnerPostId)); // 작성된 문서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutPartTimeEmployPermit(Number(currentDocumentId), userOwnerPostId); // 수정된 문서 제출 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: PartTimePermitFormRequest) => {
    const finalDocument = prepareDocumentForSubmission(data);

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

  // 데이터 제출 전 가공 함수
  const prepareDocumentForSubmission = (data: PartTimePermitFormRequest) => {
    const { phone, ...rest } = data;
    return {
      ...rest,
      phone_number: formatPhoneNumber(phone as Phone),
    };
  };

  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderFormField = (field: PartTimePermitFormField) => {
    return renderField<PartTimePermitFormRequest>({
      field,
      name: field.name as keyof PartTimePermitFormRequest,
    });
  };

  // 폼이 비활성화되어야 하는지 여부
  const isFormDisabled = postPending || updatePending;

  return (
    <FormProvider {...methods}>
      <form
        className={`w-full p-4 flex flex-col ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="[&>*:last-child]:mb-24 flex flex-col gap-4">
          {PartTimePermitFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
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
            fieldNames={REQUIRED_FIELDS}
            validationFn={validatePartTimePermit}
            onClick={handleSubmit(handleNext)}
          >
            <Button
              type="large"
              bgColor="bg-surface-primary"
              fontColor="text-text-strong"
              title={'Complete'}
            />
          </ValidatedSubmitButton>
        </BottomButtonPanel>
      </form>
    </FormProvider>
  );
};

export default PartTimePermitWriteForm;
