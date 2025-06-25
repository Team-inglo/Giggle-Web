import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Chip from './Chip';
import { ChipState } from '@/types/common/chip';

// 아이콘 컴포넌트 Mocking
vi.mock('@/assets/icons/DisclosureIcon.svg?react', () => ({
  default: () => <div data-testid="disclosure-icon" />,
}));

describe('Chip', () => {
  const defaultText = 'Chip 내용';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('기본 텍스트를 올바르게 렌더링해야 한다', () => {
      render(<Chip text={defaultText} />);
      expect(screen.getByText(defaultText)).toBeInTheDocument();
    });

    it('props가 전달되지 않았을 때 기본값으로 렌더링되어야 한다', () => {
      render(<Chip />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(
        'border',
        'border-border-disabled',
        'text-text-strong',
        'bg-surface-base',
      );
      expect(screen.queryByTestId('disclosure-icon')).not.toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('버튼 클릭 시 onClick 핸들러가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Chip text={defaultText} onClick={onClick} />);
      const button = screen.getByRole('button');
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('조건부 렌더링', () => {
    describe.each([
      {
        state: ChipState.DEFAULT,
        expectedClasses: [
          'border',
          'border-border-disabled',
          'text-text-strong',
          'bg-surface-base',
        ],
      },
      {
        state: ChipState.PRESSED,
        expectedClasses: ['text-text-strong', 'bg-surface-tertiary'],
      },
      {
        state: ChipState.ACTIVE,
        expectedClasses: ['text-text-invert', 'bg-surface-invert'],
      },
    ])(
      'state=$state 상태에 맞는 스타일 적용 검사',
      ({ state, expectedClasses }) => {
        it(`${state} 상태에 맞는 스타일을 렌더링해야 한다`, () => {
          render(<Chip state={state} text={defaultText} />);
          const button = screen.getByRole('button');

          expectedClasses.forEach((className) => {
            expect(button).toHaveClass(className);
          });
        });
      },
    );

    it('isDropdown이 true일 경우 드롭다운 아이콘을 렌더링해야 한다', () => {
      render(<Chip text={defaultText} isDropdown />);
      expect(screen.getByTestId('disclosure-icon')).toBeInTheDocument();
    });

    it('isDropdown이 false일 경우 드롭다운 아이콘을 렌더링하지 않아야 한다', () => {
      render(<Chip text={defaultText} isDropdown={false} />);
      expect(screen.queryByTestId('disclosure-icon')).not.toBeInTheDocument();
    });

    describe.each([
      {
        state: ChipState.DEFAULT,
        expectedClass: 'text-text-alternative',
      },
      {
        state: ChipState.PRESSED,
        expectedClass: 'text-text-alternative',
      },
      {
        state: ChipState.ACTIVE,
        expectedClass: 'text-text-invert',
      },
    ])(
      'state=$state 상태에 맞는 dropdownStyle 적용 검사',
      ({ state, expectedClass }) => {
        it(`${state} 상태일 때 dropdownStyle로 ${expectedClass}가 적용되어야 한다`, () => {
          render(<Chip text="드롭다운" state={state} isDropdown={true} />);

          // 텍스트(p 태그)에 클래스가 잘 적용됐는지 확인
          const textElement = screen.getByText('드롭다운');
          expect(textElement).toHaveClass(expectedClass);

          // Dropdown 아이콘이 잘 적용됐는지 확인
          expect(screen.getByTestId('disclosure-icon')).toBeInTheDocument();
        });
      },
    );
  });
});
