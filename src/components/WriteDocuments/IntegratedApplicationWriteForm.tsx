import {
  IntegratedApplicationFormField,
  IntegratedApplicationFormFields,
  REQUIRED_FIELDS,
} from '@/constants/formFields';
import { IntegratedApplicationData, Phone } from '@/types/api/document';
import { useCallback, useMemo, useState } from 'react';
import { validateIntegratedApplication } from '@/utils/document';
import SearchSchoolBottomSheet from '@/components/Document/write/SearchSchoolBottomSheet';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import {
  usePostIntegratedApplicants,
  usePutIntegratedApplicants,
} from '@/hooks/api/useDocument';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { renderField } from '@/components/Document/write/renderField';
import Button from '@/components/Common/Button';
import { initialIntegratedApplication } from '@/constants/documents';
import ProgressStepper from '@/components/Common/ProgressStepper';
import PageTitle from '@/components/Common/PageTitle';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { smartNavigate } from '@/utils/application';

// 상수 정의
type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
  isEdit: boolean;
  userOwnerPostId: number;
};

const IntegratedApplicationWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: IntegratedApplicationFormProps) => {
  const currentDocumentId = useParams().id;
  const navigate = useNavigate();
  const [step, setStep] = useState(3);
  const [isComplete, setIsComplete] = useState(false);
  const methods = useForm<IntegratedApplicationData>({
    // 문서 편집일 시 기존 값 자동 입력
    values: document
      ? createInitialValues(document)
      : initialIntegratedApplication,
  });

  const { handleSubmit, getValues, setValue } = methods;

  // 초기값 생성 함수
  function createInitialValues(
    doc: IntegratedApplicationData,
  ): IntegratedApplicationData {
    return {
      ...doc,
      tele_phone: parsePhoneNumber(doc.tele_phone_number),
      cell_phone: parsePhoneNumber(doc.cell_phone_number),
      new_work_place_phone: parsePhoneNumber(doc.new_work_place_phone_number),
      school_phone: parsePhoneNumber(doc.school_phone_number),
    };
  }

  // 학교 선택 모달 출현 여부 관리 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postDocument, isPending: postPending } =
    usePostIntegratedApplicants(Number(userOwnerPostId), {
      onSuccess: () => {
        setIsComplete(true);
      },
    }); // 통합신청서 생성 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutIntegratedApplicants(Number(currentDocumentId), {
      onSuccess: () => {
        setIsComplete(true);
      },
    }); // 통합신청서 수정 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = useCallback(
    (data: IntegratedApplicationData) => {
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
  const prepareDocumentForSubmission = (data: IntegratedApplicationData) => {
    // 필요한 속성 추출
    const {
      birth,
      tele_phone,
      cell_phone,
      school_phone,
      new_work_place_phone,
      ...rest
    } = data;

    // 최종 문서 데이터 생성
    return {
      ...rest,
      birth: birth.replace(/\//g, '-'),
      tele_phone_number: formatPhoneNumber(tele_phone as Phone),
      cell_phone_number: formatPhoneNumber(cell_phone as Phone),
      school_phone_number: formatPhoneNumber(school_phone as Phone),
      new_work_place_phone_number: formatPhoneNumber(
        new_work_place_phone as Phone,
      ),
    };
  };

  // 폼 필드 렌더링 함수
  const renderFormField = (field: IntegratedApplicationFormField) => {
    return renderField<IntegratedApplicationData>({
      field,
      name: field.name as keyof IntegratedApplicationData,
      onSchoolNameClick:
        field.type === 'school_name' ? () => setIsModalOpen(true) : undefined,
    });
  };

  // 폼이 비활성화되어야 하는지 여부
  const isFormDisabled = postPending || updatePending;

  const title = useMemo(() => {
    switch (step) {
      case 1:
        return `Check your information\nfor the integrated application.`;

      case 2:
        return `Enter your\naddress and contact details.`;
      case 3:
        return `Enter your\nschool information.`;
      case 4:
        return `Now add your\nworkplace details.`;
      case 5:
        return `Final step!`;
      default:
        return '';
    }
  }, [step]);
  // 최종 ui 렌더링
  return (
    <FormProvider {...methods}>
      {isComplete && (
        <CompleteButtonModal
          pageTitle="Form Completed"
          title="Integrated application form completed!"
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
      <form
        className={`w-full flex flex-col ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="fixed top-14 left-0 w-full h-[0.625rem] flex items-center justify-center bg-surface-base z-10">
          <ProgressStepper totalCount={5} currentStep={step} />
        </div>
        <PageTitle title={title} />
        <div className="[&>*:last-child]:mb-28 flex flex-col gap-4 px-4">
          {/* 작성 폼 렌더링 */}
          {IntegratedApplicationFormFields[`step${step}`].map((field) => (
            <InputLayout key={field.name} title={field.title}>
              {renderFormField(field)}
            </InputLayout>
          ))}
        </div>

        {/* 학교 선택 모달 */}
        {isModalOpen && (
          <SearchSchoolBottomSheet
            newDocumentData={
              document || (getValues() as IntegratedApplicationData)
            }
            setNewDocumentData={(data: IntegratedApplicationData) => {
              setValue('school_name', data.school_name);
            }}
            isShowBottomsheet={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {/* 버튼 패널 */}
        <BottomButtonPanel>
          <div className="w-full flex gap-2">
            {step !== 1 && (
              <Button
                type={Button.Type.NEUTRAL}
                layout={Button.Layout.SMALL_BUTTON}
                size={Button.Size.LG}
                title="Back"
                onClick={() => setStep((prev) => prev - 1)}
              />
            )}
            {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
            <ValidatedSubmitButton
              fieldNames={REQUIRED_FIELDS[`step${step}`]}
              validationFn={(data) =>
                validateIntegratedApplication(data, `step${step}`)
              }
              onClick={
                step === 5
                  ? handleSubmit(handleNext)
                  : () => setStep((prev) => prev + 1)
              }
            >
              <Button
                type={Button.Type.PRIMARY}
                size={Button.Size.LG}
                isFullWidth
                title={step === 5 ? 'Save' : 'Next'}
              />
            </ValidatedSubmitButton>
          </div>
        </BottomButtonPanel>
      </form>
    </FormProvider>
  );
};

export default IntegratedApplicationWriteForm;
