import { GiggleAddress } from '@/types/api/users';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Address } from 'react-daum-postcode';

/**
 * 객체에서 지정된 속성들만 선택하여 새 객체를 반환하는 함수
 * @param obj 원본 객체
 * @param keys 선택할 속성들의 배열
 * @returns 선택된 속성들로 이루어진 새 객체
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> =>
  keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );

// 입력된 주소지 지도로 렌더링하는 함수
export const renderMap = (address: GiggleAddress) => {
  return (
    <>
      <div className="w-full self-stretch flex flex-col items-start justify-start">
        <div className="w-full flex-1 relative body-2">
          {address.address_name} {address.address_detail}
        </div>
      </div>
      <div className="w-full rounded-lg">
        <Map
          center={{
            lat: Number(address.latitude),
            lng: Number(address.longitude),
          }}
          style={{ width: '100%', height: '200px' }}
          className="rounded-lg"
        >
          <MapMarker
            position={{
              lat: Number(address.latitude),
              lng: Number(address.longitude),
            }}
          ></MapMarker>
        </Map>
      </div>
    </>
  );
};

export const convertToAddress = (addressData: Address): GiggleAddress => {
  // 주소 타입에 따라 기본 주소 선택
  const baseAddress =
    addressData.userSelectedType === 'R'
      ? addressData.roadAddress
      : addressData.jibunAddress;
  // region_3depth_name 추출
  const region3DepthName = baseAddress
    .replace(addressData.sido, '')
    .replace(addressData.sigungu, '')
    .trim();

  return {
    address_name: baseAddress,
    region_1depth_name: addressData.sido,
    region_2depth_name: addressData.sigungu,
    region_3depth_name: region3DepthName,
    region_4depth_name: null,
    address_detail: null,
    longitude: null,
    latitude: null,
  };
};

interface KakaoAddressResult {
  x: string;
  y: string;
  address_name: string;
}

// 이름으로 좌표 검색하는 함수
export const getAddressCoords = async (
  address: string,
): Promise<kakao.maps.LatLng> => {
  const geoCoder = new kakao.maps.services.Geocoder();
  try {
    const result = await new Promise<KakaoAddressResult>((resolve, reject) => {
      geoCoder.addressSearch(
        address,
        (results: KakaoAddressResult[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed with status: ${status}`));
          }
        },
      );
    });

    return new kakao.maps.LatLng(Number(result.x), Number(result.y));
  } catch (error) {
    const err = error as Error;
    throw new Error(
      `Failed to get coordinates for address: ${address}. ${err.message}`,
    );
  }
};
