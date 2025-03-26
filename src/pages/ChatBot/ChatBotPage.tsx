import ChatBotChatBox from '@/components/ChatBot/ChatBotChatBox';
import ChatBotInput from '@/components/ChatBot/ChatBotInput';
import UserChatBox from '@/components/ChatBot/UserChatBox';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { useGetChatHistory } from '@/hooks/api/useChatBot';
import { ChatItemType } from '@/types/api/chatbot';
import { getCurrentDayAndTime } from '@/utils/getCurrentDateTime';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBotPage = () => {
  const navigate = useNavigate();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [chatHistoryData, setChatHistoryData] = useState<ChatItemType[]>([]);
  const [chatData, setChatData] = useState<ChatItemType[]>([]);
  const [firstVisit, setFirstVisit] = useState<boolean>(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetChatHistory();

  const addChatData = (newChatData: ChatItemType[]) => {
    setChatData([...chatData, ...newChatData]);
  };

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, scrollToBottom]);

  useEffect(() => {
    if (
      firstVisit &&
      chatHistoryData.length <= 10 &&
      chatHistoryData?.length > 0
    ) {
      scrollToBottom();
    }
  }, [chatHistoryData, firstVisit, scrollToBottom]);

  useEffect(() => {
    const onScroll = () => {
      setFirstVisit(false);
      if (isHistoryLoading || firstVisit) return;

      if (chatContainerRef.current) {
        const { scrollTop } = chatContainerRef.current;

        // 최상단에 도달하면 API 요청 준비
        if (scrollTop <= 1 && hasNextPage && !isFetchingNextPage) {
          setIsHistoryLoading(true);
          setTimeout(() => {
            fetchNextPage();
            setIsHistoryLoading(false);
          }, 3000);
        }
      }
    };

    const container = chatContainerRef.current;
    container?.addEventListener('scroll', onScroll);

    return () => {
      container?.removeEventListener('scroll', onScroll);
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isHistoryLoading,
    firstVisit,
  ]);

  // 채팅 이력이 로딩되었을 때 상태 업데이트
  useEffect(() => {
    if (data && data.pages.length > 0) {
      const messages = data.pages
        .flatMap((page) =>
          page.data.messages.map(
            (message: { role: string; message: unknown }) => ({
              isBot: message.role === 'assistant',
              message: message.message,
            }),
          ),
        )
        .reverse(); // 배열을 뒤집어 최신 메시지가 아래에 오도록 설정

      setChatHistoryData(messages);
    }
  }, [data]);

  return (
    <div ref={chatContainerRef} className="h-screen overflow-y-auto">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="GIGI Chat Bot"
        onClickBackButton={() => navigate('/')}
      />
      <section
        ref={chatContainerRef}
        className="w-full p-[1.5rem] pb-[9.375rem]"
      >
        <div className="w-full flex flex-col gap-[1rem]">
          {isHistoryLoading && <LoadingItem />}
          {chatHistoryData.map((data, index) =>
            data.isBot ? (
              <ChatBotChatBox key={index} text={data.message} />
            ) : (
              <UserChatBox key={index} text={data.message} />
            ),
          )}
          <div className="w-full py-[1rem] caption text-[#1E1926] text-center">
            {getCurrentDayAndTime()}
          </div>
          {chatData.map((data, index) =>
            data.isBot ? (
              <ChatBotChatBox key={index} text={data.message} />
            ) : (
              <UserChatBox key={index} text={data.message} />
            ),
          )}
          {isChatLoading && <LoadingItem />}
        </div>
        <div ref={bottomRef} />
      </section>
      <ChatBotInput
        addChatData={addChatData}
        setIsChatLoading={setIsChatLoading}
      />
    </div>
  );
};

export default ChatBotPage;
