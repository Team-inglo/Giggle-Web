import { EmployerDocumentSubTitleContent } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';

// 작성 페이지 페이지 헤더 하단에 오는 서브 헤더 컴포넌트
const DocumentSubHeaderEmployer = ({ type }: { type: DocumentType }) => {
  return (
    <div className="w-full h-[11.25rem] relative flex flex-col items-center justify-center px-4 text-left">
      <div className="w-full h-full absolute left-0 bg-white" />
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <div className="self-stretch relative head-1 text-primary-dark">
          {EmployerDocumentSubTitleContent[type].name}
        </div>
        <div className="self-stretch relative flex items-center justify-center max-w-[17.5rem] body-2 text-text-alternative">
          {EmployerDocumentSubTitleContent[type].content}
        </div>
      </div>
    </div>
  );
};

export default DocumentSubHeaderEmployer;
