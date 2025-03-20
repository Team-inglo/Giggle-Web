import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ApplicationDetailBottomSheet from '@/components/ApplicationDetail/ApplicationDetailBottomSheet';
import { usePatchApplyHiKorea } from '@/hooks/api/useApplication';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';

const ApplicationDetailStep5 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate } = usePatchApplyHiKorea();

  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const onClickBlackButton = () => {
    const isWebView = Boolean(window.ReactNativeWebView);
    if (isWebView) sendReactNativeMessage({ type: 'GO_HIKOREA' });
    else {
      window.location.href =
        'https://www.hikorea.go.kr/cvlappl/CvlapplStep1.pt#this';
    }
  };

  const onClickYellowButton = () => {
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  return (
    <>
      <section className="flex flex-col gap-2 w-full">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-normal'}
          fontColor="text-surface-invert"
          isBorder={false}
          title="Apply through HiKorea"
          onClick={() => setIsShowBottomSheet(true)}
        />
        <Button
          type={buttonTypeKeys.APPLY}
          bgColor={'bg-primary-neutral'}
          fontColor="text-surface-invert"
          isBorder={false}
          title="Check the application documents"
          onClick={() => navigate(`/application-documents/${id}`)}
        />
      </section>
      <ApplicationDetailBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
        blackButtonTitle="Go Hikorea"
        onClickBlackButton={onClickBlackButton}
        yellowButtonTitle="Completed"
        onClickYellowButton={onClickYellowButton}
      />
    </>
  );
};

export default ApplicationDetailStep5;
