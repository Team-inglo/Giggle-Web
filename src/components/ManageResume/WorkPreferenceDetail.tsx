import {
  WorkPreferenceType,
} from '@/types/postApply/resumeDetailItem';
import { formatArea, formatEnumValue } from '@/utils/editResume';

type WorkPreferenceProps = {
  data: WorkPreferenceType;
};

const WorkPreferenceDetail = ({ data }: WorkPreferenceProps) => {

  return (
    <div className="flex flex-col gap-4">
      {/* Preferred Work Area */}
      <div>
        <div className="body-3 text-text-assistive mb-2">
          Preferred Work Area
        </div>
        <div className="flex flex-wrap gap-2">
          {data.preference_addresses.map((area, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded bg-surface-secondary text-text-normal body-3"
            >
              {formatArea(area)}
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Job Type */}
      <div>
        <div className="body-3 text-text-assistive mb-2">
          Preferred Job Type
        </div>
        <div className="flex flex-wrap gap-2">
          {data.employment_types.map((type, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded bg-surface-secondary text-text-normal body-3"
            >
              {formatEnumValue(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Job Position */}
      <div>
        <div className="body-3 text-text-assistive mb-2">
          Preferred Job Position
        </div>
        <div className="flex flex-wrap gap-2">
          {data.job_categories.map((industry, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded bg-surface-secondary text-text-normal body-3"
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
