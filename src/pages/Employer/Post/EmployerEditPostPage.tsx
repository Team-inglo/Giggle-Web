import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import Step1 from '@/components/Employer/PostCreate/Step1';
import Step2 from '@/components/Employer/PostCreate/Step2';
import Step3 from '@/components/Employer/PostCreate/Step3';
import Step4 from '@/components/Employer/PostCreate/Step4';
import Step5 from '@/components/Employer/PostCreate/Step5';
import { useEditPost, useGetPostDetail } from '@/hooks/api/usePost';
import { useCurrentPostIdStore } from '@/store/url';
import { WorkDayTime } from '@/types/api/document';
import {
  initialJobPostingState,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const EmployerEditPostPage = () => {
  const location = useLocation();
  const { isEdit } = location.state || {};
  const { id } = useParams();
  const { currentPostId } = useCurrentPostIdStore();
  console.log(currentPostId);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<JobPostingForm>(
    initialJobPostingState,
  );

  const { data, isPending } = useGetPostDetail(Number(id), true);
  const { mutate: editPost } = useEditPost(Number(currentPostId)); //  공고 수정 시 호출하는 훅
  const [devIsModal, setDevIsModal] = useState(false);
  const [isDataMapped, setIsDataMapped] = useState(false);
  const navigate = useNavigate();

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: JobPostingForm) => {
    setPostInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (newPost: FormData) => {
    if (isEdit) {
      editPost({ newPost: newPost, id: Number(id) });
      setDevIsModal(true);
    }
  };

  const mapServerDataToFormData = (
    serverData: typeof data.data,
  ): JobPostingForm => ({
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
        ...postInfo.body.address,
        address_name: serverData.workplace_information.main_address,
        latitude: serverData.workplace_information.latitude,
        longitude: serverData.workplace_information.longitude,
        address_detail: serverData.workplace_information.detailed_address,
      },
      recruitment_dead_line:
        serverData.recruitment_conditions.recruitment_deadline === '상시모집'
          ? null
          : serverData.recruitment_conditions.recruitment_deadline,
      recruitment_number: serverData.recruitment_conditions.number_of_recruits,
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
  });
  useEffect(() => {
    if (data?.data) {
      try {
        const mappedData = mapServerDataToFormData(data.data);
        setPostInfo(mappedData);
        setIsDataMapped(true);
        console.log('데이터 매핑 완료:', mappedData);
      } catch (error) {
        console.error('데이터 매핑 중 오류 발생:', error);
        setIsDataMapped(false);
      }
    }
  }, [data?.data]);
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
          onNext={() => {}} // 생성한 공고에 대한 공고 상세 페이지로 이동 요망
        />
      ) : (
        <>
          <PageTitle
            title="공고를 수정해주세요 ✍"
            content="필요한 정보만 빠르게 입력하고, 바로 시작하세요!"
          />
          <div className="w-full flex justify-center px-4">
            {!isPending && isDataMapped && currentStep === 1 && (
              <Step1
                key={data?.data.id} // 또는 다른 유니크한 값
                postInfo={postInfo}
                onNext={handleNext}
              />
            )}
            {!isPending && isDataMapped && currentStep === 2 && (
              <Step2
                key={`${data?.data.id}2`} // 또는 다른 유니크한 값
                isAddressSearch={isAddressSearch}
                setIsAddressSearch={setIsAddressSearch}
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {!isPending && isDataMapped && currentStep === 3 && (
              <Step3
                key={`${data?.data.id}3`} // 또는 다른 유니크한 값
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            {!isPending && isDataMapped && currentStep === 4 && (
              <Step4
                key={`${data?.data.id}4`} // 또는 다른 유니크한 값
                postInfo={postInfo}
                onNext={handleNext}
                onPrev={() => setCurrentStep((prev) => prev - 1)}
                isEdit={isEdit}
              />
            )}
            {!isPending && isDataMapped && currentStep === 5 && (
              <Step5
                key={`${data?.data.id}5`} // 또는 다른 유니크한 값
                postInfo={postInfo}
                onNext={handleNext}
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

export default EmployerEditPostPage;
