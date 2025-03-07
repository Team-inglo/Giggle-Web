import { initialPartTimePermitForm } from '@/constants/documents';
import {
  DocumentType,
  PartTimePermitData,
  PartTimePermitFormRequest,
} from '@/types/api/document';
import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import Dropdown from '@/components/Common/Dropdown';
import { phone } from '@/constants/information';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { validatePartTimePermit } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import {
  usePostPartTimeEmployPermit,
  usePutPartTimeEmployPermit,
} from '@/hooks/api/useDocument';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import LoadingItem from '@/components/Common/LoadingItem';
import InputLayout from '@/components/WorkExperience/InputLayout';

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
};

const PartTimePermitWriteForm = ({
  document,
  isEdit,
}: PartTimePermitFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const [newDocumentData, setNewDocumentData] =
    useState<PartTimePermitFormRequest>(initialPartTimePermitForm);
  const { mutate: postDocument } = usePostPartTimeEmployPermit(
    Number(currentPostId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  ); // 작성된 문서 제출 훅
  const { mutate: updateDocument } = usePutPartTimeEmployPermit(
    Number(currentPostId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  ); // 수정된 문서 제출 훅
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '010',
    middle: '',
    end: '',
  });
  // 문서 편집일 시 페이지 진입과 동시에 기존 내용 자동 입력
  useEffect(() => {
    if (isEdit && document) {
      setNewDocumentData({
        first_name: document.employee_information.first_name,
        last_name: document.employee_information.last_name,
        major: document.employee_information.major,
        term_of_completion: document.employee_information.term_of_completion,
        phone_number: document.employee_information.phone_number,
        email: document.employee_information.email,
      });
      setPhoneNum({
        start: parsePhoneNumber(newDocumentData.phone_number).start,
        middle: parsePhoneNumber(newDocumentData.phone_number).middle,
        end: parsePhoneNumber(newDocumentData.phone_number).end,
      });
    }
  }, [document, isEdit]);

  // 문서 작성 완료 핸들러 함수
  const handleNext = () => {
    const finalDocument = {
      ...newDocumentData,
      phone_number: formatPhoneNumber(phoneNum),
    };
    const payload = {
      id: Number(currentPostId),
      document: finalDocument, // TODO: 로그인 연결 후 userId를 넣어야 하는 것으로 추정
    };

    if (isEdit) {
      updateDocument(payload);
      return;
    }
    postDocument(payload);
  };
  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}
      <div
        className={`w-full p-4 flex flex-col ${isLoading ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="[&>*:last-child]:mb-24 flex flex-col gap-4">
          {/* 이름 입력 */}
          <InputLayout title="First Name" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="First Name"
              value={newDocumentData.first_name}
              onChange={(value) =>
                setNewDocumentData({ ...newDocumentData, first_name: value })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 성 입력 */}
          <InputLayout title="Last Name" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="Last Name"
              value={newDocumentData.last_name}
              onChange={(value) =>
                setNewDocumentData({ ...newDocumentData, last_name: value })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 전화번호 입력 */}
          <InputLayout title="Cell phone No." isEssential>
            <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
              <div className="w-full h-[2.75rem]">
                <Dropdown
                  value={phoneNum.start}
                  placeholder="010"
                  options={phone}
                  setValue={(value) =>
                    setPhoneNum({ ...phoneNum, start: value })
                  }
                />
              </div>
              <Input
                inputType={InputType.TEXT}
                placeholder="0000"
                value={phoneNum.middle}
                onChange={(value) =>
                  setPhoneNum({ ...phoneNum, middle: value })
                }
                canDelete={false}
              />
              <Input
                inputType={InputType.TEXT}
                placeholder="0000"
                value={phoneNum.end}
                onChange={(value) => setPhoneNum({ ...phoneNum, end: value })}
                canDelete={false}
              />
            </div>
          </InputLayout>
          {/* 전공 입력 */}
          <InputLayout title="Department (major)" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="Major"
              value={newDocumentData.major}
              onChange={(value) =>
                setNewDocumentData({ ...newDocumentData, major: value })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 이수 학기 입력 */}
          <InputLayout title="Term of completion" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="Term of completion"
              value={String(newDocumentData.term_of_completion)}
              onChange={(value) => {
                if (typeof value === 'string' && !isNaN(Number(value))) {
                  setNewDocumentData({
                    ...newDocumentData,
                    term_of_completion: Number(value),
                  });
                }
              }}
              canDelete={false}
            />
          </InputLayout>
          {/* 이메일 입력 */}
          <InputLayout title="Email" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="email@email.com"
              value={newDocumentData.email}
              onChange={(value) =>
                setNewDocumentData({
                  ...newDocumentData,
                  email: value,
                })
              }
              canDelete={false}
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
          {validatePartTimePermit({
            ...newDocumentData,
            phone_number: formatPhoneNumber(phoneNum),
          }) ? (
            <Button
              type="large"
              bgColor="bg-[#fef387]"
              fontColor="text-[#222]"
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
              onClick={handleNext}
            />
          ) : (
            <Button
              type="large"
              bgColor="bg-[#F4F4F9]"
              fontColor=""
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
            />
          )}
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default PartTimePermitWriteForm;
