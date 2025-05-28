import { useEffect, useRef, useState } from 'react';

type EditProfilePictureProps = {
  profileImgUrl: string; // 변경 전 프로필 URL
  onImageUpdate: (img: File) => void;
};

const EditProfilePicture = ({
  profileImgUrl,
  onImageUpdate,
}: EditProfilePictureProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(
    profileImgUrl,
  );
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeButtonClick = () => {
    imageInputRef.current?.click();
  };

  // 이미지 변경 처리 함수
  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // 파일이 이미지 형식인지 확인
    if (file && file.type.startsWith('image/')) {
      onImageUpdate(file);

      const objectUrl = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
      setImagePreviewUrl(objectUrl); // 미리보기 URL 업데이트
    } else {
      console.error('업로드된 파일이 이미지가 아닙니다.');
    }
  };

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트되거나 이미지가 바뀔 때 업로드한 이미지 URL을 해제
      if (imagePreviewUrl && imagePreviewUrl !== profileImgUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl, profileImgUrl]);

  return (
    <div className="pt-5 pb-4 flex flex-col justify-center items-center gap-4">
      {/* 변경된 이미지가 있으면 해당 이미지를, 그렇지 않으면 기존 이미지 URL을 사용 */}
      <div className="w-[5rem] h-[5rem] overflow-hidden flex items-center justify-center bg-gray-200 rounded-full">
        <img
          src={imagePreviewUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      <button
        className="text-center w-full py-3 button-14-semibold text-[#1E1926] bg-[#f4f4f9] rounded-lg"
        onClick={handleChangeButtonClick}
      >
        Change Picture
      </button>
      <input
        ref={imageInputRef}
        name="input"
        id="input"
        type="file"
        accept="image/*"
        onChange={handlePictureChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default EditProfilePicture;
