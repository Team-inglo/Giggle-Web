import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from 'react-hook-form';
import { Image } from '@/types/postCreate/postCreate';
import { ChangeEvent, useState, useEffect } from 'react';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';
import AddTrigger from '@/components/Common/AddTrigger';
import ImageIcon from '@/assets/icons/ImageIcon.svg?react';
import Icon from '@/components/Common/Icon';

interface ImageUploadInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  isEdit?: boolean;
}

const ImageUploadInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  isEdit,
}: ImageUploadInputProps<TFieldValues, TName>) => {
  const { control, getValues, setValue } = useFormContext<TFieldValues>();

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

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const images = Array.isArray(field.value) ? field.value : [];

    const fileImages: File[] = [];
    images.forEach((img: unknown) => {
      if (img instanceof File) {
        fileImages.push(img);
      }
    });

    const urls = fileImages.map((file) => URL.createObjectURL(file));

    setPreviewUrls(urls);

    // cleanup: 컴포넌트 언마운트 또는 의존성 변경 시 URL 해제
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [field.value]);

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

  const handleDeleteStoredImage = (idx: number, imageId: number) => {
    // deleted_img_ids 업데이트
    const prev = getValues(`body.deleted_img_ids` as Path<TFieldValues>) ?? [];
    setValue(
      `body.deleted_img_ids` as Path<TFieldValues>,
      [...prev, imageId] as PathValue<TFieldValues, Path<TFieldValues>>,
      {
        shouldDirty: true,
      },
    );

    // images 배열에서도 제거
    const currentImages =
      getValues(`images` as Path<TFieldValues>)?.filter(
        (img: Image, i: number) =>
          !(i === idx && 'id' in img && img.id === imageId),
      ) || [];
    setValue(`images` as Path<TFieldValues>, currentImages, {
      shouldDirty: true,
    });

    // UI 상태 동기화
    setStoredImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const images = Array.isArray(field.value) ? field.value : [];
  const canAddMoreImages = images.length < 10;

  return (
    <div className="w-full overflow-x-scroll no-scrollbar flex gap-2 item-center justify-start">
      {canAddMoreImages && (
        <>
          {images.length === 0 ? (
            <AddTrigger
              title="이미지 추가하기"
              icon={ImageIcon}
              type={AddTrigger.Type.OUTLINED}
              color={AddTrigger.ColorType.GRAY}
              handleClick={() => {
                document.getElementById('logo-upload')?.click();
              }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-lg flex flex-shrink-0 items-center justify-center bg-surface-base border border-border-alternative border-dashed"
              onClick={() => {
                document.getElementById('logo-upload')?.click();
              }}
            >
              <Icon icon={ImageIcon} fillColor="text-gray-400" />
            </div>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </>
      )}

      {/* 기존 이미지들 - 수정 모드에서만 표시 */}
      {storedImageUrls.map((image, idx) => (
        <div
          key={`stored-${idx}`}
          className="w-20 h-20 relative rounded-lg flex flex-row items-center justify-center bg-no-repeat bg-top text-left text-gray-400"
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-lg">
            <img
              src={String(image.img_url)}
              className="w-20 h-20 rounded-lg object-cover"
              alt={`저장된 이미지 ${idx + 1}`}
            />
            <div
              className="absolute top-[0.25rem] right-[0.25rem] cursor-pointer"
              onClick={() => handleDeleteStoredImage(idx, Number(image.id))}
            >
              <CircleDeleteIcon />
            </div>
          </div>
        </div>
      ))}

      {/* 새로 업로드한 이미지들 */}
      {previewUrls.map((url, idx) => (
        <div
          key={`new-${idx}`}
          className="w-20 h-20 relative rounded-lg flex flex-row items-center justify-center bg-no-repeat bg-top text-left text-gray-400"
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-lg">
            <img
              src={url}
              className="w-20 h-20 rounded-lg object-cover"
              alt={`새 이미지 ${idx + 1}`}
            />
            <div
              className="absolute top-[0.25rem] right-[0.25rem] cursor-pointer"
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
