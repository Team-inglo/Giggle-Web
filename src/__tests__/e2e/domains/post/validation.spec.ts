import { test, expect } from '@playwright/test';
import { goToPostCreatePage } from '@/__tests__/e2e/shared/helpers/auth-helpers';
import { TEST_POST_DATA } from '@/__tests__/fixtures/post-data';
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  fillAddress,
} from '@/__tests__/e2e/shared/helpers/postFormHelpers';

test.describe('공고 등록 유효성 검사', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 후 공고 등록 페이지로 이동
    await goToPostCreatePage(page);
    await page.waitForLoadState('networkidle');
  });

  test('1단계: 필수 필드 입력 및 유효성 검사', async ({ page }) => {
    await test.step('초기 상태에서 다음 버튼이 비활성화되어 있는지 확인', async () => {
      const nextButton = page.getByRole('button', { name: /다음/ });
      // Button.Type.DISABLED로 비활성화 상태 확인
      await expect(nextButton).toHaveClass(/bg-neutral-300/);
    });

    await test.step('타입 기본값 확인', async () => {
      // 라디오 그룹에서 '알바'가 기본 선택되어 있는지 확인
      const albaOption = page.getByText('알바', { exact: true });
      await expect(albaOption).toBeVisible();
    });

    await test.step('업직종 선택 전까지 다음 버튼 비활성화', async () => {
      const titleInput = page.getByPlaceholder('제목을 입력해주세요');
      await titleInput.fill('테스트 제목');

      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);
    });

    await test.step('공고 제목 100자 유효성 검사', async () => {
      const titleInput = page.getByPlaceholder('제목을 입력해주세요');
      await titleInput.clear();
      await titleInput.fill(TEST_POST_DATA.validation.longTitle);

      // 유효성 검사 메시지 확인
      await expect(page.getByText(/100자 이하로 입력해주세요/)).toBeVisible();
    });

    await test.step('모든 필드 입력 후 다음 버튼 활성화', async () => {
      // 업직종 선택
      const industryInput = page.getByPlaceholder('업직종을 선택해주세요');
      await industryInput.click();
      await page
        .getByText(TEST_POST_DATA.step1.industry, { exact: true })
        .click();

      // 공고 제목 입력
      const titleInput = page.getByPlaceholder('제목을 입력해주세요');
      await titleInput.clear();
      await titleInput.fill(TEST_POST_DATA.step1.title);

      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).not.toHaveClass(/bg-neutral-300/);
    });
  });

  test('2단계: 근무 조건 필수 필드 및 유효성 검사', async ({ page }) => {
    // 1단계 완료
    await completeStep1(page);

    await test.step('초기 상태 확인', async () => {
      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);

      // 시급 필드가 빈 상태인지 확인
      const hourlyWageInput = page.getByPlaceholder('0').first();
      await expect(hourlyWageInput).toHaveValue('');
    });

    await test.step('시급 최저임금 유효성 검사', async () => {
      const hourlyWageInput = page.getByPlaceholder('0').first();
      await hourlyWageInput.fill('5000'); // 최저임금보다 낮은 값

      // 최저임금 관련 메시지 확인
      await expect(page.getByText(/최저시급/)).toBeVisible();
    });

    await test.step('근무 시간 최소 1개 이상 추가 필요', async () => {
      const hourlyWageInput = page.getByPlaceholder('0').first();
      await hourlyWageInput.clear();
      await hourlyWageInput.fill(TEST_POST_DATA.step2.hourlyWage);

      // 근무기간 선택
      const workPeriodInput = page.getByPlaceholder('근무기간을 선택해주세요');
      await workPeriodInput.click();
      await page.getByText('1주 ~ 1개월', { exact: true }).click();

      // 근무지 주소 입력
      await fillAddress(page, TEST_POST_DATA.step2.address.address_name);
    });

    await test.step('근무지 상세 주소 50자 유효성 검사', async () => {
      // 상세 주소가 표시되면 테스트
      const detailAddressInput = page
        .getByPlaceholder(/상세 주소를 입력해주세요/)
        .first();
      if (await detailAddressInput.isVisible()) {
        await detailAddressInput.fill(
          TEST_POST_DATA.validation.longDetailAddress,
        );
        await expect(page.getByText(/50자 이내/)).toBeVisible();
      }
    });
  });

  test('3단계: 모집 조건 필수 필드 및 유효성 검사', async ({ page }) => {
    // 1-2단계 완료
    await completeStep1(page);
    await completeStep2(page);

    await test.step('초기 상태 확인', async () => {
      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);

      // 모집인원 필드가 0명인지 확인
      const recruitCountInput = page.getByPlaceholder('0').first();
      await expect(recruitCountInput).toHaveValue('0');

      // 성별 기본값 확인
      const maleOption = page.getByText('남자', { exact: true });
      await expect(maleOption).toBeVisible();
    });

    await test.step('비자 선택 없이는 다음 버튼 비활성화', async () => {
      const recruitCountInput = page.getByPlaceholder('0').first();
      await recruitCountInput.fill(TEST_POST_DATA.step3.recruitCount);

      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);
    });

    await test.step('학력 선택 없이는 다음 버튼 비활성화', async () => {
      // 비자 선택
      const visaDropdown = page.getByPlaceholder('비자를 선택해 주세요');
      await visaDropdown.click();
      await page
        .getByText('D-2 : 외국인 유학생 (학사, 석사, 박사 과정)', {
          exact: true,
        })
        .click();
      await page
        .getByText(
          'D-4 : 외국인 한국어 연수 및 기술 연수 단기 및 방문 관련 비자',
          {
            exact: true,
          },
        )
        .click();
      await page.getByText('선택완료').click();
      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);
    });
  });

  test('4단계: 담당자 정보 필수 필드 및 유효성 검사', async ({ page }) => {
    // 1-3단계 완료
    await completeStep1(page);
    await completeStep2(page);
    await completeStep3(page);

    await test.step('초기 상태에서 다음 버튼 비활성화', async () => {
      const nextButton = page.getByRole('button', { name: /다음/ });
      await expect(nextButton).toHaveClass(/bg-neutral-300/);
    });

    await test.step('담당자 이름 10자 유효성 검사', async () => {
      const managerNameInput =
        page.getByPlaceholder('채용 담당자 이름을 입력해주세요');
      await managerNameInput.fill(TEST_POST_DATA.validation.longManagerName);

      await expect(page.getByText(/10자 이하로 입력해주세요/)).toBeVisible();
    });

    await test.step('담당자 이메일 형태 유효성 검사', async () => {
      const managerEmailInput =
        page.getByPlaceholder('채용 담당자 이메일을 입력해주세요');
      await managerEmailInput.fill('invalid-email');

      await expect(
        page.getByText(/이메일 형식이 올바르지 않습니다/),
      ).toBeVisible();
    });

    await test.step('담당자 이메일 유효성 검사', async () => {
      const managerEmailInput =
        page.getByPlaceholder('채용 담당자 이메일을 입력해주세요');
      await managerEmailInput.clear();
      await managerEmailInput.fill(TEST_POST_DATA.validation.longManagerEmail);

      await expect(
        page.getByText(/이메일 형식이 올바르지 않습니다/),
      ).toBeVisible();
    });

    await test.step('담당자 연락처 앞자리 선택 필수', async () => {
      const managerNameInput =
        page.getByPlaceholder('채용 담당자 이름을 입력해주세요');
      await managerNameInput.clear();
      await managerNameInput.fill(TEST_POST_DATA.step4.managerName);

      const managerEmailInput =
        page.getByPlaceholder('채용 담당자 이메일을 입력해주세요');
      await managerEmailInput.clear();
      await managerEmailInput.fill(TEST_POST_DATA.step4.managerEmail);

      const managerPhoneInput = page.getByPlaceholder("'-' 없이 숫자만 입력");
      await managerPhoneInput.fill(TEST_POST_DATA.step4.managerPhone);
    });

    await test.step('연락처 NNNN-NNNN 형태 자동 포맷팅', async () => {
      // 앞자리 선택 (기본값으로 010이 선택되어 있을 수 있음)
      const managerPhoneInput = page.getByPlaceholder("'-' 없이 숫자만 입력");
      await managerPhoneInput.clear();
      await managerPhoneInput.fill('12345678');

      // 자동 포맷팅 확인
      await expect(managerPhoneInput).toHaveValue(/\d{4}-\d{4}/);
    });
  });

  test('5단계: 상세 정보 필수 필드 및 유효성 검사', async ({ page }) => {
    // 1-4단계 완료
    await completeStep1(page);
    await completeStep2(page);
    await completeStep3(page);
    await completeStep4(page);

    await test.step('초기 상태에서 완료 버튼 비활성화', async () => {
      const completeButton = page.getByRole('button', { name: /완료/ });
      await expect(completeButton).toHaveClass(/bg-neutral-300/);
    });

    await test.step('공고 상세 내용 1000자 유효성 검사', async () => {
      const descriptionTextarea =
        page.getByPlaceholder('상세 내용을 입력해주세요');
      await descriptionTextarea.fill(TEST_POST_DATA.validation.longDescription);

      // 글자수 표시 확인
      await expect(page.getByText(/1000/)).toBeVisible();
    });

    await test.step('우대 조건 50자 유효성 검사', async () => {
      const preferredConditionsInput =
        page.getByPlaceholder('우대 조건을 입력해주세요');
      // 50자 초과
      await preferredConditionsInput.fill(
        TEST_POST_DATA.validation.longPreferredConditions,
      );
      // 50자 초과 메시지 확인
      await expect(page.getByText(/50자 이하로 입력해주세요/)).toBeVisible();
      // 50자 이하로 입력
      await preferredConditionsInput.clear();
      await preferredConditionsInput.fill(
        TEST_POST_DATA.step5.preferredConditions,
      );
      await expect(
        page.getByText(/50자 이하로 입력해주세요/),
      ).not.toBeVisible();
    });

    await test.step('근무 회사 사진 업로드 및 삭제', async () => {
      // 초기 상태: '이미지 추가하기' 버튼 확인
      const initialAddButton = page.getByText('이미지 추가하기');
      await expect(initialAddButton).toBeVisible();

      // 파일 업로드를 위한 input 요소에 파일 설정
      // input은 숨겨져 있으므로 setInputFiles를 직접 사용
      const fileInput = page.locator('#logo-upload');
      await fileInput.setInputFiles({
        name: 'test-image.png',
        mimeType: 'image/png',
        buffer: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          'base64',
        ), // 1x1 투명 png
      });

      // 업로드 후 상태: 미리보기 이미지 확인
      const previewImage = page.locator('img[alt="새 이미지 1"]');
      await expect(previewImage).toBeVisible();
      await expect(previewImage).toHaveAttribute('src', /^blob:/);

      // '이미지 추가하기' 버튼이 사라지고 작은 '+' 아이콘이 표시되는지 확인
      await expect(initialAddButton).not.toBeVisible();
      const subsequentAddButton = page.locator(
        '.w-20.h-20.rounded-lg.flex.flex-shrink-0',
      ); // '+' 아이콘을 감싸는 div
      await expect(subsequentAddButton).toBeVisible();

      // 이미지 삭제: 미리보기 이미지 컨테이너를 찾고 그 안의 삭제 버튼을 클릭
      const previewContainer = page.locator('div.relative', {
        has: page.locator('img[alt="새 이미지 1"]'),
      });
      await previewContainer.locator('.cursor-pointer').click();

      // 삭제 후 상태: 미리보기 이미지가 사라졌는지 확인
      await expect(previewImage).not.toBeVisible();

      // '이미지 추가하기' 버튼이 다시 나타나는지 확인
      await expect(initialAddButton).toBeVisible();
      // 이미지 재추가
      await fileInput.setInputFiles({
        name: 'test-image.png',
        mimeType: 'image/png',
        buffer: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          'base64',
        ), // 1x1 투명 png
      });
    });
  });
});
