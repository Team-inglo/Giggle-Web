import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { Image, JobPostingForm } from '@/types/postCreate/postCreate';
import { ChangeEvent, useState } from 'react';
import AddFileIcon from '@/assets/icons/FileAddIcon.svg?react';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';

interface ImageUploadInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  isEdit?: boolean;
}

const ImageUploadInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  isEdit,
}: ImageUploadInputProps<TFieldValues, TName>) => {
  const { field } = useController({
    control,
    name,
  });

  const [storedImageUrls, setStoredImageUrls] = useState<Image[]>(
    isEdit && Array.isArray(field.value)
      ? field.value.filter(
          (image: Image) => 'id' in image && 'img_url' in image,
        )
      : [],
  );

  // 이미지 선택
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 현재 이미지와 새 이미지의 총 개수가 10개를 초과하는지 확인
    const currentImages = Array.isArray(field.value) ? field.value : [];
    const currentImageCount = currentImages.length;
    const newFilesCount = files.length;
    const totalCount = currentImageCount + newFilesCount;

    // 10개 제한 처리
    if (totalCount > 10) {
      alert('이미지는 최대 10개까지만 업로드할 수 있습니다.');
      const availableSlots = 10 - currentImageCount;
      const filesToAdd = Array.from(files).slice(0, availableSlots);

      const newFiles = [...currentImages] as File[];
      filesToAdd.forEach((file) => newFiles.push(file));
      field.onChange(newFiles);
    } else {
      // 모든 파일 추가
      const newFiles = [...currentImages] as File[];
      Array.from(files).forEach((file) => newFiles.push(file));
      field.onChange(newFiles);
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (idx: number) => {
    const currentImages = Array.isArray(field.value) ? [...field.value] : [];
    const updatedImages = currentImages.filter((_, i) => i !== idx);
    field.onChange(updatedImages);
  };

  // 기존 이미지 삭제 (수정 모드에서)
  const handleDeleteStoredImage = (idx: number, imageId: number) => {
    const formData = control._formValues as JobPostingForm;
    const deletedImgIds = formData.body.deleted_img_ids || [];

    // 삭제된 이미지 ID 추가
    deletedImgIds.push(imageId);

    // body 업데이트
    formData.body.deleted_img_ids = deletedImgIds;

    // 화면에서 이미지 제거
    setStoredImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const images = Array.isArray(field.value) ? field.value : [];
  const canAddMoreImages = images.length < 10;

  return (
    <div className="w-full overflow-x-scroll no-scrollbar flex gap-2 item-center justify-start">
      {canAddMoreImages && (
        <label className="cursor-pointer" htmlFor="logo-upload">
          <div className="w-[7.5rem] h-[7.5rem] rounded-lg flex items-center justify-center shadow-sm bg-white border border-border-alternative px-4 py-2.5">
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

      {/* 기존 이미지들 - 수정 모드에서만 표시 */}
      {storedImageUrls.map((image, idx) => (
        <div
          key={`stored-${idx}`}
          className="w-[7.5rem] h-[7.5rem] relative rounded-lg flex flex-row items-center justify-center bg-no-repeat bg-top text-left text-gray-400"
        >
          <div className="w-[7.5rem] h-[7.5rem] flex items-center justify-center rounded-lg">
            <img
              src={String(image.img_url)}
              className="w-[7.5rem] h-[7.5rem] rounded-lg object-cover"
              alt={`저장된 이미지 ${idx + 1}`}
            />
            <div
              className="absolute top-[0.625rem] right-[0.625rem] cursor-pointer"
              onClick={() => handleDeleteStoredImage(idx, Number(image.id))}
            >
              <CircleDeleteIcon />
            </div>
          </div>
        </div>
      ))}

      {/* 새로 업로드한 이미지들 */}
      {images
        .filter((img: File) => img instanceof File)
        .map((image: File, idx: number) => (
          <div
            key={`new-${idx}`}
            className="w-[7.5rem] h-[7.5rem] relative rounded-lg flex flex-row items-center justify-center bg-no-repeat bg-top text-left text-gray-400"
          >
            <div className="w-[7.5rem] h-[7.5rem] flex items-center justify-center rounded-lg">
              <img
                src={URL.createObjectURL(image)}
                className="w-[7.5rem] h-[7.5rem] rounded-lg object-cover"
                alt={`새 이미지 ${idx + 1}`}
              />
              <div
                className="absolute top-[0.625rem] right-[0.625rem] cursor-pointer"
                onClick={() => handleDeleteImage(idx)}
              >
                <CircleDeleteIcon />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageUploadInput;
