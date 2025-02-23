import SearchIcon from '@/assets/icons/SubHeaderSearchIcon.svg?react';
import MoreInfoIcon from '@/assets/icons/MoreInfoIcon.svg?react';
import { subHeaderTypeKeys, SubHeaderTypeUnion } from '@/constants/components';

type SubHeaderProps = {
  type: SubHeaderTypeUnion; // sub header의 타입
  title?: string; // 검색 기능이 없을 경우 타이틀
  body?: string; // 검색 기능이 없을 경우 상세 글
  placeHolder?: string; // 검색 기능이 있을 경우 placeHolder 값
  value?: string; // 검색 기능이 있을 경우 value 값
  onChange?: (value: string) => void; // 검색 기능이 있을 경우 onChange
  onSearch?: () => void; // 검색 기능이 있을 경우 '검색 버튼' 클릭 트리거
  onClickMenu?: () => void; // 검색 기능이 있을 경우 '메뉴 버튼' 클릭 트리거
};

const SubHeader = ({
  type,
  title,
  body,
  placeHolder,
  value = '',
  onChange,
  onSearch,
  onClickMenu,
}: SubHeaderProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const NormalHeader = () => {
    return (
      <div className="h-fit w-[90%]">
        <div className="flex justify-start pt-2.5 pr-3 pb-2 pl-5">
          <div className="h-9 flex items-end head-3">{title}</div>
        </div>
      </div>
    );
  };

  const InfoHeader = () => (
    <div className="w-full px-8 pt-6 pb-7 rounded-b-lg shadow-subHeaderShadow">
      <h1 className="w-[70%] head-2">{title}</h1>
      <p className="w-[70%] caption">{body}</p>
    </div>
  );

  return (
    <>
      {/* SEARCH case는 input 컴포넌트 리렌더링 방지를 위해 컴포넌트화 하지 않았습니다.  */}
      {type === subHeaderTypeKeys.SEARCH && (
        <div className="h-fit w-[90%]">
          <div className="flex justify-between items-center pt-2.5 pr-3 pb-2 pl-5">
            <div className="h-9 w-full flex items-end">
              <input
                type="text"
                placeholder={placeHolder}
                value={value}
                onChange={handleInputChange}
                className="w-[90%] outline-none head-3"
              />
            </div>
            <div className="flex justify-center items-center gap-[0.125rem]">
              <button
                onClick={onSearch}
                className="flex justify-center items-center w-9 h-9"
              >
                <SearchIcon />
              </button>
              <button
                onClick={onClickMenu}
                className="flex justify-center items-center w-9 h-9"
              >
                <MoreInfoIcon />
              </button>
            </div>
          </div>
        </div>
      )}
      {type === subHeaderTypeKeys.STATIC && <NormalHeader />}
      {type === subHeaderTypeKeys.DETAIL && <InfoHeader />}
    </>
  );
};

export default SubHeader;
