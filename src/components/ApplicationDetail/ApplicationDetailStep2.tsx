import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';

const ApplicationDetailStep2 = () => {
  return (
    <>
      <section className="w-full px-4 pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-text-disabled"
          title="Check the application documents"
          isBorder={false}
        />
      </section>
    </>
  );
};

export default ApplicationDetailStep2;
