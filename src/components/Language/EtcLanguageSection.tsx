import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import EtcLanguageCard from '@/components/Language/EtcLanguageCard';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { EtcLanguageData } from '@/types/manageResume/manageResume';

type EtcLanguageSectionProps = {
  languageList: EtcLanguageData[];
  selectedLanguage: EtcLanguageData;
  setSelectedLanguage: Dispatch<SetStateAction<EtcLanguageData>>;
};

const EtcLanguageSection = ({
  languageList,
  selectedLanguage,
  setSelectedLanguage,
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

  return (
    <>
      <Input
        inputType={InputType.SEARCH}
        placeholder="Search Language"
        value={search}
        onChange={(value) => setSearch(value)}
        canDelete={false}
      />
      <div className="mt-6 flex flex-col gap-3">
        {/* 검색된 언어 리스트 */}
        {search.length > 0 && filteredLanguages.map((language) => (
          <EtcLanguageCard
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
