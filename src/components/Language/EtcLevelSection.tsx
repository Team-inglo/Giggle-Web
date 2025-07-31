import { Dispatch, SetStateAction, useState } from 'react';
import LevelBottomSheet from '@/components/Language/LevelBottomSheet';
import Icon from '@/components/Common/Icon';
import ArrowIcon from '@/assets/icons/ArrowUp.svg?react';

type EtcLevelSectionProps = {
  level: string | null;
  setLevel: Dispatch<SetStateAction<string>>;
};

const EtcLevelSection = ({ level, setLevel }: EtcLevelSectionProps) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <>
      <div className="flex mt-3" onClick={() => setBottomSheetOpen(true)}>
        <div className="w-full h-[3.25rem] relative rounded-[0.625rem] bg-surface-base border-[0.05rem] border-border-assistive box-border flex flex-row items-center justify-center px-4 py-[0.875rem] pl-4 text-left body-16-medium">
          <div className="flex-1 h-5 flex flex-row items-center justify-between">
            <input
              className="w-full relative leading-5 outline-none bg-surface-base"
              value={level ?? ''}
              placeholder="Select Level"
              readOnly
            />
            {/* 드롭다운 토글 버튼 */}
            <button className="p-0 rounded-full transition-colors">
              <div
                className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 rotate-180`}
              >
                <Icon
                  icon={ArrowIcon}
                  strokeColor={
                    level !== ''
                      ? 'stroke-text-strong'
                      : 'stroke-text-assistive'
                  }
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 레벨 선택 바텀시트 */}
      {bottomSheetOpen && (
        <LevelBottomSheet
          level={level || ''}
          setLevel={(value) => setLevel(value || '')}
          setBottomSheetOpen={setBottomSheetOpen}
        />
      )}
    </>
  );
};

export default EtcLevelSection;
