import { profileTranslation } from '@/constants/translation';
import { WorkPreferenceType } from '@/types/postApply/resumeDetailItem';
import { formatArea, formatEnumValue } from '@/utils/editResume';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';

type WorkPreferenceProps = {
  data: WorkPreferenceType;
};

const WorkPreferenceDetail = ({ data }: WorkPreferenceProps) => {
  const pathname = useLocation().pathname;
  return (
    <div className="flex flex-col divide-y divide-neutral-100">
      {/* Preferred Work Area */}
      <div className="body-14-medium text-text-strong mb-2 py-4">
        {profileTranslation.workPreferenceRegion[isEmployer(pathname)]}
        <div className="flex flex-wrap gap-2">
          {data.preference_addresses.map((area, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 rounded-sm bg-surface-secondary text-text-normal caption-12-regular"
            >
              {formatArea(area)}
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Job Type */}
      <div className="flex flex-col gap-3 py-4">
        <div className="body-14-medium text-text-strong">
          Preferred Job Type
        </div>
        <div className="flex flex-wrap gap-2">
          {data.employment_types.map((type, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 rounded-sm bg-surface-secondary text-text-normal caption-12-regular"
            >
              {formatEnumValue(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Job Position */}
      <div className="flex flex-col gap-3 py-4">
        <div className="body-14-medium text-text-strong">
          Preferred Job Position
        </div>
        <div className="flex flex-wrap gap-2">
          {data.job_categories.map((industry, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5  rounded-sm bg-surface-secondary text-text-normal caption-12-regular"
            >
              {formatEnumValue(industry)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPreferenceDetail;
