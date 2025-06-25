import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import InputLayout from '@/components/WorkExperience/InputLayout';
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
          <InputLayout title="Reason for Request">
            <textarea
              className="w-full h-[7.5rem] px-4 py-[0.875rem] border-[0.05rem] border-border-assistive rounded-[0.625rem] body-16-medium outline-none resize-none"
              placeholder="Write a contract review"
              value={reasonInput}
              onChange={(e) =>
                setReasonInput(limitInputValueLength(e.target.value, 100))
              }
            />
          </InputLayout>
          <BottomButtonPanel>
            <Button
              type="large"
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
