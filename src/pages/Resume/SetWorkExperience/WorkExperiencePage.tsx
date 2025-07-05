import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import PageTitle from '@/components/Common/PageTitle';
import WorkExperienceForm from '@/components/WorkExperience/WorkExperienceForm';
import { useWorkExperience } from '@/hooks/useWorkExperience';

const WorkExperiencePage = () => {
  const {
    mode,
    isPending,
    workExperienceData,
    setWorkExperienceData,
    isValid,
    pageTitle,
    handleBackButtonClick,
    handleSubmit,
    handleReset,
  } = useWorkExperience();

  if (mode === 'patch' && isPending) {
    return <LoadingOverLay />;
  }

  return (
    <>
      <div className="mb-24">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={handleBackButtonClick}
          hasMenuButton={false}
          title="Work Experience"
        />
        <PageTitle title={pageTitle} />
        <WorkExperienceForm
          workExperienceData={workExperienceData}
          setWorkExperienceData={setWorkExperienceData}
        />
      </div>
      <BottomButtonPanel>
        {mode === 'patch' ? (
          <div className="w-full flex gap-2">
            <Button
              type={Button.Type.NEUTRAL}
              size={Button.Size.LG}
              isFullWidth
              title="Reset"
              onClick={handleReset}
            />
            <Button
              type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
              size={Button.Size.LG}
              isFullWidth
              title="Save"
              onClick={isValid ? handleSubmit : undefined}
            />
          </div>
        ) : (
          <Button
            type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
            size={Button.Size.LG}
            isFullWidth
            title="Save"
            onClick={isValid ? handleSubmit : undefined}
          />
        )}
      </BottomButtonPanel>
    </>
  );
};

export default WorkExperiencePage;
