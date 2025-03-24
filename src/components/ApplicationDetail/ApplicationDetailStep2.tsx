import { useState } from 'react';
import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import ContactRecruiterBottomSheet from '@/components/ApplicationDetail/ContactRecruiterBottomSheet';

const ApplicationDetailStep2 = () => {
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  return (
    <>
      <section className="w-full px-4 pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-text-disabled"
          title="Check the application documents"
          isBorder={false}
          onClick={() => setIsShowBottomSheet(true)}
        />
      </section>
      <ContactRecruiterBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    </>
  );
};

export default ApplicationDetailStep2;
