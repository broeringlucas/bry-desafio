import { AxiosError } from 'axios';
import { api } from '../../core/lib/api';

import { mapApiError }
  from '../../core/mappers/api_errors.mapper';

import { mapWeatherForecast }
  from '../mappers/weather.mapper';

import { WeatherForecast }
  from '../models/weather.model';

import { WeatherForecastResponse }
  from '../types/weather_api.types';
  

export async function getForecast(
  query: string,
): Promise<WeatherForecast> {
  try {
    const response =
      await api.get<WeatherForecastResponse>(
        '/forecast.json',
        {
          params: {
            q: query,
            days: 3,
            aqi: 'no',
            alerts: 'no',
          },
        },
      );

    return mapWeatherForecast(response.data);
  } catch (error: any) {
      throw mapApiError(
      error as AxiosError,
    );
  }
}