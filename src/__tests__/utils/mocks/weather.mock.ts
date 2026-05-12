export const mockForecastData = {
  city: 'São Paulo',
  country: 'Brazil',
  current: {
    temperature: 22,
    humidity: 65,
    condition: 'Partly cloudy',
    iconUrl: '//cdn.weatherapi.com/weather/64x64/day/116.png'
  },
  forecastDays: [
    {
      date: '2024-01-15',
      weekday: 'Seg',
      averageTemperature: 22,
      averageHumidity: 65,
      condition: 'Sunny',
      iconUrl: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      maxWindSpeed: 15.5,
      hourlyForecast: [
        { time: '09:00', temperature: 20 },
        { time: '12:00', temperature: 24 }
      ]
    },
    {
      date: '2024-01-16',
      weekday: 'Terça',
      averageTemperature: 23,
      averageHumidity: 70,
      condition: 'Cloudy',
      iconUrl: '//cdn.weatherapi.com/weather/64x64/day/119.png',
      maxWindSpeed: 12.0,
      hourlyForecast: []
    }
  ],
  updatedAt: Date.now(),
  isOffline: false
};

export const mockApiForecastResponse = {
  location: { name: 'São Paulo', country: 'Brazil', localtime: '2024-01-15 12:00' },
  current: { temp_c: 22, humidity: 65, condition: { text: 'Partly cloudy', icon: '//cdn...' } },
  forecast: {
    forecastday: [
      {
        date: '2024-01-15',
        day: {
          avgtemp_c: 22,
          avghumidity: 65,
          maxwind_kph: 15.5,
          condition: { text: 'Sunny', icon: '//cdn...' }
        },
        hour: [
          { time: '09:00', temp_c: 20 },
          { time: '12:00', temp_c: 24 }
        ],
        astro: { sunrise: '06:30 AM', sunset: '18:45 PM' }
      }
    ]
  }
};