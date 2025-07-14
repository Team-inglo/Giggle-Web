/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { documentTranslation, postTranslation } from '@/constants/translation';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import { convertToAddress } from '@/utils/map';
import { useState } from 'react';
import { GiggleAddress } from '@/types/api/users';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';

interface AddressInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder: string;
  label?: string;
}

const AddressInput = <T extends FieldValues>({
  name,
  placeholder,
}: AddressInputProps<T>) => {
  const { pathname } = useLocation();
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const { control } = useFormContext<T>();
  return (
    <>
      {isAddressSearch ? (
        <div className="w-full h-screen fixed inset-0 bg-white z-20">
          <Controller
            control={control}
            name={name as FieldPath<T>}
            render={({ field: { onChange } }) => (
              <DaumPostcodeEmbed
                style={{
                  position: 'absolute',
                  top: '50px',
                  width: '100%',
                  height: 'calc(100vh - 100px)',
                  marginTop: '3.125rem',
                  paddingBottom: '6.25rem',
                }}
                theme={{ pageBgColor: '#ffffff', bgColor: '#ffffff' }}
                onComplete={async (data: Address) => {
                  const convertedAddress = convertToAddress(data);
                  onChange({
                    ...convertedAddress,
                    longitude: 127.027583,
                    latitude: 37.501021,
                  });
                  setIsAddressSearch(false);
                }}
                onClose={() => setIsAddressSearch(false)}
              />
            )}
          />
        </div>
      ) : (
        <Controller
          control={control}
          name={name as FieldPath<T>}
          render={({ field: { value } }) => (
            <>
              <div onClick={() => setIsAddressSearch(true)}>
                <Input
                  inputType={InputType.TEXT}
                  placeholder={placeholder}
                  value={(value as GiggleAddress)?.address_name || ''}
                  onChange={() => {}}
                  canDelete={false}
                />
              </div>
              {(value as GiggleAddress)?.address_name && (
                <Controller
                  control={control}
                  name={`${name}.address_detail` as any}
                  render={({ field: detailField }) => (
                    <div className="mt-3">
                      <Input
                        inputType={InputType.TEXT}
                        placeholder={
                          postTranslation.detailedAddressPlaceholder[
                            isEmployer(pathname)
                          ]
                        }
                        value={detailField.value || ''}
                        onChange={detailField.onChange}
                        canDelete={false}
                      />
                      {detailField.value && detailField.value.length > 50 && (
                        <p className="text-text-error text-xs p-2">
                          {
                            documentTranslation.detailAddressTooLong[
                              isEmployer(pathname)
                            ]
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
              )}
            </>
          )}
        />
      )}
    </>
  );
};

export default AddressInput;
