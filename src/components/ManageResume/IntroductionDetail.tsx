import { useLocation } from 'react-router-dom';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

type IntroductionDetailProps = {
  data: string;
};

const IntroductionDetail = ({ data }: IntroductionDetailProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="text-text-normal flex flex-col">
          <p className="pb-2 caption-12-regular text-text-alternative">
            {profileTranslation.introductionQuestion[isEmployer(pathname)]}
          </p>
          <p className="pb-2 caption-12-regular text-text-strong whitespace-pre-wrap break-all">
            {data}
          </p>
        </div>
      </div>
    </>
  );
};

export default IntroductionDetail;
