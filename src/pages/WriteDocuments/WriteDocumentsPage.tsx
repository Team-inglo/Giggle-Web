import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentSubHeader from '@/components/Document/write/DocumentSubHeader';
import DocumentFormDispenser from '@/components/WriteDocuments/DocumentFormDispenser';
import { DocumentType } from '@/types/api/document';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const WriteDocumentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, isEdit } = location.state || {};
  const { id } = useParams();

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="Fill in document"
        onClickBackButton={() => navigate(`/application-documents/${id}`)}
      />
      <DocumentSubHeader type={type as DocumentType} />
      <DocumentFormDispenser
        type={type as DocumentType}
        isEdit={isEdit}
        applicant_id={Number(id)}
      />
    </div>
  );
};

export default WriteDocumentsPage;
