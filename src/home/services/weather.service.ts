import { AxiosError } from 'axios';
import { api } from '../../common/core/api/api';
import { mapApiError } from '../../common/mappers/api-errors.mapper';
import { getStorageItem, setStorageItem } from '../../common/core/storage/storage';
import { mapWeatherForecast } from '../mappers/weather.mapper';
import { WeatherForecastState } from '../states/weather.state';
import { WeatherForecastResponse } from '../types/weather-api.types';
import { ASYNC_FORECAST_KEY } from '../../common/core/constants/local_storage_keys';

export async function getForecast(query: string): Promise<WeatherForecastState> {
  try {
    const response = await api.get<WeatherForecastResponse>('/forecast.json', {
      params: {
        q: query,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });

    const mappedData = mapWeatherForecast(response.data);

    const state: WeatherForecastState = {
      ...mappedData,
      updatedAt: Date.now(),
      isOffline: false,
    };

    await setStorageItem(ASYNC_FORECAST_KEY, state);

    return state;
  } catch (error: any) {
    const cached = await getStorageItem<WeatherForecastState>(ASYNC_FORECAST_KEY);
    if (cached) {
      return {
        ...cached,
        isOffline: true,
      };
    }

    throw mapApiError(error as AxiosError);
  }
}