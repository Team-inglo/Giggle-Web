import { render } from '@testing-library/react';
import ProgressStepper from './ProgressStepper';

describe('ProgressStepper', () => {
  describe('렌더링', () => {
    it('totalCount prop에 따라 올바른 수의 스텝을 렌더링해야 한다', () => {
      // Arrange
      const totalCount = 5;
      const currentStep = 1;

      // Act
      const { container } = render(
        <ProgressStepper totalCount={totalCount} currentStep={currentStep} />,
      );

      // Assert
      const stepperContainer = container.firstChild as HTMLElement;
      expect(stepperContainer.childNodes.length).toBe(totalCount);
    });
  });

  describe('조건부 스타일링', () => {
    it('현재 스텝(currentStep)을 포함한 이전 스텝들은 "완료" 색상(bg-surface-invert)을 가져야 한다', () => {
      // Arrange
      const totalCount = 5;
      const currentStep = 3;

      // Act
      const { container } = render(
        <ProgressStepper totalCount={totalCount} currentStep={currentStep} />,
      );
      const stepperContainer = container.firstChild as HTMLElement;
      const steps = stepperContainer.childNodes;

      // Assert
      // currentStep이 3이므로, 인덱스 0, 1, 2는 '완료' 상태여야 합니다.
      expect(steps[0]).toHaveClass('bg-surface-invert');
      expect(steps[1]).toHaveClass('bg-surface-invert');
      expect(steps[2]).toHaveClass('bg-surface-invert');
    });

    it('현재 스텝(currentStep)보다 다음 스텝들은 "미완료" 색상(bg-surface-tertiary)을 가져야 한다', () => {
      // Arrange
      const totalCount = 5;
      const currentStep = 3;

      // Act
      const { container } = render(
        <ProgressStepper totalCount={totalCount} currentStep={currentStep} />,
      );
      const stepperContainer = container.firstChild as HTMLElement;
      const steps = stepperContainer.childNodes;

      // Assert
      // currentStep이 3이므로, 인덱스 3, 4는 '미완료' 상태여야 합니다.
      expect(steps[3]).toHaveClass('bg-surface-tertiary');
      expect(steps[4]).toHaveClass('bg-surface-tertiary');
    });

    it('모든 스텝이 완료되었을 때, 모든 스텝이 "완료" 색상을 가져야 한다', () => {
      // Arrange
      const totalCount = 4;
      const currentStep = 4;

      // Act
      const { container } = render(
        <ProgressStepper totalCount={totalCount} currentStep={currentStep} />,
      );
      const stepperContainer = container.firstChild as HTMLElement;
      const steps = stepperContainer.childNodes;

      // Assert
      steps.forEach((step) => {
        expect(step).toHaveClass('bg-surface-invert');
        expect(step).not.toHaveClass('bg-surface-tertiary');
      });
    });

    it('currentStep이 0일 때, 모든 스텝이 "미완료" 색상이어야 한다', () => {
      // Arrange
      const totalCount = 5;
      const currentStep = 0;

      // Act
      const { container } = render(
        <ProgressStepper totalCount={totalCount} currentStep={currentStep} />,
      );
      const stepperContainer = container.firstChild as HTMLElement;
      const steps = stepperContainer.childNodes;

      // Assert
      steps.forEach((step) => {
        expect(step).toHaveClass('bg-surface-tertiary');
        expect(step).not.toHaveClass('bg-surface-invert');
      });
    });
  });
});
