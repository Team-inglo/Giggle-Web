import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { WorkExperienceRequest } from '@/types/api/resumes';
import { formatDateInput } from '@/utils/information';

type WorkExperienceFormProps = {
  workExperienceData: WorkExperienceRequest;
  setWorkExperienceData: React.Dispatch<
    React.SetStateAction<WorkExperienceRequest>
  >;
};

const WorkExperienceForm = ({
  workExperienceData,
  setWorkExperienceData,
}: WorkExperienceFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOngoing, setIsOngoing] = useState(false);

  const handleOngoingToggle = () => {
    const newIsOngoing = !isOngoing;
    setIsOngoing(newIsOngoing);
    if (newIsOngoing) {
      handleInputChange('end_date', '');
    }
  };

  const handleFocusTextArea = () => {
    textareaRef.current?.focus();
    const length = textareaRef.current!.value.length;
    textareaRef.current!.selectionStart = length;
    textareaRef.current!.selectionEnd = length;
  };

  const handleInputChange = (
    field: keyof WorkExperienceRequest,
    value: string,
  ) => {
    if ((field === 'title' || field === 'workplace') && value.length > 20) {
      return;
    }
    setWorkExperienceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 200) {
      handleInputChange('description', event.target.value);
    }
  };

  const handleDateChange = (
    field: 'start_date' | 'end_date',
    value: string,
  ) => {
    const formattedValue = formatDateInput(value);
    handleInputChange(field, formattedValue);
    if (field === 'end_date' && value) {
      setIsOngoing(false);
    }
  };

  useEffect(() => {
    setIsOngoing(!workExperienceData.end_date);
  }, [workExperienceData.end_date]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [workExperienceData.description]);

  return (
    <div className="px-4 flex flex-col gap-6 pb-28">
      <InputLayout title="Job Title">
        <Input
          inputType={InputType.TEXT}
          placeholder="ex. Cafe part-time job"
          value={workExperienceData.title}
          onChange={(value) => handleInputChange('title', value)}
          canDelete={false}
        />
      </InputLayout>
      <InputLayout title="Worksplace">
        <Input
          inputType={InputType.TEXT}
          placeholder="ex. Starbucks(Hongdae)"
          value={workExperienceData.workplace}
          onChange={(value) => handleInputChange('workplace', value)}
          canDelete={false}
        />
      </InputLayout>
      <div className="flex flex-row gap-2">
        <InputLayout title="Start Date">
          <Input
            inputType={InputType.TEXT}
            placeholder="YYYY-MM-DD"
            value={workExperienceData.start_date || ''}
            onChange={(value) => handleDateChange('start_date', value)}
            canDelete={false}
          />
        </InputLayout>
        <InputLayout title="End Date">
          <Input
            inputType={InputType.TEXT}
            placeholder="YYYY-MM-DD"
            value={workExperienceData.end_date || ''}
            onChange={(value) => handleDateChange('end_date', value)}
            canDelete={false}
          />
        </InputLayout>
      </div>
      <div
        className="flex items-center gap-3 -mt-4 cursor-pointer"
        onClick={handleOngoingToggle}
      >
        <div
          className={`w-4 h-4 rounded-sm border ${isOngoing ? 'bg-primary-normal border-0' : 'border-border-alternative'}`}
        />
        <p className="caption-12-regular text-text-assistive">
          I'm currently working here
        </p>
      </div>
      <InputLayout title="Job Description" isOptional>
        <div
          onClick={handleFocusTextArea}
          className="w-full min-h-32 px-4 py-[0.875rem] flex flex-col justify-between gap-2.5 rounded-[0.625rem] border-[0.05rem] border-border-assistive"
        >
          <textarea
            ref={textareaRef}
            placeholder="Briefly describe what you did (ex. served food, cleaned tables, taught English)"
            value={workExperienceData.description}
            onChange={handleTextareaChange}
            className="h-auto body-16-medium placeholder:text-text-assistive w-full resize-none outline-none"
          />
          <span className="caption-12-regular text-text-assistive text-end">
            {workExperienceData.description.length}/200
          </span>
        </div>
      </InputLayout>
    </div>
  );
};

export default WorkExperienceForm;
