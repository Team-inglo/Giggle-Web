type UserChatBoxProps = {
  text: string;
};

const UserChatBox = ({ text }: UserChatBoxProps) => {
  return (
    <div className="self-end flex-1 py-[0.75rem] px-[1rem] body-14-regular text-[#464646] rounded-[0.75rem] rounded-tr-none bg-[#FEF387]">
      {text}
    </div>
  );
};

export default UserChatBox;
