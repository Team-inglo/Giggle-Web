import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import { DocumentType } from '@/types/api/document';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import InfoAlert from '@/components/Document/write/InfoAlert';
import IntegratedApplicationPreview from '@/components/Document/write/IntegratedApplicationPreview';
import { useCurrentDocumentIdStore } from '@/store/url';
import { useUserStore } from '@/store/user';

const DocumentPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDocumentId } = useCurrentDocumentIdStore();
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
    <div className="last:pb-[10rem]">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={true}
        title={account_type === 'OWNER'
          ? `문서 미리보기`
          : `Document Preview`}
        onClickBackButton={() =>
          navigate(
            account_type === 'OWNER'
              ? `/employer/applicant/document-detail/${currentDocumentId}`
              : `/application-documents/${currentDocumentId}`,
          )
        }
      />
      <DocumentSubHeader type={type as DocumentType} />
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
          <div className="flex flex-col w-full gap-4 px-6">
            <InfoAlert content="Make sure that the information written by the employer is correct." />
            <EmployerInfoSection
              employ={document.employer_information}
              type={type}
            />
          </div>
        )}
    </div>
  );
};

export default DocumentPreview;
