import { useCallback, useState } from 'react';
import { useSearchSchool } from '@/hooks/api/useDocument';
import {
  IntegratedApplicationData,
  SearchSchoolResponse,
} from '@/types/api/document';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { School } from '@/types/api/document';
import { RESTYPE } from '@/types/api/common';
import { BottomSheet } from '@/components/Common/BottomSheet';

type SearchSchoolBottomSheetProps = {
  newDocumentData: IntegratedApplicationData;
  setNewDocumentData: (data: IntegratedApplicationData) => void;
  isShowBottomsheet: boolean;
  onClose: () => void;
};

const SearchSchoolBottomSheet = ({
  newDocumentData,
  setNewDocumentData,
  isShowBottomsheet,
  onClose,
}: SearchSchoolBottomSheetProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<School[]>();
  const { searchSchool } = useSearchSchool({
    onSuccess: (data: RESTYPE<SearchSchoolResponse>) =>
      setSearchResult(data.data.school_list),
  });

  // 검색 입력 시 실시간으로 검색 진행
  const handleAddressSearch = useCallback(
    (name: string) => {
      setSearchValue(name);
      if (name !== '') {
        searchSchool(name);
      } else {
        setSearchResult([]);
      }
    },
    [searchSchool],
  );

  // 학교 선택 시 자동 입력 및 bottomsheet 제거
  const handleSelect = (name: string) => {
    setNewDocumentData({ ...newDocumentData, school_name: name });
    onClose();
  };
  return (
    <>
      <BottomSheet
        isAvailableHidden={true}
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={() => onClose()}
      >
        <BottomSheet.Header title="Search for school" />

        <BottomSheet.Content>
          <Input
            inputType={InputType.SEARCH}
            placeholder="Name of School"
            value={searchValue}
            onChange={(name: string) => handleAddressSearch(name)}
            canDelete={true}
            onDelete={() =>
              setNewDocumentData({ ...newDocumentData, school_name: '' })
            }
          />
          <div className="w-full h-[30vh]">
            {searchResult && searchResult?.length > 0 && (
              <div className="w-full relative rounded-2xl bg-surface-base flex flex-row items-start justify-start pl-1 text-left text-text-normal body-14-medium">
                <div className="flex-1 flex flex-col items-start justify-start gap-1">
                  {searchResult.map((school) => (
                    <div
                      className="self-stretch overflow-hidden flex items-center justify-start px-3.5 py-2.5"
                      onClick={() => handleSelect(school.name)}
                    >
                      <div className="relative">{school.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default SearchSchoolBottomSheet;
