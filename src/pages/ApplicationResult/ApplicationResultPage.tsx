import BaseHeader from '@/components/Common/Header/BaseHeader';
import RadioButton from '@/components/Information/RadioButton';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { usePatchHiKoreaResult } from '@/hooks/api/useApplication';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import PageTitle from '@/components/Common/PageTitle';
import { limitInputValueLength } from '@/utils/information';
import useNavigateBack from '@/hooks/useNavigateBack';

const ApplicationResultPage = () => {
  const handleClickBackButton = useNavigateBack();
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
        title="Register the result"
        onClickBackButton={handleClickBackButton}
        hasMenuButton={false}
      />
      <PageTitle
        title={`How did it go? \nLet’s wrap this up! 📋`}
        content={`Select your HiKorea application result \nand share your experience`}
      />
      <main className="flex flex-col gap-4 w-full px-4">
        <section>
          <h3 className="px-1 py-[0.375rem] button-14-semibold text-primary-dark">
            HiKorea e-Government
            <span className="pl-1 body-16-regular text-text-error">*</span>
          </h3>
          <div className="px-1 py-[0.375rem] flex flex-col gap-4">
            <RadioButton
              value={'Approved! 🎉'}
              setValue={() => setIsApproval(true)}
              isOn={isApproval === true}
            />
            <RadioButton
              value={'Not approved 😞'}
              setValue={() => setIsApproval(false)}
              isOn={isApproval === false}
            />
          </div>
        </section>
        <section className="w-full">
          <h3 className="px-1 py-[0.375rem] button-14-semibold text-primary-dark">
            Share your experience
          </h3>
          <textarea
            className="min-h-24 w-full px-4 py-[0.875rem] border-[0.05rem] border-border-assistive rounded-[0.625rem] body-16-medium focus:outline-none resize-none"
            placeholder="Was the process smooth? Any challenges? 💬"
            value={feedback}
            onChange={(e) =>
              setFeedback(limitInputValueLength(e.target.value, 200))
            }
          />
        </section>
      </main>
      <BottomButtonPanel>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-normal'}
          fontColor="text-surface-invert"
          title="Submit result"
          onClick={onClickRegistration}
        />
      </BottomButtonPanel>
    </>
  );
};

export default ApplicationResultPage;
