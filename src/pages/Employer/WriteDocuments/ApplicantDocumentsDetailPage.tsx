import BaseHeader from '@/components/Common/Header/BaseHeader';
import { DocumentTypeInfo } from '@/constants/documents';
import { DocumentType, EmployDocumentInfo } from '@/types/api/document';
import DocumentCardDispenserEmployer from '@/components/Employer/ApplicantDocumentsDetail/DocumentCardDispenserEmployer';
import { useNavigate } from 'react-router-dom';
import { useGetDocumentsEmployer } from '@/hooks/api/useDocument';
import { useCurrentApplicantIdStore } from '@/store/url';
import { useState } from 'react';
import LoadingItem from '@/components/Common/LoadingItem';

const ApplicantDocumentsDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentApplicantId } = useCurrentApplicantIdStore();
  const { data } = useGetDocumentsEmployer(Number(currentApplicantId));
  const navigate = useNavigate();

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}
      <div>
        <BaseHeader
          hasBackButton={true}
          hasMenuButton={false}
          onClickBackButton={() =>
            navigate('/employer/applicant/document-detail')
          }
          title="서류 관리"
        />
        <div className="flex flex-col gap-2 p-6">
          {data && data?.data[DocumentType.PART_TIME_PERMIT] ? (
            <DocumentCardDispenserEmployer
            documentInfo={
                data.data[DocumentType.PART_TIME_PERMIT] as EmployDocumentInfo
              }
              title={DocumentTypeInfo[DocumentType.PART_TIME_PERMIT].name}
              type={DocumentType.PART_TIME_PERMIT}
              reason={
                data?.data[DocumentType.PART_TIME_PERMIT].reason || undefined
              }
              setIsLoading={setIsLoading}
            />
          ) : (
            <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
              <div className="self-stretch flex flex-col items-start justify-start px-4">
                <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
                  <div className="flex-1 flex items-center justify-start head-3">
                    {DocumentTypeInfo[DocumentType.PART_TIME_PERMIT].name}
                  </div>
                </div>
              </div>
            </div>
          )}
          {data && data?.data[DocumentType.LABOR_CONTRACT] ? (
            <DocumentCardDispenserEmployer
            documentInfo={
                data.data[DocumentType.LABOR_CONTRACT] as EmployDocumentInfo
              }
              title={DocumentTypeInfo[DocumentType.LABOR_CONTRACT].name}
              type={DocumentType.LABOR_CONTRACT}
              reason={
                data?.data[DocumentType.LABOR_CONTRACT].reason || undefined
              }
              setIsLoading={setIsLoading}
            />
          ) : (
            <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-start justify-start py-6 cursor-pointer text-left text-[#1e1926]">
              <div className="self-stretch flex flex-col items-start justify-start px-4">
                <div className="self-stretch flex flex-row items-center justify-center pl-2 gap-4">
                  <div className="flex-1 flex items-center justify-start head-3">
                    {DocumentTypeInfo[DocumentType.LABOR_CONTRACT].name}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantDocumentsDetailPage;
