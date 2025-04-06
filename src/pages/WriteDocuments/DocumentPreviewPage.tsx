import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import { DocumentType } from '@/types/api/document';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  PartTimePermitData,
  LaborContractDataResponse,
  IntegratedApplicationData,
} from '@/types/api/document';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';
import EmployeeInfoSection from '@/components/Document/write/EmployeeInfoSection';
import IntegratedApplicationPreview from '@/components/Document/write/IntegratedApplicationPreview';
import { useUserStore } from '@/store/user';
import useNavigateBack from '@/hooks/useNavigateBack';

const DocumentPreview = () => {
  const handleClickBackButton = useNavigateBack();
  const location = useLocation();
  const currentDocumentId = useParams().id;
  const { account_type } = useUserStore();
  const { type } = location.state || {};
  const [document, setDocument] = useState<
    PartTimePermitData | LaborContractDataResponse | IntegratedApplicationData
  >();
  const { mutate: getPartTimeEmployPermit } = useGetPartTimeEmployPermit({
    onSuccess: (data) => {
      setDocument(data.data);
    },
  });
  const { mutate: getStandardLaborContract } = useGetStandardLaborContract({
    onSuccess: (data) => setDocument(data.data),
  });
  const { mutate: getIntegratedApplication } = useGetIntegratedApplication({
    onSuccess: (data) => setDocument(data.data),
  });
  {
    useEffect(() => {
      switch (type) {
        case DocumentType.PART_TIME_PERMIT:
          getPartTimeEmployPermit(Number(currentDocumentId));
          break;
        case DocumentType.LABOR_CONTRACT:
          getStandardLaborContract(Number(currentDocumentId));
          break;
        case DocumentType.INTEGRATED_APPLICATION:
          getIntegratedApplication(Number(currentDocumentId));
          break;
      }
    }, [type]);
  }
  const hasInfo = (
    doc:
      | PartTimePermitData
      | LaborContractDataResponse
      | IntegratedApplicationData,
    properties: ('employer_information' | 'employee_information')[] = [
      'employer_information',
      'employee_information',
    ],
  ): doc is PartTimePermitData | LaborContractDataResponse => {
    return properties.every((prop) => prop in doc);
  };

  const renderDocument = (
    document: PartTimePermitData | LaborContractDataResponse,
  ) => {
    return (
      <EmployeeInfoSection
        employee={document?.employee_information}
        type={type as DocumentType}
      />
    );
  };
  return (
    <div className="">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title={account_type === 'OWNER' ? `문서 미리보기` : `Document Preview`}
        onClickBackButton={handleClickBackButton}
      />
      <DocumentSubHeader type={type as DocumentType} />
      <div className="bg-surface-secondary py-4 flex flex-col gap-4 px-4">
        {document && type === DocumentType.INTEGRATED_APPLICATION ? (
          <IntegratedApplicationPreview
            document={document as IntegratedApplicationData}
          />
        ) : (
          document &&
          renderDocument(
            document as PartTimePermitData | LaborContractDataResponse,
          )
        )}
        {type !== DocumentType.INTEGRATED_APPLICATION &&
          document &&
          hasInfo(document, ['employer_information']) &&
          document.employer_information && (
            <div className="flex flex-col w-full gap-4">
              <EmployerInfoSection
                employ={document.employer_information}
                type={type}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default DocumentPreview;
