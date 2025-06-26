import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import PageTitle from '@/components/Common/PageTitle';
import LanguageSkillList from '@/components/Language/LanguageSkillList';
import { useGetLanguageSummary } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';

const EditLanguagesPage = () => {
  const { data: languageSummary, isPending } = useGetLanguageSummary();
  const handleBackButtonClick = useNavigateBack();
  return (
    <>
      <BaseHeader
        title="Language"
        hasBackButton
        hasMenuButton={false}
        onClickBackButton={handleBackButtonClick}
      />
      <PageTitle title={`Let's showcase\nyour language skills! 🌏`} />
      {isPending ? (
        <LoadingItem />
      ) : !languageSummary?.success ? (
        <></>
      ) : (
        <LanguageSkillList data={languageSummary.data} />
      )}
    </>
  );
};

export default EditLanguagesPage;
