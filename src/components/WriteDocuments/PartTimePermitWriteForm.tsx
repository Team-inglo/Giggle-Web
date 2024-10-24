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
import { isNotEmpty } from '@/utils/document';
import { formatPhoneNumber } from '@/utils/information';
import { usePostPartTimeEmployPermit } from '@/hooks/api/useDocument';

type PartTimePermitFormProps = {
  document?: PartTimePermitData;
  isEdit: boolean;
};

const PartTimePermitWriteForm = ({
  document,
  isEdit,
}: PartTimePermitFormProps) => {
  const [newDocumentData, setNewDocumentData] =
    useState<PartTimePermitFormRequest>(initialPartTimePermitForm);
  const { mutate } = usePostPartTimeEmployPermit();
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
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
    }
  }, [document, isEdit]);

  // 문서 작성 완료 핸들러 함수
  const handleNext = () => {
    mutate({
      id: 1,
      document: {
        ...newDocumentData,
        phone_number: formatPhoneNumber(phoneNum),
      },
    }); // TODO: 로그인 연결 후 userId를 넣어야 하는 것으로 추정
  };
  return (
    <div className="w-full p-6 flex flex-col">
      <div className="[&>*:last-child]:mb-24 flex flex-col gap-4">
        {/* 이름 입력 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            <div className="relative">
              First Name
              <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                *
              </div>
            </div>
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="First Name"
            value={newDocumentData.first_name}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, first_name: value })
            }
            canDelete={false}
          />
        </div>
        {/* 성 입력 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            <div className="relative">
              Last Name
              <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                *
              </div>
            </div>
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="Last Name"
            value={newDocumentData.last_name}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, last_name: value })
            }
            canDelete={false}
          />
        </div>
        {/* 전공 입력 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            <div className="relative">
              Department (major)
              <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                *
              </div>
            </div>
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="Major"
            value={newDocumentData.major}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, major: value })
            }
            canDelete={false}
          />
        </div>
        {/* 학점 입력 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            <div className="relative">
              Term of completion
              <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                *
              </div>
            </div>
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="Term of completion"
            value={String(newDocumentData.term_of_completion)}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                term_of_completion: Number(value),
              })
            }
            canDelete={false}
          />
        </div>
        {/* 전화번호 입력 */}
        <div className="w-full">
          <div className="w-full flex flex-row items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Telephone No.
          </div>
          <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
            <div className="w-full h-[2.75rem]">
              <Dropdown
                value={phoneNum.start}
                placeholder="+82"
                options={phone}
                setValue={(value) => setPhoneNum({ ...phoneNum, start: value })}
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={phoneNum.middle}
              onChange={(value) => setPhoneNum({ ...phoneNum, middle: value })}
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
        </div>
        {/* 이메일 입력 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            <div className="relative">
              Email
              <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                *
              </div>
            </div>
          </div>
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
        </div>
        {/* 고용주 정보가 있다면 표시 */}
        {document?.employer_information && (
          <EmployerInfoSection
            employ={document.employer_information}
            type={DocumentType.PART_TIME_PERMIT}
          />
        )}
      </div>

      <BottomButtonPanel>
        {/* 입력된 정보 중 빈 칸이 없다면 활성화 */}
        {isNotEmpty(newDocumentData) && isNotEmpty(phoneNum) ? (
          <Button
            type="large"
            bgColor="bg-[#fef387]"
            fontColor="text-[#222]"
            isBorder={false}
            title="Next"
            onClick={handleNext}
          />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#F4F4F9]"
            fontColor=""
            isBorder={false}
            title="Next"
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default PartTimePermitWriteForm;
