import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ButtonText from '@/components/Common/ButtonText';
import CallIcon from '@/assets/icons/CallIcon.svg?react';

const { Size, Variant } = ButtonText;

describe('ButtonText', () => {
  describe('렌더링', () => {
    const sizeCases = [
      {
        size: Size.SM,
        expectedClass: 'body-14-medium',
        description: 'size="sm"일 때',
      },
      {
        size: Size.MD,
        expectedClass: 'button-16-semibold',
        description: 'size="md"일 때',
      },
    ];

    test.each(sizeCases)(
      '$description 올바른 텍스트 스타일($expectedClass)을 가져야 한다.',
      ({ size, expectedClass }) => {
        render(<ButtonText text="test" size={size} />);
        const button = screen.getByRole('button', { name: 'test' });
        expect(button).toHaveClass(expectedClass);
      },
    );

    const variantCases = [
      {
        variant: Variant.PRIMARY,
        expectedClass: 'text-status-blue-300',
        description: 'variant="primary"일 때',
      },
      {
        variant: Variant.ALTERNATIVE,
        expectedClass: 'text-text-alternative',
        description: 'variant="alternative"일 때',
      },
    ];

    test.each(variantCases)(
      '$description 올바른 텍스트 색상($expectedClass)을 가져야 한다.',
      ({ variant, expectedClass }) => {
        render(<ButtonText text="test" variant={variant} />);
        const button = screen.getByRole('button', { name: 'test' });
        expect(button).toHaveClass(expectedClass);
      },
    );

    it('iconDisplay="left"일 때 아이콘이 텍스트 왼쪽에 렌더링되어야 한다.', () => {
      render(
        <ButtonText
          text="아이콘"
          icon={CallIcon}
          iconDisplay={ButtonText.IconDisplay.LEFT}
        />,
      );
      const contentContainer = screen.getByText('아이콘');
      const children = Array.from(contentContainer?.childNodes ?? []);
      const iconIndex = children.findIndex(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).dataset.testid === 'svg-icon',
      );
      const textIndex = children.findIndex(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent === '아이콘',
      );
      expect(iconIndex).not.toBe(-1);
      expect(textIndex).not.toBe(-1);
      expect(iconIndex).toBeLessThan(textIndex);
    });

    it('iconDisplay="right"일 때 아이콘이 텍스트 오른쪽에 렌더링되어야 한다.', () => {
      render(
        <ButtonText
          text="아이콘"
          icon={CallIcon}
          iconDisplay={ButtonText.IconDisplay.RIGHT}
        />,
      );
      const contentContainer = screen.getByText('아이콘');
      const children = Array.from(contentContainer?.childNodes ?? []);
      const iconIndex = children.findIndex(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).dataset.testid === 'svg-icon',
      );
      const textIndex = children.findIndex(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent === '아이콘',
      );
      expect(iconIndex).not.toBe(-1);
      expect(textIndex).not.toBe(-1);
      expect(textIndex).toBeLessThan(iconIndex);
    });

    it('아이콘이 있어도 iconDisplay="none"이면 렌더링되지 않아야 한다.', () => {
      render(
        <ButtonText
          text="아이콘 없음"
          icon={CallIcon}
          iconDisplay={ButtonText.IconDisplay.NONE}
        />,
      );
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('onClick 핸들러가 클릭 시 올바르게 호출되어야 한다.', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ButtonText text="클릭" onClick={handleClick} />);
      await user.click(screen.getByRole('button', { name: '클릭' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('터치/클릭하는 동안 PressOverlay가 적용되고 scale이 변화해야 한다.', async () => {
      render(<ButtonText text="터치" />);
      const button = screen.getByRole('button', { name: '터치' });

      expect(button).toHaveStyle('transform: none');

      fireEvent.mouseDown(button);
      await waitFor(() => {
        expect(button).toHaveStyle('transform: scale(0.95)');
      });

      fireEvent.mouseUp(button);
      await waitFor(() => {
        expect(button).toHaveStyle('transform: none');
      });
    });
  });
});
