import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerEditInputSection from '@/components/Employer/EditProfile/EmployerEditInputSection';
import {
  useGetOwnerProfile,
  usePatchOwnerProfile,
} from '@/hooks/api/useProfile';
import {
  EmployerProfileRequestBody,
  initialEmployerProfile,
} from '@/types/api/profile';
import { transformToEmployerProfileRequest } from '@/utils/editProfileData';
import { isValidEmployerProfile } from '@/utils/employerProfile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerEditProfilePage = () => {
  const navigate = useNavigate();
  const [newEmployData, setNewEmployData] =
    useState<EmployerProfileRequestBody>(initialEmployerProfile);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  // 수정을 위한 Response 데이터
  const { data } = useGetOwnerProfile();
  // 수정하기 훅
  const { mutate } = usePatchOwnerProfile();

  useEffect(() => {
    if (data) {
      // get 타입에서 patch 타입으로 변환
      setNewEmployData(transformToEmployerProfileRequest(data.data)); // 수정 데이터
    }
  }, [data]);

  useEffect(() => {
    setIsValid(isValidEmployerProfile(newEmployData));
  }, [newEmployData]);

  const handleSubmit = () => {
    if (isValidEmployerProfile(newEmployData)) {
      // 이미지 변경 여부를 설정하여 프로필 수정 데이터를 업데이트합니다.
      const updatedEmployData = {
        ...newEmployData,
        is_icon_img_changed: Boolean(logoFile),
      };

      const formData = new FormData();

      // 이미지 파일이 있을 경우 image로 추가
      if (logoFile) {
        formData.append('image', logoFile);
      }

      // JSON 데이터를 Blob으로 변환하여 body라는 이름으로 추가
      formData.append(
        'body',
        new Blob([JSON.stringify(updatedEmployData)], {
          type: 'application/json',
        }),
      );

      mutate(formData); // PATCH 요청 전송
    }
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/employer/profile')}
        hasMenuButton={false}
        title="회사/점포 정보 수정"
      />
      <EmployerEditInputSection
        newEmployData={newEmployData}
        logo={data?.data.logo_img_url}
        setNewEmployData={setNewEmployData}
        setLogoFile={(file: File | undefined) => setLogoFile(file)}
        initialPhonNum={newEmployData.owner_info.phone_number}
      />
      <BottomButtonPanel>
        <Button
          type="large"
          isBorder={false}
          bgColor={isValid ? 'bg-surface-primary' : 'bg-surface-secondary'}
          fontColor={isValid ? 'text-text-normal' : 'text-text-disabled'}
          title="수정 완료"
          onClick={handleSubmit}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default EmployerEditProfilePage;
