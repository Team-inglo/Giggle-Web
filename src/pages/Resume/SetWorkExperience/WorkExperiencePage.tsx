import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import PageTitle from '@/components/Common/PageTitle';
import WorkExperienceForm from '@/components/WorkExperience/WorkExperienceForm';
import {
  useGetWorkExperience,
  usePatchWorkExperience,
  usePostWorkExperience,
} from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { WorkExperienctRequest } from '@/types/api/resumes';
import {
  isObjectEqual,
  workExperienceDataValidation,
} from '@/utils/editResume';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const WorkExperiencePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  const mode = useMemo(() => (id ? 'patch' : 'post'), [id]);

  const { mutate: postMutate } = usePostWorkExperience();
  const { mutate: patchMutate } = usePatchWorkExperience();

  const initialData = {
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  };

  const [workExperienceData, setWorkExperienceData] =
    useState<WorkExperienctRequest>(initialData);
  const [initialPatchData, setInitialPatchData] =
    useState<WorkExperienctRequest>(initialData);

  const [isValid, setIsValid] = useState<boolean>(false);

  const { data: getWorkExperienceData, isPending } = useGetWorkExperience(
    id || '',
  );

  const handleSubmit = () => {
    const submitData =
      workExperienceData?.description === ''
        ? { ...workExperienceData, description: '-' }
        : workExperienceData;

    if (mode === 'post') {
      postMutate(submitData);
    } else {
      if (isObjectEqual(workExperienceData, initialPatchData)) {
        navigate('/profile/manage-resume');
        return;
      }
      patchMutate({ id: id!, workExperience: submitData });
    }
  };

  const handleReset = () => {
    setWorkExperienceData(initialPatchData);
  };

  useEffect(() => {
    if (mode === 'patch' && getWorkExperienceData) {
      const fetchedData = getWorkExperienceData.data;
      const formattedData =
        fetchedData?.description === '-'
          ? { ...fetchedData, description: '' }
          : fetchedData;

      setWorkExperienceData(formattedData);
      setInitialPatchData(formattedData);
    }
  }, [getWorkExperienceData, mode]);

  useEffect(() => {
    const isDataValid = workExperienceDataValidation(workExperienceData);
    if (mode === 'post') {
      setIsValid(isDataValid);
    } else {
      const hasChanged = !isObjectEqual(workExperienceData, initialPatchData);
      setIsValid(isDataValid && hasChanged);
    }
  }, [workExperienceData, initialPatchData, mode]);

  const pageTitle =
    mode === 'post' ? 'Add Work Experience' : 'Modify Work Experience';

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
