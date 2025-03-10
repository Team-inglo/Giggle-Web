import {
  LaborContractEmployeeFormInfo,
  LaborContractEmployeeInfoProperty,
  PartTimePermitFormInfo,
  PartTimePermitFormProperty,
} from '@/constants/documents';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import {
  DocumentType,
  EmployeeInformation,
  LaborContractEmployeeInfo,
} from '@/types/api/document';
import { GiggleAddress } from '@/types/api/users';
import { getDetailAddress, propertyToString } from '@/utils/document';
import { renderMap } from '@/utils/map';
import { Fragment } from 'react/jsx-runtime';

const EmployeeInfoSection = ({
  employee,
  type,
}: {
  employee: EmployeeInformation | LaborContractEmployeeInfo;
  type: DocumentType;
}) => {
  const { account_type } = useUserStore();
  const isEmployer = account_type === UserType.OWNER;
  const language = isEmployer ? 'ko' : 'name';

  // 공통 타이틀 렌더링 함수
  const renderTitle = (key: string) => (
    <div className="w-full flex flex-col gap-1">
      <p className="button-2 text-text-alternative">
        {type === DocumentType.PART_TIME_PERMIT
          ? PartTimePermitFormInfo[key as PartTimePermitFormProperty][language]
          : LaborContractEmployeeFormInfo[
              key as LaborContractEmployeeInfoProperty
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
      case LaborContractEmployeeInfoProperty.ADDRESS:
        return renderMap(value as GiggleAddress);
      case LaborContractEmployeeInfoProperty.SIGNATURE_BASE64:
        return (
          <div className="flex flex-col gap-4">
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
      default:
        return <DefaultValueRenderer value={value} />;
    }
  };

  // 특수 케이스에 대한 추가 컴포넌트 렌더링
  const renderAdditionalContent = (key: string, value: GiggleAddress) => {
    switch (key) {
      case LaborContractEmployeeInfoProperty.ADDRESS:
        return (
          <div className="w-full flex flex-col gap-1">
            <p className="button-2 text-text-alternative">
              Detailed Address in korea
            </p>
            <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
              {getDetailAddress(value as GiggleAddress)}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start jusitfy-center">
        <section className="w-full flex flex-col gap-1 pb-4 border-b border-border-alternative">
          <p className="w-full head-3 text-text-strong">
            {isEmployer ? '유학생 정보 📋' : 'Employee Information 📋'}
          </p>
        </section>
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left pt-4 gap-3">
          {Object.entries(employee).map(([key, value]) => (
            <Fragment key={key}>
              <div className="w-full flex flex-col gap-1">
                {renderTitle(key)}
                {renderFieldContent(key, value)}
              </div>
              {renderAdditionalContent(key, value as GiggleAddress)}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoSection;
