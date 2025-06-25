import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import PageTitle from '@/components/Common/PageTitle';
import DocumentCardList from '@/components/Document/DocumentCardList';
import { usePatchWritingDocumentFinish } from '@/hooks/api/useApplication';
import { useGetDocumentsEmployee } from '@/hooks/api/useDocument';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import { DocumentsSummaryResponse } from '@/types/api/document';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type SuccessModalContent = {
  title: string;
  content: string;
  onNext: () => void;
};

const ApplicationDocumentsPage = () => {
  const location = useLocation();
  const { isComplete } = location.state || {};

  const navigate = useNavigate();
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const { data, isPending } = useGetDocumentsEmployee(Number(currentPostId));
  const { mutate: submitDocuments } = usePatchWritingDocumentFinish(
    Number(currentPostId),
  );
  const isDocumentComplete = (data: DocumentsSummaryResponse | undefined) => {
    return (
      data?.part_time_employment_permits?.status === 'CONFIRMATION' &&
      data?.standard_labor_contract?.status === 'CONFIRMATION' &&
      data?.integrated_application?.word_url &&
      data?.is_completed === false
    );
  };
  const [successModalContent, setSuccessModalContent] = useState({
    title: '',
    content: '',
    onNext: () => {},
  });
  return (
    <div>
      {successModalContent.title && (
        <CompleteModal
          title={successModalContent.title}
          content={successModalContent.content}
          onNext={successModalContent.onNext}
        />
      )}
      {!successModalContent.title && (
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => navigate(-1)}
            hasMenuButton={false}
            title="Application Documents"
          />
          <section className="w-full h-[calc(100vh-60px)] bg-surface-secondary overflow-y-scroll scrollbar-hide">
            <PageTitle
              title={`All your work documents,\nin one place!🚀`}
              content={`Easily track and manage your docs! Stay on\ntop of the process and complete the required\n steps smoothly.`}
            />
            {isPending ? (
              <div className="w-full h-[65vh] flex items-center justify-center">
                <LoadingPostItem />
              </div>
            ) : (
              <>
                <DocumentCardList
                  documents={data?.data as DocumentsSummaryResponse}
                  setModalContent={(content: SuccessModalContent) =>
                    setSuccessModalContent(content)
                  }
                />
                {!isComplete && (
                  <BottomButtonPanel>
                    <Button
                      type="large"
                      bgColor={
                        isDocumentComplete(data?.data)
                          ? 'bg-surface-primary'
                          : 'bg-surface-secondary'
                      }
                      fontColor={
                        isDocumentComplete(data?.data)
                          ? 'text-text-normal'
                          : 'text-text-disabled'
                      }
                      title="Completed"
                      {...(isDocumentComplete(data?.data) && {
                        onClick: () => submitDocuments(Number(currentPostId)),
                      })}
                    />
                  </BottomButtonPanel>
                )}
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ApplicationDocumentsPage;
