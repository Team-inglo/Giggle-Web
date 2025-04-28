import {
  initialIntegratedApplication,
  IntegratedApplicationFormField,
  IntegratedApplicationformFields,
  REQUIRED_FIELDS,
} from '@/constants/documents';
import { IntegratedApplicationData, Phone } from '@/types/api/document';
import { useState } from 'react';

import { InputType } from '@/types/common/input';

import { validateIntegratedApplication } from '@/utils/document';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SearchSchoolBottomSheet from '@/components/Document/write/SearchSchoolBottomSheet';
import SignaturePad from '@/components/Document/write/SignaturePad';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import {
  usePostIntegratedApplicants,
  usePutIntegratedApplicants,
} from '@/hooks/api/useDocument';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import DocumentFormInput from '@/components/Document/write/input/DocumentFormInput';
import PhoneNumberInput from '@/components/Document/write/input/PhoneNumberInput';
import AddressInput from '@/components/Document/write/input/AddressInput';
import ValidatedSubmitButton from '@/components/Document/write/ValidatedSubmitButton';
import DropdownInput from '@/components/Document/write/input/DropdownInput';
import RadioGroup from '@/components/Document/write/input/RadioGroup';
import Input from '@/components/Common/Input';

// 상수 정의

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
  isEdit: boolean;
  userOwnerPostId: number;
};

const IntegratedApplicationWriteForm = ({
  document,
  isEdit,
  userOwnerPostId,
}: IntegratedApplicationFormProps) => {
  const currentDocumentId = useParams().id;
  const { control, handleSubmit, getValues, setValue } =
    useForm<IntegratedApplicationData>({
      // 문서 편집일 시 기존 값 자동 입력
      defaultValues: document
        ? createInitialValues(document)
        : initialIntegratedApplication,
    });

  // 초기값 생성 함수
  function createInitialValues(
    doc: IntegratedApplicationData,
  ): IntegratedApplicationData {
    return {
      ...doc,
      tele_phone: parsePhoneNumber(doc.tele_phone_number),
      cell_phone: parsePhoneNumber(doc.cell_phone_number),
      new_work_place_phone: parsePhoneNumber(doc.new_work_place_phone_number),
      school_phone: parsePhoneNumber(doc.school_phone_number),
    };
  }

  // 학교 선택 모달 출현 여부 관리 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postDocument, isPending: postPending } =
    usePostIntegratedApplicants(Number(userOwnerPostId)); // 통합신청서 생성 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutIntegratedApplicants(Number(currentDocumentId), userOwnerPostId); // 통합신청서 수정 훅

  // 문서 작성 완료 핸들러 함수
  const handleNext = (data: IntegratedApplicationData) => {
    const finalDocument = prepareDocumentForSubmission(data);

    const payload = {
      id: Number(isEdit ? currentDocumentId : userOwnerPostId),
      document: finalDocument,
    };

    if (isEdit) {
      updateDocument(payload);
      return;
    }
    postDocument(payload);
  };

  // 데이터 제출 전 가공 함수
  const prepareDocumentForSubmission = (data: IntegratedApplicationData) => {
    // 필요한 속성 추출
    const {
      birth,
      tele_phone,
      cell_phone,
      school_phone,
      new_work_place_phone,
      ...rest
    } = data;

    // 최종 문서 데이터 생성
    return {
      ...rest,
      birth: birth.replace(/\//g, '-'),
      tele_phone_number: formatPhoneNumber(tele_phone as Phone),
      cell_phone_number: formatPhoneNumber(cell_phone as Phone),
      school_phone_number: formatPhoneNumber(school_phone as Phone),
      new_work_place_phone_number: formatPhoneNumber(
        new_work_place_phone as Phone,
      ),
    };
  };

  // 폼 필드 렌더링 함수
  const renderField = (field: IntegratedApplicationFormField) => {
    switch (field.type) {
      case 'text':
        return (
          <DocumentFormInput
            inputType={InputType.TEXT}
            placeholder={field.placeholder}
            canDelete={false}
            name={field.name as keyof IntegratedApplicationData}
            control={control}
            format={field.format}
            description={field.description}
          />
        );
      case 'school_name':
        return (
          <Controller
            control={control}
            name={field.name as keyof IntegratedApplicationData}
            render={({ field: { value } }) => (
              <>
                <div onClick={() => setIsModalOpen(true)}>
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
      case 'phone':
        return <PhoneNumberInput control={control} name={field.name} />;
      case 'address':
        return (
          <AddressInput
            control={control}
            name={field.name as string}
            placeholder={field.placeholder}
          />
        );
      case 'dropdown':
        return (
          <DropdownInput
            control={control}
            name={field.name as keyof IntegratedApplicationData}
            placeholder={field.placeholder}
            options={field.options || []}
          />
        );
      case 'signature':
        return (
          <Controller
            control={control}
            name="signature_base64"
            render={({ field: { value, onChange } }) => (
              <div
                className={`w-full relative shadow rounded-xl box-border h-[120px] mb-40`}
              >
                <SignaturePad
                  onSave={onChange}
                  onReset={() => onChange('')}
                  previewImg={value || ''}
                />
              </div>
            )}
          />
        );

      case 'radio': {
        return (
          <RadioGroup
            control={control}
            name={field.name}
            options={field.options || []}
            description={field.description}
            transformer={field.transformer}
          />
        );
      }
      default:
        return null;
    }
  };

  // 폼이 비활성화되어야 하는지 여부
  const isFormDisabled = postPending || updatePending;

  // 최종 ui 렌더링
  return (
    <>
      <form
        className={`w-full flex flex-col px-4 ${isFormDisabled ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="[&>*:last-child]:mb-20 flex flex-col gap-4">
          {/* 작성 폼 렌더링 */}
          {IntegratedApplicationformFields.map((field) => (
            <InputLayout key={field.name} title={field.title} isEssential>
              {renderField(field)}
            </InputLayout>
          ))}
        </div>

        {/* 학교 선택 모달 */}
        {isModalOpen && (
          <BottomSheetLayout
            hasHandlebar
            isAvailableHidden={true}
            isShowBottomsheet={isModalOpen}
            setIsShowBottomSheet={setIsModalOpen}
          >
            <SearchSchoolBottomSheet
              newDocumentData={
                document || (getValues() as IntegratedApplicationData)
              }
              setNewDocumentData={(data: IntegratedApplicationData) => {
                setValue('school_name', data.school_name);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </BottomSheetLayout>
        )}
        {/* 버튼 패널 */}
        <BottomButtonPanel>
          {/* 입력된 정보의 유효성 검사 통과 시 활성화 */}
          <ValidatedSubmitButton
            control={control}
            fieldNames={REQUIRED_FIELDS}
            validationFn={validateIntegratedApplication}
            buttonText={isEdit ? 'Modify' : 'Create'}
            onClick={handleSubmit(handleNext)}
          />
        </BottomButtonPanel>
      </form>
    </>
  );
};

export default IntegratedApplicationWriteForm;
