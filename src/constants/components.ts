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
