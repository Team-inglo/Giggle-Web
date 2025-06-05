type DownArrowIconProp = {
  strokeColor?: string;
};

const DownArrowIcon = ({ strokeColor = '#1E1926' }: DownArrowIconProp) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconography / Metaphor / ArrowUp">
        <path
          id="Path 5"
          d="M1.45833 3.54167L5 7.08333L8.54167 3.54167"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DownArrowIcon;
