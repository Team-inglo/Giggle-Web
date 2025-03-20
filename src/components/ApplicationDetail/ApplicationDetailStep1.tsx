import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { useState } from 'react';

const ApplicationDetailStep1 = () => {
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);
  return (
    <>
      <section className="w-full px-6 pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-[#F4F4F9]'}
          fontColor="text-[#BDBDBD]"
          title="Waiting for employer approval"
          isBorder={false}
          onClick={() => setIsShowBottomSheet(true)}
        />
      </section>
      <BottomSheetLayout
        hasHandlebar={false}
        isAvailableHidden={true}
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
      >
        <main className="p-3 w-full flex flex-col items-center text-center">
          <h3 className="pb-6 head-3 text-text-normal">
            Have you talked with the employer? 💬
          </h3>
          <p className="pb-4 body-2 text-text-normal">
            Tell us if you’ve completed the interview
            <br />
            so we can move things forward!
          </p>
          <button className="py-2 px-[0.625rem] body-2 text-text-alternative bg-surface-secondary rounded">
            Didn't get a response? 😓
          </button>
        </main>
        <footer className="w-full pt-6 flex flex-col gap-2">
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={'bg-primary-normal'}
            fontColor="text-surface-invert"
            title={'Interview Completed'}
            isBorder={false}
            //onClick={handleSubmit}
          />
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={'bg-primary-neutral'}
            fontColor="text-surface-invert"
            title={'Not yet, but I’ll wait'}
            isBorder={false}
            onClick={() => setIsShowBottomSheet(false)}
          />
        </footer>
      </BottomSheetLayout>
    </>
  );
};

export default ApplicationDetailStep1;
