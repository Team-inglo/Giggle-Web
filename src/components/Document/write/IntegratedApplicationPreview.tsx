import {
  IntegratedApplicationData,
  IntegratedApplicationField,
} from '@/types/api/document';
import { getDetailAddress, propertyToString } from '@/utils/document';
import { renderMap } from '@/utils/map';
import { GiggleAddress } from '@/types/api/users';
import { IntegratedApplicationPropertyInfo } from '@/constants/documents';
import { Fragment } from 'react/jsx-runtime';

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
};

const IntegratedApplicationPreview = ({
  document,
}: IntegratedApplicationFormProps) => {
  // 공통 타이틀 렌더링 함수
  const renderTitle = (key: string) => (
    <p className="button-2 text-text-alternative">
      {
        IntegratedApplicationPropertyInfo[key as IntegratedApplicationField]
          .name
      }
    </p>
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
      case IntegratedApplicationField.ADDRESS:
        return renderMap(value as GiggleAddress);
      case IntegratedApplicationField.IS_ACCREDITED:
        return (
          <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
            {value
              ? 'Accredited school by Education Office'
              : 'Non-accredited, Alternative school'}
          </div>
        );
      case IntegratedApplicationField.SIGNATURE_BASE64:
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
  const renderAdditionalContent = (key: string, value: unknown) => {
    switch (key) {
      case IntegratedApplicationField.ADDRESS:
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

  if (!document) return null;

  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start justify-center">
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left pt-4 gap-3">
          {Object.entries(document).map(([key, value]) => (
            <Fragment key={key}>
              <div className="w-full flex flex-col gap-1">
                {renderTitle(key)}
                {renderFieldContent(key, value)}
              </div>
              {renderAdditionalContent(key, value)}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedApplicationPreview;
