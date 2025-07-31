import { useState, useEffect } from 'react';
import {
  InitialEducationData,
  PostEducationType,
} from '@/types/postResume/postEducation';
import { educationDataValidation } from '@/utils/editResume';

interface UseEducationFormProps {
  initialData?: PostEducationType;
  mode: 'post' | 'patch';
}

export const useEducationForm = ({
  initialData,
  mode,
}: UseEducationFormProps) => {
  const [educationData, setEducationData] = useState<PostEducationType>(
    initialData || InitialEducationData,
  );
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setEducationData({
        ...initialData,
        education_level:
          (initialData.education_level &&
            initialData.education_level?.charAt(0).toUpperCase() +
              initialData.education_level?.slice(1).toLowerCase()) ||
          '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    setIsValid(educationDataValidation(educationData));
  }, [educationData]);

  const handleReset = () => {
    if (initialData) {
      setEducationData(initialData);
    }
  };

  const pageTitle =
    mode === 'post'
      ? "Let's add your\neducation background! 🎓"
      : 'Modify Education';

  return { educationData, setEducationData, isValid, handleReset, pageTitle };
};
