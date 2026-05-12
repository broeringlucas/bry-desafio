import { api } from '../../common/core/api/api';
import { mapApiError } from '../../common/mappers/api-errors.mapper';
import { CitySearchResponse } from '../types/city_api.types';
import { City } from '../models/city.model';
import { mapCitySearch } from '../mappers/city.mapper';
import { AxiosError } from 'axios';

export async function searchCities(
  query: string,
): Promise<City[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const response = await api.get<CitySearchResponse[]>(
      '/search.json',
      {
        params: {
          q: query,
        },
      },
    );

    return mapCitySearch(response.data);
  } catch (error) {
    throw mapApiError(error as AxiosError);
  }
}