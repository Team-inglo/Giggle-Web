import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentCardList from '@/components/Document/DocumentCardList';
import { usePatchWritingDocumentFinish } from '@/hooks/api/useApplication';
import { useGetDocumentsEmployee } from '@/hooks/api/useDocument';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import { DocumentsSummaryResponse } from '@/types/api/document';
import { useNavigate } from 'react-router-dom';

const ApplicationDocumentsPage = () => {
  const navigate = useNavigate();
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const { data, isPending } = useGetDocumentsEmployee(Number(currentPostId));
  const { mutate: submitDocuments } = usePatchWritingDocumentFinish(
    Number(currentPostId),
  );
  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(`/application/${currentPostId}`)}
        hasMenuButton={true}
        title="Application Documents"
      />
      {!isPending && (
        <>
          <DocumentCardList
            documents={data?.data as DocumentsSummaryResponse}
          />
          <BottomButtonPanel>
            {data?.data.part_time_employment_permits?.status ===
              'CONFIRMATION' &&
            data?.data.standard_labor_contract?.status === 'CONFIRMATION' &&
            data?.data.integrated_application?.word_url &&
            data?.data.is_completed === false ? (
              <Button
                type="large"
                bgColor={'bg-[#FEF387]'}
                fontColor="text-[#1E1926]"
                title="Next"
                isBorder={false}
                onClick={() => submitDocuments(Number(currentPostId))}
              />
            ) : (
              <Button
                type="large"
                bgColor="bg-[#F4F4F9]"
                fontColor="text-[#bdbdbd]"
                isBorder={false}
                title="Next"
              />
            )}
          </BottomButtonPanel>
        </>
      )}
    </div>
  );
};

export default ApplicationDocumentsPage;
