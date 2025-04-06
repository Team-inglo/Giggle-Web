import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import EmployeeInfoSection from '@/components/Document/write/EmployeeInfoSection';
import EmployerLaborContractForm from '@/components/Employer/WriteDocument/EmployerLaborContractForm';
import EmployerPartTimePermitForm from '@/components/Employer/WriteDocument/EmployerPartTimePermitForm';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
  DocumentType,
  IntegratedApplicationData,
  LaborContractDataResponse,
  PartTimePermitData,
} from '@/types/api/document';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const EmployerWriteDocumentsPage = () => {
  const navigateBack = useNavigateBack();
  const location = useLocation();
  const { type, isEdit, userOwnerPostId } = location.state || {};
  const currentDocumentId = useParams().id;

  const [document, setDocument] = useState<
    PartTimePermitData | LaborContractDataResponse | IntegratedApplicationData
  >();
  const { mutate: getPartTimeEmployPermit } = useGetPartTimeEmployPermit({
    onSuccess: (data) => setDocument(data.data),
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
    return (
      <div>
        <BaseHeader
          hasBackButton={true}
          hasMenuButton={false}
          title="서류 작성"
          onClickBackButton={navigateBack} // 서류관리 페이지로 이동 요망
        />
        <DocumentSubHeader type={type as DocumentType} />
        <div className="flex flex-col items-center justify-start gap-6 p-4 bg-surface-secondary">
          {type !== DocumentType.INTEGRATED_APPLICATION && document && (
            <EmployeeInfoSection
              employee={
                (document as PartTimePermitData | LaborContractDataResponse)
                  .employee_information
              }
              type={type as DocumentType}
            />
          )}
        </div>
        {type === DocumentType.PART_TIME_PERMIT && (
          <EmployerPartTimePermitForm
            document={document as PartTimePermitData}
            isEdit={isEdit}
            userOwnerPostId={userOwnerPostId}
          />
        )}
        {type === DocumentType.LABOR_CONTRACT && (
          <EmployerLaborContractForm
            document={document as LaborContractDataResponse}
            isEdit={isEdit}
            userOwnerPostId={userOwnerPostId}
          />
        )}
      </div>
    );
  }
};
export default EmployerWriteDocumentsPage;
