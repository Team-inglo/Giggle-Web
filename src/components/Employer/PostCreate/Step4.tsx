import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { buttonTypeKeys } from '@/constants/components';
import { phone } from '@/constants/information';
import { InputType } from '@/types/common/input';
import type { Image, JobPostingForm } from '@/types/postCreate/postCreate';
import { ChangeEvent, useEffect, useState } from 'react';
import AddFileIcon from '@/assets/icons/FileAddIcon.svg?react';
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from '@/utils/information';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';

const Step4 = ({
  postInfo,
  onNext,
  onPrev,
  isEdit,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
  onPrev: () => void;
  isEdit?: boolean;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>({
    images: postInfo.images.filter(
      (image): image is File => image instanceof File,
    ),
    body: { ...postInfo.body },
  });
  const [storedImageUrls, setStoredImageUrls] = useState<Image[]>(
    // 이미지 수정 시 기존 이미지를 불러와 저장 (id, img_url이 있는 경우 기존 이미지)
    isEdit
      ? postInfo.images.filter((image) => 'id' in image && 'img_url' in image)
      : [],
  );
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: newPostInfo.body.recruiter_phone_number
      ? parsePhoneNumber(newPostInfo.body.recruiter_phone_number).start
      : '010',
    middle: newPostInfo.body.recruiter_phone_number
      ? parsePhoneNumber(newPostInfo.body.recruiter_phone_number).middle
      : '',
    end: newPostInfo.body.recruiter_phone_number
      ? parsePhoneNumber(newPostInfo.body.recruiter_phone_number).end
      : '',
  });
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const basicEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { recruiter_name, recruiter_email } = newPostInfo.body;

    const isFormValid =
      (recruiter_name !== '' &&
        basicEmailRegex.test(recruiter_email) &&
        isValidPhoneNumber(phoneNum) &&
        newPostInfo.images.length > 0) ||
      storedImageUrls.length > 0;
    setIsInvalid(!isFormValid);
  }, [newPostInfo, phoneNum]);

  // 이미지 선택
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 현재 이미지와 새 이미지의 총 개수가 10개를 초과하는지 확인
    const currentImageCount = newPostInfo.images.length;
    const newFilesCount = files.length;
    const totalCount = currentImageCount + newFilesCount;

    // 10개 제한 처리
    if (totalCount > 10) {
      alert('이미지는 최대 10개까지만 업로드할 수 있습니다.');
      const availableSlots = 10 - currentImageCount;
      const filesToAdd = Array.from(files).slice(0, availableSlots);

      const newFiles = [...newPostInfo.images] as File[];
      filesToAdd.forEach((file) => newFiles.push(file));
      setNewPostInfo({ ...newPostInfo, images: newFiles });
    } else {
      // 모든 파일 추가
      const newFiles = [...newPostInfo.images] as File[];
      Array.from(files).forEach((file) => newFiles.push(file));
      setNewPostInfo({ ...newPostInfo, images: newFiles });
    }
  };

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 담당자 이름 입력 */}
        <InputLayout title="담당자 이름" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="채용 담당자 이름을 입력해주세요"
            value={newPostInfo.body.recruiter_name}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, recruiter_name: value },
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 담당자 이메일 입력 */}
        <InputLayout title="담당자 이메일" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="채용 담당자 이메일을 입력해주세요"
            value={newPostInfo.body.recruiter_email}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, recruiter_email: value },
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 담당자 휴대폰 번호 입력 */}
        <InputLayout title="담당자 전화번호" isEssential>
          <div className="w-full flex flex-row gap-2 justify-between">
            <div className="w-full h-[2.75rem]">
              <Dropdown
                value={phoneNum.start}
                placeholder="010"
                options={phone}
                setValue={(value) => setPhoneNum({ ...phoneNum, start: value })}
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={phoneNum.middle}
              onChange={(value) => setPhoneNum({ ...phoneNum, middle: value })}
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={phoneNum.end}
              onChange={(value) => setPhoneNum({ ...phoneNum, end: value })}
              canDelete={false}
            />
          </div>
        </InputLayout>
        {/* 근무 회사 사진 입력 */}
        <InputLayout title="근무 회사 사진" isEssential>
          <div className="w-full relative body-3 px-1 pb-1.5 text-[#222] text-left">
            사진이 있으면 관심 확률이 올라가요 !
          </div>
          <div className="w-full overflow-x-scroll no-scrollbar flex gap-2 item-center justify-start">
            {newPostInfo.images.length < 10 && (
              <label className="cursor-pointer" htmlFor="logo-upload">
                <div className="w-[7.5rem] h-[7.5rem] rounded-lg flex items-center justify-center shadow-sm bg-white border border-[#eae9f6] px-4 py-2.5">
                  <AddFileIcon />
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                />
              </label>
            )}
            {/* 기존 이미지들(cdn 링크를 반환 받으므로 신규로 추가한 이미지와 분리해 처리) */}
            {storedImageUrls[0] &&
              storedImageUrls.map((image, idx) => (
                <div className="w-[7.5rem] h-[7.5rem] relative rounded-lg flex flex-row items-center justify-center  bg-no-repeat bg-top text-left text-gray-400">
                  <div className="w-[7.5rem] h-[7.5rem] flex items-center justify-center rounded-lg">
                    <img
                      src={String(image.img_url)}
                      className="w-[7.5rem] h-[7.5rem] rounded-lg object-cover"
                    />
                    <div
                      className="absolute top-[0.625rem] right-[0.625rem]"
                      onClick={() => {
                        const deletedImgs = newPostInfo.body.deleted_img_ids
                          ? newPostInfo.body.deleted_img_ids
                          : [];
                        deletedImgs.push(Number(image.id));
                        setStoredImageUrls((prev) =>
                          prev.filter((_, i) => i !== idx),
                        );
                        setNewPostInfo({
                          ...newPostInfo,
                          body: {
                            ...newPostInfo.body,
                            deleted_img_ids: deletedImgs,
                          },
                        });
                      }}
                    >
                      <CircleDeleteIcon />
                    </div>
                  </div>
                </div>
              ))}
            {newPostInfo.images[0] &&
              newPostInfo.images.map((image, idx) => (
                <div className="w-[7.5rem] h-[7.5rem] relative rounded-lg flex flex-row items-center justify-center  bg-no-repeat bg-top text-left text-gray-400">
                  <div className="w-[7.5rem] h-[7.5rem] flex items-center justify-center rounded-lg">
                    <img
                      src={URL.createObjectURL(image as File)}
                      className="w-[7.5rem] h-[7.5rem] rounded-lg object-cover"
                    />
                    <div
                      className="absolute top-[0.625rem] right-[0.625rem]"
                      onClick={() => {
                        setNewPostInfo((prev) => ({
                          ...prev,
                          images: prev.images.filter(
                            (_, i) => i !== idx,
                          ) as File[],
                        }));
                      }}
                    >
                      <CircleDeleteIcon />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </InputLayout>
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <div className="w-full flex gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-text-normal"
            isBorder={false}
            title="이전"
            onClick={() => onPrev()}
          />
          <Button
            type="large"
            bgColor={isInvalid ? 'bg-surface-secondary' : 'bg-surface-primary'}
            fontColor={isInvalid ? 'text-text-disabled' : 'text-text-normal'}
            isBorder={false}
            title="다음"
            onClick={
              isInvalid
                ? undefined
                : () =>
                    onNext({
                      ...postInfo,
                      body: {
                        ...newPostInfo.body,
                        recruiter_phone_number: formatPhoneNumber(phoneNum),
                      },
                      images: [...newPostInfo.images, ...storedImageUrls],
                    })
            }
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};
export default Step4;
