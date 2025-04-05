import {
  DocumentType,
  IntegratedApplicationData,
  LaborContractDataResponse,
  PartTimePermitData,
} from '@/types/api/document';
import PartTimePermitWriteForm from '@/components/WriteDocuments/PartTimePermitWriteForm';
import LaborContractWriteForm from '@/components/WriteDocuments/LaborContractWriteForm';
import IntegratedApplicationWriteForm from '@/components/WriteDocuments/IntegratedApplicationWriteForm';
import { useEffect, useState } from 'react';
import {
  useGetIntegratedApplication,
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
} from '@/hooks/api/useDocument';

type DocumentFormDispenserProps = {
  type: DocumentType;
  isEdit: boolean;
  applicant_id: number;
  userOwnerPostId: number;
};

const DocumentFormDispenser = ({
  type,
  isEdit,
  applicant_id,
  userOwnerPostId,
}: DocumentFormDispenserProps) => {
  // const { id } = useParams();
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
      {
        /* applicant_id가 null인 경우 (서류를 새로 생성하는 경우) 조회 api를 호출하지 않음. */
      }
      if (!applicant_id) return;
      switch (type) {
        case DocumentType.PART_TIME_PERMIT:
          getPartTimeEmployPermit(Number(applicant_id));
          break;
        case DocumentType.LABOR_CONTRACT:
          getStandardLaborContract(Number(applicant_id));
          break;
        case DocumentType.INTEGRATED_APPLICATION:
          getIntegratedApplication(Number(applicant_id));
          break;
      }
    }, [type, applicant_id]);
  }
  switch (type) {
    case DocumentType.PART_TIME_PERMIT:
      return (
        <PartTimePermitWriteForm
          document={document as PartTimePermitData}
          isEdit={isEdit}
          userOwnerPostId={userOwnerPostId}
        />
      );
    case DocumentType.LABOR_CONTRACT:
      return (
        <LaborContractWriteForm
          document={document as LaborContractDataResponse}
          isEdit={isEdit}
          userOwnerPostId={userOwnerPostId}
        />
      );
    case DocumentType.INTEGRATED_APPLICATION:
      return (
        <IntegratedApplicationWriteForm
          document={document as IntegratedApplicationData}
          isEdit={isEdit}
          userOwnerPostId={userOwnerPostId}
        />
      );
  }
};

export default DocumentFormDispenser;
