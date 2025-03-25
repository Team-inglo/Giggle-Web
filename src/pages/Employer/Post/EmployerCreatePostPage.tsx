import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import Step1 from '@/components/Employer/PostCreate/Step1';
import Step2 from '@/components/Employer/PostCreate/Step2';
import Step3 from '@/components/Employer/PostCreate/Step3';
import Step4 from '@/components/Employer/PostCreate/Step4';
import Step5 from '@/components/Employer/PostCreate/Step5';
import { useCreatePost } from '@/hooks/api/usePost';
import { useCurrentPostIdStore } from '@/store/url';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployerCreatePostPage = () => {
  const location = useLocation();
  const { isEdit } = location.state || {};

  const { updateCurrentPostId } = useCurrentPostIdStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<JobPostingForm>(
    initialJobPostingState,
  );
  const [devIsModal, setDevIsModal] = useState(false);

  const { mutate } = useCreatePost({
    onSuccess: (response) => {
      updateCurrentPostId(Number(response.data.id));
      setDevIsModal(true);
      setTimeout(() => {
        navigate(`/employer/post/${response.data.id}`);
      }, 2000);
    },
  }); // 공고 생성 시 호출하는 훅

  const navigate = useNavigate(); // navigate 변수를 정의합니다.

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: JobPostingForm) => {
    setPostInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (newPost: FormData) => {
    mutate(newPost);
  };
  return (
    <div>
      <BaseHeader
        hasBackButton
        onClickBackButton={() => navigate('/')}
        hasMenuButton={false}
        title="공고등록"
      />
      <div className="w-screen flex justify-center items-center sticky top-[3.75rem]">
        {[...Array(5)].map((_, i) => (
          <hr
            key={i}
            className={`w-[20%] h-1 border-0 ${
              currentStep > i ? 'bg-surface-primary' : 'bg-surface-secondary'
            }`}
          />
        ))}
      </div>
      {devIsModal ? (
        <CompleteModal
          title={`${isEdit ? '공고 수정' : '공고 등록'}을 완료했어요!.`}
        />
      ) : (
        <>
          <PageTitle
            title="공고를 등록해주세요 ✍"
            content="필요한 정보만 빠르게 입력하고, 바로 시작하세요!"
          />
          <div className="w-full flex justify-center px-4">
            {currentStep === 1 && (
              <Step1 postInfo={postInfo} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <Step2
                postInfo={postInfo}
                isAddressSearch={isAddressSearch}
                setIsAddressSearch={setIsAddressSearch}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 3 && (
              <Step3
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 4 && (
              <Step4
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 5 && (
              <Step5
                postInfo={postInfo}
                onSubmit={(newPost) => handleSubmit(newPost)}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerCreatePostPage;
