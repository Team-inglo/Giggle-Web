import { Dispatch, RefObject, SetStateAction } from 'react';
import InputLayout from '../WorkExperience/InputLayout';
import Input from '../Common/Input';
import { InputType } from '@/types/common/input';
import { IntroDuctionRequest } from '@/types/api/resumes';
import { limitInputValueLength } from '@/utils/information';

type IntroductionInputProps = {
  data: IntroDuctionRequest;
  textareaRef: RefObject<HTMLTextAreaElement>;
  handleFocusTextArea: () => void;
  handleChange: Dispatch<SetStateAction<IntroDuctionRequest>>;
};

const IntroductionInput = ({
  handleFocusTextArea,
  textareaRef,
  data,
  handleChange,
}: IntroductionInputProps) => {
  return (
    <div className="px-4 py-6 flex flex-col gap-6 pb-28">
      <InputLayout
        title="Introduce yourself in one sentence!"
        isEssential={false}
      >
        <Input
          inputType={InputType.TEXT}
          placeholder="ex. Friendly barista with a passion for coffee ☕"
          value={data.title as string}
          onChange={(value) =>
            handleChange({ ...data, title: limitInputValueLength(value, 50) })
          }
          canDelete={false}
        />
        <div className="w-full flex justify-end p-2">
          <span className="w-full caption text-text-assistive text-end">
            {data.title?.length}/50
          </span>
        </div>
      </InputLayout>

      <InputLayout title="Tell us about yourself" isEssential={false}>
        <div
          onClick={handleFocusTextArea}
          className="w-full min-h-32 px-4 py-3 flex flex-col justify-between gap-2.5 rounded-xl border border-border-default shadow-inputFieldShadow p-2"
        >
          <textarea
            ref={textareaRef}
            placeholder="Who are you? What are your skills? Keep it short & engaging!"
            value={data.introduction as string}
            onChange={(e) =>
              handleChange({
                ...data,
                introduction: limitInputValueLength(e.target.value, 200),
              })
            }
            className="h-auto body-2 placeholder:text-text-assistive text-text-strong w-full resize-none outline-none"
          />
        </div>
      </InputLayout>
    </div>
  );
};

export default IntroductionInput;
