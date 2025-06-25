import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Button from './Button';
import { buttonTypeKeys } from '@/constants/components';
import CallIcon from '@/assets/icons/CallIcon.svg?react';

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    const testCases = [
      { type: buttonTypeKeys.PRIMARY, expectedClass: 'bg-brand-500' },
      { type: buttonTypeKeys.NEUTRAL, expectedClass: 'bg-neutral-100' },
      { type: buttonTypeKeys.TERTIARY, expectedClass: 'bg-neutral-0' },
      { type: buttonTypeKeys.DISABLED, expectedClass: 'bg-neutral-300' },
      { type: buttonTypeKeys.INACTIVE, expectedClass: 'text-text-disabled' },
    ];

    test.each(testCases)(
      '$type 타입 버튼이 올바른 스타일로 렌더링되어야 한다.',
      ({ type, expectedClass }) => {
        render(<Button type={type} title={type} />);
        const button = screen.getByRole('button', { name: type });
        expect(button).toHaveClass(expectedClass);
      },
    );

    it('children으로 복잡한 JSX 요소를 전달해도 올바르게 렌더링해야 한다.', () => {
      render(
        <Button type={buttonTypeKeys.PRIMARY}>
          <div data-testid="child-container">
            <CallIcon />
            <span>전화걸기</span>
          </div>
        </Button>,
      );

      expect(screen.getByTestId('child-container')).toBeInTheDocument();
      expect(screen.getByText('전화걸기')).toBeInTheDocument();
      // SVG 아이콘은 `title`이나 특정 식별자가 없는 경우, 존재 자체를 확인하는 것이 일반적
      expect(
        screen.getByTestId('child-container').querySelector('svg'),
      ).toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('onClick 핸들러가 올바르게 호출되어야 한다.', async () => {
      const handleClick = vi.fn();
      render(
        <Button
          type={buttonTypeKeys.PRIMARY}
          title="Click me"
          onClick={handleClick}
        />,
      );

      const button = screen.getByRole('button', { name: 'Click me' });
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    const interactiveTypes = [
      buttonTypeKeys.PRIMARY,
      buttonTypeKeys.NEUTRAL,
      buttonTypeKeys.TERTIARY,
    ];

    test.each(interactiveTypes)(
      'disabled 또는 inactive 타입이 아닌 버튼은 클릭/터치 시 style.transform scale이 변화해야 한다.',
      async (type) => {
        render(<Button type={type} title={type} />);
        const button = screen.getByRole('button', { name: type });

        // 초기 상태에는 transform이 적용되지 않음 (framer-motion 최적화)
        expect(button).toHaveStyle('transform: none');

        fireEvent.mouseDown(button);
        // 눌렸을 때 scale(0.95)로 변경될 때까지 기다림
        await waitFor(() => {
          expect(button).toHaveStyle('transform: scale(0.95)');
        });

        fireEvent.mouseUp(button);
        // 떼었을 때 다시 초기 상태로 복귀할 때까지 기다림
        await waitFor(() => {
          expect(button).toHaveStyle('transform: none');
        });
      },
    );

    const nonInteractiveTypes = [
      buttonTypeKeys.DISABLED,
      buttonTypeKeys.INACTIVE,
    ];

    test.each(nonInteractiveTypes)(
      'disabled 또는 inactive 타입 버튼은 클릭/터치해도 style.transform scale이 변화하지 않아야 한다.',
      (type) => {
        render(<Button type={type} title={type} />);
        const button = screen.getByRole('button', { name: type });

        // 비활성 버튼은 항상 transform: none 상태를 유지
        expect(button).toHaveStyle('transform: none');

        fireEvent.mouseDown(button);
        expect(button).toHaveStyle('transform: none');
      },
    );

    it('DISABLED 와 INACTIVE 타입 버튼은 onClick 핸들러가 호출되지 않아야 한다.', () => {
      const handleClick = vi.fn();

      const { rerender } = render(
        <Button
          type={buttonTypeKeys.DISABLED}
          title="Disabled"
          onClick={handleClick}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));
      expect(handleClick).not.toHaveBeenCalled();

      rerender(
        <Button
          type={buttonTypeKeys.INACTIVE}
          title="Inactive"
          onClick={handleClick}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Inactive' }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
