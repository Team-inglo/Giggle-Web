import { getGeoInfo, searchAddress } from '@/api/map';
import { Document, GeoPosition, UseSearchAddressProps } from '@/types/api/map';
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export function useGetGeoInfo(
  setCurrentPosition: Dispatch<SetStateAction<GeoPosition>>,
) {
  return useQuery({
    queryKey: ['event'],
    queryFn: () => getGeoInfo(setCurrentPosition),
  });
}

type SearchAddressMutation = Omit<UseMutationResult<Document[], unknown, string, unknown>, 'mutate'> & {
  searchAddress: UseMutateFunction<Document[], unknown, string, unknown>;
};

export const useSearchAddress = ({
  onSuccess,
  onError,
}: UseSearchAddressProps): SearchAddressMutation => {
  const { mutate, ...rest } = useMutation({
    mutationFn: searchAddress,
    onSuccess,
    onError: (error) => {
      console.error('주소 검색 중 오류 발생:', error);
      onError?.(error);
    },
  });
  return { searchAddress: mutate, ...rest };
};
