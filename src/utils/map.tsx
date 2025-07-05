import { GiggleAddress } from '@/types/api/users';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Address } from 'react-daum-postcode';

// 입력된 주소지 지도로 렌더링하는 함수
export const renderMap = (address: GiggleAddress) => {
  return (
    <>
      <div className="w-full self-stretch flex flex-col items-start justify-start">
        <div className="w-full flex-1 relative body-14-regular mb-1">
          {address.address_name}
          {', '} {address.address_detail}
        </div>
      </div>
      <div className="w-full rounded-lg z-1">
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
  // 무조건 지번 주소 사용하기
  const baseAddress = addressData.jibunAddress || addressData.autoJibunAddress;
  return {
    address_name: baseAddress,
    region_1depth_name: addressData.sido,
    region_2depth_name: addressData.sigungu,
    region_3depth_name: addressData.bname,
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

    return new kakao.maps.LatLng(Number(result.y), Number(result.x));
  } catch (error) {
    const err = error as Error;
    throw new Error(
      `Failed to get coordinates for address: ${address}. ${err.message}`,
    );
  }
};

export const processAddressData = async (
  addressData: Address,
): Promise<GiggleAddress> => {
  const convertedAddress = convertToAddress(addressData);
  const coords = await getAddressCoords(
    convertedAddress.address_name as string,
  );

  return {
    ...convertedAddress,
    longitude: coords.getLng(),
    latitude: coords.getLat(),
  };
};
