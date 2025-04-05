import AddIcon from '@/assets/icons/Plus-Lg.svg?react';
import YellowDocumentIcon from '@/assets/icons/YellowDocumentIcon.svg?react';
import { DocumentTypeInfo } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';
import { useNavigate, useParams } from 'react-router-dom';
import InfoCardLayout from '@/components/Common/InfoCardLayout';

const MakeDocumentButton = ({ type }: { type: DocumentType }) => {
  const navigate = useNavigate();
  const currentUserOwnerPostId = useParams().id;
  return (
    <div className="w-full relative rounded-[1.125rem] flex flex-col items-start justify-start cursor-pointer">
      <InfoCardLayout
        icon={<YellowDocumentIcon />}
        title={DocumentTypeInfo[type].name}
        rightTopElement={
          <div
            className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-neutral"
            onClick={() =>
              navigate('/write-documents', {
                state: {
                  type: type,
                  userOwnerPostId: Number(currentUserOwnerPostId),
                },
              })
            }
          >
            <AddIcon />
          </div>
        }
      />
    </div>
  );
};

export default MakeDocumentButton;
