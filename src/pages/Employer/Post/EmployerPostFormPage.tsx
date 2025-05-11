import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import Step1 from '@/components/Employer/PostCreate/Step1';
import Step2 from '@/components/Employer/PostCreate/Step2';
import Step3 from '@/components/Employer/PostCreate/Step3';
import Step4 from '@/components/Employer/PostCreate/Step4';
import Step5 from '@/components/Employer/PostCreate/Step5';
import {
  useCreatePost,
  useEditPost,
  useGetPostDetailForForm,
} from '@/hooks/api/usePost';
import { useCurrentPostIdStore } from '@/store/url';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { smartNavigate } from '@/utils/application';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { preparePostDataForSubmission } from '@/utils/post';

/**
 * 고용주 공고 등록/수정 통합 페이지 컴포넌트
 * isEdit 값에 따라 등록/수정 모드를 구분
 */
const EmployerPostFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateCurrentPostId } = useCurrentPostIdStore();

  // id가 존재하면 수정 모드, 없으면 등록 모드
  const isEdit = !!id;
  const parsedId = id ? Number(id) : undefined;

  // 상태 관리
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 폼 데이터 관리
  const form = useForm<JobPostingForm>({
    values: initialJobPostingState,
    shouldUnregister: false, // step 간 데이터 유지
    mode: 'onChange',
  });

  // 기존 데이터 조회 훅 (수정 모드)
  const { mutate: fetchDetail, isPending: isDetailLoading } =
    useGetPostDetailForForm();

  // 폼 제출 훅
  const { mutate: createPost } = useCreatePost({
    onSuccess: (response) => {
      updateCurrentPostId(Number(response.data.id));
      setIsModalOpen(true);
      smartNavigate(navigate, `/employer/post/${response.data.id}`, {
        delay: 2000,
        forceSkip: true,
      });
    },
  });

  const { mutate: editPost } = useEditPost({
    onSuccess: () => {
      setIsModalOpen(true);
    },
  });

  // 수정 모드일 경우 기존 데이터 가져오기
  useEffect(() => {
    if (isEdit && parsedId) {
      setIsLoading(true);
      fetchDetail(
        { id: parsedId, isEdit },
        {
          onSuccess: (data) => {
            form.reset(data.data);
            setIsLoading(false);
          },
          onError: () => {
            setIsLoading(false);
          },
        },
      );
    }
  }, [isEdit, parsedId, fetchDetail, form]);

  // 다음 step으로 이동
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // 폼 제출 처리
  const handleSubmit = () => {
    const values = form.getValues();

    if (isEdit && parsedId) {
      // 수정 모드
      const { formData } = preparePostDataForSubmission(values, parsedId);
      editPost({ newPost: formData, id: parsedId });
    } else {
      // 등록 모드
      const { formData } = preparePostDataForSubmission(values);
      createPost(formData);
    }
  };

  // 페이지 타이틀 및 완료 모달 텍스트 설정
  const pageTitle = isEdit
    ? '공고를 수정해주세요 ✍'
    : '공고를 등록해주세요 ✍';
  const headerTitle = isEdit ? '공고수정' : '공고등록';
  const completeTitle = isEdit
    ? '공고 수정을 완료했어요!'
    : '공고 등록을 완료했어요!';
  const backButtonHandler = isEdit ? () => navigate(-1) : () => navigate('/');

  if (isLoading || isDetailLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingItem />
      </div>
    );
  }

  return (
    <div>
      <BaseHeader
        hasBackButton
        onClickBackButton={backButtonHandler}
        hasMenuButton={false}
        title={headerTitle}
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
      {isModalOpen ? (
        <CompleteModal
          title={completeTitle}
          onNext={() =>
            isEdit && parsedId
              ? smartNavigate(navigate, `/employer/post/${parsedId}`)
              : undefined
          }
        />
      ) : (
        <FormProvider {...form}>
          <PageTitle
            title={pageTitle}
            content="필요한 정보만 빠르게 입력하고, 바로 시작하세요!"
          />
          <form
            className="w-full flex justify-center px-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {currentStep === 1 && (
              <Step1 key={`${parsedId || 'new'}-step1`} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <Step2
                key={`${parsedId || 'new'}-step2`}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 3 && (
              <Step3
                key={`${parsedId || 'new'}-step3`}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {currentStep === 4 && (
              <Step4
                key={`${parsedId || 'new'}-step4`}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
                isEdit={isEdit}
              />
            )}
            {currentStep === 5 && (
              <Step5
                key={`${parsedId || 'new'}-step5`}
                onSubmit={handleSubmit}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default EmployerPostFormPage;
