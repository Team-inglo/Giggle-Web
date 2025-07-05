import {
  LaborContractFormField,
  LaborContractFormFields,
} from '@/constants/formFields';
import {
  DocumentType,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
  Phone,
} from '@/types/api/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { validateLaborContract } from '@/utils/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import {
  usePostStandardLaborContracts,
  usePutStandardLaborContracts,
} from '@/hooks/api/useDocument';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import Button from '../Common/Button';
import { initialLaborContractEmployeeInfo } from '@/constants/documents';

// 필수 검증 필드 목록
const REQUIRED_FIELDS: Array<keyof LaborContractEmployeeInfo | 'phone'> = [
  'first_name',
  'last_name',
  'phone',
  'address',
  'signature_base64',
];

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
  userOwnerPostId: number;
};

const LaborContractWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: LaborContractFormProps) => {
  const currentDocumentId = useParams().id;

  // useForm 훅 사용
  const methods = useForm<LaborContractEmployeeInfo>({
    values: document
      ? createInitialValues(document)
      : initialLaborContractEmployeeInfo,
  });

  const { handleSubmit } = methods;

  // 초기값 생성 함수
  function createInitialValues(
    doc: LaborContractDataResponse,
  ): LaborContractEmployeeInfo {
    return {
      ...doc.employee_information,
      phone: parsePhoneNumber(doc.employee_information.phone_number),
    };
  }

  const { mutate: postDocument, isPending: postPending } =
    usePostStandardLaborContracts(Number(userOwnerPostId)); // 작성된 근로계약서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutStandardLaborContracts(Number(currentDocumentId), userOwnerPostId); // 수정된 근로계약서 제출 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: LaborContractEmployeeInfo) => {
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
  const prepareDocumentForSubmission = (data: LaborContractEmployeeInfo) => {
    const { phone, ...rest } = data;
    return {
      ...rest,
      phone_number: formatPhoneNumber(phone as Phone),
    };
  };

  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderFormField = (field: LaborContractFormField) => {
    return renderField<LaborContractEmployeeInfo>({
      field,
      name: field.name as keyof LaborContractEmployeeInfo,
    });
  };

  // 폼이 비활성화되어야 하는지 여부
  const isFormDisabled = postPending || updatePending;

  return (
    <FormProvider {...methods}>
      <form
        className={`w-full flex flex-col px-4 ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="first-letter:[&>*:last-child]:mb-40 flex flex-col gap-4">
          {/* 유학생 작성 정보 */}
          {LaborContractFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
            </InputLayout>
          ))}
          {/* 고용주 정보가 있다면 표시 */}
          {document?.employer_information && (
            <EmployerInfoSection
              employ={document.employer_information}
              type={DocumentType.LABOR_CONTRACT}
            />
          )}
        </div>

        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            fieldNames={REQUIRED_FIELDS}
            validationFn={validateLaborContract}
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

export default LaborContractWriteForm;
