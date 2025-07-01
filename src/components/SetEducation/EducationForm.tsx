import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import Dropdown from '@/components/Common/Dropdown';
import {
  PostEducationType,
  SchoolSummary,
} from '@/types/postResume/postEducation';
import { EducationLevels, MajorsEn } from '@/constants/manageResume';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchSchools from '@/components/SetEducation/SearchSchools';
import { School } from '@/types/api/document';
import { formatDateInput } from '@/utils/information';
import InputLayout from '../WorkExperience/InputLayout';

type EducationFormProps = {
  educationData: PostEducationType;
  setEducationData: Dispatch<SetStateAction<PostEducationType>>;
  initialSchool?: SchoolSummary | School;
};

const EducationForm = ({
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

  const handleGradeChange = (value: string) => {
    // 1~6 사이의 숫자만 추출
    const formattedValue = value === 'null' ? '' : value;
    const processedValue = formattedValue.replace(/[^1-6]/g, '').slice(0, 1);
    setEducationData((prev) => ({ ...prev, grade: processedValue }));
  };

  const handleGpaChange = (value: string) => {
    const formattedValue = value === 'null' ? '' : value;

    if (formattedValue === '') {
      setEducationData((prev) => ({ ...prev, gpa: '' }));
      return;
    }

    // 숫자와 소수점만 추출하고 첫 자리는 0-4로 제한
    const numericValue = formattedValue.replace(/[^0-9.]/g, '');
    const firstDigitLimited = numericValue.replace(/^[5-9]/, '4');

    // 패턴 매칭으로 포맷팅
    const match = firstDigitLimited.match(/^([0-4])\.?(\d)?/);
    const processedValue = match
      ? match[2] !== undefined
        ? `${match[1]}.${match[2]}`
        : firstDigitLimited.includes('.')
          ? `${match[1]}.`
          : match[1]
      : '';

    setEducationData((prev) => ({
      ...prev,
      gpa: processedValue,
    }));
    return;
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
      <div className="px-4 flex flex-col gap-6 pb-28">
        {/* 교육 기관 타입 선택 */}
        <InputLayout title="Education level">
          <Dropdown
            value={educationData.education_level}
            placeholder="Select your level of education"
            options={EducationLevels}
            setValue={(value) => handleInputChange('education_level', value)}
          />
        </InputLayout>
        {/* 학교명 선택 */}
        <InputLayout title="School Name">
          <div onClick={() => setSearchOpen(true)}>
            <Input
              inputType={InputType.SEARCH}
              placeholder="Search your school name"
              value={school?.name || ''}
              onChange={() => {}}
              canDelete={false}
            />
          </div>
        </InputLayout>
        {/* 전공 입력 */}
        <InputLayout title="Major">
          <Dropdown
            value={educationData.major}
            placeholder="Select your major"
            options={MajorsEn}
            setValue={(value) => handleInputChange('major', value)}
          />
        </InputLayout>
        {/* 학년 입력 */}
        <InputLayout title="Year Of Schooling">
          <Input
            inputType={InputType.TEXT}
            placeholder="Enter your year (1 ~ 6)"
            value={
              String(educationData.grade) === 'null'
                ? ''
                : String(educationData.grade)
            }
            onChange={(value) => handleGradeChange(value)}
            canDelete={false}
          />
        </InputLayout>
        {/* 학점 입력 */}
        <InputLayout title="GPA">
          <Input
            inputType={InputType.TEXT}
            placeholder="Enter your GPA (ex. 3.5)"
            value={String(educationData.gpa)}
            onChange={(value) => handleGpaChange(value)}
            canDelete={false}
          />
        </InputLayout>
        <div className="flex flex-row gap-2">
          {/* 입학 날짜 입력 */}
          <InputLayout title="Entrance Date">
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
          <InputLayout title="Graduation Date">
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
      </div>
    </>
  );
};

export default EducationForm;
