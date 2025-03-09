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
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

const EmployerInfoSection = ({
  employ,
  type,
}: {
  employ: EmployerInformation | LaborContractEmployerInfo;
  type: DocumentType;
}) => {
  const { account_type } = useUserStore();
  const isEmployer = account_type === UserType.OWNER;
  const language = isEmployer ? 'ko' : 'name';
  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start jusitfy-center">
        <section className="w-full flex flex-col gap-1 pb-4 border-b border-border-alternative">
          <p className="w-full head-3 text-text-strong">
            {isEmployer ? '고용주 정보 📋' : 'Employer Information 📋'}
          </p>
        </section>
        <div className="w-full flex flex-col gap-3 mt-4">
          {/* 추후 UI 재사용 위한 고용주 정보 property를 반복문으로 ui 나열 */}
          {Object.entries(employ).map(([key, value]) => (
            <>
              <div className="w-full self-stretch flex flex-col text-left items-center justify-start">
                {/* title */}
                <div className="w-full flex flex-col gap-1">
                  <p className="button-2 text-text-alternative">
                    {type === DocumentType.PART_TIME_PERMIT &&
                      PartTimeEmployPermitEmployerInfo[
                        key as EmployerInfoProperty
                      ][language]}
                    {type === DocumentType.LABOR_CONTRACT &&
                      LaborContractEmployerInfoNameMap[
                        key as LaborContractEmployerInfoProperty
                      ][language]}
                  </p>
                </div>
                {/* value */}
                {![
                  'address',
                  'signature_base64',
                  'work_day_time_list',
                  'weekly_last_days',
                ].includes(key) && (
                  <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                    {propertyToString(String(value)) === 'Null'
                      ? 'none'
                      : propertyToString(String(value))}
                  </div>
                )}
                {key === LaborContractEmployerInfoProperty.ADDRESS &&
                  renderMap(value as GiggleAddress)}
              </div>
              {/* 별도 property가 없는 detailed address 예외 처리 */}
              {key === LaborContractEmployerInfoProperty.ADDRESS && (
                <div className="w-full flex flex-col gap-1">
                  <p className="button-2 text-text-alternative">
                    Detailed Address in Korea
                  </p>
                  <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                    {getDetailAddress(value as GiggleAddress)}
                  </div>
                </div>
              )}
              {/* 대표 서명 */}
              {key === LaborContractEmployerInfoProperty.SIGNATURE_BASE64 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="border border-border-alternative rounded-lg">
                    {value !== '' && (
                      <img
                        src={`data:image/svg+xml;base64,${value}`}
                        className="w-full h-full object-cover bg-white rounded-lg"
                        alt="signature preview"
                      />
                    )}
                  </div>
                </div>
              )}
              {/* 주휴일 (배열 형태로 주어져 별도 가공 필요) */}
              {key === LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS && (
                <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                  {arrayToString(value as string[])}
                </div>
              )}
              {/* 근무 요일과 시간(복잡한 객체 구조 및 태그로 변환해야 해 별도 가공) */}
              {key === LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST && (
                <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                  <Tag
                    value={workDayTimeToString(value as WorkDayTime[])}
                    padding="4px 12px"
                    isRounded
                    hasCheckIcon={false}
                    backgroundColor="#FEF387"
                    color="#1E1926"
                    fontStyle="button-2"
                  />
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
