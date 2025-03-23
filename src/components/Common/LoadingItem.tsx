import loadingSpinnerGif from '@/assets/images/loadingSpinnerGif.gif';

const LoadingItem = () => {
  return (
    <div className="w-full p-[0.5rem] flex flex-col justify-center items-center ">
      <img src={loadingSpinnerGif} alt="로딩 이미지" className="w-40" />
    </div>
  );
};

export default LoadingItem;
