import { TEST_POST_DATA } from '@/__tests__/fixtures/post-data';
import { Page } from '@playwright/test';

// 단계별 진행을 위한 헬퍼 함수들
export const completeStep1 = async (page: Page) => {
  // 업직종 선택
  const industryInput = page.getByPlaceholder('업직종을 선택해주세요');
  await industryInput.click();
  await page.getByText(TEST_POST_DATA.step1.industry, { exact: true }).click();

  // 공고 제목 입력
  await page
    .getByPlaceholder('제목을 입력해주세요')
    .fill(TEST_POST_DATA.step1.title);

  // 다음 버튼 클릭
  await page.getByRole('button', { name: /다음/ }).click();
};

export const fillAddress = async (page: Page, address: string) => {
  const addressInput = page.getByPlaceholder('주소를 검색해주세요');
  await addressInput.click();

  // DaumPostcode iframe이 로드될 때까지 대기
  await page.waitForSelector('iframe');

  // 이중 iframe 구조: 외부 iframe -> 내부 __daum__viewerFrame_1 iframe
  const outerFrame = page.frameLocator('iframe');

  // 내부 iframe이 로드될 때까지 대기
  await outerFrame.locator('#__daum__viewerFrame_1').waitFor();

  // 내부 iframe에 접근
  const daumFrame = outerFrame.frameLocator('#__daum__viewerFrame_1');

  // 주소 검색 input 찾기 (다음 우편번호 API의 실제 구조)
  const searchInput = daumFrame.locator('#region_name');

  // input이 나타날 때까지 대기
  await searchInput.waitFor({ state: 'visible' });

  // 주소 검색
  await searchInput.fill(address);
  await searchInput.press('Enter');

  // 검색 결과 대기
  const firstResult = daumFrame.locator('.link_post').first();
  await firstResult.waitFor({ state: 'visible' });

  // 검색 결과 클릭 (첫 번째 결과)

  await firstResult.click();

  // 메인 페이지로 돌아올 때까지 대기
  await page
    .getByPlaceholder(/상세/)
    .waitFor({ state: 'visible', timeout: 5000 });
};

export const completeStep2 = async (page: Page) => {
  // 시급 입력
  await page
    .getByPlaceholder('0')
    .first()
    .fill(TEST_POST_DATA.step2.hourlyWage);

  // 근무기간 선택
  const workPeriodInput = page.getByPlaceholder('근무기간을 선택해주세요');
  await workPeriodInput.click();
  await page.getByText('1주 ~ 1개월', { exact: true }).click();

  // 근무 시간 추가
  await page.getByText('추가하기').click();
  await page.getByText('요일무관', { exact: true }).click();
  await page.getByText('시간무관', { exact: true }).click();
  await page.getByRole('button', { name: '추가하기' }).nth(1).click();

  // 근무지 주소 입력
  await fillAddress(page, TEST_POST_DATA.step2.address.address_name);

  // 상세 주소 필드가 나타났는지 확인하고 입력
  const detailAddressInput = page.getByPlaceholder(/상세/);
  if (await detailAddressInput.isVisible()) {
    await detailAddressInput.fill('123번길 45 1층');
  }

  // 다음 버튼 클릭
  await page.getByRole('button', { name: /다음/ }).click();
};

export const completeStep3 = async (page: Page) => {
  // 모집인원 입력
  await page
    .getByPlaceholder('0')
    .first()
    .fill(TEST_POST_DATA.step3.recruitCount);

  // 비자 선택
  const visaDropdown = page.getByPlaceholder('비자를 선택해 주세요');
  await visaDropdown.click();
  await page
    .getByText('D-2 : 외국인 유학생 (학사, 석사, 박사 과정)', { exact: true })
    .click();
  await page
    .getByText('D-4 : 외국인 한국어 연수 및 기술 연수 단기 및 방문 관련 비자', {
      exact: true,
    })
    .click();
  await page.getByText('선택완료').click();
  // 학력 선택
  const educationDropdown = page.getByPlaceholder('학력을 선택해주세요');
  await educationDropdown.click();
  await page.getByText('고등학교졸업', { exact: true }).click();

  // 다음 버튼 클릭
  await page.getByRole('button', { name: /다음/ }).click();
};

export const completeStep4 = async (page: Page) => {
  // 담당자 정보 입력
  await page
    .getByPlaceholder('채용 담당자 이름을 입력해주세요')
    .fill(TEST_POST_DATA.step4.managerName);
  await page
    .getByPlaceholder('채용 담당자 이메일을 입력해주세요')
    .fill(TEST_POST_DATA.step4.managerEmail);
  await page
    .getByPlaceholder("'-' 없이 숫자만 입력")
    .fill(TEST_POST_DATA.step4.managerPhone);

  // 다음 버튼 클릭
  await page.getByRole('button', { name: /다음/ }).click();
};

export const completeStep5 = async (page: Page) => {
  // 상세 내용 입력
  const descriptionTextarea = page.getByPlaceholder('상세 내용을 입력해주세요');
  await descriptionTextarea.fill(TEST_POST_DATA.step5.description);

  // 우대 조건 입력
  const preferredConditionsInput =
    page.getByPlaceholder('우대 조건을 입력해주세요');
  await preferredConditionsInput.fill(TEST_POST_DATA.step5.preferredConditions);

  // 이미지 추가
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
};
