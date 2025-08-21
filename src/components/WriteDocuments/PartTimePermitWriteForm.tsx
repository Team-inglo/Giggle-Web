import {
  PartTimePermitFormField,
  PartTimePermitFormFields,
} from '@/constants/formFields';
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
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { initialPartTimePermitForm } from '@/constants/documents';
import { useCallback, useMemo, useState } from 'react';
import ProgressStepper from '@/components/Common/ProgressStepper';
import PageTitle from '@/components/Common/PageTitle';
import InfoBanner from '@/components/Common/InfoBanner';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { smartNavigate } from '@/utils/application';
import Icon from '@/components/Common/Icon';
import DocumentIcon from '@/assets/icons/Image Container.svg?react';

const Step1 = ({ setStep }: { setStep: (step: number) => void }) => {
  const REQUIRED_FIELDS: Array<keyof PartTimePermitFormRequest> = [
    'first_name',
    'last_name',
    'phone',
    'email',
  ];
  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderFormField = (field: PartTimePermitFormField) => {
    return renderField<PartTimePermitFormRequest>({
      field,
      name: field.name as keyof PartTimePermitFormRequest,
    });
  };
  return (
    <div className="w-full pb-6 flex flex-col">
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {PartTimePermitFormFields.step1.map((field) => (
          <InputLayout key={field.name} title={field.title}>
            {renderFormField(field)}
          </InputLayout>
        ))}
      </div>
      <BottomButtonPanel>
        {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
        <ValidatedSubmitButton
          fieldNames={REQUIRED_FIELDS}
          validationFn={(data) => validatePartTimePermit(data, 'step1')}
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

const Step2 = ({ setStep }: { setStep: (step: number) => void }) => {
  // 필수 검증 필드 목록
  const REQUIRED_FIELDS: Array<keyof PartTimePermitFormRequest> = [
    'major',
    'term_of_completion',
  ];
  const renderFormField = (field: PartTimePermitFormField) => {
    return renderField<PartTimePermitFormRequest>({
      field,
      name: field.name as keyof PartTimePermitFormRequest,
    });
  };
  return (
    <>
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {PartTimePermitFormFields.step2.map((field) => (
          <InputLayout key={field.name} title={field.title}>
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
            title="Previous"
            onClick={() => setStep(1)}
          />
          <ValidatedSubmitButton
            fieldNames={REQUIRED_FIELDS}
            validationFn={(data) => validatePartTimePermit(data, 'step2')}
            onClick={() => setStep(3)}
          >
            <Button
              type={Button.Type.PRIMARY}
              size={Button.Size.LG}
              isFullWidth
              title={'Next'}
            />
          </ValidatedSubmitButton>
        </div>
      </BottomButtonPanel>
    </>
  );
};

const Step3 = ({
  setStep,
  onSubmit,
  document,
}: {
  setStep: (step: number) => void;
  onSubmit: () => void;
  document: PartTimePermitData;
}) => {
  // 필수 검증 필드 목록
  const REQUIRED_FIELDS: Array<keyof PartTimePermitFormRequest> = [
    'first_name',
    'last_name',
    'phone',
    'major',
    'term_of_completion',
    'email',
  ];
  return (
    <>
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-6">
        {/* 고용주 정보가 있다면 표시 */}
        {document?.employer_information ? (
          <EmployerInfoSection
            employ={document.employer_information}
            type={DocumentType.PART_TIME_PERMIT}
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
            onClick={() => setStep(2)}
          />
          <ValidatedSubmitButton
            fieldNames={REQUIRED_FIELDS}
            validationFn={(data) => validatePartTimePermit(data, 'step3')}
            onClick={onSubmit}
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
    </>
  );
};

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
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
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
    usePostPartTimeEmployPermit({
      onSuccess: () => {
        setIsComplete(true);
      },
    }); // 작성된 문서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutPartTimeEmployPermit(Number(currentDocumentId), {
      onSuccess: () => {
        setIsComplete(true);
      },
    }); // 수정된 문서 제출 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = useCallback(
    (data: PartTimePermitFormRequest) => {
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
    },
    [isEdit, currentDocumentId, userOwnerPostId, updateDocument, postDocument],
  );

  // 데이터 제출 전 가공 함수
  const prepareDocumentForSubmission = (data: PartTimePermitFormRequest) => {
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
        return `Please check my information\nfor the work permit.`;
      case 2:
        return `Please enter my\neducational background`;
      case 3:
        if (document?.employer_information) {
          return 'This is the part\ncompleted by the employer.';
        }
        return `The employer will now\nfills out rest.`;
      default:
        return '';
    }
  }, [step]);

  return (
    <FormProvider {...methods}>
      {isComplete && (
        <CompleteButtonModal
          pageTitle="Form Completed"
          title="Part-time work permit form completed!"
          content="Your information has been securely saved."
          buttonContent="View progress"
          onClick={() =>
            smartNavigate(
              navigate,
              `/application-documents/${userOwnerPostId}`,
              { forceSkip: true },
            )
          }
        />
      )}
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
        className={`w-full flex flex-col ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col px-4 gap-4">
          {isEdit && (
            <InfoBanner
              size={InfoBannerSize.MD}
              hasIcon
              state={InfoBannerState.POSITIVE}
              text="Your previously entered information has been auto-filled."
            />
          )}
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} />}
          {step === 3 && (
            <Step3
              setStep={setStep}
              onSubmit={handleSubmit(handleNext)}
              document={document as PartTimePermitData}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PartTimePermitWriteForm;
