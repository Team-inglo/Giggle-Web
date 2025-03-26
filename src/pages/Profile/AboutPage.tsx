import BaseHeader from '@/components/Common/Header/BaseHeader';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { IconType } from '@/constants/profile';
import { profileTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import PolicyViewer from '@/components/Information/PolicyViewer';
import { useGetPolicy } from '@/hooks/api/useAuth';
import { TermType } from '@/types/api/users';

const AboutPage = () => {
  const [isPolicyPreview, setIsPolicyPreview] = useState(false);
  const [policy, setPolicy] = useState('');
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { mutate: getPolicy } = useGetPolicy({
    onSuccess: (data) => {
      setPolicy(data.data.content);
      setIsPolicyPreview(true);
    },
  });

  return (
    <>
      {isPolicyPreview === true && (
        <PolicyViewer
          content={policy}
          onBack={() => setIsPolicyPreview(false)}
        />
      )}
      <BaseHeader
        hasBackButton
        onClickBackButton={() =>
          navigate(
            account_type === UserType.USER ? '/profile' : '/employer/profile',
          )
        }
        hasMenuButton={false}
        title={account_type === UserType.USER ? 'About' : '정보'}
      />
      <div className="w-full h-full min-h-[100vh] bg-[#f4f4f9]">
        <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-lg">
          <div className="flex flex-col divide-y divide-gray-200">
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.companyServiceTerm.en
                  : profileTranslation.companyServiceTerm.ko
              }
              iconType={IconType.PROFILE}
              onClick={() => getPolicy(TermType.ENTERPRISE_SERVICE_TERMS)}
            />
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.personalServiceTerm.en
                  : profileTranslation.personalServiceTerm.ko
              }
              iconType={IconType.PROFILE}
              onClick={() => getPolicy(TermType.PERSONAL_SERVICE_TERMS)}
            />
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.personalInfoPolicy.en
                  : profileTranslation.personalInfoPolicy.ko
              }
              iconType={IconType.PROFILE}
              onClick={() => getPolicy(TermType.PRIVACY_POLICY)}
            />
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.locationInfoTerm.en
                  : profileTranslation.locationInfoTerm.ko
              }
              iconType={IconType.PROFILE}
              onClick={() => getPolicy(TermType.LOCATION_BASED_TERMS)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
