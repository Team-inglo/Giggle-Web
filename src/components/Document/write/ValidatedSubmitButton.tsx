/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/Common/Button';
import { useMemo } from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';

// 범용적인 유효성 검사 버튼 컴포넌트
type ValidatedSubmitButtonProps<T extends FieldValues> = {
  control: Control<T>; // React Hook Form의 control 객체
  fieldNames: (keyof T)[]; // 감시할 필드 이름 배열
  validationFn: (data: any) => boolean; // 유효성 검사 함수
  formatData?: (data: any) => any; // 선택적: 데이터 포맷팅 함수
  buttonText: string;
  // 기타 Button 컴포넌트에 전달할 props
  onClick: () => void;
};

const ValidatedSubmitButton = <T extends FieldValues>({
  control,
  fieldNames,
  validationFn,
  formatData = (data) => data,
  buttonText,
  onClick,
}: ValidatedSubmitButtonProps<T>) => {
  // 필요한 모든 필드를 한 번에 감시
  const watchedFields = useWatch({
    control,
    name: fieldNames as any[], // TypeScript 타입 문제 해결을 위한 캐스팅
  });

  // 감시된 필드들로부터 데이터 객체 생성
  const formData = useMemo(() => {
    const data: { [key: string]: any } = {};
    fieldNames.forEach((name, index) => {
      // 중첩 객체 속성 처리 (예: 'phone.start')
      if (String(name).includes('.')) {
        const [parent, child] = String(name).split('.');
        if (!data[parent]) data[parent] = {};
        data[parent][child] = watchedFields[index];
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

  return isValid ? (
    <Button
      type="large"
      bgColor="bg-[#fef387]"
      fontColor="text-[#222]"
      isBorder={false}
      title={buttonText}
      onClick={onClick}
    />
  ) : (
    <Button
      type="large"
      bgColor="bg-[#F4F4F9]"
      fontColor=""
      isBorder={false}
      title={buttonText}
      onClick={() => {}}
    />
  );
};

export default ValidatedSubmitButton;
