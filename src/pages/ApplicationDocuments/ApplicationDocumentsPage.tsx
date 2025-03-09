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
import { useNavigate } from 'react-router-dom';

export type SuccessModalContent = {
  title: string;
  content: string;
  onNext: () => void;
};

const ApplicationDocumentsPage = () => {
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
            onClickBackButton={() => navigate(`/application/${currentPostId}`)}
            hasMenuButton={false}
            title="Application Documents"
          />
          <section className="w-full bg-surface-secondary">
            <PageTitle
              title={`Your Resume,\nYour Next Opportunity 🚀`}
              content={`Keep your resume updated and\ntrack your job applications in one place!`}
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
                    title="Next"
                    isBorder={false}
                    {...(isDocumentComplete(data?.data) && {
                      onClick: () => submitDocuments(Number(currentPostId)),
                    })}
                  />
                </BottomButtonPanel>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ApplicationDocumentsPage;
