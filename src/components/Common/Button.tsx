import CallIcon from '@/assets/icons/CallIcon.svg?react';
import ScrapIcon from '@/assets/icons/Scrap.svg?react';
import { buttonTypeKeys, buttonTypeUnion } from '@/constants/components';

type buttonProps = {
  type: buttonTypeUnion; // 정의된 버튼을 5가지 타입으로 나누었습니다.
  bgColor?: string; // 버튼의 배경색 (optional)
  fontColor?: string; // 버튼 글자색 (optional)
  isCallIcon?: boolean; // 전화기 아이콘 여부 (optional)
  isBorder: boolean; // 버튼 테두리 여부
  title?: string; // 버튼에 포함되는 글자 (optional)
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
};

const Button = ({
  type,
  bgColor,
  fontColor,
  isCallIcon = false,
  isBorder = false,
  title,
  onClick,
}: buttonProps) => {
  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.LARGE:
        return 'w-full py-4 flex justify-center items-center rounded-lg button-16-semibold';
      case buttonTypeKeys.SMALL:
        return 'w-[24vw] py-3 flex justify-center items-center rounded button-14-semibold';
      case buttonTypeKeys.APPLY:
        return `w-full py-4 flex justify-center items-center rounded-lg bg-[#191919] bg-cover bg-center button-16-semibold text-[#F4F4F9]`;
      case buttonTypeKeys.SMALLAPPLY: // 스크랩 버튼과 함께 쓰이는 Apply 버튼
        return `w-[71vw] py-4 flex justify-center items-center rounded-lg bg-[#191919] bg-cover bg-center button-16-semibold text-[#F4F4F9]`;
      case buttonTypeKeys.BACK: // CONTINUE 버튼과 같은 열에 사용
        return 'w-[31vw] py-4 flex justify-center items-center rounded-lg button-16-semibold';
      case buttonTypeKeys.CONTINUE: // BACK 버튼과 같은 열에 사용
        return 'w-[53vw] py-4 flex justify-center items-center rounded-lg button-16-semibold';
      case buttonTypeKeys.SCRAP:
        return 'p-4 flex justify-center items-center rounded-lg bg-[rgba(244,244,249,0.5)';
      default: // 기본값으로 large type 적용
        return 'w-full py-4 flex justify-center items-center rounded-lg button-16-semibold';
    }
  };

  return (
    <>
      {/* 스크랩 버튼 아이콘 처리 */}
      {type === buttonTypeKeys.SCRAP ? (
        <button
          className={`${getButtonStyle()} bg-[rgba(244,244,249,0.5)`}
          onClick={onClick}
        >
          <ScrapIcon />
        </button>
      ) : (
        // 스크랩 버튼 이외 텍스트 버튼
        <button
          className={`${getButtonStyle()} ${bgColor} ${fontColor} ${isBorder && 'border-solid border-[0.5px] border-[#1E1926]'}`}
          onClick={onClick}
        >
          {isCallIcon ? (
            <div className="flex justify-center items-center gap-1.5">
              <CallIcon />
              <div>{title}</div>
            </div>
          ) : (
            <div>{title}</div>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
