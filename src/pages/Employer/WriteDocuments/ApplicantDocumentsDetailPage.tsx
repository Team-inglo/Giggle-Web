import BaseHeader from '@/components/Common/Header/BaseHeader';
import { EmployerDocumentTypeInfo } from '@/constants/documents';
import { EmployDocumentInfo, EmployDocumentType } from '@/types/api/document';
import DocumentCardDispenserEmployer from '@/components/Employer/ApplicantDocumentsDetail/DocumentCardDispenserEmployer';
import { useNavigate } from 'react-router-dom';
import { useGetDocumentsEmployer } from '@/hooks/api/useDocument';
import { useCurrentApplicantIdStore } from '@/store/url';
import { useState } from 'react';
import CompleteModal from '@/components/Common/CompleteModal';
import PageTitle from '@/components/Common/PageTitle';
import InfoCardLayout from '@/components/Common/InfoCardLayout';
import YellowDocumentIcon from '@/assets/icons/YellowDocumentIcon.svg?react';
import { SuccessModalContent } from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';

const ApplicantDocumentsDetailPage = () => {
  const { currentApplicantId } = useCurrentApplicantIdStore();
  const { data } = useGetDocumentsEmployer(Number(currentApplicantId));
  const documentTypes = Object.values(EmployDocumentType);
  const navigate = useNavigate();
  const [successModalContent, setSuccessModalContent] = useState({
    title: '',
    content: '',
    onNext: () => {},
  });

  return (
    <>
      {successModalContent.title && (
        <CompleteModal
          title={successModalContent.title}
          content={successModalContent.content}
          onNext={successModalContent.onNext}
        />
      )}
      <div>
        <BaseHeader
          hasBackButton={true}
          hasMenuButton={false}
          onClickBackButton={() => navigate(-1)}
          title="서류 관리"
        />
        <section className="w-full h-[calc(100vh-60px)] bg-surface-secondary overflow-y-scroll scrollbar-hide">
          <PageTitle
            title={`서류를 한 곳에서 관리하세요!`}
            content={`시간제취업허가서부터 근로계약서까지\n한눈에 확인하고 관리하세요. 진행 상황을 확인하고\n필요한 단계를 빠르게 완료할 수 있어요.`}
          />
          <div className="flex flex-col gap-2 p-4">
            {documentTypes.map((property, index) =>
              data?.data[property] ? (
                <DocumentCardDispenserEmployer
                  key={`${index}_${property}`}
                  documentInfo={data.data[property] as EmployDocumentInfo}
                  title={EmployerDocumentTypeInfo[property].name}
                  type={property}
                  reason={data?.data[property]?.reason}
                  setModalContent={(content: SuccessModalContent) =>
                    setSuccessModalContent(content)
                  }
                />
              ) : (
                <div
                  key={`${index}_${property}_empty`}
                  className="w-full relative rounded-[1.125rem] flex flex-col items-start justify-start cursor-pointer"
                >
                  <InfoCardLayout
                    icon={<YellowDocumentIcon />}
                    title={EmployerDocumentTypeInfo[property].name}
                  />
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicantDocumentsDetailPage;
