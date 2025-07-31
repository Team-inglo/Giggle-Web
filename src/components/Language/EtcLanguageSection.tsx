import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { EtcLanguageData } from '@/types/manageResume/manageResume';
import LanguageSelectCard from '@/components/Language/LanguageSelectCard';

type EtcLanguageSectionProps = {
  languageList: EtcLanguageData[];
  selectedLanguage: EtcLanguageData;
  setSelectedLanguage: Dispatch<SetStateAction<EtcLanguageData>>;
  clearLevel: () => void;
};

const initialLanguage: EtcLanguageData = {
  id: 0,
  language: '',
  country_name: '',
  img_url: '',
};

const EtcLanguageSection = ({
  languageList,
  selectedLanguage,
  setSelectedLanguage,
  clearLevel,
}: EtcLanguageSectionProps) => {
  const [search, setSearch] = useState(selectedLanguage.language || '');
  const [filteredLanguages, setFilteredLanguages] = useState(languageList);

  // 검색어에 따라 언어 리스트 필터링
  useEffect(() => {
    const filteredLang = languageList.filter((language) =>
      language.language.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredLanguages(filteredLang);
  }, [search]);

  const handleSearch = (value: string) => {
    // 검색어 변경 시 선택된 언어, 레벨 초기화
    setSelectedLanguage(initialLanguage);
    setSearch(value);
    clearLevel();
  };

  return (
    <>
      <Input
        inputType={InputType.SEARCH}
        placeholder="Search Language"
        value={search}
        onChange={(value) => handleSearch(value)}
        canDelete={false}
      />
      <div className="mt-6 flex flex-col gap-3">
        {/* 검색된 언어 리스트 */}
        {search.length > 0 &&
          filteredLanguages.map((language) => (
            <LanguageSelectCard
              key={language.id}
              language={language}
              setSelectedLanguage={setSelectedLanguage}
              isSelected={selectedLanguage.id === language.id}
            />
          ))}
      </div>
    </>
  );
};

export default EtcLanguageSection;
