import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { WorkExperienctRequest } from '@/types/api/resumes';

type WorkExperiencePatchProps = {
  workExperienceData: WorkExperienctRequest;
  setWorkExperienceData: React.Dispatch<
    React.SetStateAction<WorkExperienctRequest>
  >;
};

const WorkExperiencePatch = ({
  workExperienceData,
  setWorkExperienceData,
}: WorkExperiencePatchProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOngoing, setIsOngoing] = useState(false);

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev);
    if (!isOngoing) {
      handleInputChange('end_date', ''); // "진행 중" 체크 시 end_date 초기화
    }
  };

  // text area를 감싼 div 태크 영역 클릭시 text area의 마지막 글자로 자동 포커스되는 함수
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
      <div className="head-1 mb-6 text-[#1E1926]">Modify Work Experience</div>
      {/* title 입력 */}
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
        <Dropdown
          value={workExperienceData.start_date.replace(/-/g, '/')}
          placeholder="Select Date"
          options={[]}
          isCalendar={true}
          setValue={(value) => handleDateChange('start_date', value)}
        />
      </InputLayout>
      {/* 끝 날짜 입력 */}
      <InputLayout title="End Date" isEssential={true} width="w-fit">
        <Dropdown
          value={workExperienceData.end_date?.replace(/-/g, '/')}
          placeholder="Select Date"
          options={[]}
          isCalendar={true}
          setValue={(value) => handleDateChange('end_date', value)}
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
      <InputLayout title="Description" isEssential={true}>
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

export default WorkExperiencePatch;
