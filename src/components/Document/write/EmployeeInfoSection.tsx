import {
  LaborContractEmployeeFormInfo,
  LaborContractEmployeeInfoProperty,
  PartTimePermitFormInfo,
  PartTimePermitFormProperty,
} from '@/constants/documents';
import {
  DocumentType,
  EmployeeInformation,
  LaborContractEmployeeInfo,
} from '@/types/api/document';
import { GiggleAddress } from '@/types/api/users';
import { getDetailAddress } from '@/utils/document';
import { renderMap } from '@/utils/map';

const EmployeeInfoSection = ({
  employee,
  type,
}: {
  employee: EmployeeInformation | LaborContractEmployeeInfo;
  type: DocumentType;
}) => {
  return (
    <div className="w-full relative rounded-lg flex flex-col items center justify-center p-4 text-left body-3 bg-white">
      <div className="w-full self-stretch flex flex-col items-start jusitfy-center">
        <section className="w-full flex flex-col gap-1 pb-4 border-b border-border-alternative">
          <p className="w-full head-3 text-text-strong">
            Employee Information 📋
          </p>
          <p className="w-full body-3 text-text-alternative">
            Before drafting the hiring documents,
            <br />
            please verify that the employer's information is correct.
          </p>
        </section>
        <div className="w-full self-stretch flex flex-col items-center justify-start text-left pt-4 gap-3">
          {/* 추후 UI 재사용 위한 고용주 정보 property를 반복문으로 ui 나열 */}
          {Object.entries(employee).map(([key, value]) => (
            <div className="w-full flex flex-col gap-1">
              <p className="button-2 text-text-alternative">
                {type === DocumentType.PART_TIME_PERMIT
                  ? PartTimePermitFormInfo[key as PartTimePermitFormProperty]
                      .name
                  : LaborContractEmployeeFormInfo[
                      key as LaborContractEmployeeInfoProperty
                    ].name}
              </p>
              {!['address', 'signature_base64'].includes(key) && (
                <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                  {value}
                </div>
              )}

              {key === LaborContractEmployeeInfoProperty.ADDRESS &&
                renderMap(value as GiggleAddress)}

              {/* 별도 property가 없는 detailed address 예외 처리 */}
              {key === LaborContractEmployeeInfoProperty.ADDRESS && (
                <div className="w-full flex flex-col gap-1">
                  <p className="button-2 text-text-alternative">
                    Detailed Address in korea
                  </p>
                  <div className="w-full self-stretch flex items-start justify-start body-2 text-primary-dark">
                    {getDetailAddress(value as GiggleAddress)}
                  </div>
                </div>
              )}
              {/* 유학생 서명 */}
              {key === LaborContractEmployeeInfoProperty.SIGNATURE_BASE64 && (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoSection;
