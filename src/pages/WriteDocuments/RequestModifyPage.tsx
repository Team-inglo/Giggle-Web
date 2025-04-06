import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { usePostRequest } from '@/hooks/api/useDocument';
import useNavigateBack from '@/hooks/useNavigateBack';
import { smartNavigate } from '@/utils/application';
import { limitInputValueLength } from '@/utils/information';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RequestModifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClickBackButton = useNavigateBack();
  const [reasonInput, setReasonInput] = useState('');
  const [successModalContent, setSuccessModalContent] = useState({
    title: '',
    content: '',
    onNext: () => {},
  });
  const { mutate: sendRequest } = usePostRequest(Number(id), {
    onSuccess: () => {
      setSuccessModalContent({
        title: `Request sent!\nThe employer will review it`,
        content: `Your request has been sent.\nThe employer will check\nand update the document soon.`,
        onNext: () => {
          smartNavigate(navigate, `/application-documents/${id}`);
        },
      });
    },
  });
  return (
    <div>
      {successModalContent.title ? (
        <CompleteModal
          title={successModalContent.title}
          content={successModalContent.content}
          onNext={successModalContent.onNext}
        />
      ) : (
        <>
          <BaseHeader
            hasBackButton={true}
            hasMenuButton={false}
            title="Reason for Request"
            onClickBackButton={handleClickBackButton}
          />
          <div className="w-full relative flex flex-col items-center justify-start text-left text-[#1e1926] head-1">
            <div className="self-stretch flex items-center justify-start p-6">
              Reason for Request
            </div>
            <div className="w-full self-stretch flex flex-col items-center justify-start pb-[10rem] px-6 body-3">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full flex flex-col items-center justify-start">
                  <textarea
                    className="w-full h-[7.5rem] px-[1rem] py-[0.75rem] border border-[#E2E5EB] rounded-[0.75rem] body-2 outline-none resize-none"
                    placeholder="Write a contract review"
                    value={reasonInput}
                    onChange={(e) =>
                      setReasonInput(limitInputValueLength(e.target.value, 100))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <BottomButtonPanel>
            <Button
              type="large"
              isBorder={false}
              bgColor="bg-[#FEF387]"
              fontColor="text-[#1E1926]"
              title="Request"
              onClick={() => {
                sendRequest({ id: Number(id), reason: reasonInput });
              }}
            />
          </BottomButtonPanel>
        </>
      )}
    </div>
  );
};

export default RequestModifyPage;
