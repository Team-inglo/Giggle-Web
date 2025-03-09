import { DocumentSubTitleContent } from '@/constants/documents';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { DocumentType } from '@/types/api/document';

// 작성 페이지 페이지 헤더 하단에 오는 서브 헤더 컴포넌트
const DocumentSubHeader = ({ type }: { type: DocumentType }) => {
  const { account_type } = useUserStore();
  const userType = account_type === UserType.OWNER ? 'employer' : 'student';
  return (
    <div className="w-full h-[11.25rem] relative flex flex-col items-start justify-center px-4 text-left">
      <div className="w-full h-full absolute left-0 top-0 bg-white" />
      <div className="w-full max-w-[17.5rem] flex flex-col items-start justify-center gap-2">
        <div className="self-stretch relative head-2 text-primary-dark">
          {DocumentSubTitleContent[type][userType].name}
        </div>
        <div className="self-stretch relative justify-center body-2 text-text-alternative">
          {DocumentSubTitleContent[type][userType].content}
        </div>
      </div>
    </div>
  );
};

export default DocumentSubHeader;
