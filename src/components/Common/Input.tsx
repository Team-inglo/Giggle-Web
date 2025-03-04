import { useEffect, useState } from 'react';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';
import VisibleIcon from '@/assets/icons/Hide.svg?react';
import { InputType } from '@/types/common/input';

const INPUT_STATUS = {
  DISABLED: 'DISABLED',
  TYPING: 'TYPING',
  INVALID: 'INVALID',
} as const;

type InputStatus = (typeof INPUT_STATUS)[keyof typeof INPUT_STATUS];

// InputProps 타입 정의: Input 컴포넌트의 props 타입을 지정합니다.
type InputProps = {
  inputType: InputType; // 입력 필드의 타입
  placeholder: string; // 플레이스홀더 텍스트
  value: string | null; // 입력 필드의 현재 값
  onChange: (value: string) => void; // 입력값 변경 시 호출될 함수
  onBlur?: (value: string) => boolean; // 입력 필드에서 포커스가 빠져나갈 때 호출될 함수 (선택적)
  canDelete: boolean; // 삭제 버튼 표시 여부
  clearInvalid?: () => void; // 토글 시 invalid 상태를 해제할 함수 (선택적)
  isInvalid?: boolean; // 유효하지 않은 입력 상태 여부 (선택적)
  onDelete?: () => void; // 삭제 버튼 클릭 시 호출될 함수 (선택적)
  isPrefix?: boolean; // 접두사 여부
  prefix?: string; // 접두사 내용
  isUnit?: boolean; // 단위 여부
  unit?: string; // 단위 내용
};

// inputStyler 함수: 입력 필드의 상태에 따른 스타일을 반환합니다.
const inputStyler = (status: InputStatus) => {
  switch (status) {
    case INPUT_STATUS.DISABLED:
      return 'border-border-disabled [--input-color:#bdbdbd]';
    case INPUT_STATUS.TYPING:
      return 'border-black text-black';
    case INPUT_STATUS.INVALID:
      return 'border-[#FF6F61] text-[#FF6F61] [--input-color:#FF6F61]';
  }
};

// Input 컴포넌트: 재사용 가능한 입력 필드를 렌더링합니다.
const Input = ({
  inputType,
  placeholder,
  onChange,
  onBlur,
  canDelete,
  onDelete,
  clearInvalid,
  isInvalid,
  value,
  isPrefix,
  prefix,
  isUnit,
  unit,
}: InputProps) => {
  // 현재 입력 필드의 상태를 관리합니다.
  const [currentStatus, setCurrentStatus] = useState<InputStatus>(
    isInvalid ? INPUT_STATUS.INVALID : INPUT_STATUS.DISABLED,
  );

  // 비밀번호 표시/숨김 상태를 관리합니다.
  const [showPassword, setShowPassword] = useState(false);

  // isInvalid prop이 변경될 때 상태를 업데이트합니다.
  useEffect(() => {
    if (isInvalid) setCurrentStatus(INPUT_STATUS.INVALID);
  }, [isInvalid]);

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearInvalid) clearInvalid();
    onChange(e.target.value);
  };

  const handleFocus = (type: string) => {
    if (clearInvalid) clearInvalid();
    if (type === 'click') {
      setCurrentStatus(INPUT_STATUS.TYPING);
      return;
    }
    setCurrentStatus(INPUT_STATUS.DISABLED);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur && onBlur(e.target.value) === true) {
      setCurrentStatus(INPUT_STATUS.INVALID);
      return;
    }
    setCurrentStatus(INPUT_STATUS.DISABLED);
  };

  return (
    <div
      className={`w-full h-[3.125rem] flex gap-2 whitespace-nowrap items-center justify-between text-left body-2 border rounded-lg ${inputStyler(currentStatus)} bg-white py-3 pl-4 pr-[14px]`}
    >
      {/* 접두사가 존재할 경우 표시합니다. */}
      {isPrefix && <div className="w-8 body-2 text-[#464646]">{prefix}</div>}
      {/* 검색 타입일 경우 검색 아이콘을 표시합니다. */}
      <input
        placeholder={placeholder}
        value={value ?? ''}
        className={'w-full outline-none placeholder:text-[var(--input-color)]'}
        onClick={() => handleFocus('click')}
        onBlur={handleBlur}
        onChange={handleInputChange}
        type={
          inputType === 'PASSWORD'
            ? showPassword
              ? 'text'
              : 'password'
            : 'text'
        }
      />
      {/* 비밀번호 타입일 경우 표시/숨김 토글 아이콘을 표시합니다. */}
      {/* TODO : 추후 아이콘 추가 되면 비밀번호 가시 여부에 따라서 다른 아이콘 적용*/}
      {inputType === 'SEARCH' && <SearchIcon />}
      {inputType === 'PASSWORD' && (
        <VisibleIcon onClick={() => setShowPassword(!showPassword)} />
      )}
      {/* 입력값 삭제 가능한 경우 삭제 아이콘을 표시합니다. */}
      {canDelete && <CloseIcon onClick={onDelete} />}
      {/* 단위가 존재할 경우 표시합니다. */}
      {isUnit && (
        <div className="text-right w-full body-2 text-[#464646]">
          <div className="w-full">{unit}</div>
        </div>
      )}
    </div>
  );
};

export default Input;
