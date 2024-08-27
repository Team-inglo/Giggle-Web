import { Dispatch, SetStateAction, useState } from "react";
import {
  Input,
  InputBox,
  InputText,
  InputTitle,
  PlaceContainer,
  SearchResultModal,
  SubmitButton,
} from "./style";
import { education, gender, partTimeRecruitPostRequest } from "./types";
interface Props {
  setPageNum: () => void;
  recruitInfo: partTimeRecruitPostRequest;
  setRecruitInfo: Dispatch<SetStateAction<partTimeRecruitPostRequest>>;
}

const EmployerRegistrationInputThird = ({
  setPageNum,
  recruitInfo,
  setRecruitInfo,
}: Props) => {
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const canGoNext =
    recruitInfo.age !== 0 &&
    recruitInfo.gender !== undefined &&
    recruitInfo.education !== undefined &&
    recruitInfo.numberRecruited !== 0;
  const genderList = [
    { genderCode: "ANY", name: "전체" },
    { genderCode: "MALE", name: "남자" },
    { genderCode: "FEMALE", name: "여자" },
  ];
  const educationList = [
    { schoolCode: "HIGH_SCHOLL_GRADUATION", name: "고졸" },
    { schoolCode: "TWO_YEAR_COLLEGE_GRADUATION", name: "대학교(2년제) 이상" },
    { schoolCode: "FOUR_YEAR_COLLEGE_GRADUATION", name: "대학교(4년제) 이상" },
    { schoolCode: "ANY", name: "무관" },
  ];
  const handleClick = () => {
    canGoNext && setPageNum();
  };

  const handleGenderModalClick = (gender: gender) => {
    setRecruitInfo({
      ...recruitInfo,
      gender: gender,
    });
    setIsGenderModalOpen(false);
  };
  const handleEducationModalClick = (education: education) => {
    setRecruitInfo({
      ...recruitInfo,
      education: education,
    });
    setIsEducationModalOpen(false);
  };
  return (
    <>
      <InputBox>
        <InputTitle>선호 나이</InputTitle>
        <Input
          placeholder="나이 선택"
          value={recruitInfo.age}
          onChange={(e) =>
            setRecruitInfo({ ...recruitInfo, age: Number(e.target.value) })
          }
        />
        <InputText>이상</InputText>
      </InputBox>
      <InputBox>
        <InputTitle>선호 성별</InputTitle>
        <Input
          value={
            genderList.find((item) => item.genderCode == recruitInfo.gender)
              ?.name
          }
          readOnly
          onClick={() => setIsGenderModalOpen(true)}
          placeholder="성별 선택"
        />
        {isGenderModalOpen && (
          <SearchResultModal>
            {genderList.map((gender) => (
              <PlaceContainer
                onClick={() =>
                  handleGenderModalClick(gender.genderCode as gender)
                }
              >
                {gender.name}
              </PlaceContainer>
            ))}
          </SearchResultModal>
        )}
      </InputBox>
      <InputBox>
        <InputTitle>선호 학력</InputTitle>
        <Input
          value={
            educationList.find(
              (item) => item.schoolCode == recruitInfo.education
            )?.name
          }
          readOnly
          onClick={() => setIsEducationModalOpen(true)}
          placeholder="학력 선택"
        />
        {isEducationModalOpen && (
          <SearchResultModal>
            {educationList.map((education) => (
              <PlaceContainer
                onClick={() =>
                  handleEducationModalClick(education.schoolCode as education)
                }
              >
                {education.name}
              </PlaceContainer>
            ))}
          </SearchResultModal>
        )}
      </InputBox>
      <InputBox>
        <InputTitle>모집 인원</InputTitle>
        <Input
          placeholder="모집 인원"
          value={recruitInfo.numberRecruited}
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              numberRecruited: Number(e.target.value),
            })
          }
        />
        <InputText>명</InputText>
      </InputBox>
      <SubmitButton
        className={canGoNext ? "activated" : "disabled"}
        onClick={handleClick}
      >
        다음
      </SubmitButton>
    </>
  );
};

export default EmployerRegistrationInputThird;
