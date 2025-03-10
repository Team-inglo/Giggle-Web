import { DocumentInfo } from '@/types/api/document';
import Button from '@/components/Common/Button';
import ArrowrightIcon from '@/assets/icons/Chevron.svg?react';
import TalkBallonIcon from '@/assets/icons/TalkBalloon.svg?react';
import TalkBallonIconGrey from '@/assets/icons/TalkBalloonGrey.svg?react';
import FolderIcon from '@/assets/icons/FolderIcon.svg?react';
import DownloadIcon from '@/assets/icons/DownloadIcon.svg?react';
import CheckIconGreen from '@/assets/icons/CheckIconGreen.svg?react';
import WriteIcon from '@/assets/icons/WriteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  usePatchDocumentsStatusConfirmation,
  usePatchStatusSubmission,
} from '@/hooks/api/useDocument';
import { useCurrentDocumentIdStore } from '@/store/url';

const enum DocumentStatus {
  TEMPORARY_SAVE = 'TEMPORARY_SAVE',
  SUBMITTED = 'SUBMITTED',
  BEFORE_CONFIRMATION = 'BEFORE_CONFIRMATION',
  REQUEST = 'REQUEST',
  CONFIRMATION = 'CONFIRMATION',
}

type DocumentCardProps = {
  documentInfo: DocumentInfo;
  title: string;
  type: string;
  onNext?: () => void;
  setIsLoading: (value: boolean) => void;
};

const TemporarySaveCard = ({
  title,
  onNext,
  onEdit,
  onPreview,
}: {
  title: string;
  onNext: () => void;
  onEdit: () => void;
  onPreview?: () => void;
}) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#fef387] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative ">
          Check my Work Permit Form
          <div className="w-1.5 absolute !m-0 top-[-0.3rem] right-[-0.5rem] rounded-full bg-[#ff6f61] h-1.5 z-[1]" />
        </div>
        <div className="w-[0.75rem] relative h-[0.75rem] z-[2]">
          <div
            className="absolute w-full h-full top-0 righ-0 bottom-0 left-0"
            onClick={onPreview}
          />
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
              You can request the employer to complete the part-time employment
              permit form by clicking Submit. After the request is made, editing
              will no longer be possible.
            </p>
            <div>&nbsp;</div>
            <p className="m-0 text-[#FF6F61]">
              * Please carefully review the information to ensure its accuracy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex self-stretch items-center justify-center p-4 gap-1 text-[#464646]">
        <Button
          type="large"
          bgColor="bg-[#f4f4f9]"
          fontColor="text-[#222]"
          isBorder={false}
          title="Edit"
          onClick={onEdit}
        />
        <Button
          type="large"
          bgColor="bg-[#fef387]"
          fontColor="text-[#222]"
          isBorder={false}
          title="Submit"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

const BeforeConfirmationCard = ({
  title,
  onNext,
  onRequest,
  onPreview,
}: {
  title: string;
  onNext: () => void;
  onRequest: () => void;
  onPreview: () => void;
}) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#fef387] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative ">
          Check my Work Permit Form
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
              The employer has completed the part-time employment permit form.
              Please review the content and if there are any issues, submit a
              Request. If everything is fine, complete the process by selecting
              Confirm.
            </p>
            <div>&nbsp;</div>
            <p className="m-0 text-[#FF6F61]">
              * Please note that after confirming, no further edits can be made
            </p>
          </div>
        </div>
      </div>
      <div className="flex self-stretch items-center justify-center p-4 gap-1 text-[#464646]">
        <Button
          type="large"
          bgColor="bg-[#1e1926]"
          fontColor="text-white"
          isBorder={false}
          title="Request"
          onClick={onRequest}
        />
        <Button
          type="large"
          bgColor="bg-[#fef387]"
          fontColor="text-[#222]"
          isBorder={false}
          title="Confirm"
          onClick={onNext}
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
          Pending ...
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
              The employer is in the process of completing the part-time
              employment permit form
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-start py-2 px-4 text-[#464646]">
        <div className="w-full rounded-3xl bg-[#f4f4f9] flex items-center justify-start border border-[#dcdcdc] px-4 py-2 pl-2.5">
          <div className="flex items-center justify-start gap-2">
            <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-[#1e1926]">
              <TalkBallonIconGrey />
            </div>
            <div className="relative body-3 opacity-75">writing ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestedCard = ({ title }: { title: string }) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#1e1926] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative text-[#f4f4f9]">
          Pending ...
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
              The employer is revising the document according to the requested
              changes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-start justify-start py-2 px-4 text-[#464646]">
        <div className="w-full rounded-3xl bg-[#f4f4f9] flex items-center justify-start border border-[#dcdcdc] px-4 py-2 pl-2.5">
          <div className="flex items-center justify-start gap-2">
            <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-[#1e1926]">
              <TalkBallonIconGrey />
            </div>
            <div className="relative body-3 opacity-75">rewriting ...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmationCard = ({
  documentInfo,
  title,
  onDownload,
  onPreview,
}: {
  title: string;
  documentInfo: DocumentInfo;
  onDownload: (url: string) => void;
  onPreview: () => void;
}) => {
  return (
    <div className="w-full relative rounded-[1.125rem] bg-white border border-[#dcdcdc] flex flex-col items-center justify-center gap-2 caption text-left text-[#1e1926]">
      <div className="self-stretch rounded-t-[1.125rem] bg-[#fef387] h-7 flex items-center justify-between px-4 pl-6 py-2 relative">
        <div className="flex items-center justify-start relative ">
          Check my Work Permit Form
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
            {!documentInfo.word_url ? <WriteIcon /> : <CheckIconGreen />}
          </div>
        </div>

        <div className="self-stretch flex items-center justify-center px-3 text-[#656565] caption">
          <div className="flex-1 relative">
            <p className="m-0">
              The employer is in the process of completing the part-time
              employment permit form
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
              <div className="relative body-3 opacity-75">
                word file download
              </div>
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

const DocumentCardDispenser = ({
  documentInfo,
  title,
  type,
  setIsLoading,
}: DocumentCardProps) => {
  const { mutate: submitDocument } = usePatchStatusSubmission({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const { mutate: confirmDocument } = usePatchDocumentsStatusConfirmation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const navigate = useNavigate();
  const { updateCurrentDocumentId } = useCurrentDocumentIdStore();
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
  if (title === 'Integrated Application Form')
    return (
      <ConfirmationCard
        title={title}
        documentInfo={documentInfo}
        onDownload={handleDownload}
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
  switch (documentInfo.status) {
    case DocumentStatus.TEMPORARY_SAVE:
      return (
        <TemporarySaveCard
          title={title}
          onNext={() => submitDocument(Number(documentInfo.id))}
          onEdit={() => {
            updateCurrentDocumentId(documentInfo.id);
            navigate(`/write-documents/${documentInfo.id}`, {
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
    case DocumentStatus.SUBMITTED:
      return <SubmittedCard title={title} />;
    case DocumentStatus.BEFORE_CONFIRMATION:
      return (
        <BeforeConfirmationCard
          title={title}
          onNext={() => confirmDocument(Number(documentInfo.id))}
          onRequest={() => {
            updateCurrentDocumentId(documentInfo.id);
            navigate(`/request-modify/${documentInfo.id}`, {
              state: {
                type: type,
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
    case DocumentStatus.REQUEST:
      return <RequestedCard title={title} />;
    case DocumentStatus.CONFIRMATION:
      return (
        <ConfirmationCard
          title={title}
          documentInfo={documentInfo}
          onDownload={handleDownload}
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
  }
};

export default DocumentCardDispenser;
