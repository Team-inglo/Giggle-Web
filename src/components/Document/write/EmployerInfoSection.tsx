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
  propertyToString,
  workDayTimeToString,
} from '@/utils/document';
import Tag from '@/components/Common/Tag';
import { renderMap } from '@/utils/map';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { Fragment } from 'react/jsx-runtime';

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

  // 공통 타이틀 렌더링 함수
  const renderTitle = (key: string) => (
    <div className="w-full flex flex-col gap-1">
      <p className="button-2 text-text-alternative">
        {type === DocumentType.PART_TIME_PERMIT &&
          PartTimeEmployPermitEmployerInfo[key as EmployerInfoProperty][
            language
          ]}
        {type === DocumentType.LABOR_CONTRACT &&
          LaborContractEmployerInfoNameMap[
            key as LaborContractEmployerInfoProperty
          ][language]}
      </p>
    </div>
  );

  // 기본 값 렌더링 컴포넌트
  const DefaultValueRenderer = ({ value }: { value: unknown }) => (
    <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
      {propertyToString(String(value)) === 'Null'
        ? 'none'
        : propertyToString(String(value))}
    </div>
  );

  // 각 필드 타입별 렌더러 컴포넌트 매핑
  const renderFieldContent = (key: string, value: unknown) => {
    // 각 특수 케이스별 렌더링
    switch (key) {
      case LaborContractEmployerInfoProperty.ADDRESS:
        return <>{renderMap(value as GiggleAddress)}</>;
      case LaborContractEmployerInfoProperty.SIGNATURE_BASE64:
        return (
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
        );
      case LaborContractEmployerInfoProperty.WEEKLY_LAST_DAYS:
        return (
          <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
            {arrayToString(value as string[])}
          </div>
        );
      case LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST:
        return (
          <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
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
        );
      default:
        return <DefaultValueRenderer value={value} />;
    }
  };

  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start justify-center">
        <section className="w-full flex flex-col gap-1 pb-4 border-b border-border-alternative">
          <p className="w-full head-3 text-text-strong">
            {isEmployer ? '고용주 정보 📋' : 'Employer Information 📋'}
          </p>
        </section>
        <div className="w-full flex flex-col gap-3 mt-4">
          {Object.entries(employ).map(([key, value]) => (
            <Fragment key={key}>
              <div className="w-full self-stretch flex flex-col text-left items-center justify-start">
                {renderTitle(key)}
                {renderFieldContent(key, value)}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmployerInfoSection;
