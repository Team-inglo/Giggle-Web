import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/__tests__/utils/test-utils';
import { Button } from './Button';

describe('Button', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링해야 한다', () => {
      render(<Button>테스트 버튼</Button>);
      
      expect(screen.getByRole('button', { name: '테스트 버튼' })).toBeInTheDocument();
    });

    it('기본 props가 올바르게 적용되어야 한다', () => {
      render(<Button>기본 버튼</Button>);
      
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
      expect(button).toHaveClass('bg-blue-600'); // primary variant
      expect(button).toHaveClass('px-4 py-2'); // medium size
    });

    it('variant가 올바르게 적용되어야 한다', () => {
      const { rerender } = render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    });

    it('size가 올바르게 적용되어야 한다', () => {
      const { rerender } = render(<Button size="small">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5');

      rerender(<Button size="large">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6 py-3');
    });
  });

  describe('상호작용', () => {
    it('클릭 시 onClick 핸들러가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>클릭 가능</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서는 클릭이 동작하지 않아야 한다', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} disabled>비활성화</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('스타일링', () => {
    it('disabled 상태에서 올바른 스타일이 적용되어야 한다', () => {
      render(<Button disabled>비활성화</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('활성화 상태에서 올바른 스타일이 적용되어야 한다', () => {
      render(<Button>활성화</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('cursor-pointer');
      expect(button).not.toHaveClass('opacity-50');
    });
  });

  describe('접근성', () => {
    it('type 속성이 올바르게 설정되어야 한다', () => {
      const { rerender } = render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

      rerender(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    it('키보드로 포커스할 수 있어야 한다', async () => {
      const user = userEvent.setup();
      
      render(<Button>포커스 가능</Button>);
      
      await user.tab();
      
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('엔터키로 버튼을 활성화할 수 있어야 한다', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>엔터키 테스트</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
}); 