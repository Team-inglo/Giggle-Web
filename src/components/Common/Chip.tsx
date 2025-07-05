import { ChipState } from '@/types/common/chip';
import Icon from '@/components/Common/Icon';
import DisclosureIcon from '@/assets/icons/DisclosureIcon.svg?react';

const STATE_STYLES: Record<ChipState, string> = {
  [ChipState.DEFAULT]:
    'border-border-disabled text-text-strong bg-surface-base',
  [ChipState.PRESSED]:
    'border-surface-tertiary text-text-strong bg-surface-tertiary',
  [ChipState.ACTIVE]:
    'border-surface-invert text-text-invert bg-surface-invert',
};

const DROPDOWN_STYLES: Record<ChipState, string> = {
  [ChipState.DEFAULT]: 'text-text-alternative',
  [ChipState.PRESSED]: 'text-text-alternative',
  [ChipState.ACTIVE]: 'text-text-invert',
};

type ChipType = {
  state?: ChipState;
  text?: string;
  isDropdown?: boolean;
  onClick?: () => void;
};

const Chip = ({
  state = ChipState.DEFAULT,
  text = '',
  isDropdown = false,
  onClick,
}: ChipType) => {
  const stateStyle = STATE_STYLES[state];
  const dropdownStyle = DROPDOWN_STYLES[state];

  return (
    <button
      className={`flex justify-center items-center py-2 px-[0.875rem] rounded-[3.125rem] body-14-regular border ${stateStyle} ${isDropdown && 'pr-[0.625rem]'}`}
      onClick={onClick}
    >
      <p className={`${isDropdown && dropdownStyle}`}>{text}</p>
      {isDropdown && <Icon icon={DisclosureIcon} fillColor={dropdownStyle} />}
    </button>
  );
};

Chip.State = ChipState;

export default Chip;
