import {
  DocumentType,
  EmployDocumentInfo,
  EmployerInformation,
  LaborContractEmployerInfo,
} from '@/types/api/document';
import Button from '@/components/Common/Button';
import ArrowrightIcon from '@/assets/icons/Chevron.svg?react';
import TalkBallonIcon from '@/assets/icons/TalkBalloon.svg?react';
import TalkBallonIconGrey from '@/assets/icons/TalkBalloonGrey.svg?react';
import FolderIcon from '@/assets/icons/FolderIcon.svg?react';
import DownloadIcon from '@/assets/icons/DownloadIcon.svg?react';
import CheckIconGreen from '@/assets/icons/CheckIconGreen.svg?react';
import WriteIcon from '@/assets/icons/WriteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { DocumentStatusEmployer } from '@/constants/documents';
import {
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
  usePatchStatusSubmissionEmployer,
} from '@/hooks/api/useDocument';
import { useCurrentDocumentIdStore } from '@/store/url';
import { useEffect, useState } from 'react';

type DocumentCardProps = {
  documentInfo: EmployDocumentInfo;
  title: string;
  type: string;
  reason?: string;
  setIsLoading: (loadingStatus: boolean) => void;
};

const NullCard = ({ title }: { title: string }) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#1e1926] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative text-[#f4f4f9]">
          대기 ...
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start px-4 gap-4 body-1">
        <div className="self-stretch border-b border-[#dcdcdc] h-10 flex items-center justify-center pl-2 pb-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{title}</div>
          </div>
          <div className="overflow-hidden flex items-center justify-center p-2">
            <TalkBallonIcon />
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">유학생이 서류를 작성 중이에요.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-start py-2 px-4 text-[#464646]">
        <div className="w-full rounded-3xl bg-[#f4f4f9] flex items-center justify-start border border-[#dcdcdc] px-4 py-2 pl-2.5">
          <div className="flex items-center justify-start gap-2">
            <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-[#1e1926]">
              <TalkBallonIconGrey />
            </div>
            <div className="relative body-3 opacity-75">작성 중 ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemporarySaveCard = ({
  title,
  onCheck,
  onSubmit,
  onEdit,
  onPreview,
}: {
  title: string;
  onCheck: () => Promise<
    EmployerInformation | LaborContractEmployerInfo | null
  >;
  onSubmit: () => void;
  onEdit: () => void;
  onPreview: () => void;
}) => {
  const [isEmployerWrote, setIsEmployerWrote] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDocuments = async () => {
      const result = await onCheck();
      setIsEmployerWrote(result !== null);
    };
    checkDocuments();
  }, []);
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#fef387] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative ">
          클릭해서 서류 내용을 확인해보세요.
          <div className="w-1.5 absolute !m-0 top-[-0.3rem] right-[-0.5rem] rounded-full bg-[#ff6f61] h-1.5 z-[1]" />
        </div>
        <div
          className="pl-1 w-[1.25rem] relative h-[1.25rem] z-[2]"
          onClick={onPreview}
        >
          <ArrowrightIcon />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start px-4 gap-4 body-1">
        <div className="self-stretch border-b border-[#dcdcdc] h-10 flex items-center justify-center pl-2 pb-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{title}</div>
          </div>
          <div className="overflow-hidden flex items-center justify-center p-2">
            <TalkBallonIcon />
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">
              유학생이 서류 작성을 요청했어요. 유학생이 작성한 내용을 검토하고,
              내용을 작성해주세요.
            </p>
            <div>&nbsp;</div>
            <p className="m-0 text-[#FF6F61]">
              * 제출 후에는 수정이 불가능해요. 내용을 정확하게 작성해주세요.
            </p>
          </div>
        </div>
      </div>
      <div className="flex self-stretch items-center justify-center p-4 gap-1 text-[#464646]">
        <Button
          type="large"
          bgColor={isEmployerWrote ? 'bg-[#f4f4f9]' : 'bg-[#fef387]'}
          fontColor="text-[#222]"
          isBorder={false}
          title={isEmployerWrote ? '수정' : '작성'}
          onClick={onEdit}
        />
        <Button
          type="large"
          bgColor={isEmployerWrote ? 'bg-[#fef387]' : 'bg-[#f4f4f9]'}
          fontColor="text-[#222]"
          isBorder={false}
          title="제출"
          onClick={() => {
            if (isEmployerWrote) {
              onSubmit();
            }
          }}
        />
      </div>
    </div>
  );
};

