import {
  ForecastDayResponse,
  WeatherForecastResponse,
} from '../types/weather_api.types';

import {
  ForecastDay,
  HourForecast,
  WeatherForecast,
} from '../models/weather.model';

import { formatWeekday }
  from '../utils/formatters/format_weekday';

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

  return {
    date: day.date,

    weekday: formatWeekday(day.date),

    averageTemperature: day.day.avgtemp_c,

    averageHumidity: day.day.avghumidity,

    condition: day.day.condition.text,

    iconUrl: day.day.condition.icon,

    hourlyForecast:
      day.hour.map(mapHourForecast),
  };
}

export function mapWeatherForecast(
  response: WeatherForecastResponse,
): WeatherForecast {``
  return {
    city: response.location.name,

    country: response.location.country,

    current: {
      temperature: response.current.temp_c,

      humidity: response.current.humidity,

      condition: response.current.condition.text,

      iconUrl: response.current.condition.icon,
    },

    forecastDays:
      response.forecast.forecastday.map(
        mapForecastDay,
      ),
  };
}