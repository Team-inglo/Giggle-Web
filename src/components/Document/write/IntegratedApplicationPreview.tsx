import { IntegratedApplicationData } from '@/types/api/document';
import InputLayout from '@/components/Document/write/InputLayout';
import { propertyToString } from '@/utils/document';
import Notice from '@/components/Document/write/Notice';
import { renderMap } from '@/utils/map';
import { GiggleAddress } from '@/types/api/users';

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
};

const IntegratedApplicationPreview = ({
  document,
}: IntegratedApplicationFormProps) => {
  return (
    <div className="w-full p-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 이름 입력 */}
        <InputLayout title="First Name" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.first_name}</div>
          </div>
        </InputLayout>
        {/* 성 입력 */}
        <InputLayout title="Last Name" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.last_name}</div>
          </div>
        </InputLayout>
        {/* 생일 입력 */}
        <InputLayout title="Date Of Birth" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.birth}</div>
          </div>
        </InputLayout>
        {/* 성별 입력 */}
        <InputLayout title="Gender" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.gender}</div>
          </div>
        </InputLayout>
        {/* 국적 입력 */}
        <InputLayout title="Nationality" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {propertyToString(document?.nationality as string)}
            </div>
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Foreign Resident Registration No."
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
          <Notice
            title="Passport number, passport issuance date, passport expiration date"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        <div className="w-full flex flex-col gap-[1.125rem]">
          {/* 주소 검색 입력 input */}
          <InputLayout title="Address in Korea" isEssential>
            <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
              <div className="w-full flex-1 relative">
                {document?.address.address_name}
              </div>
            </div>
          </InputLayout>
          {/* 검색한 위치를 보여주는 지도 */}
          {renderMap(document?.address as GiggleAddress)}
          <InputLayout title="Detailed Address" isEssential>
            <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
              <div className="w-full flex-1 relative">
                {document?.address.address_detail}
              </div>
            </div>
          </InputLayout>
        </div>
        {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
        <InputLayout title="Telephone No." isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.tele_phone_number}
            </div>
          </div>
        </InputLayout>
        {/* 개인 휴대폰 번호 입력 */}
        <InputLayout title="Cell Phone No." isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.cell_phone_number}
            </div>
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Address, Phone Number, in Home Country"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        {/* 대학 종류 선택 */}
        <InputLayout title="Type Of Name" isEssential>
          <div className="w-full relative body-3 text-[#bdbdbd] text-left">
            University is an education office accredited school.
          </div>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.is_accredited ? 'Accredited' : 'Non-Accredited'}
            </div>
          </div>
        </InputLayout>
        {/* 학교 이름 입력 */}
        <InputLayout title="Name Of School" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.school_name}
            </div>
          </div>
        </InputLayout>
        {/* 대학 번호 입력 */}
        <InputLayout title="Phone Number of School" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.school_phone_number}
            </div>
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Current Workplace Of Name, Business Registration No, Phone Number"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        {/* 근무 장소 이름 입력 */}
        <InputLayout title="New Workplace" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.new_work_place_name}
            </div>
          </div>
        </InputLayout>
        {/* 사업자 등록번호 입력 */}
        <InputLayout
          title="Business Registration No. Of New Workplace"
          isEssential
        >
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.new_work_place_registration_number}
            </div>
          </div>
        </InputLayout>
        {/* 연봉 입력 */}
        <InputLayout title="Annual Income Amount" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">
              {document?.annual_income_amount}
            </div>
          </div>
        </InputLayout>
        {/* 직업 입력 */}
        <InputLayout title="Occupation" isEssential>
          <div className="w-full relative body-3 text-[#bdbdbd] text-left">
            If you are a college student, please write 'student'.
          </div>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.occupation}</div>
          </div>
        </InputLayout>
        {/* 이메일 입력 */}
        <InputLayout title="Email" isEssential>
          <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
            <div className="w-full flex-1 relative">{document?.email}</div>
          </div>
        </InputLayout>
        {/* 하이코리아 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Date of apllication"
            content="Please fill it out on the application date for Hi Korea document?s."
            notWarning
          />
        </div>
        {/* 서명 입력 */}
        <InputLayout title="Applicant Signature" isEssential>
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-xl">
              {document?.signature_base64 !== '' && (
                <img
                  src={`data:image/svg+xml;base64,${document?.signature_base64}`}
                  className="w-full h-full object-cover"
                  alt="signature preview"
                />
              )}
            </div>
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보(부모님) 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Spouse of applicant Signature"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
          <Notice
            title="Father/Mother of applicant"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
      </div>
    </div>
  );
};

export default IntegratedApplicationPreview;