const SubmittedCard = ({ title }: { title: string }) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#1e1926] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative text-[#f4f4f9]">
          대기 ...
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start px-4 gap-4 body-1">
        <div className="self-stretch border-b border-[#dcdcdc] h-10 flex items-center justify-center pl-2 pb-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{title}</div>
          </div>
          <div className="overflow-hidden flex items-center justify-center p-2">
            <TalkBallonIcon />
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">유학생이 서류를 검토 중이에요.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-start py-2 px-4 text-[#464646]">
        <div className="w-full rounded-3xl bg-[#f4f4f9] flex items-center justify-start border border-[#dcdcdc] px-4 py-2 pl-2.5">
          <div className="flex items-center justify-start gap-2">
            <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-[#1e1926]">
              <TalkBallonIconGrey />
            </div>
            <div className="relative body-3 opacity-75">검토 중 ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RewritingCard = ({
  title,
  onCheck,
  onSubmit,
  onEdit,
  onPreview,
  reason,
}: {
  title: string;
  onCheck: () => Promise<
    EmployerInformation | LaborContractEmployerInfo | null
  >;
  onSubmit: () => void;
  onEdit: () => void;
  onPreview: () => void;
  reason: string;
}) => {
  const [isEmployerWrote, setIsEmployerWrote] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDocuments = async () => {
      const result = await onCheck();
      setIsEmployerWrote(result !== null);
    };
    checkDocuments();
  }, []);
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#fef387] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative ">
          클릭해서 서류 내용을 확인해보세요.
          <div className="w-1.5 absolute !m-0 top-[-0.3rem] right-[-0.5rem] rounded-full bg-[#ff6f61] h-1.5 z-[1]" />
        </div>
        <div
          className="pl-1 w-[1.25rem] relative h-[1.25rem] z-[2]"
          onClick={onPreview}
        >
          <ArrowrightIcon />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start px-4 gap-4 body-1">
        <div className="self-stretch border-b border-[#dcdcdc] h-10 flex items-center justify-center pl-2 pb-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{title}</div>
          </div>
          <div className="overflow-hidden flex items-center justify-center p-2">
            <TalkBallonIcon />
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">
              유학생이 아래 사유로 서류 수정을 요청했어요. 수정 후 다시
              제출해주세요.
            </p>
            <div>&nbsp;</div>
            <p className="m-0 text-[#1E1926]">{reason}</p>
          </div>
        </div>
      </div>
      <div className="flex self-stretch items-center justify-center p-4 gap-1 text-[#464646]">
        <Button
          type="large"
          bgColor={isEmployerWrote ? 'bg-[#f4f4f9]' : 'bg-[#fef387]'}
          fontColor="text-[#222]"
          isBorder={false}
          title={isEmployerWrote ? '수정' : '작성'}
          onClick={onEdit}
        />
        <Button
          type="large"
          bgColor={isEmployerWrote ? 'bg-[#fef387]' : 'bg-[#f4f4f9]'}
          fontColor="text-[#222]"
          isBorder={false}
          title="제출"
          onClick={() => {
            if (isEmployerWrote) {
              onSubmit();
            }
          }}
        />
      </div>
    </div>
  );
};

