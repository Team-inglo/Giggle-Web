import Button from '@/components/Common/Button';

const ApplicationDetailStep2 = () => {
  return (
    <>
      <section className="w-full px-4 pb-[3.125rem]">
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title="Check the application documents"
        />
      </section>
    </>
  );
};

export default ApplicationDetailStep2;
