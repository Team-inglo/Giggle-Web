import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { postTranslation } from '@/constants/translation';

const EmployeeCardEmptyState = () => {
  return (
    <div className="w-full px-4 pt-[20vh] flex flex-col justify-center items-center gap-1">
      <EmptyJobIcon />
      <h3 className="heading-20-semibold text-text-strong">
        찾고 계신 인재가 없어요.
      </h3>
      <p className="body-14-regular text-text-alternative text-center">
        {postTranslation.emptySearchResultContent.ko}
      </p>
    </div>
  );
};

export default EmployeeCardEmptyState;
