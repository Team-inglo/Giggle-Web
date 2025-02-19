import BaseHeader from '@/components/Common/Header/BaseHeader';
import RadioButton from '@/components/Information/RadioButton';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { usePatchHiKoreaResult } from '@/hooks/api/useApplication';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

const ApplicationResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate } = usePatchHiKoreaResult(Number(id));

  const [isApproval, setIsApproval] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');

  const onClickRegistration = () => {
    if (isNaN(Number(id))) return;
    const body = {
      is_approval: isApproval,
      feedback: feedback,
    };
    mutate({ id: Number(id), body: body });
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(`/application/${id}`)}
        hasMenuButton={false}
      />
      <h1 className="w-full p-[1.5rem] head-1 text-[#1E1926]">
        Register the result
      </h1>
      <section className="flex flex-col gap-[0.75rem] w-full px-[1.5rem]">
        <h3 className="px-[0.25rem] py-[0.375rem] body-3 text-[#1E1926]">
          HiKorea e-Government
        </h3>
        <div className="px-[0.25rem] py-[0.375rem] flex flex-col gap-[1rem]">
          <RadioButton
            value={'Approval'}
            setValue={() => setIsApproval(true)}
            isOn={isApproval === true}
          />
          <RadioButton
            value={'Rejection'}
            setValue={() => setIsApproval(false)}
            isOn={isApproval === false}
          />
        </div>
        <h3 className="px-[0.25rem] py-[0.375rem] body-3 text-[#1E1926]">
          Contract Feedback
        </h3>
        <textarea
          className="px-[1rem] py-[0.75rem] border border-[#E2E5EB] rounded-[0.75rem] body-2 focus:outline-none"
          placeholder="Write a contract review"
          maxLength={200}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </section>
      <BottomButtonPanel>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-[#FEF387]'}
          fontColor="text-[#1E1926]"
          title="Registration"
          isBorder={false}
          onClick={onClickRegistration}
        />
      </BottomButtonPanel>
    </>
  );
};

export default ApplicationResultPage;
