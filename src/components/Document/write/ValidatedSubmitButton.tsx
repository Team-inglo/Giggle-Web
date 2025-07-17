/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Common/Button';
import { cloneElement, ReactElement, useMemo } from 'react';
import { FieldValues, useWatch } from 'react-hook-form';

// 범용적인 유효성 검사 버튼 컴포넌트
type ValidatedSubmitButtonProps<T extends FieldValues> = {
  fieldNames: (keyof T)[]; // 감시할 필드 이름 배열
  validationFn: (data: any) => boolean; // 유효성 검사 함수
  formatData?: (data: any) => any; // 선택적: 데이터 포맷팅 함수
  children: ReactElement; // 버튼 컴포넌트를 받습니다
  // 기타 Button 컴포넌트에 전달할 props
  onClick: () => void;
};

const ValidatedSubmitButton = <T extends FieldValues>({
  fieldNames,
  validationFn,
  formatData = (data) => data,
  children,
  onClick,
}: ValidatedSubmitButtonProps<T>) => {
  // 필요한 모든 필드를 한 번에 감시
  const watchedFields = useWatch({
    name: fieldNames as any[], // TypeScript 타입 문제 해결을 위한 캐스팅
  });

  // 감시된 필드들로부터 데이터 객체 생성
  const formData = useMemo(() => {
    const data: { [key: string]: any } = {};
    fieldNames.forEach((name, index) => {
      // 중첩 객체 속성 처리 (예: 'phone.start')
      if (String(name).includes('.')) {
        const parts = String(name).split('.');
        let current = data;

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) current[part] = {};
          current = current[part];
        }

        current[parts[parts.length - 1]] = watchedFields[index];
      } else {
        data[name as string] = watchedFields[index];
      }
    });
    return formatData(data);
  }, [watchedFields, fieldNames, formatData]);

  // 유효성 검사 수행
  const isValid = useMemo(
    () => validationFn(formData),
    [formData, validationFn],
  );

  // Button 컴포넌트에 맞는 props 설정
  return cloneElement(children, {
    ...children.props,
    onClick: isValid ? onClick : () => {},
    disabled: !isValid,
    isFullWidth: true,
    size: Button.Size.LG,
    layout: Button.Layout.FLEX_BUTTON,
    type: isValid ? Button.Type.PRIMARY : Button.Type.DISABLED,
    style: {
      ...(children.props?.style || {}),
    },
  });
};

export default ValidatedSubmitButton;
