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
import { propertyToString } from '@/utils/document';
import { renderMap } from '@/utils/map';
import { Fragment } from 'react/jsx-runtime';
import { useMemo, useCallback } from 'react';

const EmployeeInfoSection = ({
  employee,
  type,
}: {
  employee: EmployeeInformation | LaborContractEmployeeInfo;
  type: DocumentType;
}) => {
  const account_type = useUserStore((state) => state.account_type);
  const isEmployer = account_type === UserType.OWNER;
  const language = isEmployer ? 'ko' : 'name';

  const renderTitle = useCallback(
    (key: string) => (
      <div className="w-full flex flex-col gap-1">
        <p className="button-14-semibold text-text-alternative">
          {type === DocumentType.PART_TIME_PERMIT
            ? PartTimePermitFormInfo[key as PartTimePermitFormProperty][
                language
              ]
            : LaborContractEmployeeFormInfo[
                key as LaborContractEmployeeInfoProperty
              ][language]}
        </p>
      </div>
    ),
    [type, language],
  );

  const DefaultValueRenderer = useCallback(
    ({ value }: { value: unknown }) => (
      <div className="w-full self-stretch flex items-start justify-start body-14-regular text-primary-dark">
        {propertyToString(String(value)) === 'Null'
          ? 'none'
          : propertyToString(String(value))}
      </div>
    ),
    [],
  );

  const renderFieldContent = useCallback(
    (key: string, value: unknown) => {
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
        case PartTimePermitFormProperty.EMAIL:
          return (
            <div className="w-full self-stretch flex items-start justify-start body-14-regular text-primary-dark">
              {propertyToString(String(value)) === 'Null'
                ? 'none'
                : String(value)}
            </div>
          );
        default:
          return <DefaultValueRenderer value={value} />;
      }
    },
    [DefaultValueRenderer],
  );

  const employeeEntries = useMemo(
    () =>
      Object.entries(employee).map(([key, value]) => (
        <Fragment key={key}>
          <div className="w-full flex flex-col gap-1">
            {renderTitle(key)}
            {renderFieldContent(key, value)}
          </div>
        </Fragment>
      )),
    [employee, renderTitle, renderFieldContent],
  );

  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left caption-12-regular bg-white">
      <div className="w-full self-stretch flex flex-col items-start jusitfy-center">
        <section className="w-full flex flex-col gap-1 pb-4 border-b border-border-alternative">
          <p className="w-full heading-18-semibold text-text-strong">
            {isEmployer ? '유학생 정보 📋' : 'Employee Information 📋'}
          </p>
        </section>
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left pt-4 gap-3">
          {employeeEntries}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoSection;
