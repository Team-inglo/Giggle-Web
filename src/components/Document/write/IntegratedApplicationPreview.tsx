import {
  IntegratedApplicationData,
  IntegratedApplicationField,
} from '@/types/api/document';
import { getDetailAddress } from '@/utils/document';
import { renderMap } from '@/utils/map';
import { GiggleAddress } from '@/types/api/users';
import { IntegratedApplicationPropertyInfo } from '@/constants/documents';

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
};

const IntegratedApplicationPreview = ({
  document,
}: IntegratedApplicationFormProps) => {
  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start jusitfy-center">
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left pt-4 gap-3">
          {Object.entries(document as IntegratedApplicationData).map(
            ([key, value]) => (
              <div className="w-full flex flex-col gap-1">
                <p className="button-2 text-text-alternative">
                  {
                    IntegratedApplicationPropertyInfo[
                      key as IntegratedApplicationField
                    ].name
                  }
                </p>
                {!['address', 'signature_base64'].includes(key) && (
                  <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                    {value as string | number | boolean}
                  </div>
                )}

                {key === IntegratedApplicationField.ADDRESS &&
                  renderMap(value as GiggleAddress)}
                {/* 별도 property가 없는 detailed address 예외 처리 */}
                {key === IntegratedApplicationField.ADDRESS && (
                  <div className="w-full flex flex-col gap-1">
                    <p className="button-2 text-text-alternative">
                      Detailed Address in korea
                    </p>
                    <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                      {getDetailAddress(value as GiggleAddress)}
                    </div>
                  </div>
                )}
                {/* boolean 으로 받는 공인 교육기관 여부 예외 처리 */}
                {key === IntegratedApplicationField.IS_ACCREDITED && (
                  <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                    {value
                      ? 'Accredited school by Education Office'
                      : 'Non-accredited, Alternative school'}
                  </div>
                )}
                {/* 유학생 서명 */}
                {key === IntegratedApplicationField.SIGNATURE_BASE64 && (
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
                )}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegratedApplicationPreview;
