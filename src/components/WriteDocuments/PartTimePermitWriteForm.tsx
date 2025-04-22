import { initialPartTimePermitForm } from '@/constants/documents';
import {
  DocumentType,
  PartTimePermitData,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { InputType } from '@/types/common/input';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { validatePartTimePermit } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import {
  usePostPartTimeEmployPermit,
  usePutPartTimeEmployPermit,
} from '@/hooks/api/useDocument';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DocumentFormInput from '../Document/write/input/DocumentFormInput';
import ValidatedSubmitButton from '../Document/write/ValidatedSubmitButton';
import PhoneNumberInput from '../Document/write/input/PhoneNumberInput';
import DropdownInput from '../Document/write/input/DropdownInput';

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
  const { control, handleSubmit } = useForm<PartTimePermitFormRequest>({
    values: document
      ? {
          first_name: document.employee_information.first_name,
          last_name: document.employee_information.last_name,
          major: document.employee_information.major,
          term_of_completion: document.employee_information.term_of_completion,
          email: document.employee_information.email,
          phone: parsePhoneNumber(document.employee_information.phone_number),
          phone_number: document.employee_information.phone_number,
        }
      : initialPartTimePermitForm,
  });
  const { mutate: postDocument, isPending: postPending } =
    usePostPartTimeEmployPermit(Number(userOwnerPostId)); // 작성된 문서 제출 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutPartTimeEmployPermit(Number(currentDocumentId), userOwnerPostId); // 수정된 문서 제출 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: PartTimePermitFormRequest) => {
    const finalDocument = {
      ...data,
      phone_number: formatPhoneNumber(
        data.phone as { start: string; middle: string; end: string },
      ),
    };
    delete finalDocument.phone;
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
  return (
    <>
      <form
        className={`w-full p-4 flex flex-col ${postPending || updatePending ? 'overflow-hidden pointer-events-none' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleNext);
        }}
      >
        <div className="[&>*:last-child]:mb-24 flex flex-col gap-4">
          {/* 이름 입력 */}
          <InputLayout title="First Name" isEssential>
            <DocumentFormInput
              inputType={InputType.TEXT}
              placeholder="First Name"
              canDelete={false}
              name="first_name"
              control={control}
            />
          </InputLayout>
          {/* 성 입력 */}
          <InputLayout title="Last Name" isEssential>
            <DocumentFormInput
              inputType={InputType.TEXT}
              placeholder="Last Name"
              canDelete={false}
              name="last_name"
              control={control}
            />
          </InputLayout>
          {/* 전화번호 입력 */}
          <InputLayout title="Cell phone No." isEssential>
            <PhoneNumberInput control={control} name="phone" />
          </InputLayout>
          {/* 전공 입력 */}
          <InputLayout title="Department (major)" isEssential>
            <DocumentFormInput
              inputType={InputType.TEXT}
              placeholder="Department (major)"
              canDelete={false}
              name="major"
              control={control}
            />
          </InputLayout>
          {/* 이수 학기 입력 */}
          <InputLayout title="Term of completion" isEssential>
            <DropdownInput
              control={control}
              name="term_of_completion"
              placeholder="Term of completion"
              options={Array.from({ length: 12 }, (_, i) => String(i + 1))}
            />
          </InputLayout>
          {/* 이메일 입력 */}
          <InputLayout title="Email" isEssential>
            <DocumentFormInput
              inputType={InputType.TEXT}
              placeholder="email@email.com"
              canDelete={false}
              name="email"
              control={control}
            />
          </InputLayout>
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
            control={control}
            fieldNames={[
              'first_name',
              'last_name',
              'phone',
              'major',
              'term_of_completion',
              'email',
            ]}
            validationFn={validatePartTimePermit}
            buttonText={isEdit ? 'Modify' : 'Create'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </form>
    </>
  );
};

export default PartTimePermitWriteForm;
