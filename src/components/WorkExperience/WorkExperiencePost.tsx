import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { WorkExperienctRequest } from '@/types/api/resumes';
import { formatDateInput } from '@/utils/information';

type WorkExperiencePostProps = {
  workExperienceData: WorkExperienctRequest;
  setWorkExperienceData: React.Dispatch<
    React.SetStateAction<WorkExperienctRequest>
  >;
};

const WorkExperiencePost = ({
  workExperienceData,
  setWorkExperienceData,
}: WorkExperiencePostProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // 경력 "진행 중" 인지 여부
  const [isOngoing, setIsOngoing] = useState(false);

  // "진행 중" 체크 시 end_date 초기화
  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev);
    if (!isOngoing) {
      handleInputChange('end_date', '');
    }
  };

  // 텍스트 입력 공간 클릭시 포커스 이동
  const handleFocusTextArea = () => {
    textareaRef.current?.focus();
    const length = textareaRef.current!.value.length;
    textareaRef.current!.selectionStart = length;
    textareaRef.current!.selectionEnd = length;
  };

  const handleInputChange = (
    field: keyof WorkExperienctRequest,
    value: string,
  ) => {
    setWorkExperienceData({ ...workExperienceData, [field]: value });
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
    handleInputChange(field, value.replace(/\//g, '-'));
    if (field === 'end_date') {
      setIsOngoing(false); // 날짜 선택 시 "진행 중" 상태 해제
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [workExperienceData.description]);

  return (
    <div className="p-6 flex flex-col gap-3">
      <div className="head-1 mb-6 text-[rgb(30,25,38)]">
        Add Work Experience
      </div>
      {/* titl 입력 */}
      <InputLayout title="Experience Title" isEssential={true}>
        <Input
          inputType={InputType.TEXT}
          placeholder="Experience Title"
          value={workExperienceData.title}
          onChange={(value) => handleInputChange('title', value)}
          canDelete={false}
        />
      </InputLayout>
      {/* 장소 입력 */}
      <InputLayout title="Workplace" isEssential={true}>
        <Input
          inputType={InputType.TEXT}
          placeholder="Workplace"
          value={workExperienceData.workplace}
          onChange={(value) => handleInputChange('workplace', value)}
          canDelete={false}
        />
      </InputLayout>
      {/* 시작 날짜 입력 */}
      <InputLayout title="Start Date" isEssential={true}>
        <Input
          inputType={InputType.TEXT}
          placeholder="YYYY-MM-DD"
          value={workExperienceData.start_date || ''}
          onChange={(value) =>
            handleDateChange('start_date', formatDateInput(value))
          }
          canDelete={false}
        />
      </InputLayout>
      {/* 끝 날짜 입력 */}
      <InputLayout title="End Date" isEssential={true}>
        <Input
          inputType={InputType.TEXT}
          placeholder="YYYY-MM-DD"
          value={workExperienceData.end_date || ''}
          onChange={(value) =>
            handleDateChange('end_date', formatDateInput(value))
          }
          canDelete={false}
        />
        <div
          className="flex items-center gap-3 mt-2 cursor-pointer"
          onClick={handleOngoingToggle}
        >
          <div
            className={`w-4 h-4 rounded-sm border ${isOngoing ? 'bg-[#FEF387] border-0' : 'border-[#F4F4F9]'}`}
          />
          <p className="body-3 text-[#656565]">It's in progress right now</p>
        </div>
      </InputLayout>
      {/* 상세설명 입력 */}
      <InputLayout title="Description" isEssential={false} isOptional={true}>
        <div
          onClick={handleFocusTextArea}
          className="w-full min-h-32 px-4 py-3 flex flex-col justify-between gap-2.5 rounded-xl border border-[#E2E5EB] shadow-inputFieldShadow p-2"
        >
          <textarea
            ref={textareaRef}
            placeholder="Please write an article that introduces you."
            value={workExperienceData.description}
            onChange={handleTextareaChange}
            className="h-auto body-2 placeholder:text-[#abb0b9] text-[#1E1926] w-full resize-none outline-none"
          />
          <span className="caption text-[#464646] text-end">
            {workExperienceData.description.length}/200
          </span>
        </div>
      </InputLayout>
    </div>
  );
};

export default WorkExperiencePost;
