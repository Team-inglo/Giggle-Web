import TagCheckIcon from '@/assets/icons/TagCheckIcon';
import TagDeleteIcon from '@/assets/icons/TagDeleteIcon';

type TagProps = {
  value: string; // 내용
  padding: string; // padding style
  isRounded: boolean; // 둥근 버튼 여부
  onDelete?: (value?: string) => void; // 삭제 버튼 클릭 시 호출될 함수
  hasCheckIcon: boolean; // 왼쪽에 체크 아이콘 표시 여부
  borderColor?: string;
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
  backgroundColor,
  color,
  fontStyle,
}: TagProps) => {
  return (
    <div
      className={`w-fit h-fit flex items-center gap-[0.5rem] ${padding} ${backgroundColor} ${color} ${borderColor} ${borderColor ? 'border' : ''} ${fontStyle} ${isRounded ? 'rounded' : 'rounded-sm'}`}
    >
      {hasCheckIcon && <TagCheckIcon color={color} />}
      {value}
      {onDelete && (
        <button onClick={() => onDelete(value)}>
          <TagDeleteIcon color={'#252525'} />
        </button>
      )}
    </div>
  );
};

export default Tag;
