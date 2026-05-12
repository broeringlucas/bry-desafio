import { CitySearchResponse } from '../types/city_api.types';
import { City } from '../models/city.model';

export function mapCitySearch(data: CitySearchResponse[]): City[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    region: item.region,
    country: item.country,
    subtitle: `${item.region ? `${item.region}, ` : ''}${item.country}`,
    lat: item.lat,
    lon: item.lon,
  }));
}