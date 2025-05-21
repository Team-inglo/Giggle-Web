// button 컴포넌트 타입
export const buttonTypeKeys = {
  LARGE: 'large',
  SMALL: 'small',
  APPLY: 'applyNow',
  SMALLAPPLY: 'smallApply',
  BACK: 'back',
  CONTINUE: 'continue',
  SCRAP: 'scrap',
} as const

export type buttonTypeUnion = typeof buttonTypeKeys[keyof typeof buttonTypeKeys]
