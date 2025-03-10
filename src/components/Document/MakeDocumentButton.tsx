import AddIcon from '@/assets/icons/AddButton.svg?react';
import { DocumentTypeInfo } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';
import { useNavigate } from 'react-router-dom';

const MakeDocumentButton = ({ type }: { type: DocumentType }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
      <div className="self-stretch flex flex-col items-start justify-start px-4">
        <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{DocumentTypeInfo[type].name}</div>
          </div>
          <div onClick={() => navigate('/write-documents', {
            state: {
              type: type
            }
          })}>
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDocumentButton;
