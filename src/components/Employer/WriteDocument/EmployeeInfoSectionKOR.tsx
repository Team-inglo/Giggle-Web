import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  EmployeePropertyInfo,
  LaborContractEmployeePropertyInfo,
  PartTimePermitFormProperty,
} from '@/constants/documents';
import {
  DocumentType,
  EmployeeInformation,
  LaborContractEmployeeInfo,
  LaborContractEmployeeInfoProperty,
} from '@/types/api/document';
import { GiggleAddress } from '@/types/api/users';
import { getDetailAddress } from '@/utils/document';
import { renderMap } from '@/utils/map';

const EmployeeInfoSectionKOR = ({
  employee,
  type,
}: {
  employee: EmployeeInformation | LaborContractEmployeeInfo;
  type: DocumentType;
}) => {
  return (
    <div className="w-full relative rounded-3xl flex flex-col items center justify-center px-6 py-3 text-left body-3 text-[#1e1926] bg-[#f4f4f9]">
      <div className="w-full self-stretch flex flex-col items-center jusitfy-center">
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left">
          {/* 추후 UI 재사용 위한 고용주 정보 property를 반복문으로 ui 나열 */}
          {Object.entries(employee).map(([key, value]) => (
            <div className="w-full">
              <InputLayout
                isEssential
                title={
                  type === DocumentType.PART_TIME_PERMIT
                    ? EmployeePropertyInfo[key as PartTimePermitFormProperty]
                        .name
                    : LaborContractEmployeePropertyInfo[
                        key as LaborContractEmployeeInfoProperty
                      ].name
                }
              >
                {!['address', 'signature_base64'].includes(key) && (
                  <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4 body-2">
                    <div className="w-full flex-1 relative">{value}</div>
                  </div>
                )}
              </InputLayout>

              {key === LaborContractEmployeeInfoProperty.ADDRESS &&
                renderMap(value as GiggleAddress)}

              {/* 별도 property가 없는 detailed address 예외 처리 */}
              {key === LaborContractEmployeeInfoProperty.ADDRESS && (
                <div className="w-full self-stretch flex flex-col text-left items-center justify-start px-1 py-1.5">
                  <div className="w-full flex-1 flex flex-col items-start justify-start">
                    <div className="w-full self-stretch flex items-center justify-start">
                      <div className="w-full relative">한국 상세 주소</div>
                    </div>
                  </div>
                  <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                    <div className="w-full flex-1 relative body-2">
                      {getDetailAddress(value as GiggleAddress)}
                    </div>
                  </div>
                </div>
              )}
              {/* 유학생 서명 */}
              {key === LaborContractEmployeeInfoProperty.SIGNATURE_BASE64 && (
                <div className="flex flex-col gap-4">
                  <div className="border border-gray-200 rounded-xl">
                    {value !== '' && (
                      <img
                        src={`data:image/svg+xml;base64,${value}`}
                        className="w-full h-full object-cover bg-white rounded-xl"
                        alt="signature preview"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoSectionKOR;
