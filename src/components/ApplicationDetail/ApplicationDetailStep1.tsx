import Button from '@/components/Common/Button';
const ApplicationDetailStep1 = () => {
  return (
    <>
      <section className="w-full px-4 pb-[3.125rem]">
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title="Waiting for employer approval"
        />
      </section>
    </>
  );
};

export default ApplicationDetailStep1;
