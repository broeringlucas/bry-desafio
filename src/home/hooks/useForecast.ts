import { useQuery } from '@tanstack/react-query';
import { getForecast } from '../services/weather.service';
import { getApiErrorMessage } from '../../common/utils/formatters/api-error-messages';

export function useForecast(cityName: string) {
  const query = useQuery({
    queryKey: ['forecast', cityName],
    queryFn: () => getForecast(cityName),
    retry: false,
  });

  const isOffline = query.data?.isOffline === true;
  const timestamp = isOffline && query.data?.updatedAt 
    ? query.data.updatedAt 
    : query.dataUpdatedAt;

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    isSuccess: query.isSuccess,
    error: query.error ? getApiErrorMessage(query.error as Error) : null,
    refetch: query.refetch,
    dataUpdatedAt: timestamp,
  };
}