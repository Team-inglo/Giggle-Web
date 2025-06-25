import { IFRAME_STYLE_TAG } from '@/constants/iframe';
import BaseHeader from '@/components/Common/Header/BaseHeader';

const PolicyViewer = ({
  content,
  onBack,
}: {
  content: string;
  onBack: () => void;
}) => {
  // 2. iframe 사용
  const renderWithIframe = () => {
    const responsiveContent = content.replace(
      '</head>',
      `${IFRAME_STYLE_TAG}
      </head>`,
    );

    return (
      <iframe
        className="w-full h-screen border-0"
        srcDoc={responsiveContent}
        title="HTML Content"
        sandbox="allow-scripts"
      />
    );
  };
  return (
    <div className="fixed top-0 w-full h-full space-y-8 z-50 bg-white">
      <div>
        <BaseHeader
          hasBackButton
          hasMenuButton={false}
          title="서비스 이용약관 동의"
          onClickBackButton={onBack}
        />
        <div className="w-full border-t border-[#dcdcdc]" />
        {renderWithIframe()}
      </div>
    </div>
  );
};

export default PolicyViewer;
