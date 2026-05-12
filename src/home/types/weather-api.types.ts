export interface WeatherForecastResponse {
  location: WeatherLocationResponse;
  current: CurrentWeatherResponse;
  forecast: ForecastResponse;
}

export interface WeatherLocationResponse {
  name: string;
  country: string;
  localtime: string;
}

export interface CurrentWeatherResponse {
  temp_c: number;
  humidity: number;
  condition: WeatherConditionResponse;
}

export interface WeatherConditionResponse {
  text: string;
  icon: string;
}

export interface ForecastResponse {
  forecastday: ForecastDayResponse[];
}

export interface ForecastDayResponse {
  date: string;
  day: {
    avgtemp_c: number;
    avghumidity: number;
    maxtemp_c?: number; 
    mintemp_c?: number; 
    maxwind_kph?: number; 
    condition: WeatherConditionResponse;
  };
  hour: HourForecastResponse[];
  astro?: {
    sunrise: string;
    sunset: string;
  };
}
export interface HourForecastResponse {
  time: string;
  temp_c: number;
}