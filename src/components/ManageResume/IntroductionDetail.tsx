type IntroductionDetailProps = {
  title: string;
  content: string;
};

const IntroductionDetail = ({ title, content }: IntroductionDetailProps) => {
  return (
    <>
      <div className="flex justify-between items-start pt-3">
        <div className="text-text-normal flex flex-col">
          <p className="pb-2 body-14-medium text-text-strong">{title}</p>
          <p className="pb-2 body-14-regular-reading text-text-normal whitespace-pre-wrap break-all">
            {content}
          </p>
        </div>
      </div>
    </>
  );
};

export default IntroductionDetail;
