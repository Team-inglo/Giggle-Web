import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { Dispatch, SetStateAction } from 'react';
import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';

type EtcLanguageCardProps = {
  language: EtcLanguageData;
  isSelected: boolean; // 선택된 카드의 css 스타일 적용을 위함
  setSelectedLanguage?: Dispatch<SetStateAction<EtcLanguageData>>;
};

const LanguageSelectCard = ({
  language,
  isSelected,
  setSelectedLanguage,
}: EtcLanguageCardProps) => {
  return (
    // 언어 카드
    <div
      className={`flex items-center gap-4 p-3 cursor-pointer justify-between text-text-strong ${isSelected ? 'body-16-medium' : 'body-16-regular]'}`}
      onClick={() => setSelectedLanguage && setSelectedLanguage(language)}
    >
      <div>{language.language}</div>
      {isSelected && <Icon name="arrow-right" icon={CheckIcon} />}
    </div>
  );
};

export default LanguageSelectCard;
