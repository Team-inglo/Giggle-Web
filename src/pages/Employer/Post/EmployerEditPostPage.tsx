import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import Step1 from '@/components/Employer/PostCreate/Step1';
import Step2 from '@/components/Employer/PostCreate/Step2';
import Step3 from '@/components/Employer/PostCreate/Step3';
import Step4 from '@/components/Employer/PostCreate/Step4';
import Step5 from '@/components/Employer/PostCreate/Step5';
import { useEditPost, useGetPostDetail } from '@/hooks/api/usePost';
import { Phone, WorkDayTime } from '@/types/api/document';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { smartNavigate } from '@/utils/application';
import { formatPhoneNumber } from '@/utils/information';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const EmployerEditPostPage = () => {
  const location = useLocation();
  const { isEdit } = location.state || { isEdit: true }; // 수정 페이지이므로 기본값은 true
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [devIsModal, setDevIsModal] = useState(false);

  const { data, isPending } = useGetPostDetail(Number(id), true);
  const { mutate: editPost } = useEditPost({
    onSuccess: () => {
      setDevIsModal(true);
    },
  });

  const form = useForm<JobPostingForm>({
    values: isEdit
      ? mapServerDataToFormData(data.data)
      : initialJobPostingState,
    shouldUnregister: false, // step 간 데이터 유지
    mode: 'onChange',
  });

  // 다음 step으로 이동
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // 폼 제출 처리
  const handleSubmit = () => {
    const formData = new FormData();

    // 폼 데이터 가져오기
    const values = form.getValues();

    // 이미지 처리
    values.images
      .filter((image): image is File => image instanceof File)
      .forEach((image) => {
        formData.append('image', image);
      });

    // work_day_times 처리
    const updatedWorkDayTimes = values.body.work_day_times.map((workday) => ({
      ...workday,
      work_start_time:
        workday.work_start_time === '협의가능' ? null : workday.work_start_time,
      work_end_time:
        workday.work_end_time === '협의가능' ? null : workday.work_end_time,
    }));

    // recruiter_phone 처리
    const updatedRecruiterPhone = formatPhoneNumber(
      values.body.recruiter_phone as Phone,
    );

    // body 추가
    formData.append(
      'body',
      new Blob(
        [
          JSON.stringify({
            ...values.body,
            work_day_times: updatedWorkDayTimes,
            recruiter_phone_number: updatedRecruiterPhone,
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    );

    // 제출
    editPost({ newPost: formData, id: Number(id) });
  };

  // 서버 데이터를 폼에 맞게 변환
  function mapServerDataToFormData(
    serverData: typeof data.data,
  ): JobPostingForm {
    return {
      images: serverData.company_img_url_list,
      body: {
        title: serverData.title,
        job_category: serverData.tags.job_category,
        work_day_times: serverData.working_conditions.work_day_times.map(
          (workDayTime: WorkDayTime) => ({
            ...workDayTime,
            work_start_time:
              workDayTime.work_start_time === '협의가능'
                ? null
                : workDayTime.work_start_time,
            work_end_time:
              workDayTime.work_end_time === '협의가능'
                ? null
                : workDayTime.work_end_time,
          }),
        ),
        work_period: serverData.working_conditions.work_period,
        hourly_rate: serverData.working_conditions.hourly_rate,
        employment_type: serverData.working_conditions.employment_type,
        address: {
          region_1depth_name:
            serverData.workplace_information.region_1depth_name || '',
          region_2depth_name:
            serverData.workplace_information.region_2depth_name || '',
          region_3depth_name:
            serverData.workplace_information.region_3depth_name || '',
          region_4depth_name:
            serverData.workplace_information.region_4depth_name || '',
          address_name: serverData.workplace_information.main_address,
          latitude: serverData.workplace_information.latitude,
          longitude: serverData.workplace_information.longitude,
          address_detail: serverData.workplace_information.detailed_address,
        },
        recruitment_dead_line:
          serverData.recruitment_conditions.recruitment_deadline === '상시모집'
            ? null
            : serverData.recruitment_conditions.recruitment_deadline,
        recruitment_number:
          serverData.recruitment_conditions.number_of_recruits,
        gender: serverData.recruitment_conditions.gender,
        age_restriction: serverData.recruitment_conditions.age_restriction,
        education_level: serverData.recruitment_conditions.education,
        visa: serverData.recruitment_conditions.visa,
        recruiter_name: serverData.company_information.recruiter,
        recruiter_email: serverData.company_information.email,
        recruiter_phone_number: serverData.company_information.contact,
        description: serverData.detailed_overview,
        preferred_conditions:
          serverData.recruitment_conditions.preferred_conditions,
      },
    };
  }

  return (
    <div>
      <BaseHeader
        hasBackButton
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="공고수정"
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
          title="공고 수정을 완료했어요!"
          onNext={() => smartNavigate(navigate, `/employer/post/${id}`)}
        />
      ) : (
        <>
          <PageTitle
            title="공고를 수정해주세요 ✍"
            content="필요한 정보만 빠르게 입력하고, 바로 시작하세요!"
          />
          <form
            className="w-full flex justify-center px-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {!isPending && currentStep === 1 && (
              <Step1
                key={`${data?.data.id}-step1`}
                control={form.control}
                onNext={handleNext}
              />
            )}
            {!isPending && currentStep === 2 && (
              <Step2
                key={`${data?.data.id}-step2`}
                control={form.control}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {!isPending && currentStep === 3 && (
              <Step3
                key={`${data?.data.id}-step3`}
                control={form.control}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {!isPending && currentStep === 4 && (
              <Step4
                key={`${data?.data.id}-step4`}
                control={form.control}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
                isEdit={isEdit}
              />
            )}
            {!isPending && currentStep === 5 && (
              <Step5
                key={`${data?.data.id}-step5`}
                control={form.control}
                onSubmit={handleSubmit}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EmployerEditPostPage;
