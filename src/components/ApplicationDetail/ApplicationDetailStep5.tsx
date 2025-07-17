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
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Apply through HiKorea"
          onClick={() => setIsShowBottomSheet(true)}
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title="Check the application documents"
          onClick={() =>
            navigate(`/application-documents/${id}`, {
              state: {
                isComplete: true,
              },
            })
          }
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
