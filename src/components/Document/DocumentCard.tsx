import { DocumentInfo } from '@/types/api/document';
import TalkBallonIconGrey from '@/assets/icons/TalkBalloonGrey.svg?react';
import FolderIcon from '@/assets/icons/FolderIcon.svg?react';
import DownloadIcon from '@/assets/icons/DownloadIcon.svg?react';
import BlackFolderIcon from '@/assets/icons/BlackFolder.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  usePatchDocumentsStatusConfirmation,
  usePatchStatusSubmission,
} from '@/hooks/api/useDocument';
import { useCurrentDocumentIdStore } from '@/store/url';
import { ReactNode } from 'react';
import { SuccessModalContent } from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import ArrowrightIcon from '@/assets/icons/Chevron.svg?react';

const enum DocumentStatus {
  TEMPORARY_SAVE = 'TEMPORARY_SAVE',
  SUBMITTED = 'SUBMITTED',
  BEFORE_CONFIRMATION = 'BEFORE_CONFIRMATION',
  REQUEST = 'REQUEST',
  CONFIRMATION = 'CONFIRMATION',
}

type DocumentCardProps = {
  tagText?: string;
  tagStyle?: string;
  children?: ReactNode;
  title: string;
  content: string;
  preview?: string;
  onPreview?: () => void;
};

const DocumentCardLayout = ({
  tagText,
  tagStyle,
  children,
  title,
  content,
  preview,
  onPreview,
}: DocumentCardProps) => {
  return (
    <div className="w-full p-4 flex flex-col rounded-lg bg-white border border-border-disabled">
      <div
        className={`w-fit body-3 px-1 py-1 mb-1 ${tagStyle} rounded-sm justify-center items-center inline-flex`}
      >
        {tagText}
      </div>
      <div className="w-full pb-2 border-b border-border-disabled">
        <p className="head-3 py-1">{title}</p>
      </div>
      <section className="w-full flex flex-col gap-2">
        <div className="w-full pt-2 body-3 text-text-alternative">
          <p>{content}</p>
        </div>
        {preview && (
          <div
            className="relative w-full button-2 bg-surface-secondary rounded-lg px-3 py-2 flex flex-row items-center justify-start gap-1"
            onClick={onPreview}
          >
            <BlackFolderIcon />
            <p>{preview}</p>
            <div className="absolute right-3">
              <ArrowrightIcon />
            </div>
          </div>
        )}
        <div className="w-full flex flex-row gap-2">{children}</div>
      </section>
    </div>
  );
};

type DocumentCardDispenserProps = {
  documentInfo: DocumentInfo;
  title: string;
  type: string;
  setIsLoading: (value: boolean) => void;
  setSuccessModalContent: (content: SuccessModalContent) => void;
};

