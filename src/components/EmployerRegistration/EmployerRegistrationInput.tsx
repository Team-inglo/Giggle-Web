import { useState } from "react";
import {
  Input,
  InputBox,
  InputIcon,
  InputText,
  InputTitle,
  JobList,
  JobSelect,
  PlaceContainer,
  SearchResultModal,
  SubmitButton,
} from "./style";
import { DateString, partTimeRecruitPostRequest, workType } from "./types";
import { handleInput } from "./utils";
import SearchIcon from "../../assets/icons/Search.svg?react";
import CloseIcon from "../../assets/icons/X.svg?react";
import axios from "axios";
import { placeType } from "../../pages/Map/MapPage";

interface Props {
  setPageNum: () => void;
}

const EmployerRegistrationInput = ({setPageNum}: Props) => {
  const [recruitInfo, setRecruitInfo] = useState<partTimeRecruitPostRequest>({
    title: "",
    jobType: "ANY",
    deadline: null,
    hourlyWage: 0,
    workStartDate: null,
    workingPeriod: 0,
    workDays: [],
    age: 0,
    gender: "ANY",
    education: "ANY",
    numberRecruited: 0,
    content: "",
  });
  const jobList = [
    { jobCode: "ANY", name: "전체" },
    { jobCode: "FOOD_INDUSTRY", name: "음식업보조" },
    { jobCode: "OFFICE", name: "사무" },
    { jobCode: "ENGLISH", name: "영어" },
    { jobCode: "TOURIST_INFORMATION", name: "관광안내" },
    { jobCode: "MANUDACTURING_INDUSTRY", name: "제조업" },
    { jobCode: "DAY_WORK", name: "일용근로" },
    { jobCode: "INTERNSHIP", name: "인턴" },
  ];
  const [address, setAddress] = useState({
    main: "",
    sub: "",
  });
  const [geoInfo, setGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const [placeList, setPlaceList] = useState<placeType[] | never[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const canGoNext =
    recruitInfo.title !== "" &&
    recruitInfo.jobType !== null &&
    recruitInfo.hourlyWage !== 0 &&
    recruitInfo.deadline !== null;

  const handleClick = () => {
    canGoNext && setPageNum()
  };
  const handleSearch = () => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address.main}&size=3`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_APP_REST_API_KEY}`,
          },
        }
      )
      .then((res) => {
        setPlaceList(res.data.documents);
        setIsSearched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    setIsSearched(false);
    setPlaceList([]);
  };

  const handleChoosePlace = (place: placeType) => {
    setAddress({ ...address, main: place.place_name });
    setGeoInfo({ lat: Number(place.y), lon: Number(place.x) });
    setIsSearched(false);
    setPlaceList([]);
    getAddress();
  };
  const getAddress = () => {
    return address;
  };
  return (
    <>
      <InputBox>
        <InputTitle>알바 선택</InputTitle>
        <Input
          placeholder="제목 입력"
          value={recruitInfo.title}
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              title: e.currentTarget.value,
            })
          }
        />
      </InputBox>
      <InputBox>
        <InputTitle>업직종</InputTitle>
        <JobList>
          {jobList.map((job) => (
            <JobSelect
              onClick={() =>
                setRecruitInfo({
                  ...recruitInfo,
                  jobType: job.jobCode as workType,
                })
              }
              className={recruitInfo.jobType === job.jobCode ? "selected" : ""}
            >
              {job.name}
            </JobSelect>
          ))}
        </JobList>
      </InputBox>
      <InputBox>
        <InputTitle>시급</InputTitle>
        <Input
          placeholder="시급 입력"
          value={recruitInfo.hourlyWage}
          onChange={(e) =>
            handleInput(e.currentTarget.value, () =>
              setRecruitInfo({
                ...recruitInfo,
                hourlyWage: Number(e.currentTarget.value),
              })
            )
          }
        />
        <InputText>원</InputText>
      </InputBox>
      <InputBox>
        <InputTitle>근무 위치</InputTitle>
        <Input
          value={address.main}
          onChange={(e) =>
            setAddress({ ...address, main: e.currentTarget.value })
          }
        />
        <InputIcon>
          {isSearched ? (
            <CloseIcon onClick={handleClose} />
          ) : (
            <SearchIcon onClick={handleSearch} />
          )}
        </InputIcon>
        {isSearched && (
          <SearchResultModal>
            {placeList.map((place) => (
              <PlaceContainer onClick={() => handleChoosePlace(place)}>
                {place.place_name}
              </PlaceContainer>
            ))}
          </SearchResultModal>
        )}
      </InputBox>
      <InputBox>
        <InputTitle>공고 마감일자</InputTitle>
        <Input
          type="date"
          onChange={(e) =>
            setRecruitInfo({
              ...recruitInfo,
              deadline: e.target.value as DateString,
            })
          }
        />
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

export default EmployerRegistrationInput;
