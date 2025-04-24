import {
  initialLaborContractEmployeeInfo,
  LaborContractEmployeeFormInfo,
  LaborContractEmployeeInfoProperty,
} from '@/constants/documents';
import {
  DocumentType,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
  Phone,
} from '@/types/api/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { InputType } from '@/types/common/input';
import { validateLaborContract } from '@/utils/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import SignaturePad from '@/components/Document/write/SignaturePad';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import {
  usePostStandardLaborContracts,
  usePutStandardLaborContracts,
} from '@/hooks/api/useDocument';
import InputLayout from '../WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DocumentFormInput from '../Document/write/input/DocumentFormInput';
import PhoneNumberInput from '../Document/write/input/PhoneNumberInput';
import ValidatedSubmitButton from '../Document/write/ValidatedSubmitButton';
import AddressInput from '../Document/write/input/AddressInput';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
  userOwnerPostId: number;
};

// 폼 필드 타입 정의
type FormField = {
  type: 'text' | 'phone' | 'address' | 'signature';
  name: keyof LaborContractEmployeeInfo | 'phone';
  title: string;
  placeholder: string;
  options?: string[];
  format?: string;
};

const LaborContractWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: LaborContractFormProps) => {
  const currentDocumentId = useParams().id;
  const { control, handleSubmit } = useForm<LaborContractEmployeeInfo>({
    values: document
      ? {
          ...document.employee_information,
          phone: parsePhoneNumber(document.employee_information.phone_number),
        }
      : initialLaborContractEmployeeInfo,
  });
  const { mutate: postDocument, isPending: postPending } =
    usePostStandardLaborContracts(Number(userOwnerPostId)); // 작성된 근로계약서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutStandardLaborContracts(Number(currentDocumentId), userOwnerPostId); // 수정된 근로계약서 제출 훅
  // 문서 편집일 시 페이지 진입과 동시에 기존 내용 자동 입력

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: LaborContractEmployeeInfo) => {
    const { phone, ...rest } = data;
    const finalDocument = {
      ...rest,
      phone_number: formatPhoneNumber(
        phone as Phone
      ),
    };
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

  // 폼 필드 정의
  const formFields: FormField[] = [
    {
      type: 'text',
      name: LaborContractEmployeeInfoProperty.FIRST_NAME,
      title:
        LaborContractEmployeeFormInfo[
          LaborContractEmployeeInfoProperty.FIRST_NAME
        ].name,
      placeholder: 'First Name',
    },
    {
      type: 'text',
      name: LaborContractEmployeeInfoProperty.LAST_NAME,
      title:
        LaborContractEmployeeFormInfo[
          LaborContractEmployeeInfoProperty.LAST_NAME
        ].name,
      placeholder: 'Last Name',
    },
    {
      type: 'phone',
      name: 'phone',
      title:
        LaborContractEmployeeFormInfo[
          LaborContractEmployeeInfoProperty.PHONE_NUMBER
        ].name,
      placeholder: '', // PhoneNumberInput에서 자체적으로 처리
    },
    {
      type: 'address',
      name: LaborContractEmployeeInfoProperty.ADDRESS,
      title:
        LaborContractEmployeeFormInfo[LaborContractEmployeeInfoProperty.ADDRESS]
          .name,
      placeholder: 'Search Your Address',
    },
    {
      type: 'signature',
      name: LaborContractEmployeeInfoProperty.SIGNATURE_BASE64,
      title:
        LaborContractEmployeeFormInfo[
          LaborContractEmployeeInfoProperty.SIGNATURE_BASE64
        ].name,
      placeholder: 'Signature',
    },
  ];

  // 필드 타입에 따른 입력 컴포넌트 렌더링
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <DocumentFormInput
            inputType={InputType.TEXT}
            placeholder={field.placeholder}
            canDelete={false}
            name={field.name as keyof LaborContractEmployeeInfo}
            control={control}
            format={field.format}
          />
        );
      case 'phone':
        return (
          <PhoneNumberInput control={control} name={field.name as 'phone'} />
        );
      case 'address':
        return (
          <AddressInput
            control={control}
            name={field.name as string}
            placeholder={field.placeholder}
          />
        );
      case 'signature':
        return (
          <Controller
            control={control}
            name="signature_base64"
            render={({ field: { value, onChange } }) => (
              <div className="w-full relative shadow rounded-xl box-border h-[120px] mb-40">
                <SignaturePad
                  onSave={onChange}
                  onReset={() => onChange('')}
                  previewImg={value || ''}
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
      <form
        className={`w-full flex flex-col ${postPending || updatePending ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleNext);
        }}
      >
        <div className="p-4 first-letter:[&>*:last-child]:mb-40 flex flex-col gap-4">
          {/* 유학생 작성 정보 */}
          {formFields.map((field) => (
            <InputLayout key={field.name} title={field.title} isEssential>
              {renderField(field)}
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
            control={control}
            fieldNames={[
              'first_name',
              'last_name',
              'phone',
              'address',
              'signature_base64',
            ]}
            validationFn={validateLaborContract}
            buttonText={isEdit ? 'Modify' : 'Create'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </form>
    </>
  );
};

export default LaborContractWriteForm;
