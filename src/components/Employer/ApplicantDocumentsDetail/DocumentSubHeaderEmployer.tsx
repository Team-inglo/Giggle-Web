import { EmployerDocumentSubTitleContent } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';

// 작성 페이지 페이지 헤더 하단에 오는 서브 헤더 컴포넌트
const DocumentSubHeaderEmployer = ({ type }: { type: DocumentType }) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-center pt-[1.875rem] px-8 pb-8 text-left text-[#1e1926]">
      <div className="w-full h-full absolute left-0 bg-[url('/src/assets/images/applyButton.jpeg')] opacity-25" />
      <div className="w-full flex flex-col items-start justify-center gap-2">
        <div className="self-stretch relative title-2">
          {EmployerDocumentSubTitleContent[type].name}
        </div>
        <div className="self-stretch flex items-center justify-center body-3 text-[#656565]">
          {EmployerDocumentSubTitleContent[type].content}
        </div>
      </div>
    </div>
  );
};

export default DocumentSubHeaderEmployer;
