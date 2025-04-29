import { InputType } from '@/types/common/input';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import DocumentFormInput from '@/components/Document/write/input/DocumentFormInput';
import PhoneNumberInput from '@/components/Document/write/input/PhoneNumberInput';
import AddressInput from '@/components/Document/write/input/AddressInput';
import DropdownInput, {
  DropdownOption,
  KeyValueDropdownInput,
} from '@/components/Document/write/input/DropdownInput';
import RadioGroup from '@/components/Document/write/input/RadioGroup';
import CheckboxGroup from '@/components/Document/write/input/CheckboxGroup';
import WorkDayTimeWithRestInput from '@/components/Document/write/input/WorkDayTimeWithRestInput';
import SignaturePad from '@/components/Document/write/SignaturePad';
import Input from '@/components/Common/Input';
import { Control } from 'react-hook-form';
import {
  LaborContractFormField,
  PartTimePermitFormField,
  IntegratedApplicationFormField,
  LaborContractEmployerFormField,
  PartTimePermitEmployerFormField,
  WorkPeriodInfo,
} from '@/constants/documents';

type FormField =
  | LaborContractFormField
  | PartTimePermitFormField
  | IntegratedApplicationFormField
  | LaborContractEmployerFormField
  | PartTimePermitEmployerFormField;

type RenderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: FormField;
  control: Control<TFieldValues>;
  name: TName;
  onSchoolNameClick?: () => void;
};

export const renderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  control,
  name,
  onSchoolNameClick,
}: RenderFieldProps<TFieldValues, TName>) => {
  switch (field.type) {
    case 'text':
      return (
        <DocumentFormInput
          inputType={InputType.TEXT}
          placeholder={field.placeholder}
          canDelete={false}
          name={name}
          control={control}
          format={field.format}
          description={field.description}
          isUnit={field.isUnit}
          unit={field.unit}
          isPrefix={field.isPrefix}
          prefix={field.prefix}
        />
      );
    case 'textarea':
      return (
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <div className="w-full self-stretch flex flex-col items-center justify-start body-3">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full flex flex-col items-center justify-start">
                  <textarea
                    className="w-full h-[10vh] px-[1rem] py-[0.75rem] border border-border-alternative rounded-[0.75rem] body-2 outline-none resize-none"
                    placeholder={field.placeholder}
                    value={value as string}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          )}
        />
      );
    case 'phone':
      return <PhoneNumberInput control={control} name={name} />;
    case 'address':
      return (
        <AddressInput
          control={control}
          name={name}
          placeholder={field.placeholder}
          label={field.label}
        />
      );
    case 'dropdown':
      if (field.name === 'work_period') {
        const workPeriodOptions: DropdownOption[] = Object.entries(
          WorkPeriodInfo,
        ).map(([key, value]) => ({
          key,
          name: (value as { name: string }).name,
        }));
        return (
          <KeyValueDropdownInput
            control={control}
            name={name}
            placeholder={field.placeholder}
            options={workPeriodOptions}
          />
        );
      }
      return (
        <DropdownInput
          control={control}
          name={name}
          placeholder={field.placeholder}
          options={field.options || []}
        />
      );
    case 'signature':
      return (
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <div
              className={`w-full relative shadow rounded-xl box-border h-[120px] mb-40`}
            >
              <SignaturePad
                onSave={onChange}
                onReset={() => onChange('')}
                previewImg={value as string}
              />
            </div>
          )}
        />
      );
    case 'radio':
      return (
        <RadioGroup
          control={control}
          name={name}
          options={field.options || []}
          description={field.description}
          transformer={field.transformer}
        />
      );
    case 'checkbox':
      return (
        <CheckboxGroup
          control={control}
          name={name}
          options={field.checkboxOptions || []}
          description={field.description}
          variant={field.variant}
        />
      );
    case 'work_schedule':
      return <WorkDayTimeWithRestInput control={control} name={name} />;
    case 'school_name':
      return (
        <Controller
          control={control}
          name={name}
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
            control={control}
            name={name}
            render={({ field: { value } }) => (
              <div className="flex flex-col gap-2">
                <RadioGroup
                  control={control}
                  name={name}
                  options={field.options || []}
                  description={field.description}
                  transformer={field.transformer}
                />
                {value === 0 && (
                  <DocumentFormInput
                    inputType={InputType.TEXT}
                    placeholder={field.placeholder}
                    canDelete={false}
                    name={name}
                    control={control}
                    isUnit={field.isUnit}
                    unit={field.unit}
                  />
                )}
              </div>
            )}
          />
        </div>
      );
    default:
      return null;
  }
};
