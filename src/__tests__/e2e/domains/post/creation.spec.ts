import { test, expect } from '@playwright/test';
import { goToPostCreatePage } from '@/__tests__/e2e/shared/helpers/auth-helpers';
import { TEST_POST_DATA } from '@/__tests__/fixtures/post-data';
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  completeStep5,
} from '@/__tests__/e2e/shared/helpers/postFormHelpers';

test.describe('공고 등록 절차', () => {
  test.beforeEach(async ({ page }) => {
    await goToPostCreatePage(page);
  });

  test('전체 공고 등록 절차 완료 - 로그인부터 공고 상세 페이지까지', async ({
    page,
  }) => {
    await test.step('공고 등록 페이지로 이동', async () => {
      await test.step('공고 게시', async () => {
        // 공고 등록 절차 완료
        await completeStep1(page);
        await completeStep2(page);
        await completeStep3(page);
        await completeStep4(page);
        await completeStep5(page);
        const completeButton = page.getByRole('button', { name: /완료/ });
        await completeButton.click();
        await page.waitForLoadState('networkidle');
      });

      await test.step('공고 등록 완료 확인', async () => {
        // 공고 등록 완료 후 상세 페이지로 이동하는지 확인
        // 실제로는 이미지 업로드 등의 필수 조건에 따라 달라질 수 있음
        await page.waitForURL(/.*\/employer\/post\/\d+/);

        // 성공적으로 등록되었다면 URL이 변경되며 공고 제목으로 확인
        await expect(page).toHaveURL(/.*\/employer\/post\/\d+/);
        await expect(page.getByText(TEST_POST_DATA.step1.title)).toBeVisible();
      });
      await test.step('공고 삭제', async () => {
        // 공고 삭제 버튼 클릭
        const deleteButton = page.getByRole('button', { name: /삭제/ }).first();
        await deleteButton.click();
        // 공고 삭제 확인 모달 출현
        await expect(page.getByText('공고를 삭제하시겠습니까?')).toBeVisible();
        await page.getByRole('button', { name: /삭제/ }).nth(1).click();
        // 게시 공고 목록으로 이동, 삭제 확인
        await expect(
          page.getByText(TEST_POST_DATA.step1.title),
        ).not.toBeVisible();
      });
    });
  });
});
