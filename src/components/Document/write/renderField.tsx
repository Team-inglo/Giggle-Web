import { InputType } from '@/types/common/input';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import DocumentFormInput from '@/components/Document/write/input/DocumentFormInput';
import PhoneNumberInputController from '@/components/Document/write/input/PhoneNumberInputController';
import AddressInput from '@/components/Document/write/input/AddressInput';
import DropdownInput, {
  KeyValueDropdownInput,
} from '@/components/Document/write/input/DropdownInput';
import RadioGroup, {
  RadioGroupVariant,
} from '@/components/Document/write/input/RadioGroup';
import CheckboxGroup from '@/components/Document/write/input/CheckboxGroup';
import WorkDayTimeWithRestInput from '@/components/Document/write/input/WorkDayTimeWithRestInput';
import SignaturePad from '@/components/Document/write/SignaturePad';
import Input from '@/components/Common/Input';
import {
  LaborContractFormField,
  PartTimePermitFormField,
  IntegratedApplicationFormField,
  LaborContractEmployerFormField,
  PartTimePermitEmployerFormField,
  PostFormField,
} from '@/constants/formFields';
import WorkDayTimeInput from './input/WorkDayTimeInput';
import VisaDropdown from '@/components/Common/VisaDropdown';
import ValueWithCheckboxInput from '@/components/Document/write/input/ValueWithCheckboxInput';
import ImageUploadInput from '@/components/Document/write/input/ImageUploadInput';
import { convertToDropdownOption } from '@/utils/document';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type FormField =
  | LaborContractFormField
  | PartTimePermitFormField
  | IntegratedApplicationFormField
  | LaborContractEmployerFormField
  | PartTimePermitEmployerFormField
  | PostFormField;

type RenderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: FormField;
  name: TName;
  onSchoolNameClick?: () => void;
};

export const RenderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  name,
  onSchoolNameClick,
}: RenderFieldProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const { account_type } = useUserStore();

  switch (field.type) {
    case 'text':
      return (
        <DocumentFormInput
          inputType={InputType.TEXT}
          placeholder={field.placeholder}
          canDelete={false}
          name={name}
          format={field.format}
          description={field.description}
          isUnit={field.isUnit}
          unit={field.unit}
          isPrefix={field.isPrefix}
          prefix={field.prefix}
          isValid={(value) => field.isValid?.(value) ?? true}
          errorMessage={field.errorMessage}
        />
      );
    case 'textarea':
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="w-full self-stretch flex flex-col items-center justify-start caption-12-regular">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full flex flex-col items-center justify-start  border-[0.05rem] border-border-assistive rounded-[0.625rem]">
                  <textarea
                    className={`w-full ${field.textareaHeight} px-4 py-[0.875rem] body-16-medium outline-none resize-none rounded-[0.625rem]`}
                    placeholder={field.placeholder}
                    value={value as string}
                    onChange={onChange}
                    maxLength={field.maxLength}
                  />
                  <span className="w-full caption-12-regular text-text-assistive text-end p-4">
                    {value?.length}/{field.maxLength}
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      );
    case 'phone':
      return <PhoneNumberInputController name={name} />;
    case 'address':
      return (
        <AddressInput
          name={name}
          placeholder={field.placeholder}
          label={field.label}
        />
      );
    case 'dropdown':
      if (
        field.useKeyValue &&
        field.options &&
        typeof field.options === 'object' &&
        !Array.isArray(field.options)
      ) {
        return (
          <KeyValueDropdownInput
            name={name}
            title={field.placeholder}
            placeholder={field.placeholder}
            options={convertToDropdownOption(
              field.options as Record<
                string,
                { name: string; [key: string]: unknown }
              >,
            )}
          />
        );
      }

      return (
        <DropdownInput
          name={name}
          title={field.placeholder}
          placeholder={field.placeholder}
          options={Array.isArray(field.options) ? field.options : []}
        />
      );
    case 'signature':
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div
              className={`w-full relative shadow rounded-xl box-border h-[120px] mb-40`}
            >
              <SignaturePad
                onSave={onChange}
                onReset={() => onChange('')}
                previewImg={value as string}
                isKorean={account_type === UserType.OWNER}
              />
            </div>
          )}
        />
      );
    case 'radio':
      return (
        <RadioGroup
          name={name}
          type={field.selectType as RadioGroupVariant}
          options={Array.isArray(field.options) ? field.options : []}
          optionsWithIcon={field.optionsWithIcon}
          description={field.description}
          transformer={field.transformer}
        />
      );
    case 'checkbox':
      return (
        <CheckboxGroup
          name={name}
          options={field.checkboxOptions || []}
          description={field.description}
          variant={field.variant}
        />
      );
    case 'work_schedule':
      return <WorkDayTimeWithRestInput name={name} />;
    case 'work_day_time':
      return (
        <WorkDayTimeInput
          name={name}
          placeholder={field.placeholder}
          description={field.description}
        />
      );
    case 'school_name':
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => (
            <>
              <div onClick={onSchoolNameClick}>
                <Input
                  inputType={InputType.TEXT}
                  placeholder={field.placeholder}
                  value={value as string}
                  onChange={() => {}}
                  canDelete={false}
                />
              </div>
            </>
          )}
        />
      );
    case 'input_with_radio':
      return (
        <div>
          <Controller
            name={name}
            render={({ field: { value } }) => (
              <div className="flex flex-col gap-2">
                <RadioGroup
                  name={name}
                  type={field.selectType as RadioGroupVariant}
                  options={Array.isArray(field.options) ? field.options : []}
                  description={field.description}
                  transformer={field.transformer}
                />
                {value === 0 && (
                  <DocumentFormInput
                    inputType={InputType.TEXT}
                    placeholder={field.placeholder}
                    canDelete={false}
                    name={name}
                    isUnit={field.isUnit}
                    unit={field.unit}
                  />
                )}
              </div>
            )}
          />
        </div>
      );
    case 'visa_dropdown':
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <VisaDropdown
              value={value}
              placeholder={field.placeholder}
              setValue={onChange}
            />
          )}
        />
      );
    case 'value_with_checkbox':
      return (
        <ValueWithCheckboxInput
          name={name}
          placeholder={field.placeholder}
          description={field.description}
          checkboxLabel={field.checkboxLabel}
          isUnit={field.isUnit}
          unit={field.unit}
          isDate={field.isDate}
          format={field.format}
          inputType={field.inputType}
          isValid={(value) => field.isValid?.(value) ?? true}
          errorMessage={field.errorMessage}
        />
      );
    case 'image_upload':
      return (
        <div className="w-full">
          <ImageUploadInput name={name} isEdit={field.isEdit as boolean} />
        </div>
      );
    default:
      return null;
  }
};

export const renderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: RenderFieldProps<TFieldValues, TName>,
) => {
  return <RenderField {...props} />;
};
