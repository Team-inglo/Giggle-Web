import { Dispatch, RefObject, SetStateAction } from 'react';
import InputLayout from '@/components/WorkExperience/InputLayout';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { IntroductionRequest } from '@/types/api/resumes';
import { limitInputValueLength } from '@/utils/information';

type IntroductionInputProps = {
  data: IntroductionRequest;
  textareaRef: RefObject<HTMLTextAreaElement>;
  handleFocusTextArea: () => void;
  handleChange: Dispatch<SetStateAction<IntroductionRequest>>;
};

const IntroductionInput = ({
  handleFocusTextArea,
  textareaRef,
  data,
  handleChange,
}: IntroductionInputProps) => {
  return (
    <div className="px-4 flex flex-col gap-6 pb-28">
      <InputLayout title="Introduce yourself in one sentence!">
        <Input
          inputType={InputType.TEXT}
          placeholder="ex. Friendly barista with a passion"
          value={data.title ?? ''}
          onChange={(value) =>
            handleChange((prev) => ({
              ...prev,
              title: limitInputValueLength(value, 50),
            }))
          }
          canDelete={false}
        />
        <div className="w-full flex justify-end p-2">
          <span className="w-full caption-12-regular text-text-assistive text-start">
            {data.title && data.title?.length > 0
              ? `${data.title?.length}/50`
              : '(Max 50 characters)'}
          </span>
        </div>
      </InputLayout>

      <InputLayout title="Tell us about yourself">
        <div
          onClick={handleFocusTextArea}
          className="w-full min-h-32 px-4 py-[0.875rem] flex flex-col justify-between gap-2.5 rounded-[0.625rem] border-[0.05rem] border-border-assistive"
        >
          <textarea
            ref={textareaRef}
            placeholder="Who are you? What are your skills? Keep it short & engaging!"
            value={data.introduction ?? ''}
            onChange={(e) =>
              handleChange((prev) => ({
                ...prev,
                introduction: limitInputValueLength(e.target.value, 200),
              }))
            }
            className="h-auto body-16-medium placeholder:text-text-assistive text-text-strong w-full resize-none outline-none"
          />
          <span className="caption-12-regular text-text-assistive text-end">
            {data.introduction?.length}/200
          </span>
        </div>
      </InputLayout>
    </div>
  );
};

export default IntroductionInput;
