import Icon from '@/components/Common/Icon';
import InfoIcon from '@/assets/icons/InfoCircle.svg?react';
import WarningIcon from '@/assets/icons/Warning.svg?react';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';

const STATE_PROPERTIES: Record<
  InfoBannerState,
  { style: string; icon: React.ReactNode }
> = {
  [InfoBannerState.INFO]: {
    style: 'bg-neutral-100 text-text-normal',
    icon: <Icon icon={InfoIcon} fillColor="text-neutral-600" />,
  },
  [InfoBannerState.NEGATIVE]: {
    style: 'bg-status-red-100 text-status-red-400',
    icon: <Icon icon={WarningIcon} fillColor="text-status-red-300" />,
  },
  [InfoBannerState.POSITIVE]: {
    style: 'bg-status-green-100 text-status-green-300',
    icon: (
      <div className="flex items-center justify-center w-[0.875rem] h-[0.875rem] p-0.5 rounded-full bg-status-green-200">
        <Icon icon={CheckIcon} fillColor="text-status-green-300" />
      </div>
    ),
  },
  [InfoBannerState.SUCCESS]: {
    style: 'bg-status-blue-100 text-status-blue-300',
    icon: (
      <div className="flex items-center justify-center w-[0.875rem] h-[0.875rem] p-0.5 rounded-full bg-status-blue-200">
        <Icon icon={CheckIcon} fillColor="text-status-blue-300" />
      </div>
    ),
  },
};

const SIZE_STYLES: Record<InfoBannerSize, string> = {
  [InfoBannerSize.SM]: 'min-h-8 p-[0.375rem] caption-12-semibold',
  [InfoBannerSize.MD]: 'min-h-10 p-2 body-14-medium',
};

type InfoBannerPropsType = {
  state?: InfoBannerState;
  size?: InfoBannerSize;
  hasIcon?: boolean;
  hasButton?: boolean;
  text?: string;
  buttonText?: string;
  onClickButton?: () => void;
};

const InfoBanner = ({
  state = InfoBannerState.INFO,
  size = InfoBannerSize.MD,
  hasIcon = true,
  hasButton = false,
  text = '',
  buttonText = '',
  onClickButton,
}: InfoBannerPropsType) => {
  const stateProperties = STATE_PROPERTIES[state];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <section
      className={`flex rounded-md ${stateProperties.style} ${sizeStyle}`}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {hasIcon && stateProperties.icon}
      </div>
      <div className="flex items-center w-full px-1 py-0.5 flex-1">
        <p className="line-clamp-2 text-start w-full">{text}</p>
      </div>
      {hasButton && (
        <button
          type="button"
          className="flex items-center px-1 underline underline-offset-4"
          onClick={onClickButton}
        >
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default InfoBanner;
