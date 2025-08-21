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
import Button from '@/components/Common/Button';
import { initialLaborContractEmployeeInfo } from '@/constants/documents';
import Icon from '@/components/Common/Icon';
import DocumentIcon from '@/assets/icons/Image Container.svg?react';
import InfoBanner from '@/components/Common/InfoBanner';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';
import { useMemo, useState } from 'react';
import ProgressStepper from '@/components/Common/ProgressStepper';
import PageTitle from '@/components/Common/PageTitle';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
  userOwnerPostId: number;
};

const Step1 = ({ setStep }: { setStep: (step: number) => void }) => {
  const REQUIRED_FIELDS: Array<keyof LaborContractEmployeeInfo | 'phone'> = [
    'first_name',
    'last_name',
    'phone',
    'address',
  ];
  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderFormField = (field: LaborContractFormField) => {
    return renderField<LaborContractEmployeeInfo>({
      field,
      name: field.name as keyof LaborContractEmployeeInfo,
    });
  };
  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {LaborContractFormFields.step1.map((field) => (
          <InputLayout key={field.name} title={field.title}>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
        <ValidatedSubmitButton
          fieldNames={REQUIRED_FIELDS}
          validationFn={(data) => validateLaborContract(data, 'step1')}
          onClick={() => setStep(2)}
        >
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title={'Next'}
          />
        </ValidatedSubmitButton>
      </BottomButtonPanel>
    </div>
  );
};

const Step2 = ({
  setStep,
  document,
}: {
  setStep: (step: number) => void;
  document: LaborContractDataResponse;
}) => {
  // 필수 검증 필드 목록
  return (
    <>
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {/* 고용주 정보가 있다면 표시 */}
        {document?.employer_information ? (
          <EmployerInfoSection
            employ={document.employer_information}
            type={DocumentType.LABOR_CONTRACT}
          />
        ) : (
          <div className="flex h-48 bg-surface-disabled items-center justify-center rounded-lg">
            <Icon icon={DocumentIcon} />
          </div>
        )}
      </div>
      <BottomButtonPanel>
        <div className="w-full flex gap-2">
          <Button
            type={Button.Type.NEUTRAL}
            layout={Button.Layout.SMALL_BUTTON}
            size={Button.Size.LG}
            title="Previous"
            onClick={() => setStep(1)}
          />
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title={'Next'}
            onClick={() => setStep(3)}
          />
        </div>
      </BottomButtonPanel>
    </>
  );
};

const Step3 = ({
  setStep,
  onSubmit,
}: {
  setStep: (step: number) => void;
  onSubmit: () => void;
}) => {
  const REQUIRED_FIELDS: Array<keyof LaborContractEmployeeInfo | 'phone'> = [
    'signature_base64',
  ];
  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderFormField = (field: LaborContractFormField) => {
    return renderField<LaborContractEmployeeInfo>({
      field,
      name: field.name as keyof LaborContractEmployeeInfo,
    });
  };
  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {LaborContractFormFields.step3.map((field) => (
          <InputLayout key={field.name} title={field.title}>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
        <div className="w-full flex gap-2">
          <Button
            type={Button.Type.NEUTRAL}
            layout={Button.Layout.SMALL_BUTTON}
            size={Button.Size.LG}
            title="Previous"
            onClick={() => setStep(2)}
          />
          <ValidatedSubmitButton
            fieldNames={REQUIRED_FIELDS}
            validationFn={(data) => validateLaborContract(data, 'step3')}
            onClick={() => onSubmit}
          >
            <Button
              type={Button.Type.PRIMARY}
              size={Button.Size.LG}
              isFullWidth
              title={'Save document'}
            />
          </ValidatedSubmitButton>
        </div>
      </BottomButtonPanel>
    </div>
  );
};

const LaborContractWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: LaborContractFormProps) => {
  const currentDocumentId = useParams().id;
  const [step, setStep] = useState(1);

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

  // 폼이 비활성화되어야 하는지 여부
  const isFormDisabled = postPending || updatePending;

  const title = useMemo(() => {
    switch (step) {
      case 1:
        return `Please check my information\nfor the labor contract.`;

      case 2:
        if (document?.employer_information) {
          return 'This is the part\ncompleted by the employer.';
        }
        return `The employer will now\nfills out rest.`;
      case 3:
        return `Complete the document\nwith your signature.`;
      default:
        return '';
    }
  }, [step]);

  return (
    <FormProvider {...methods}>
      <div className="fixed top-14 left-0 w-full h-[0.625rem] flex items-center justify-center bg-surface-base z-10">
        <ProgressStepper totalCount={3} currentStep={step} />
      </div>
      <PageTitle
        title={title}
        content={
          step === 3 && !document?.employer_information
            ? 'When you click the submit button,\nthe document will be sent to the employer.'
            : ''
        }
      />
      <form
        className={`w-full flex flex-col px-4 ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {isEdit && (
            <InfoBanner
              size={InfoBannerSize.MD}
              hasIcon
              state={InfoBannerState.POSITIVE}
              text="Your previously entered information has been auto-filled."
            />
          )}
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && (
            <Step2
              setStep={setStep}
              document={document as LaborContractDataResponse}
            />
          )}
          {step === 3 && (
            <Step3 setStep={setStep} onSubmit={handleSubmit(handleNext)} />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default LaborContractWriteForm;
