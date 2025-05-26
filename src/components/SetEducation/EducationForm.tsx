import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import Dropdown from '@/components/Common/Dropdown';
import {
  PostEducationType,
  SchoolSummary,
} from '@/types/postResume/postEducation';
import { EducationLevels, MajorsEn } from '@/constants/manageResume';
import GraySearchIcon from '@/assets/icons/ManageResume/GraySearchIcon.svg?react';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchSchools from '@/components/SetEducation/SearchSchools';
import { School } from '@/types/api/document';
import { formatDateInput } from '@/utils/information';
import InputLayout from '../WorkExperience/InputLayout';

type EducationFormProps = {
  mode: 'post' | 'patch';
  educationData: PostEducationType;
  setEducationData: Dispatch<SetStateAction<PostEducationType>>;
  initialSchool?: SchoolSummary | School;
};

const EducationForm = ({
  mode,
  educationData,
  setEducationData,
  initialSchool,
}: EducationFormProps) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [school, setSchool] = useState<SchoolSummary | School | undefined>(
    initialSchool,
  );

  const handleSchoolChange = (school: SchoolSummary | School) => {
    setSchool(school);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEducationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: 'grade' | 'gpa', value: string) => {
    const formattedValue = value === 'null' ? '' : value;
    handleInputChange(field, formattedValue);
  };

  return (
    <>
      {searchOpen && (
        <SearchSchools
          setSchool={handleSchoolChange}
          setSearchOpen={setSearchOpen}
          handleInputChange={handleInputChange}
        />
      )}
      <div className="p-4 flex flex-col gap-3">
        <div className="heading-24-semibold mb-6 text-text-strong">
          {mode === 'post' ? 'Add Education' : 'Modify Education'}
        </div>
        {/* 교육 기관 타입 선택 */}
        <InputLayout title="Education Levels" isEssential={true}>
          <Dropdown
            value={educationData.education_level}
            placeholder="2-Year university"
            options={EducationLevels}
            setValue={(value) => handleInputChange('education_level', value)}
          />
        </InputLayout>
        {/* 학교명 선택 */}
        <InputLayout title="Name Of School" isEssential={true}>
          <div
            className="w-full py-2.5 px-4 flex items-center gap-2.5 border border-solid border-surface-tertiary rounded-xl"
            onClick={() => setSearchOpen(true)}
          >
            <GraySearchIcon />
            {/* 선택되었다면, 선택한 학교명 */}
            <p
              className={`body-14-regular ${
                school ? 'text-text-normal' : 'text-text-disabled'
              }`}
            >
              {school ? school.name : 'Search Name of school'}
            </p>
          </div>
        </InputLayout>
        {/* 전공 입력 */}
        <InputLayout title="Department (major)" isEssential={true}>
          <Dropdown
            value={educationData.major}
            placeholder="Education Title"
            options={MajorsEn}
            setValue={(value) => handleInputChange('major', value)}
          />
        </InputLayout>
        {/* 학년 입력 */}
        <InputLayout title="Grade" isEssential={true}>
          <Input
            inputType={InputType.TEXT}
            placeholder="Grade"
            value={
              String(educationData.grade) === 'null'
                ? ''
                : String(educationData.grade)
            }
            onChange={(value) => handleNumberChange('grade', value)}
            canDelete={false}
          />
        </InputLayout>
        {/* 학점 입력 */}
        <InputLayout title="Credit" isEssential={true}>
          <Input
            inputType={InputType.TEXT}
            placeholder="0.0"
            value={String(educationData.gpa)}
            onChange={(value) => handleNumberChange('gpa', value)}
            canDelete={false}
          />
        </InputLayout>
        {/* 입학 날짜 입력 */}
        <InputLayout title="Entrance Date" isEssential={true}>
          <Input
            inputType={InputType.TEXT}
            placeholder="YYYY-MM-DD"
            value={educationData.start_date || ''}
            onChange={(value) =>
              handleInputChange('start_date', formatDateInput(value))
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 졸업 날짜 입력 */}
        <InputLayout title="Graduation Date" isEssential={true}>
          <Input
            inputType={InputType.TEXT}
            placeholder="YYYY-MM-DD"
            value={educationData.end_date || ''}
            onChange={(value) =>
              handleInputChange('end_date', formatDateInput(value))
            }
            canDelete={false}
          />
        </InputLayout>
      </div>
    </>
  );
};

export default EducationForm;