const ConfirmationCard = ({
  documentInfo,
  title,
  onDownload,
}: {
  title: string;
  documentInfo: EmployDocumentInfo;

  onDownload: (url: string) => void;
}) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#1e1926] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative text-[#fef387]">
          서류 작성이 완료되었습니다.
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start px-4 gap-4 body-1">
        <div className="self-stretch border-b border-[#dcdcdc] h-10 flex items-center justify-center pl-2 pb-2 gap-4">
          <div className="flex-1 flex items-center justify-start">
            <div className="relative head-3">{title}</div>
          </div>
          <div className="overflow-hidden flex items-center justify-center p-2">
            {!documentInfo.word_url ? <WriteIcon /> : <CheckIconGreen />}
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">
              아래 버튼을 통해 원본 파일을 다운로드 할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full items-start justify-start py-2 px-4 text-[#464646]">
        {documentInfo.word_url && (
          <div className="w-full rounded-3xl bg-[#f4f4f9] flex items-center justify-between border border-[#dcdcdc] px-4 py-2 pl-2.5">
            <div className="flex items-center justify-start gap-2">
              <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-[#1e1926]">
                <FolderIcon />
              </div>
              <div className="relative body-3 opacity-75">word로 다운로드</div>
            </div>
            <div onClick={() => onDownload(documentInfo.word_url as string)}>
              <DownloadIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DocumentCardDispenserEmployer = ({
  documentInfo,
  title,
  type,
  reason,
  setIsLoading,
}: DocumentCardProps) => {
  const navigate = useNavigate();
  const handleDownload = (url: string) => {
    // 웹뷰 환경인지 체크
    const isWebView = Boolean(window.ReactNativeWebView);
    if (isWebView) {
      // 웹뷰에서는 DocumentViewer로 이동
      navigate('/document-view/123', {
        state: {
          url,
          filename: url.split('/').pop(), // URL에서 파일명 추출
        },
      });
    } else {
      // 웹 환경에서는 직접 다운로드
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'download';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const { updateCurrentDocumentId } = useCurrentDocumentIdStore();
  const { mutate: submitDocument } = usePatchStatusSubmissionEmployer({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const { mutateAsync: getPartTimeDocument } = useGetPartTimeEmployPermit({
    onSuccess: (data) => {
      return data.data.employer_information;
    },
  });
  const { mutateAsync: getLaborContractDocument } = useGetStandardLaborContract(
    {
      onSuccess: (data) => {
        return data.data.employer_information;
      },
    },
  );

  const checkEmployerWriteDocuments = async () => {
    if (type === DocumentType.PART_TIME_PERMIT) {
      const result = await getPartTimeDocument(documentInfo.id);
      return result?.data.employer_information || null;
    } else {
      const result = await getLaborContractDocument(documentInfo.id);
      return result?.data.employer_information || null;
    }
  };

  if (!documentInfo.status) return <NullCard title={title} />;
  switch (documentInfo.status) {
    case DocumentStatusEmployer.TEMPORARY_SAVE:
      return (
        <TemporarySaveCard
          title={title}
          onCheck={checkEmployerWriteDocuments}
          onSubmit={() => submitDocument(Number(documentInfo.id))} // 고용주가 서류 제출
          onEdit={() => {
            updateCurrentDocumentId(documentInfo.id);
            navigate(`/employer/write-documents/${documentInfo.id}`, {
              // EmployerWriteDocumentPage.tsx
              state: {
                type: type,
                isEdit: true,
              },
            });
          }}
          onPreview={() => {
            updateCurrentDocumentId(documentInfo.id);
            navigate(`/document-preview/${documentInfo.id}`, {
              state: {
                type: type,
              },
            });
          }}
        />
      );
    case DocumentStatusEmployer.SUBMITTED:
      return <SubmittedCard title={title} />;
    case DocumentStatusEmployer.REWRITING:
      if (reason)
        return (
          <RewritingCard
            title={title}
            reason={reason}
            onCheck={checkEmployerWriteDocuments}
            onSubmit={() => submitDocument(Number(documentInfo.id))} // 고용주가 서류 제출
            onEdit={() => {
              updateCurrentDocumentId(documentInfo.id);
              navigate(`/employer/write-documents/${documentInfo.id}`, {
                state: {
                  type: type,
                  isEdit: true,
                },
              });
            }}
            onPreview={() => {
              updateCurrentDocumentId(documentInfo.id);
              navigate(`/document-preview/${documentInfo.id}`, {
                state: {
                  type: type,
                },
              });
            }}
          />
        );
      break;
    case DocumentStatusEmployer.CONFIRMATION:
      return (
        <ConfirmationCard
          title={title}
          documentInfo={documentInfo}
          onDownload={handleDownload}
        />
      );
  }
};

export default DocumentCardDispenserEmployer;
