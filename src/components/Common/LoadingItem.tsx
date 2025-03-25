import loadingSpinnerGif from '@/assets/images/loadingSpinnerGif.gif';

export const LoadingItem = () => {
  return (
    <div className="w-full p-[0.5rem] flex flex-col justify-center items-center ">
      <img src={loadingSpinnerGif} alt="로딩 이미지" className="w-40" />
    </div>
  );
};

export const LoadingOverLay = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
      style={{ touchAction: 'none' }}
      onClick={(e) => e.preventDefault()}
    >
      <LoadingItem />
    </div>
  );
};
