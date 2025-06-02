import { getKoreanAbilityLevel } from './resume';

describe('getKoreanAbilityLevel', () => {
  describe('TOPIK 레벨 매핑', () => {
    it('TOPIK 1급은 "간단한 해석 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 1 });
      expect(result).toEqual({
        level: 2,
        label: '간단한 해석 가능',
      });
    });

    it('TOPIK 2급은 "의사소통 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 2 });
      expect(result).toEqual({
        level: 3,
        label: '의사소통 가능',
      });
    });

    it('TOPIK 3급은 "업무 능숙"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 3 });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });

    it('TOPIK 4급은 "업무 능숙"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 4 });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });

    it('TOPIK 5급은 "고급 구사 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 5 });
      expect(result).toEqual({
        level: 5,
        label: '고급 구사 가능',
      });
    });

    it('TOPIK 6급은 "원어민 수준"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 6 });
      expect(result).toEqual({
        level: 6,
        label: '원어민 수준',
      });
    });
  });

  describe('KIIP 레벨 매핑', () => {
    it('KIIP 1단계는 "간단한 해석 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ kiip: 1 });
      expect(result).toEqual({
        level: 2,
        label: '간단한 해석 가능',
      });
    });

    it('KIIP 2단계는 "의사소통 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ kiip: 2 });
      expect(result).toEqual({
        level: 3,
        label: '의사소통 가능',
      });
    });

    it('KIIP 3단계는 "업무 능숙"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ kiip: 3 });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });

    it('KIIP 4단계는 "고급 구사 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ kiip: 4 });
      expect(result).toEqual({
        level: 5,
        label: '고급 구사 가능',
      });
    });

    it('KIIP 5단계는 "원어민 수준"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ kiip: 5 });
      expect(result).toEqual({
        level: 6,
        label: '원어민 수준',
      });
    });
  });

  describe('세종학당 레벨 매핑', () => {
    it('세종학당 1급은 "간단한 해석 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 1 });
      expect(result).toEqual({
        level: 2,
        label: '간단한 해석 가능',
      });
    });

    it('세종학당 2급은 "의사소통 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 2 });
      expect(result).toEqual({
        level: 3,
        label: '의사소통 가능',
      });
    });

    it('세종학당 3급은 "업무 능숙"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 3 });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });

    it('세종학당 4급은 "업무 능숙"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 4 });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });

    it('세종학당 5급은 "고급 구사 가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 5 });
      expect(result).toEqual({
        level: 5,
        label: '고급 구사 가능',
      });
    });

    it('세종학당 6급은 "원어민 수준"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({ sejong: 6 });
      expect(result).toEqual({
        level: 6,
        label: '원어민 수준',
      });
    });
  });

  describe('최고 레벨 선택', () => {
    it('여러 시험 중 가장 높은 레벨을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 2, // level: 3
        kiip: 4, // level: 5
        sejong: 1, // level: 2
      });
      expect(result).toEqual({
        level: 5,
        label: '고급 구사 가능',
      });
    });

    it('동일한 레벨의 시험들은 해당 레벨을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 3, // level: 4
        sejong: 3, // level: 4
      });
      expect(result).toEqual({
        level: 4,
        label: '업무 능숙',
      });
    });
  });

  describe('예외 상황 처리', () => {
    it('모든 값이 undefined일 때 "정보 없음"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({});
      expect(result).toEqual({
        level: 0,
        label: '정보 없음',
      });
    });

    it('모든 값이 0일 때 "전혀 불가능"을 반환해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 0,
        kiip: 0,
        sejong: 0,
      });
      expect(result).toEqual({
        level: 1,
        label: '전혀 불가능',
      });
    });

    it('범위를 벗어난 값일 때 적절히 처리해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 10, // 범위 초과
        kiip: -1, // 범위 미만
      });
      expect(result).toEqual({
        level: 0,
        label: '정보 없음',
      });
    });

    it('일부 값만 제공될 때 해당 값만 고려해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 5, // level: 5
      });
      expect(result).toEqual({
        level: 5,
        label: '고급 구사 가능',
      });
    });
  });

  describe('경계 값 테스트', () => {
    it('최소값들을 처리해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 1,
        kiip: 1,
        sejong: 1,
      });
      expect(result).toEqual({
        level: 2,
        label: '간단한 해석 가능',
      });
    });

    it('최대값들을 처리해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 6,
        kiip: 5,
        sejong: 6,
      });
      expect(result).toEqual({
        level: 6,
        label: '원어민 수준',
      });
    });
  });

  describe('데이터 타입 안정성', () => {
    it('정수 타입의 입력값을 올바르게 처리해야 한다', () => {
      const result = getKoreanAbilityLevel({
        topik: 3,
        kiip: 2,
      });
      expect(result.level).toBeTypeOf('number');
      expect(result.label).toBeTypeOf('string');
    });

    it('반환값이 일관된 구조를 가져야 한다', () => {
      const result = getKoreanAbilityLevel({ topik: 1 });
      expect(result).toHaveProperty('level');
      expect(result).toHaveProperty('label');
      expect(typeof result.level).toBe('number');
      expect(typeof result.label).toBe('string');
    });
  });
});
