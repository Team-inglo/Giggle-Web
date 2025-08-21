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
import { useMemo, useCallback } from 'react';
import InfoBanner from '@/components/Common/InfoBanner';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';

const EmployerInfoSection = ({
  employ,
  type,
}: {
  employ: EmployerInformation | LaborContractEmployerInfo;
  type: DocumentType;
}) => {
  const account_type = useUserStore((state) => state.account_type);
  const isEmployer = account_type === UserType.OWNER;
  const language = isEmployer ? 'ko' : 'name';

  const renderTitle = useCallback(
    (key: string) => (
      <div className="w-full flex flex-col gap-1">
        <p className="caption-12-semibold text-text-assistive">
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
    ),
    [type, language],
  );

  const DefaultValueRenderer = useCallback(
    ({ value }: { value: unknown }) => (
      <div className="w-full self-stretch flex items-start justify-start body-14-medium text-text-strong">
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
            <div className="w-full self-stretch flex items-start justify-start body-14-medium text-text-strong">
              {arrayToString(value as string[])}
            </div>
          );
        case LaborContractEmployerInfoProperty.WORK_DAY_TIME_LIST:
          return (
            <div className="w-full self-stretch flex items-start justify-start body-14-medium text-text-strong">
              <Tag
                value={workDayTimeToString(value as WorkDayTime[])}
                padding="py-[4px] px-[12px]"
                isRounded
                hasCheckIcon={false}
                backgroundColor="bg-surface-primary"
                color="text-text-strong"
                fontStyle="button-14-semibold"
              />
            </div>
          );
        default:
          return <DefaultValueRenderer value={value} />;
      }
    },
    [DefaultValueRenderer],
  );

  const employEntries = useMemo(
    () =>
      Object.entries(employ).map(([key, value]) => (
        <Fragment key={key}>
          <div className="w-full self-stretch flex flex-col text-left items-center justify-start">
            {renderTitle(key)}
            {renderFieldContent(key, value)}
          </div>
        </Fragment>
      )),
    [employ, renderTitle, renderFieldContent],
  );

  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left caption-12-regular bg-white">
      <div className="w-full self-stretch flex flex-col items-start justify-center">
        <InfoBanner
          size={InfoBannerSize.MD}
          hasIcon
          state={InfoBannerState.INFO}
          text="Please double-check your work conditions."
        />
        <div className="w-full flex flex-col gap-3 mt-4">{employEntries}</div>
      </div>
    </div>
  );
};

export default EmployerInfoSection;