const DocumentCardDispenser = ({
  documentInfo,
  title,
  type,
  setIsLoading,
  setSuccessModalContent,
}: DocumentCardDispenserProps) => {
  const { mutate: submitDocument } = usePatchStatusSubmission({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      setSuccessModalContent({
        title: 'Registration has been\nsuccessfully completed',
        content: `The employer will check the documents\nsoon and fill them out together.\nWe will send you a notification when I'm\ndone writing it!`,
        onNext: () => window.location.reload(),
      });
    },
  });
  const { mutate: confirmDocument } = usePatchDocumentsStatusConfirmation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
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
      <DocumentCardLayout
        title={title}
        tagStyle="bg-[#0066ff]/10 text-text-success"
        tagText="Your form is ready ! Check it out 🎉"
        content="Click to download the original document."
      >
        <div className="flex flex-col gap-2 w-full items-start justify-start text-text-normal]">
          {documentInfo.word_url && (
            <div className="w-full rounded-lg bg-surface-secondary  flex items-center justify-between border border-surface-disabled px-4 py-2 pl-2.5">
              <div className="flex items-center justify-start gap-2">
                <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-primary-dark">
                  <FolderIcon />
                </div>
                <div className="relative body-3 opacity-75">
                  word file download
                </div>
              </div>
              <div
                onClick={() => handleDownload(documentInfo.word_url as string)}
              >
                <DownloadIcon />
              </div>
            </div>
          )}
        </div>
      </DocumentCardLayout>
    );
  switch (documentInfo.status) {
    case DocumentStatus.TEMPORARY_SAVE:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-surface-primary text-primary-dark"
          tagText="Check my Work Permit Form 📝"
          content="If you are sure of the content, click Submit to send it to your employer."
        >
          <button
            className="bg-surface-secondary text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-2"
            onClick={() => {
              updateCurrentDocumentId(documentInfo.id);
              navigate(`/write-documents/${documentInfo.id}`, {
                state: {
                  type: type,
                  isEdit: true,
                },
              });
            }}
          >
            Edit
          </button>
          <button
            className="bg-surface-primary text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-2"
            onClick={() => submitDocument(Number(documentInfo.id))}
          >
            Submit
          </button>
        </DocumentCardLayout>
      );
    case DocumentStatus.SUBMITTED:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-primary-neutral text-primary-dark"
          tagText="Pending ... 🔄"
          content="The employer is in the process of completing the form."
          preview="Check my Document"
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
    case DocumentStatus.BEFORE_CONFIRMATION:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-surface-primary text-primary-dark"
          tagText="Check my Work Permit Form 📝"
          content={`The employer has completed the document.
              Please review the content and if there are any issues, submit a
              Request. If everything is fine, complete the process by selecting
              Confirm.`}
          preview="Check my Document"
          onPreview={() => {
            updateCurrentDocumentId(documentInfo.id);
            navigate(`/document-preview/${documentInfo.id}`, {
              state: {
                type: type,
              },
            });
          }}
        >
          <button
            className="bg-primary-dark text-white w-full py-3 flex justify-center items-center rounded-lg button-2"
            onClick={() => {
              updateCurrentDocumentId(documentInfo.id);
              navigate(`/request-modify/${documentInfo.id}`, {
                state: {
                  type: type,
                },
              });
            }}
          >
            Request
          </button>
          <button
            className="bg-surface-primary text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-2"
            onClick={() => confirmDocument(Number(documentInfo.id))}
          >
            Confirm
          </button>
        </DocumentCardLayout>
      );
    case DocumentStatus.REQUEST:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-primary-neutral text-primary-dark"
          tagText="Pending ... 🔄"
          content="The employer is in the process of completing the form."
        >
          <div className="flex flex-col w-full items-start justify-start text-text-normal">
            <div className="w-full rounded-lg bg-surface-secondary flex items-center justify-start border border-surface-disabled px-4 py-2 pl-2.5">
              <div className="flex items-center justify-start gap-2">
                <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-primary-dark">
                  <TalkBallonIconGrey />
                </div>
                <div className="relative body-3 opacity-75">
                  The employer is currently writing it.
                </div>
              </div>
            </div>
          </div>
        </DocumentCardLayout>
      );
    case DocumentStatus.CONFIRMATION:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-[#0066ff]/10 text-text-success"
          tagText="Your form is ready ! Check it out 🎉"
          content="Click to download the original document."
        >
          <div className="flex flex-col gap-2 w-full items-start justify-start text-text-normal]">
            {documentInfo.word_url && (
              <div className="w-full rounded-lg bg-surface-secondary  flex items-center justify-between border border-surface-disabled px-4 py-2 pl-2.5">
                <div className="flex items-center justify-start gap-2">
                  <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-primary-dark">
                    <FolderIcon />
                  </div>
                  <div className="relative body-3 opacity-75">
                    word file download
                  </div>
                </div>
                <div
                  onClick={() =>
                    handleDownload(documentInfo.word_url as string)
                  }
                >
                  <DownloadIcon />
                </div>
              </div>
            )}
          </div>
        </DocumentCardLayout>
      );
  }
};

export default DocumentCardDispenser;
