import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ContactHikoreaBottomSheet from '@/components/ApplicationDetail/ContactHikoreaBottomSheet';

const ApplicationDetailStep5 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  return (
    <>
      <section className="flex flex-col gap-2 w-full px-4 pt-3 pb-[3.125rem]">
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
      <ContactHikoreaBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    </>
  );
};

export default ApplicationDetailStep5;
