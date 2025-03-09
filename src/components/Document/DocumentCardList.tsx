import { DocumentsSummaryResponse, DocumentType } from '@/types/api/document';
import DocumentCardDispenser from '@/components/Document/DocumentCard';
import MakeDocumentButton from '@/components/Document/MakeDocumentButton';
import { DocumentTypeInfo } from '@/constants/documents';
import { useState } from 'react';
import LoadingItem from '../Common/LoadingItem';
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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}
      <div className="flex flex-col w-full p-4 gap-3 pb-[8rem]">
        {documentTypes.map((property, index) =>
          documents[property] ? (
            <DocumentCardDispenser
              key={`${index}_${property}`}
              documentInfo={documents[property]}
              title={DocumentTypeInfo[property].name}
              type={property}
              setIsLoading={(value: boolean) => setIsLoading(value)}
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
