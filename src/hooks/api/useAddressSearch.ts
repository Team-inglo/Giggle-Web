import { GiggleAddress } from '@/types/api/users';
import { useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { Document, AddressType, GeoPosition } from '@/types/api/map';
import { pick } from '@/utils/map';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface UseAddressSearchReturn {
  addressInput: string;
  addressSearchResult: Document[];
  currentGeoInfo: {
    lat: number;
    lon: number;
  };
  handleAddressSearch: (address: string) => void;
  handleAddressSelect: (selectedAddressName: string) => {
    addressData: {
      address_name: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      region_4depth_name: string;
      longitude: number;
      latitude: number;
    };
    selectedAddressName: string;
  };
  setAddressInput: (address: string) => void;
  setCurrentGeoInfo: Dispatch<SetStateAction<GeoPosition>>;
}

export const useAddressSearch = (
  addressBeforeEdit?: GiggleAddress,
): UseAddressSearchReturn => {
  const [addressInput, setAddressInput] = useState(
    addressBeforeEdit?.address_name || '',
  );
  const [addressSearchResult, setAddressSearchResult] = useState<Document[]>(
    [],
  );
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: addressBeforeEdit?.latitude || 0,
    lon: addressBeforeEdit?.longitude || 0,
  });

  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });

  const handleAddressSearch = useCallback(
    (address: string) => {
      setAddressInput(address);
      if (address !== '') {
        searchAddress(address);
      } else {
        setAddressSearchResult([]);
      }
    },
    [searchAddress],
  );

  const handleAddressSelect = (selectedAddressName: string) => {
    const selectedAddress = addressSearchResult.find(
      (address) => address.address_name === selectedAddressName,
    );

    if (!selectedAddress) return;

    const isRoadAddr = [AddressType.ROAD_ADDR, AddressType.ROAD].includes(selectedAddress.address_type);    const addressData = isRoadAddr
      ? selectedAddress.road_address
      : selectedAddress.address;

    const selectedProperties = pick(addressData, [
      'address_name',
      'region_1depth_name',
      'region_2depth_name',
      'region_3depth_name',
    ]);

    const region4DepthName = isRoadAddr
      ? selectedAddress.road_address.road_name || ''
      : selectedAddress.address.region_3depth_h_name || '';

    setCurrentGeoInfo({
      lon: Number(selectedAddress.x),
      lat: Number(selectedAddress.y),
    });
    setAddressSearchResult([]);
    setAddressInput(selectedAddress.address_name);
    return {
      addressData: {
        ...selectedProperties,
        region_4depth_name: region4DepthName,
        longitude: Number(addressData.x),
        latitude: Number(addressData.y),
      },
      selectedAddressName,
    };
  };

  return {
    addressInput,
    addressSearchResult,
    currentGeoInfo,
    handleAddressSearch,
    handleAddressSelect: (selectedAddressName: string) => {
      const result = handleAddressSelect(selectedAddressName);
      if (!result) {
        throw new Error('주소를 찾을 수 없습니다');
      }
      return result;
    },
    setAddressInput,
    setCurrentGeoInfo,
  };
};
