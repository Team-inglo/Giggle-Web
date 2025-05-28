import ChatSubmitIcon from '@/assets/icons/ChatSubmitIcon.svg?react';
import { usePostChatBotMessage } from '@/hooks/api/useChatBot';
import { ChatItemType } from '@/types/api/chatbot';
import { useState } from 'react';

type ChatBotInputProps = {
  addChatData: (chatData: ChatItemType[]) => void;
  setIsChatLoading: (isChatLoading: boolean) => void;
};

const ChatBotInput = ({ addChatData, setIsChatLoading }: ChatBotInputProps) => {
  const { mutateAsync } = usePostChatBotMessage();
  const [text, setText] = useState<string>('');

  const onClickSubmit = async (text: string) => {
    if (!text) return;

    const newUserChatData = {
      isBot: false,
      message: text,
    };
    addChatData([newUserChatData]);
    setText('');
    setIsChatLoading(true);

    const { data } = await mutateAsync(text);

    if (data?.content) {
      const newChatBotData = {
        isBot: true,
        message: data?.content,
      };
      addChatData([newUserChatData, newChatBotData]);
    }
    setIsChatLoading(false);
  };

  return (
    <section className="fixed bottom-0 left-0 w-full px-[1.5rem] pt-[0.75rem] pb-[3.125rem] shadow-cardShadow bg-white">
      <div className="w-full relative">
        <textarea
          className="w-full h-[3.5rem] py-[1rem] px-[1rem] body-14-regular text-[#464646] rounded-[0.75rem] border border-[#EBEEF1] resize-none"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          className="absolute right-[1rem] bottom-[1.6rem]"
          onClick={() => onClickSubmit(text)}
        >
          <ChatSubmitIcon />
        </button>
      </div>
    </section>
  );
};

export default ChatBotInput;
