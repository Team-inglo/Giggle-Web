import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, vi, expect, afterEach } from 'vitest';
import Toast from '@/components/Common/Toast';
import { ToastStatus, useToastStore } from '@/store/toast';
import { act, ReactNode } from 'react';

// framer-motion을 모킹
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: { children: ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

// 아이콘을 모킹, 테스트에서 쉽게 식별할 수 있도록 data-testid를 부여
vi.mock('@/assets/icons/CheckWithFilledIcon.svg?react', () => ({
  default: () => <div data-testid="check-icon" />,
}));
vi.mock('@/assets/icons/WarningWithFillIcon.svg?react', () => ({
  default: () => <div data-testid="warning-icon" />,
}));
vi.mock('@/assets/icons/InfoWithFillIcon.svg?react', () => ({
  default: () => <div data-testid="info-icon" />,
}));

describe('Toast', () => {
  let toastRoot: HTMLElement;
  const originalState = useToastStore.getState();

  beforeEach(() => {
    // createPortal을 위한 root 엘리먼트를 DOM에 추가
    toastRoot = document.createElement('div');
    toastRoot.id = 'toast-root';
    document.body.appendChild(toastRoot);

    // 각 테스트 전에 스토어를 초기 상태로 리셋
    act(() => {
      useToastStore.setState(originalState, true);
    });
  });

  afterEach(() => {
    // 테스트 후 DOM을 정리
    document.body.removeChild(toastRoot);
    // 혹시 모킹된 타이머가 남아 있다면 실제 타이머로 복원
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('초기 상태에서는 토스트가 보이지 않아야 한다', () => {
    render(<Toast />);
    // 초기에는 토스트 메시지가 없으므로, 아무것도 쿼리되지 않아야 함
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('show 함수를 호출하면 토스트 메시지가 보여야 한다', async () => {
    render(<Toast />);
    const message = '테스트 메시지입니다.';

    act(() => {
      useToastStore.getState().show({ toastMessage: message });
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('SUCCESS 상태의 토스트를 띄우면 성공 아이콘과 메시지가 보여야 한다', async () => {
    render(<Toast />);
    const message = '성공적으로 완료되었습니다.';

    act(() => {
      useToastStore.getState().show({
        toastMessage: message,
        toastStatus: ToastStatus.SUCCESS,
      });
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
  });

  it('ERROR 상태의 토스트를 띄우면 경고 아이콘과 메시지가 보여야 한다', async () => {
    render(<Toast />);
    const message = '오류가 발생했습니다.';

    act(() => {
      useToastStore.getState().show({
        toastMessage: message,
        toastStatus: ToastStatus.ERROR,
      });
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
    });
  });

  it('INFO 상태의 토스트를 띄우면 정보 아이콘과 메시지가 보여야 한다', async () => {
    render(<Toast />);
    const message = '정보를 확인해주세요.';

    act(() => {
      useToastStore.getState().show({
        toastMessage: message,
        toastStatus: ToastStatus.INFO,
      });
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });
  });

  it('ONLYTEXT 상태에서는 아이콘 없이 메시지만 보여야 한다', async () => {
    render(<Toast />);
    const message = '아이콘 없는 메시지';

    act(() => {
      useToastStore.getState().show({
        toastMessage: message,
        toastStatus: ToastStatus.ONLYTEXT,
      });
    });

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('warning-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    });
  });

  it('일정 시간(3초)이 지나면 토스트가 자동으로 사라져야 한다', async () => {
    vi.useFakeTimers();

    render(<Toast />);
    const message = '곧 사라질 메시지';

    act(() => {
      useToastStore.getState().show({ toastMessage: message });
    });

    // 토스트가 즉시 표시되어야 함
    expect(screen.getByText(message)).toBeInTheDocument();

    // 3초 경과시킴
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // React 상태 업데이트를 모두 플러시
    await act(async () => {});

    // 토스트가 사라졌는지 확인
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    expect(useToastStore.getState().isToastOpen).toBe(false);

    vi.useRealTimers();
  });
});
