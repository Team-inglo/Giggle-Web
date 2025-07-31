import { useState, useEffect } from 'react';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { School } from '@/types/api/document';
import { useGetSearchSchools } from '@/hooks/api/useResume';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import PageTitle from '@/components/Common/PageTitle';
import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';

type SearchSchoolsProps = {
  setSchool: (school: School) => void;
  setSearchOpen: (value: boolean) => void;
  handleInputChange: (field: string, value: number) => void;
};

const SearchSchools = ({
  setSchool,
  setSearchOpen,
  handleInputChange,
}: SearchSchoolsProps) => {
  // 학교명 검색어 상태 관리
  const [searchSchool, setSearchSchool] = useState<string>('');
  // 선택한 학교 상태 관리
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // 학교 목록의 페이지(서버 요청)
  const [page, setPage] = useState<number>(1);
  const [schoolList, setSchoolList] = useState([]);
  const size = 10;

  // TODO: 무한 스크롤 구현
  const { data: getSchoolList } = useGetSearchSchools(searchSchool, page, size);
  useBodyScrollLock(true);

  useEffect(() => {
    if (getSchoolList) {
      setSchoolList(getSchoolList.data.school_list);
    }
  }, [getSchoolList]);

  // 선택 버튼
  const handleSubmit = () => {
    if (selectedSchool) {
      setSchool(selectedSchool);
      setSearchOpen(false);
      handleInputChange('school_id', selectedSchool.id);
    }
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
  };

  const handleSearchChange = (value: string) => {
    setSearchSchool(value);
    setPage(1); // 새로운 검색어가 들어오면 페이지를 초기화
  };

  return (
    <>
      {schoolList && (
        <div className="fixed top-0 w-screen h-screen bg-white z-50">
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => setSearchOpen(false)}
            hasMenuButton={false}
            title="Education"
          />
          <PageTitle title="Search for educational institutions" />

          <div className="px-4 h-full">
            <Input
              inputType={InputType.SEARCH}
              placeholder="Search Name of school"
              value={searchSchool}
              onChange={handleSearchChange}
              canDelete={true}
              onDelete={() => setSearchSchool('')}
            />
            <div className="h-full mt-2 py-2 body-14-regular text-text-strong overflow-y-scroll">
              {schoolList.length > 0 &&
                schoolList.map((school: School) => (
                  <div
                    key={school.id}
                    className={`flex flex-row justify-between items-center gap-2px-3.5 py-2.5 rounded-lg cursor-pointer`}
                    onClick={() => handleSelectSchool(school)}
                  >
                    <p className="text-text-strong body-14-regular">
                      {school.name}
                    </p>
                    <div className="flex w-6 h-6 flex-shrink-0 justify-center items-center">
                      {selectedSchool?.id === school.id && (
                        <Icon icon={CheckIcon} />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <BottomButtonPanel>
            <Button
              type={
                selectedSchool
                  ? buttonTypeKeys.PRIMARY
                  : buttonTypeKeys.DISABLED
              }
              size={Button.Size.LG}
              isFullWidth
              title="Select"
              onClick={selectedSchool ? handleSubmit : undefined}
            />
          </BottomButtonPanel>
        </div>
      )}
    </>
  );
};

export default SearchSchools;
