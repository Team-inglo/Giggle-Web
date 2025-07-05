import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS,
  PartTimePermitEmployerFormField,
  PartTimePermitEmployerFormFields,
} from '@/constants/formFields';
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
import Button from '@/components/Common/Button';
import { FormProvider } from 'react-hook-form';
import { initialPartTimePermitEmployerForm } from '@/constants/documents';

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
  const methods = useForm<EmployerInformation>({
    values: document?.employer_information
      ? createInitialValues(document.employer_information)
      : initialPartTimePermitEmployerForm,
  });

  const { handleSubmit } = methods;

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
      name: field.name as keyof EmployerInformation,
    });
  };
  return (
    <FormProvider {...methods}>
      <div
        className={`w-full flex flex-col ${isPending ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="p-4 [&>*:last-child]:mb-40 flex flex-col gap-4">
          {/** 고용주 작성 정보 */}
          {PartTimePermitEmployerFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
            </InputLayout>
          ))}
        </div>
        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            fieldNames={EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS}
            validationFn={validateEmployerInformation}
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

export default EmployerPartTimePermitForm;
