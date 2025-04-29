import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EMPLOYER_PART_TIME_PERMIT_REQUIRED_FIELDS,
  initialPartTimePermitEmployerForm,
  PartTimePermitEmployerFormField,
  PartTimePermitEmployerFormFields,
  WorkPeriodInfo,
} from '@/constants/documents';
import {
  EmployerInformation,
  PartTimePermitData,
  Phone,
} from '@/types/api/document';
import { InputType } from '@/types/common/input';
import SignaturePad from '@/components/Document/write/SignaturePad';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { usePutPartTimeEmployPermitEmployer } from '@/hooks/api/useDocument';
import { useParams } from 'react-router-dom';
import { validateEmployerInformation } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import { Controller, useForm } from 'react-hook-form';
import DocumentFormInput from '@/components/Document/write/input/DocumentFormInput';
import PhoneNumberInput from '@/components/Document/write/input/PhoneNumberInput';
import AddressInput from '@/components/Document/write/input/AddressInput';
import {
  KeyValueDropdownInput,
  DropdownOption,
} from '@/components/Document/write/input/DropdownInput';
import DropdownInput from '@/components/Document/write/input/DropdownInput';

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
  const renderField = (field: PartTimePermitEmployerFormField) => {
    switch (field.type) {
      case 'text':
        return (
          <DocumentFormInput
            inputType={InputType.TEXT}
            placeholder={field.placeholder}
            canDelete={false}
            name={field.name as keyof EmployerInformation}
            control={control}
            format={field.format}
            description={field.description}
            isUnit={field.isUnit}
            unit={field.unit}
            isPrefix={field.isPrefix}
            prefix={field.prefix}
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
            label={field.label}
          />
        );
      case 'dropdown':
        if (field.name === 'work_period') {
          const workPeriodOptions: DropdownOption[] = Object.entries(
            WorkPeriodInfo,
          ).map(([key, value]) => ({
            key,
            name: (value as { name: string }).name,
          }));
          return (
            <KeyValueDropdownInput
              control={control}
              name={field.name as keyof EmployerInformation}
              placeholder={field.placeholder}
              options={workPeriodOptions}
            />
          );
        }
        return (
          <DropdownInput
            control={control}
            name={field.name as keyof EmployerInformation}
            placeholder={field.placeholder}
            options={field.options || []}
          />
        );
      case 'signature':
        return (
          <Controller
            control={control}
            name={field.name as keyof EmployerInformation}
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
          {PartTimePermitEmployerFormFields.map((field) => (
            <InputLayout key={field.name} title={field.title} isEssential>
              {renderField(field)}
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
