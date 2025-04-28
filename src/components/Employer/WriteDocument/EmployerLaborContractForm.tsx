import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EMPLOYER_LABOR_CONTRACT_REQUIRED_FIELDS,
  initialLaborContractEmployerInfo,
  LaborContractEmployerFormField,
  LaborContractEmployerFormFields,
} from '@/constants/documents';
import {
  LaborContractDataResponse,
  LaborContractEmployerInfo,
  Phone,
} from '@/types/api/document';
import { InputType } from '@/types/common/input';
import SignaturePad from '@/components/Document/write/SignaturePad';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { usePutLaborContractEmployer } from '@/hooks/api/useDocument';
import { validateLaborContractEmployerInformation } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import DocumentFormInput from '@/components/Document/write/input/DocumentFormInput';
import PhoneNumberInput from '@/components/Document/write/input/PhoneNumberInput';
import AddressInput from '@/components/Document/write/input/AddressInput';
import DropdownInput from '@/components/Document/write/input/DropdownInput';
import RadioGroup from '@/components/Document/write/input/RadioGroup';
import CheckboxGroup from '@/components/Document/write/input/CheckboxGroup';
import WorkDayTimeWithRestInput from '@/components/Document/write/input/WorkDayTimeWithRestInput';

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
  const { control, handleSubmit } = useForm<LaborContractEmployerInfo>({
    defaultValues: document?.employer_information
      ? createInitialValues(document.employer_information)
      : initialLaborContractEmployerInfo,
  });

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
  const renderField = (field: LaborContractEmployerFormField) => {
    switch (field.type) {
      case 'text':
        return (
          <DocumentFormInput
            inputType={InputType.TEXT}
            placeholder={field.placeholder}
            canDelete={false}
            name={field.name as keyof LaborContractEmployerInfo}
            control={control}
            format={field.format}
            description={field.description}
            isUnit={field.isUnit}
            unit={field.unit}
            isPrefix={field.isPrefix}
            prefix={field.prefix}
          />
        );
      case 'textarea':
        return (
          <Controller
            control={control}
            name={field.name as keyof LaborContractEmployerInfo}
            render={({ field: { value, onChange } }) => (
              <div className="w-full self-stretch flex flex-col items-center justify-start body-3">
                <div className="w-full flex flex-col items-start justify-start">
                  <div className="w-full flex flex-col items-center justify-start">
                    <textarea
                      className="w-full h-[10vh] px-[1rem] py-[0.75rem] border border-border-alternative rounded-[0.75rem] body-2 outline-none resize-none"
                      placeholder={field.placeholder}
                      value={value as string}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            )}
          />
        );
      case 'phone':
        return <PhoneNumberInput control={control} name={field.name} />;
      case 'address':
        return (
          <AddressInput
            control={control}
            name={field.name as string}
            placeholder={field.placeholder}
          />
        );
      case 'work_schedule':
        return (
          <WorkDayTimeWithRestInput
            control={control}
            name={field.name as keyof LaborContractEmployerInfo}
          />
        );
      case 'dropdown':
        return (
          <DropdownInput
            control={control}
            name={field.name as keyof LaborContractEmployerInfo}
            placeholder={field.placeholder}
            options={field.options || []}
          />
        );
      case 'signature':
        return (
          <Controller
            control={control}
            name={field.name as keyof LaborContractEmployerInfo}
            render={({ field: { value, onChange } }) => (
              <div
                className={`w-full relative shadow rounded-xl box-border h-[120px] mb-40`}
              >
                <SignaturePad
                  onSave={onChange}
                  onReset={() => onChange('')}
                  previewImg={value as string}
                />
              </div>
            )}
          />
        );

      case 'radio': {
        return (
          <RadioGroup
            control={control}
            name={field.name}
            options={field.options || []}
            description={field.description}
            transformer={field.transformer}
          />
        );
      }
      case 'checkbox': {
        return (
          <CheckboxGroup
            control={control}
            name={field.name}
            options={field.chcekboxOptions || []}
            description={field.description}
            variant={field.variant}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`w-full flex flex-col ${isPending ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="p-4 [&>*:last-child]:mb-40 flex flex-col gap-4">
          {/** 고용주 작성 정보 */}
          {LaborContractEmployerFormFields.map((field) => (
            <InputLayout title={field.title} isEssential>
              {renderField(field)}
            </InputLayout>
          ))}
        </div>
        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            control={control}
            fieldNames={EMPLOYER_LABOR_CONTRACT_REQUIRED_FIELDS}
            validationFn={validateLaborContractEmployerInformation}
            buttonText={'작성완료'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default EmployerLaborContractForm;
