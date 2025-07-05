import { Page } from '@playwright/test';
import { TEST_USERS } from '@/__tests__/fixtures/users';

/**
 * 고용주 계정으로 로그인
 */
export async function loginAsEmployer(page: Page) {
  await page.goto('/signin');

  // 이메일 입력: placeholder로 찾기
  const emailInput = page.getByPlaceholder('이메일을 입력해주세요');
  await emailInput.fill(TEST_USERS.employer.email);

  // 비밀번호 입력: placeholder로 찾기
  const passwordInput = page.getByPlaceholder('Enter password');
  await passwordInput.fill(TEST_USERS.employer.password);

  // 로그인 버튼 클릭
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: '로그인' }).click();

  // 로그인 완료까지 대기
  await page.waitForURL(/.*\/(?!signin)/);
}

/**
 * 공고 등록 페이지로 직접 이동 (로그인 상태 확인 포함)
 */
export async function goToPostCreatePage(page: Page) {
  await page.goto('/');

  // 공고추가 버튼이 있는지 확인
  const addPostButton = page.getByRole('button', { name: /공고추가/ });

  if (await addPostButton.isVisible()) {
    await addPostButton.click();
  } else {
    // 로그인이 필요한 경우
    await loginAsEmployer(page);
    await addPostButton.click();
  }
}
