import AddIcon from '@/assets/icons/Plus-Lg.svg?react';
import YellowDocumentIcon from '@/assets/icons/YellowDocumentIcon.svg?react';
import { DocumentTypeInfo } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';
import { useNavigate } from 'react-router-dom';
import InfoCardLayout from '../Common/InfoCardLayout';

const MakeDocumentButton = ({ type }: { type: DocumentType }) => {
  const navigate = useNavigate();

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
