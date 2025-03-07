import {
  LaborContractEmployerInfoNameMap,
  PartTimeEmployPermitEmployerInfo,
} from '@/constants/documents';
import {
  DocumentType,
  EmployerInfoProperty,
  EmployerInformation,
  LaborContractEmployerInfo,
  LaborContractEmployerInfoProperty,
} from '@/types/api/document';
import { GiggleAddress } from '@/types/api/users';
import { WorkDayTime } from '@/types/api/document';
import {
  arrayToString,
  getDetailAddress,
  propertyToString,
  workDayTimeToString,
} from '@/utils/document';
import Tag from '@/components/Common/Tag';
import { renderMap } from '@/utils/map';

const EmployerInfoSection = ({
  employ,
  type,
}: {
  employ: EmployerInformation | LaborContractEmployerInfo;
  type: DocumentType;
}) => {
  return (
    <div className="w-full relative rounded-3xl flex flex-col items center justify-center px-6 py-3 text-left body-3 text-[#1e1926] bg-[#f4f4f9]">
      <div className="w-full self-stretch flex flex-col items-center jusitfy-center">
        <div className="w-full self-stretch flex flex-col items-center justify-start">
          {/* 추후 UI 재사용 위한 고용주 정보 property를 반복문으로 ui 나열 */}
          {Object.entries(employ).map(([key, value]) => (
            <>
              <div className="w-full self-stretch flex flex-col text-left items-center justify-start px-1 py-1.5">
                {/* title */}
                <div className="w-full flex-1 flex flex-col items-start justify-start">
                  <div className="w-full self-stretch flex items-center justify-start">
                    <div className="w-full relative">
                      {type === DocumentType.PART_TIME_PERMIT &&
                        PartTimeEmployPermitEmployerInfo[
                          key as EmployerInfoProperty
                        ].name}
                      {type === DocumentType.LABOR_CONTRACT &&
                        LaborContractEmployerInfoNameMap[
                          key as LaborContractEmployerInfoProperty
                        ].name}
                    </div>
                  </div>
                </div>
                {/* value */}
                {![
                  'address',
                  'signature_base64',
                  'work_day_time_list',
                  'weekly_last_days',
                  'company_name',
                ].includes(key) && (
                  <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                    <div className="w-full flex-1 relative">
                      {propertyToString(String(value)) === 'Null'
                        ? 'none'
                        : propertyToString(String(value))}
                    </div>
                  </div>
                )}
                {key === LaborContractEmployerInfoProperty.ADDRESS &&
                  renderMap(value as GiggleAddress)}
              </div>
              {/* 별도 property가 없는 detailed address 예외 처리 */}
              {key === LaborContractEmployerInfoProperty.ADDRESS && (
                <div className="w-full self-stretch flex flex-col text-left items-center justify-start px-1 py-1.5">
                  <div className="w-full flex-1 flex flex-col items-start justify-start">
                    <div className="w-full self-stretch flex items-center justify-start">
                      <div className="w-full relative">
                        Detailed Address in Korea
                      </div>
                    </div>
                  </div>
                  <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                    <div className="w-full flex-1 relative">
                      {getDetailAddress(value as GiggleAddress)}
                    </div>
                  </div>
                </div>
              )}
              {/* 회사명(데이터 가공이 필요없는 string) */}
              {key === LaborContractEmployerInfoProperty.COMPANY_NAME && (
                <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                  <div className="w-full flex-1 relative">{String(value)}</div>
                </div>
              )}
              {/* 대표 서명 */}
              {key === LaborContractEmployerInfoProperty.SIGNATURE_BASE64 && (
                <div className="flex flex-col gap-4">
                  <div className="border border-gray-200 rounded-xl bg-white">
                    {value !== '' && (
                      <img
                        src={`data:image/svg+xml;base64,${value}`}
                        className="w-full h-full object-cover"
                        alt="signature preview"
                      />
                    )}
                  </div>
                </div>
              )}
              {/* 주휴일 (배열 형태로 주어져 별도 가공 필요) */}
              {key === LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS && (
                <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                  <div className="w-full flex-1 relative">
                    {arrayToString(value as string[])}
                  </div>
                </div>
              )}
              {/* 근무 요일과 시간(복잡한 객체 구조 및 태그로 변환해야 해 별도 가공) */}
              {key === LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST && (
                <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5">
                  <div className="w-full flex-1 relative">
                    <Tag
                      value={workDayTimeToString(value as WorkDayTime[])}
                      padding="py-[4px] px-[12px]"
                      isRounded
                      hasCheckIcon={false}
                      backgroundColor="bg-surface-primary"
                      color="text-text-strong"
                      fontStyle="button-2"
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerInfoSection;
