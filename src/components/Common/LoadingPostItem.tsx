import LoadingGif from '@/assets/images/loadingGif.gif';

const LoadingPostItem = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={LoadingGif} alt="로딩 이미지" className="h-36" />
    </div>
  );
};

export default LoadingPostItem;
