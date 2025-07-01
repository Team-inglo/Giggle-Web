import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EMPLOYER_LABOR_CONTRACT_REQUIRED_FIELDS,
  LaborContractEmployerFormField,
  LaborContractEmployerFormFields,
} from '@/constants/formFields';
import {
  LaborContractDataResponse,
  LaborContractEmployerInfo,
  Phone,
} from '@/types/api/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { usePutLaborContractEmployer } from '@/hooks/api/useDocument';
import { validateLaborContractEmployerInformation } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import Button from '@/components/Common/Button';
import { initialLaborContractEmployerInfo } from '@/constants/documents';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
  userOwnerPostId: number;
};

const EmployerLaborContractForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: LaborContractFormProps) => {
  const currentDocumentId = useParams().id;
  // useForm 훅 사용
  const methods = useForm<LaborContractEmployerInfo>({
    values: document?.employer_information
      ? createInitialValues(document.employer_information)
      : initialLaborContractEmployerInfo,
  });

  const { handleSubmit } = methods;

  // 초기값 생성 함수
  function createInitialValues(
    doc: LaborContractEmployerInfo,
  ): LaborContractEmployerInfo {
    return {
      ...doc,
      phone: parsePhoneNumber(doc.phone_number),
    };
  }

  // 입력 완료 시 제출
  const { mutate: putDocument, isPending } = usePutLaborContractEmployer(
    Number(currentDocumentId),
    Number(userOwnerPostId),
  );

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: LaborContractEmployerInfo) => {
    const finalDocument = prepareDocumentForSubmission(data);

    const payload = {
      id: Number(isEdit ? currentDocumentId : userOwnerPostId),
      document: finalDocument,
    };

    putDocument(payload);
  };

  // 데이터 제출 전 가공 함수
  const prepareDocumentForSubmission = (data: LaborContractEmployerInfo) => {
    const { phone, wage_rate, ...rest } = data;
    return {
      ...rest,
      phone_number: formatPhoneNumber(phone as Phone),
      wage_rate: Number(wage_rate),
    };
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: LaborContractEmployerFormField) => {
    return renderField<LaborContractEmployerInfo>({
      field,
      name: field.name as keyof LaborContractEmployerInfo,
    });
  };

  return (
    <FormProvider {...methods}>
      <div
        className={`w-full flex flex-col ${isPending ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="p-4 [&>*:last-child]:mb-40 flex flex-col gap-4">
          {/** 고용주 작성 정보 */}
          {LaborContractEmployerFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
            </InputLayout>
          ))}
        </div>
        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            fieldNames={EMPLOYER_LABOR_CONTRACT_REQUIRED_FIELDS}
            validationFn={validateLaborContractEmployerInformation}
            onClick={handleSubmit(handleNext)}
          >
            <Button
              type="large"
              bgColor="bg-surface-primary"
              fontColor="text-text-strong"
              title={'작성완료'}
            />
          </ValidatedSubmitButton>
        </BottomButtonPanel>
      </div>
    </FormProvider>
  );
};

export default EmployerLaborContractForm;
