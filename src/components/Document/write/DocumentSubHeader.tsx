import { DocumentSubTitleContent } from '@/constants/documents';
import { DocumentType } from '@/types/api/document';

// 작성 페이지 페이지 헤더 하단에 오는 서브 헤더 컴포넌트
const DocumentSubHeader = ({ type }: { type: DocumentType }) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-center pt-8 px-4 pb-6 text-left">
      <div className="w-full h-full absolute left-0 top-0 bg-primary-normal" />
      <div className="w-full max-w-[17.5rem] flex flex-col items-start justify-center gap-2">
        <div className="self-stretch relative head-2 text-primary-dark">
          {DocumentSubTitleContent[type].name}
        </div>
        <div className="self-stretch relative justify-center body-3 text-primary-dark">
          {DocumentSubTitleContent[type].content}
        </div>
      </div>
    </div>
  );
};

export default DocumentSubHeader;
