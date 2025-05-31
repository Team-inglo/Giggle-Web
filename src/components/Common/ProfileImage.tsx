import defaultProfileImg from '@/assets/images/GiggleLogo.png';

type ProfileImageProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const ProfileImage = ({
  src,
  alt,
  size = 'md',
  className = '',
}: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-11 h-11',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div
      className={`rounded-full border overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = defaultProfileImg;
        }}
      />
    </div>
  );
};

export default ProfileImage;
