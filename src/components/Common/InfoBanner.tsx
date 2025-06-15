import Icon from '@/components/Common/Icon';
import InfoIcon from '@/assets/icons/InfoCircle.svg?react';
import WarningIcon from '@/assets/icons/Warning.svg?react';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';

type InfoBannerPropsType = {
  state: InfoBannerState;
  size: InfoBannerSize;
  hasIcon?: boolean;
  hasButton?: boolean;
  text: string;
  buttonText?: string;
  onClickButton?: () => void;
};

const getInfoBannerStyle = (
  state: InfoBannerState,
  size: InfoBannerSize,
): string => {
  let stateStyle: string;
  let sizeStyle: string;

  // state에 따른 배경 스타일
  switch (state) {
    case InfoBannerState.INFO:
      stateStyle = 'bg-neutral-100 text-text-normal';
      break;
    case InfoBannerState.NEGATIVE:
      stateStyle = 'bg-status-red-100 text-status-red-400';
      break;
    case InfoBannerState.POSITIVE:
      stateStyle = 'bg-status-green-100 text-status-green-300';
      break;
    case InfoBannerState.SUCCESS:
      stateStyle = 'bg-status-blue-100 text-status-blue-300';
      break;
    default:
      stateStyle = 'bg-neutral-100 text-text-normal';
      break;
  }

  // size에 따른 레이아웃 스타일
  switch (size) {
    case InfoBannerSize.SM:
      sizeStyle = 'min-h-8 p-[0.375rem] caption-12-semibold';
      break;
    case InfoBannerSize.MD:
      sizeStyle = 'min-h-10 p-2 body-14-medium';
      break;
    default:
      sizeStyle = 'min-h-10 p-2 body-14-medium';
      break;
  }

  return `${stateStyle} ${sizeStyle}`;
};

const getInfoBannerIcon = (state: InfoBannerState) => {
  switch (state) {
    case InfoBannerState.INFO:
      return <Icon icon={InfoIcon} fillColor="text-neutral-600" />;
    case InfoBannerState.NEGATIVE:
      return <Icon icon={WarningIcon} fillColor="text-status-red-300" />;
    case InfoBannerState.POSITIVE:
      return (
        <div className="flex items-center justify-center w-[0.875rem] h-[0.875rem] p-0.5 rounded-full bg-status-green-200">
          <Icon icon={CheckIcon} fillColor="text-status-green-300" />
        </div>
      );
    case InfoBannerState.SUCCESS:
      return (
        <div className="flex items-center justify-center w-[0.875rem] h-[0.875rem] p-0.5 rounded-full bg-status-blue-200">
          <Icon icon={CheckIcon} fillColor="text-status-blue-300" />
        </div>
      );
  }
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
  return (
    <section className={`flex rounded-md ${getInfoBannerStyle(state, size)}`}>
      <div className="w-6 h-6 flex items-center justify-center">
        {hasIcon && getInfoBannerIcon(state)}
      </div>
      <p className="flex items-center w-full px-1 py-0.5 text-start flex-1">
        {text}
      </p>
      {hasButton && (
        <button className="flex items-center px-1" onClick={onClickButton}>
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default InfoBanner;
