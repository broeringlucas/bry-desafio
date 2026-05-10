import { useQuery }
  from '@tanstack/react-query';

import { getForecast }
  from '../services/weather.service';

export function useForecast(
  query: string,
) {
  return useQuery({
    queryKey: ['forecast', query],

    queryFn: () => getForecast(query),

    staleTime: 1000 * 60 * 10,

    retry: 2,
  });
}