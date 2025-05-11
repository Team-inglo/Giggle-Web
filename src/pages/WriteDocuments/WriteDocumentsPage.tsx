import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import DocumentFormDispenser from '@/components/WriteDocuments/DocumentFormDispenser';
import useNavigateBack from '@/hooks/useNavigateBack';
import { DocumentType } from '@/types/api/document';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const WriteDocumentsPage = () => {
  const handleClickBackButton = useNavigateBack();
  const location = useLocation();
  const { type, isEdit, userOwnerPostId } = location.state || {};
  const { id } = useParams();

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="Fill in document"
        onClickBackButton={handleClickBackButton}
      />
      <div className="relative">
        <DocumentSubHeader type={type as DocumentType} />
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
