type TagDeleteIconProps = {
  color: string;
};

const TagDeleteIcon = ({ color }: TagDeleteIconProps) => {
  return (
    <svg
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconography / Metaphor / TextDelete">
        <path
          id="Path 2"
          d="M0.920758 7.88842L7.08138 1.11173"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Path 2_2"
          d="M0.922992 1.11156L7.08362 7.88825"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default TagDeleteIcon;