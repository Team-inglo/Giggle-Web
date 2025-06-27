import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationForm from '@/components/SetEducation/EducationForm';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import PageTitle from '@/components/Common/PageTitle';
import { useEducation } from '@/hooks/useEducation';
import { LoadingOverLay } from '@/components/Common/LoadingItem';

const EducationPage = () => {
  const {
    mode,
    isPending,
    educationData,
    setEducationData,
    initialData,
    schoolData,
    isValid,
    pageTitle,
    handleBackButtonClick,
    handleSubmit,
    handleReset,
  } = useEducation();

  const isReady =
    mode === 'post' || (mode === 'patch' && initialData && !isPending);

  if (!isReady) {
    return <LoadingOverLay />;
  }

  return (
    <>
      <div className="mb-24">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={handleBackButtonClick}
          hasMenuButton={false}
          title="Education"
        />
        <PageTitle title={pageTitle} />
        <EducationForm
          educationData={educationData}
          setEducationData={setEducationData}
          initialSchool={schoolData}
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
              onClick={isValid ? handleReset : undefined}
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

export default EducationPage;
