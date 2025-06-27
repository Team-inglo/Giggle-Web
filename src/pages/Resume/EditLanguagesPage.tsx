import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import PageTitle from '@/components/Common/PageTitle';
import LanguageSkillList from '@/components/Language/LanguageSkillList';
import { useGetLanguageSummary } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';

const EditLanguagesPage = () => {
  const { data: languageSummary, isPending } = useGetLanguageSummary();
  const handleBackButtonClick = useNavigateBack();

  const renderLanguageSkillList = () => {
    if (isPending) {
      return <LoadingItem />;
    } else if (!languageSummary?.success) {
      return <></>;
    }
    return <LanguageSkillList data={languageSummary.data} />;
  };
  return (
    <>
      <BaseHeader
        title="Language"
        hasBackButton
        hasMenuButton={false}
        onClickBackButton={handleBackButtonClick}
      />
      <PageTitle title={`Let's showcase\nyour language skills! 🌏`} />
      {renderLanguageSkillList()}
    </>
  );
};

export default EditLanguagesPage;
