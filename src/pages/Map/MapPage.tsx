import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/Search.svg?react";
import CloseIcon from "../../assets/icons/X.svg?react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import MainLayout from "../../components/Common/Menu/MainLayout";

export interface placeType {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}

function MapPage() {
  const [address, setAddress] = useState({
    main: "",
    sub: "",
  });
  const [geoInfo, setGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const [placeList, setPlaceList] = useState<placeType[] | never[]>([]);
  const [isSubAddressVisible, setIsSubAddressVisible] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  useEffect(() => {
    async function getGeoInfo() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${
                    import.meta.env.VITE_APP_REST_API_KEY
                  }`,
                },
              }
            )
            .then((res) => {
              const location = res.data.documents[0];
              setAddress({ main: location.address_name, sub: "" });
            })
            .catch((error) => {
              console.log(error);
            });
          setGeoInfo({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        });
      }
    }
    getGeoInfo();
  }, []);

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
    setIsSubAddressVisible(false);
    setIsSearched(false);
    setPlaceList([]);
  };

  const handleChoosePlace = (place: placeType) => {
    setAddress({ ...address, main: place.place_name });
    setGeoInfo({ lat: Number(place.y), lon: Number(place.x) });
    setIsSearched(false);
    setPlaceList([]);
    setIsSubAddressVisible(true);
    getAddress();
  };

  const getAddress = () => {
    return address;
  };
  return (
    <>
      <MainLayout>
        <InputSection>
          <InputContainer>
            <Input
              value={address.main}
              onChange={(e) => setAddress({ ...address, main: e.target.value })}
              placeholder="거주지 입력"
            />
            {isSearched ? (
              <CloseIcon onClick={handleClose} />
            ) : (
              <SearchIcon onClick={handleSearch} />
            )}
          </InputContainer>
          {isSearched && (
            <SearchResultModal>
              {placeList.map((place) => (
                <PlaceContainer onClick={() => handleChoosePlace(place)}>
                  {place.place_name}
                </PlaceContainer>
              ))}
            </SearchResultModal>
          )}
          <InputContainer className={isSubAddressVisible ? "" : "invisible"}>
            <Input
              value={address.sub}
              onChange={(e) => setAddress({ ...address, sub: e.target.value })}
              placeholder="상세 주소"
            />
          </InputContainer>
        </InputSection>

        <Map
          center={{ lat: geoInfo.lat, lng: geoInfo.lon }}
          style={{ width: "100%", height: "200px" }}
        >
          <MapMarker
            position={{ lat: geoInfo.lat, lng: geoInfo.lon }}
          ></MapMarker>
        </Map>
      </MainLayout>
    </>
  );
}

export default MapPage;

const InputSection = styled.div`
  .invisible {
    display: none;
  }
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #b3b3b3;
  padding: 12px 16px;
`;
const Input = styled.input`
  width: 283px;
  height: 26px;
  border: none;
  outline: none;
`;

const SearchResultModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid #D9D9D9;
  padding: 8px;
  color: #1E1E1E
  fontSize: 14;
  fontFamily: 'Inter';
  fontWeight: '400';
  lineHeight: 19.60;
  wordWrap: 'break-word';
  gap: 8px;
`;

const PlaceContainer = styled.div`
  color: #1e1e1e;
  fontsize: 14;
  fontfamily: "Inter";
  fontweight: "400";
  lineheight: 19.6;
  wordwrap: "break-word";
`;
