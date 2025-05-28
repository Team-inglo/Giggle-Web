import YelloLogoIcon from '@/assets/icons/YellowLogoIcon.svg?react';

type ChatBotChatBoxProps = {
  text: string;
};

const ChatBotChatBox = ({ text }: ChatBotChatBoxProps) => {
  return (
    <div className="flex gap-[1rem]">
      <div className="flex justify-center items-center min-w-[2.5rem] w-[2.5rem] h-[2.5rem] bg-black rounded-[0.75rem]">
        <YelloLogoIcon />
      </div>
      <div className="flex-1 py-[0.75rem] px-[1rem] body-14-regular text-[#464646] rounded-[0.75rem] rounded-tl-none bg-[#F4F4F9]">
        {text}
      </div>
    </div>
  );
};

export default ChatBotChatBox;
