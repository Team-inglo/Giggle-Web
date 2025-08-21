import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentFormDispenser from '@/components/WriteDocuments/DocumentFormDispenser';
import useNavigateBack from '@/hooks/useNavigateBack';
import { DocumentType } from '@/types/api/document';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const WriteDocumentsPage = () => {
  const handleClickBackButton = useNavigateBack();
  const location = useLocation();
  const { type, isEdit, userOwnerPostId } = location.state || {};
  const { id } = useParams();

  const title = useMemo(() => {
    switch (type) {
      case DocumentType.PART_TIME_PERMIT:
        return 'Part-Time Employment Permit';
      case DocumentType.INTEGRATED_APPLICATION:
        return 'Integrated Application';
      case DocumentType.LABOR_CONTRACT:
        return 'Employment Contract';
      default:
        return 'Fill in document';
    }
  }, [type]);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title={title}
        onClickBackButton={handleClickBackButton}
      />
      <div className="relative">
        <DocumentFormDispenser
          type={type as DocumentType}
          isEdit={isEdit}
          applicant_id={Number(id)}
          userOwnerPostId={Number(userOwnerPostId)}
        />
      </div>
    </div>
  );
};

export default WriteDocumentsPage;
