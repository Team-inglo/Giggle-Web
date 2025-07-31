// button 컴포넌트 타입
export const buttonTypeKeys = {
  LARGE: 'large',
  SMALL: 'small',
  APPLY: 'applyNow',
  SMALLAPPLY: 'smallApply',
  BACK: 'back',
  CONTINUE: 'continue',
  SCRAP: 'scrap',
  PRIMARY: 'primary',
  NEUTRAL: 'neutral',
  TERTIARY: 'tertiary',
  DISABLED: 'disabled',
  INACTIVE: 'inactive',
} as const;

export type buttonTypeUnion =
  (typeof buttonTypeKeys)[keyof typeof buttonTypeKeys];

export enum ButtonSize {
  MD = 'md',
  LG = 'lg',
}

// 레이아웃 variant 추가
export enum ButtonLayoutVariant {
  DEFAULT = 'default',
  SMALL_BUTTON = 'small-button', // 기존 BACK 타입 대체
  FLEX_BUTTON = 'flex-button', // 기존 CONTINUE 타입 대체
}
