import { useMemo } from 'react';
import { postTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

export const useFormattedVisa = (
  visaData: string[] | undefined,
  userType: string,
) => {
  return useMemo(() => {
    if (!visaData || visaData.length === 0) return '';
    const visaList = visaData.map((visa) => visa.replace(/_/g, '-')).sort();

    if (visaList.length === 1) return visaList[0];

    const additionalText = postTranslation.visaAdditional[isEmployer(userType)];
    return `${visaList[0]}${additionalText}${visaList.length - 1}`;
  }, [visaData, userType]);
};
