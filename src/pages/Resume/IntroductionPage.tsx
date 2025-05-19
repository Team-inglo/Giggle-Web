import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import IntroductionInput from '@/components/Introduction/IntroductionInput';
import { buttonTypeKeys } from '@/constants/components';
import { usePatchIntroduction } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { IntroductionRequest } from '@/types/api/resumes';
import { smartNavigate } from '@/utils/application';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IntroductionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackButtonClick = useNavigateBack();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialData = useMemo(
    () =>
      location.state?.data || {
        title: '',
        introduction: '',
      },
    [location.state?.data],
  );
  const [data, setData] = useState<IntroductionRequest>(initialData);

  // 초기 값에서 수정된 내용이 있는지 확인
  const [isValid, setIsValid] = useState<boolean>(false);

  // 입력창을 감싸는 div 클릭 시 textarea에 포커스 설정
  const handleFocusTextArea = () => {
    textareaRef.current?.focus();
    const length = textareaRef.current!.value.length;
    textareaRef.current!.selectionStart = length;
    textareaRef.current!.selectionEnd = length;
  };

  const { mutate } = usePatchIntroduction();

  const isEqual = (a: IntroductionRequest, b: IntroductionRequest) => {
    return a.title === b.title && a.introduction === b.introduction;
  };
  const handleSubmit = () => {
    // API - 7.8 (유학생) 자기소개 수정하기
    if (isEqual(data, initialData))
      smartNavigate(navigate, '/profile/manage-resume', { forceSkip: true });
    else mutate({ introduction: data.introduction, title: data.title });
  };

  // textarea에 스크롤이 생기지 않도록 길이 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    // 편집 중인지 여부 확인
    const isValidEdit =
      (data.title?.trim().length ?? 0) > 0 &&
      (data.introduction?.trim().length ?? 0) > 0;
    setIsValid(isValidEdit);
  }, [data, initialData]);

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      <PageTitle
        title="Tell employers a little about yourself!"
        content="Highlight your skills, experience,
and what makes you a great candidate"
      />
      <IntroductionInput
        data={data}
        textareaRef={textareaRef}
        handleFocusTextArea={handleFocusTextArea}
        handleChange={setData}
      />
      <BottomButtonPanel>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isValid ? 'bg-surface-primary' : 'bg-surface-disabled'}
          fontColor={isValid ? 'text-text-strong' : 'text-text-disabled'}
          title="Save"
          isBorder={false}
          onClick={isValid ? handleSubmit : undefined}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default IntroductionPage;
