import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationForm from '@/components/SetEducation/EducationForm';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import PageTitle from '@/components/Common/PageTitle';
import { useEducationApi } from '@/hooks/useEducationApi';
import { useEducationForm } from '@/hooks/useEducationForm';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import useNavigateBack from '@/hooks/useNavigateBack';

const EducationPage = () => {
  const { mode, isPending, initialData, schoolData, submitEducation } =
    useEducationApi();
  const { educationData, setEducationData, isValid, handleReset, pageTitle } =
    useEducationForm({ initialData, mode });

  const handleBackButtonClick = useNavigateBack();

  const handleSubmit = () => {
    if (isValid) {
      submitEducation(educationData);
    }
  };

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
              onClick={handleReset}
            />
            <Button
              type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
              size={Button.Size.LG}
              isFullWidth
              title="Save"
              onClick={handleSubmit}
            />
          </div>
        ) : (
          <Button
            type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
            size={Button.Size.LG}
            isFullWidth
            title="Save"
            onClick={handleSubmit}
          />
        )}
      </BottomButtonPanel>
    </>
  );
};

export default EducationPage;
