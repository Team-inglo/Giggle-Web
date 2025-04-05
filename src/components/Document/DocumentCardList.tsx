import { DocumentsSummaryResponse, DocumentType } from '@/types/api/document';
import DocumentCardDispenser from '@/components/Document/DocumentCard';
import MakeDocumentButton from '@/components/Document/MakeDocumentButton';
import { DocumentTypeInfo } from '@/constants/documents';
import { SuccessModalContent } from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';

type DocumentCardListProps = {
  documents: DocumentsSummaryResponse;
  setModalContent: (content: SuccessModalContent) => void;
};

const DocumentCardList = ({
  documents,
  setModalContent,
}: DocumentCardListProps) => {
  const documentTypes = Object.values(DocumentType);

  return (
    <>
      <div className="flex flex-col w-full h-full p-4 gap-3">
        {documentTypes.map((property, index) =>
          documents[property] ? (
            <DocumentCardDispenser
              key={`${index}_${property}`}
              documentInfo={documents[property]}
              title={DocumentTypeInfo[property].name}
              type={property}
              setSuccessModalContent={(content: SuccessModalContent) =>
                setModalContent(content)
              }
            />
          ) : (
            <MakeDocumentButton type={property} key={`${index}_${property}`} />
          ),
        )}
      </div>
    </>
  );
};

export default DocumentCardList;
