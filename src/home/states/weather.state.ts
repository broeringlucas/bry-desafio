import { WeatherForecast }
  from '../models/weather.model';

export type WeatherForecastState =
  WeatherForecast & {
    updatedAt: number;

    isOffline: boolean;
  };