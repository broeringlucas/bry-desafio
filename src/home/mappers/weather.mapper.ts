import {
  ForecastDayResponse,
  WeatherForecastResponse,
} from '../types/weather-api.types';
import {
  ForecastDay,
  HourForecast,
  WeatherForecast,
} from '../models/weather.model';
import { formatWeekday } from '../../common/utils/formatters/date-utils';

function mapHourForecast(
  hour: ForecastDayResponse['hour'][0],
): HourForecast {
  return {
    time: hour.time,
    temperature: hour.temp_c,
  };
}

function mapForecastDay(
  day: ForecastDayResponse,
): ForecastDay {
  const formatAstroTime = (timeString?: string) => {
    if (!timeString) return undefined;
    return timeString;
  };

  return {
    date: day.date,
    weekday: formatWeekday(day.date),
    averageTemperature: day.day.avgtemp_c,
    averageHumidity: day.day.avghumidity,
    condition: day.day.condition.text,
    iconUrl: day.day.condition.icon,
    maxWindSpeed: day.day.maxwind_kph,
    sunrise: formatAstroTime(day.astro?.sunrise),
    sunset: formatAstroTime(day.astro?.sunset),
    hourlyForecast: day.hour.map(mapHourForecast),
  };
}

export function mapWeatherForecast(
  response: WeatherForecastResponse,
): WeatherForecast {
  return {
    city: response.location.name,
    country: response.location.country,
    current: {
      temperature: response.current.temp_c,
      humidity: response.current.humidity,
      condition: response.current.condition.text,
      iconUrl: response.current.condition.icon,
    },
    forecastDays: response.forecast.forecastday.map(mapForecastDay),
  };
}