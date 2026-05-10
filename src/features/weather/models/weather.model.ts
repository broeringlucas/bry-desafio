export interface WeatherForecast {
  city: string;
  country: string;

  current: CurrentWeather;

  forecastDays: ForecastDay[];
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;

  condition: string;

  iconUrl: string;
}

export interface ForecastDay {
  date: string;

  weekday: string;

  averageTemperature: number;

  averageHumidity: number;

  condition: string;

  iconUrl: string;

  hourlyForecast: HourForecast[];
}

export interface HourForecast {
  time: string;
  temperature: number;
}