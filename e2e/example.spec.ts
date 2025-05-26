import { test, expect } from '@playwright/test';

test.describe('Giggle Web - 기본 E2E 테스트', () => {
  test('홈페이지가 정상적으로 로드되어야 한다', async ({ page }) => {
    // 홈페이지로 이동
    await page.goto('/');

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/Giggle/);
  });

  test('네비게이션이 정상적으로 작동해야 한다', async ({ page }) => {
    await page.goto('/');

    // 네비게이션 메뉴가 존재하는지 확인
    // 실제 프로젝트 구조에 맞춰 수정 필요
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
  });

  test('모바일 뷰포트에서도 정상 작동해야 한다', async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // 모바일에서도 기본 요소들이 표시되는지 확인
    await expect(page).toHaveTitle(/Giggle/);
  });
});
