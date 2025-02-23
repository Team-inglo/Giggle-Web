type IntroductionInputProps = {
  data: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleFocusTextArea: () => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const IntroductionInput = ({
  handleFocusTextArea,
  textareaRef,
  data,
  handleChange,
}: IntroductionInputProps) => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="pr-4 head-1 text-[#1E1926]">
        Standard labor contract for short-time workers
      </div>
      <div
        onClick={handleFocusTextArea}
        className="w-full min-h-32 px-4 py-3 flex flex-col justify-between gap-2.5 rounded-xl border border-[#E2E5EB] shadow-inputFieldShadow p-2"
      >
        <textarea
          ref={textareaRef}
          placeholder="Please write an article that introduces you."
          value={data}
          onChange={handleChange}
          className="h-auto body-2 placeholder:text-[#abb0b9] text-[#1E1926] w-full resize-none outline-none"
        />
        <span className="caption text-[#464646] text-end">
          {data.length}/200
        </span>
      </div>
    </div>
  );
};

export default IntroductionInput;
