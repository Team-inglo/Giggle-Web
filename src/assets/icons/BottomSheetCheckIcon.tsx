type BottomSheetCheckIconProps = {
  bgColor?: string;
  strokeColor?: string;
};

const BottomSheetCheckIcon = ({
  bgColor = 'bg-surface-base',
  strokeColor = '#17181A',
}: BottomSheetCheckIconProps) => {
  return (
    <div className={`p-1 rounded-full ${bgColor}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.66797 8.3723L7.03113 12.4444L13.3346 4"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BottomSheetCheckIcon;
