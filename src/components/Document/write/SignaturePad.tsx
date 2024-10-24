import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type SignaturePadProps = {
  onSave?: (signature: string) => void;
  onReset?: () => void;
  width?: number;
  height?: number;
};

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  onReset,
  height = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [signatureData, setSignatureData] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    // 화면 크기에 맞춰 서명 패드의 크기를 따로 조절하는 Observer를 추가하는 Effect 훅
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;

        // width가 실제로 변경되었을 때만 상태 초기화
        if (newWidth !== width) {
          setWidth(newWidth);
          if (sigPadRef.current) {
            sigPadRef.current.clear();
            setCanSave(false); // 캔버스가 초기화되므로 저장 가능 상태도 초기화
          }
        }
      }
    };

    // 초기 너비 설정
    updateWidth();

    // ResizeObserver로 부모 요소 크기 변화 감지
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [width]); //

  // 서명 패드의 활성화/비활성화를 담당하는 함수
  const handleCreateOrReset = () => {
    if (isEditing) {
      // Reset 동작
      if (sigPadRef.current) {
        sigPadRef.current.clear();
        onReset?.();
        setSignatureData('');
        setCanSave(false);
      }
    } else {
      // Create 동작
      setIsEditing(true);
    }
  };

  // 작성된 서명을 base64 형태로 저장하는 함수
  const handleSave = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.toDataURL('image/png', {
        backgroundColor: 'transparent',
      });
      setSignatureData(dataUrl);
      onSave?.(dataUrl);
    }
  };

  // 서명 입력 시작을 감지하는 함수
  const handleBeginStroke = () => {
    if (isEditing) {
      setCanSave(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="border border-gray-200 rounded-xl">
        {/* 서명 패드 활성화에 따른 조건부 렌더링 */}
        {isEditing && width > 0 ? (
          <SignatureCanvas
            ref={sigPadRef}
            onBegin={handleBeginStroke}
            canvasProps={{
              width,
              height,
              className: 'signature-canvas',
              style: { borderRadius: '12px' },
            }}
            backgroundColor="white"
          />
        ) : (
          <div className="w-full h-[7.5rem]" />
        )}
      </div>
      {/* 서명 패드 제어판 */}
      <div className="flex gap-2">
        <button
          onClick={handleCreateOrReset}
          className={`relative rounded-lg bg-[#1e1926] flex flex-row items-center justify-center px-6 py-2.5 box-border text-left text-[#f4f4f9]`}
        >
          {isEditing ? 'Reset' : 'Create'}
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`relative rounded-lg flex flex-row items-center justify-center px-6 py-2.5 box-border text-left text-[#1e1926] ${
            canSave ? 'bg-[#fef387]' : 'bg-[#F4F4F9] cursor-not-allowed'
          }`}
        >
          {signatureData !== '' ? 'Saved' : 'Saving'}
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
