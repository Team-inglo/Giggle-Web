import InfoIcon from '@/assets/icons/InfoIcon.svg?react';

const InfoAlert = ({ content }: { content: string }) => {
  return (
    <div className="w-full relative rounded-xl flex items-center justify-center p-3 gap-3 text-left">
      <div className="w-full h-full absolute left-0 bg-[url('/src/assets/images/applyButton.jpeg')] rounded-xl bg-cover bg-no-repeat bg-top opacity-25" />
      <div className="flex items-center justify-start">
        <InfoIcon />
      </div>
      <div className="flex-1 flex items-center justify-start gap-2">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="self-stretch relative caption text-[#464646]">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
