import { useState } from 'react';
import FileAddIcon from '@/assets/icons/FileAddIcon.svg?react';
import GiggleLogo from '@/assets/icons/GiggleLogo.svg?react';
import ImageIcon from '@/assets/icons/ImageIcon.svg?react';
import CheckIconWithFill from '@/assets/icons/CheckIconWithFill.svg?react';
import giggleLogoPng from '@/assets/images/GiggleLogo.png';
import AddTrigger from '@/components/Common/AddTrigger';
import Icon from '@/components/Common/Icon';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useToast } from '@/hooks/useToast';

enum LogoType {
  DEFAULT = 'default',
  NONE = 'none',
  SELECTED = 'selected',
}

type CompanyLogoUploaderProps = {
  onLogoFileChange: (file: File | undefined) => void;
};

// 로고 없음 상태 컴포넌트
const EmptyLogoUploader = ({
  onImageChange,
  selectedImage,
}: {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | undefined;
}) => (
  <label
    className="cursor-pointer w-full"
    htmlFor="logo-upload-none"
    aria-label="Upload logo image"
  >
    <AddTrigger
      icon={ImageIcon}
      type={AddTrigger.Type.OUTLINED}
      color={AddTrigger.ColorType.GRAY}
      title="추가하기"
      handleClick={() => {
        document.getElementById('logo-upload-none')?.click();
      }}
    />
    <input
      id="logo-upload-none"
      type="file"
      accept="image/jpeg, image/png"
      onChange={onImageChange}
      className="hidden"
      key={selectedImage}
    />
  </label>
);

// 기본 로고 상태 컴포넌트
const DefaultLogoDisplay = ({
  onImageChange,
  selectedImage,
}: {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | undefined;
}) => (
  <label
    className="cursor-pointer"
    htmlFor="logo-upload"
    aria-label="Upload logo image"
  >
    <div className="w-14 rounded-lg bg-white border-[0.5px] border-border-alternative h-11 flex items-center justify-center">
      <GiggleLogo />
    </div>
    <input
      id="logo-upload"
      type="file"
      accept="image/jpeg, image/png"
      onChange={onImageChange}
      className="hidden"
      key={selectedImage}
    />
  </label>
);

// 선택된 로고 상태 컴포넌트
const SelectedLogoDisplay = ({
  selectedImage,
  onImageChange,
}: {
  selectedImage: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label
    className="cursor-pointer"
    htmlFor="logo-upload"
    aria-label="Change logo image"
  >
    <div className="relative w-14 h-14 group">
      <img
        src={selectedImage}
        alt="Selected logo"
        className="w-full h-full object-cover rounded-lg"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
        <FileAddIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
    <input
      id="logo-upload"
      type="file"
      accept="image/jpeg, image/png"
      onChange={onImageChange}
      className="hidden"
      key={selectedImage}
    />
  </label>
);

// 로고 업로더 메인 컴포넌트
const LogoUploader = ({
  logoStatus,
  selectedImage,
  onImageChange,
}: {
  logoStatus: LogoType;
  selectedImage: string | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  if (logoStatus === LogoType.NONE) {
    return (
      <EmptyLogoUploader
        onImageChange={onImageChange}
        selectedImage={selectedImage}
      />
    );
  }

  if (logoStatus === LogoType.DEFAULT) {
    return (
      <DefaultLogoDisplay
        onImageChange={onImageChange}
        selectedImage={selectedImage}
      />
    );
  }

  if (logoStatus === LogoType.SELECTED && selectedImage) {
    return (
      <SelectedLogoDisplay
        selectedImage={selectedImage}
        onImageChange={onImageChange}
      />
    );
  }

  return null;
};

// 기본 이미지 사용 체크박스 컴포넌트
const DefaultImageCheckbox = ({
  logoStatus,
  onDefaultLogoToggle,
}: {
  logoStatus: LogoType;
  onDefaultLogoToggle: (type: LogoType) => void;
}) => {
  const isDefaultSelected = logoStatus === LogoType.DEFAULT;

  const handleClick = () => {
    onDefaultLogoToggle(isDefaultSelected ? LogoType.NONE : LogoType.DEFAULT);
  };

  return (
    <div className="w-full h-16 relative flex items-center justify-start py-2 gap-3 text-left">
      <div
        className="w-6 h-6 flex items-center justify-center relative cursor-pointer"
        onClick={handleClick}
      >
        <Icon
          icon={CheckIconWithFill}
          size={Icon.Size.MD}
          hasPadding
          fillColor={
            isDefaultSelected ? 'text-surface-invert' : 'text-surface-tertiary'
          }
        />
      </div>
      <div className="flex items-start justify-start body-16-medium text-text-alternative">
        기본 이미지를 사용할게요
      </div>
    </div>
  );
};

const CompanyLogoUploader = ({
  onLogoFileChange,
}: CompanyLogoUploaderProps) => {
  const [logoStatus, setLogoStatus] = useState<LogoType>(LogoType.NONE);
  const [selectedImage, setSelectedImage] = useState<string>();
  const { error } = useToast();

  // 로고 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onLogoFileChange(file);
        setLogoStatus(LogoType.SELECTED);
      };
      reader.onerror = () => {
        error('파일 읽기 중 오류가 발생했습니다.');
      };
      reader.readAsDataURL(file);
    }
  };

  // 기본 로고 토글 핸들러
  const handleDefaultLogoToggle = async (type: LogoType) => {
    if (type === LogoType.NONE) {
      setLogoStatus(LogoType.NONE);
      setSelectedImage(undefined);
      onLogoFileChange(undefined);
    }

    if (type === LogoType.DEFAULT) {
      setLogoStatus(LogoType.DEFAULT);
      try {
        // 이미지 URL에서 Blob 생성
        const response = await fetch(giggleLogoPng);
        const blob = await response.blob();
        // Blob을 File 객체로 변환
        const file = new File([blob], 'giggle-logo.png', { type: 'image/png' });
        onLogoFileChange(file);
      } catch (e) {
        console.error('Error converting image to File:', e);
        error('로고 변환 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <InputLayout title="회사 로고">
      <div className="w-full flex flex-col gap-1 mt-1 items-center justify-start">
        <div className="w-full flex items-center justify-start h-14">
          <LogoUploader
            logoStatus={logoStatus}
            selectedImage={selectedImage}
            onImageChange={handleImageChange}
          />
        </div>
        <DefaultImageCheckbox
          logoStatus={logoStatus}
          onDefaultLogoToggle={handleDefaultLogoToggle}
        />
      </div>
    </InputLayout>
  );
};

export default CompanyLogoUploader;
