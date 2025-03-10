import TagCheckIcon from '@/assets/icons/TagCheckIcon';
import TagDeleteIcon from '@/assets/icons/TagDeleteIcon';

type TagProps = {
  value: string; // 내용
  padding: string; // padding style
  isRounded: boolean; // 둥근 버튼 여부
  onDelete?: (value?: string) => void; // 삭제 버튼 클릭 시 호출될 함수
  hasCheckIcon: boolean; // 왼쪽에 체크 아이콘 표시 여부
  borderColor?: string;
  borderWidth?: string;
  backgroundColor: string;
  color: string;
  fontStyle: string; // typography type
};

const Tag = ({
  value,
  padding,
  isRounded,
  onDelete,
  hasCheckIcon,
  borderColor,
  borderWidth = '0.5px',
  backgroundColor,
  color,
  fontStyle,
}: TagProps) => {
  return (
    <div
      className={`w-fit h-fit flex items-center gap-[0.5rem] ${fontStyle} ${isRounded ? 'rounded-[1.125rem]' : 'rounded-sm'}`}
      style={{
        padding: padding,
        backgroundColor: backgroundColor,
        color: color,
        borderColor: borderColor,
        borderStyle: borderColor ? 'solid' : 'none',
        borderWidth: borderWidth,
      }}
    >
      {hasCheckIcon && <TagCheckIcon color={color} />}
      {value}
      {onDelete && (
        <button onClick={() => onDelete(value)}>
          <TagDeleteIcon color={color} />
        </button>
      )}
    </div>
  );
};

export default Tag;
