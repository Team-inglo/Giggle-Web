const ToggleButton = ({
  isOn,
  onChange,
}: {
  isOn: boolean;
  onChange: () => void;
}) => (
  <div className="relative flex items-center" onClick={onChange}>
    <div
      className={`w-[2.125rem] h-5 rounded-full ${
        isOn ? 'bg-surface-invert' : 'bg-surface-disabled'
      }`}
    />
    <div
      className={`w-[0.875rem] h-[0.875rem] rounded-full absolute bg-white transform transition-transform duration-300 ease-in-out ${
        isOn ? 'translate-x-4' : 'translate-x-[0.25rem]'
      }`}
    />
  </div>
);

export default ToggleButton;
