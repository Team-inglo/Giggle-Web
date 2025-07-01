import { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  usePostEducation,
  usePatchEducation,
  useGetEducation,
} from '@/hooks/api/useResume';
import {
  PostEducationType,
  SchoolSummary,
} from '@/types/postResume/postEducation';
import { EducationRequest } from '@/types/api/resumes';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';
import {
  isObjectEqual,
  transformToPatchEducation,
  educationDataValidation,
} from '@/utils/editResume';
import { getMajorEnumFromEn } from '@/utils/resume';

export const useEducationApi = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mode: 'post' | 'patch' = useMemo(() => (id ? 'patch' : 'post'), [id]);

  const { mutate: postMutate } = usePostEducation();
  const { mutate: patchMutate } = usePatchEducation();

  const [initialData, setInitialData] = useState<PostEducationType>();
  const [schoolData, setSchoolData] = useState<SchoolSummary>();

  const { data: getEducationData, isPending } = useGetEducation(id || '');

  const submitEducation = (educationData: PostEducationType) => {
    if (mode === 'post') {
      if (!educationDataValidation(educationData)) return;

      const formattedEducationData = {
        ...educationData,
        education_level: educationData.education_level
          ?.trim()
          .toUpperCase() as EducationLevelType,
        gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
        grade: educationData.grade ? Number(educationData.grade) : 0,
        major: getMajorEnumFromEn(educationData.major || '') || '',
      };
      postMutate(formattedEducationData as EducationRequest);
    } else {
      const isUnchanged = isObjectEqual(educationData, initialData);
      if (isUnchanged) {
        navigate('/profile/manage-resume');
        return;
      }

      const formattedPatchData = {
        ...educationData,
        education_level: educationData.education_level
          ?.trim()
          .toUpperCase() as EducationLevelType,
        gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
        grade: educationData.grade ? Number(educationData.grade) : 0,
        major: getMajorEnumFromEn(educationData.major || '') || '',
      };
      patchMutate({
        id: id!,
        education: formattedPatchData as EducationRequest,
      });
    }
  };

  useEffect(() => {
    if (mode === 'patch' && getEducationData) {
      const transformedData = transformToPatchEducation(getEducationData.data);
      setInitialData(transformedData);
      setSchoolData(getEducationData.data.school);
    }
  }, [getEducationData, mode]);

  return { mode, isPending, initialData, schoolData, submitEducation };
};
