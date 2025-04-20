import BaseHeader from '@/components/Common/Header/BaseHeader';
import ProfileMenu from '@/components/Profile/ProfileMenu';
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

  const handleBack = () => {
    navigate(
      account_type === UserType.USER ? '/profile' : '/employer/profile'
    );
  };

  const policyMenuItems = [
    {
      title: account_type === UserType.USER
        ? profileTranslation.companyServiceTerm.en
        : profileTranslation.companyServiceTerm.ko,
      termType: TermType.ENTERPRISE_SERVICE_TERMS
    },
    {
      title: account_type === UserType.USER
        ? profileTranslation.personalServiceTerm.en
        : profileTranslation.personalServiceTerm.ko,
      termType: TermType.PERSONAL_SERVICE_TERMS
    },
    {
      title: account_type === UserType.USER
        ? profileTranslation.personalInfoPolicy.en
        : profileTranslation.personalInfoPolicy.ko,
      termType: TermType.PRIVACY_POLICY
    },
    {
      title: account_type === UserType.USER
        ? profileTranslation.locationInfoTerm.en
        : profileTranslation.locationInfoTerm.ko,
      termType: TermType.LOCATION_BASED_TERMS
    }
  ];

  return (
    <>
      {isPolicyPreview && (
        <PolicyViewer
          content={policy}
          onBack={() => setIsPolicyPreview(false)}
        />
      )}
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBack}
        hasMenuButton={false}
        title={account_type === UserType.USER ? 'About' : '정보'}
      />
      <div className="w-full h-full min-h-[100vh] bg-white">
        <div className="flex flex-col gap-4 pb-4 bg-white rounded-lg">
          <div className="flex flex-col divide-y divide-gray-200">
            {policyMenuItems.map((item) => (
              <ProfileMenu
                key={item.termType}
                title={item.title}
                onClick={() => getPolicy(item.termType)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
