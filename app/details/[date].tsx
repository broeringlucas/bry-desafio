import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ForecastDay, HourForecast } from '../../src/home/models/weather.model';
import DetailCard  from '../../src/details/components/DetailsCard';
import HourlyCard  from '../../src/details/components/HourlyCard';
import ErrorState from '../../src/common/components/ErrorState';
import TemperatureChart  from '../../src/details/components/TemperatureChart';
import { formatSunTime, formatHour, formatDate  } from '../../src/common/utils/formatters/date-utils';

export default function DetailsScreen() {
  const { date, forecastData } = useLocalSearchParams<{ date: string; forecastData: string }>();
  
  const parsedData = forecastData ? JSON.parse(forecastData) : null;
  const selectedDay: ForecastDay = parsedData?.day;
  const cityName = parsedData?.city;
  const countryName = parsedData?.country;

  if (!selectedDay) {
    return (
      <ErrorState 
        message="Dados não encontrados" 
        buttonText="Voltar"
        onPress={() => router.back()} 
      />
    );
  }

  const filteredHourlyData = selectedDay.hourlyForecast?.filter((_, index) => {
    return index % 2 === 0;
  }) || [];

  const temperatureData = filteredHourlyData.map((hour: HourForecast) => ({
    value: hour.temperature,
    label: formatHour(hour.time),
    labelTextStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
  }));

  const maxTemp = Math.max(...temperatureData.map(d => d.value), selectedDay.averageTemperature);
  const minTemp = Math.min(...temperatureData.map(d => d.value), selectedDay.averageTemperature);

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 }}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          >
            <Ionicons name="arrow-back" size={28} color="#FFF" />
            <Text style={{ color: '#FFF', fontSize: 18 }}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }}>
            {formatDate(selectedDay.date)}
          </Text>
          <Text style={{ color: '#FFF', fontSize: 32, fontWeight: '600', marginTop: 8 }}>
            {cityName}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>
            {countryName}
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ color: '#FFF', fontSize: 96, fontWeight: '200' }}>
            {selectedDay.averageTemperature}°
          </Text>
          <Text style={{ color: '#FFF', fontSize: 24, marginTop: 8 }}>
            {selectedDay.condition}
          </Text>
          <View style={{ flexDirection: 'row', gap: 24, marginTop: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Máx</Text>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                {Math.round(maxTemp)}°
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Mín</Text>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                {Math.round(minTemp)}°
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Umidade</Text>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
                {selectedDay.averageHumidity}%
              </Text>
            </View>
          </View>
        </View>

        <TemperatureChart 
          data={temperatureData}
          maxTemp={maxTemp}
          minTemp={minTemp}
        />

        {selectedDay.hourlyForecast && selectedDay.hourlyForecast.length > 0 && (
          <View style={{ marginBottom: 32, paddingHorizontal: 20 }}>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
              📅 Previsão por hora
            </Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedDay.hourlyForecast.map((hour: HourForecast, index: number) => (
                <HourlyCard 
                  key={index}
                  time={formatHour(hour.time)}
                  temperature={hour.temperature}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ paddingHorizontal: 20, gap: 16, marginBottom: 40 }}>
          <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600', marginLeft: 8 }}>
            📋 Informações do dia
          </Text>

          <DetailCard 
            iconFamily="material"
            iconName="weather-windy"
            title="Vento"
            value={selectedDay.maxWindSpeed ? `${Math.round(selectedDay.maxWindSpeed)} km/h` : 'Dados não disponíveis'}
            subtitle="Velocidade máxima do vento"
          />

          {(selectedDay.sunrise || selectedDay.sunset) && (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {selectedDay.sunrise && (
                <View style={{ flex: 1 }}>
                  <DetailCard 
                    iconFamily="ionicons"
                    iconName="sunny-outline"
                    title="Nascer do Sol"
                    value={formatSunTime(selectedDay.sunrise)}
                    subtitle="Amanhecer"
                    isHalfSize={true}
                  />
                </View>
              )}

              {selectedDay.sunset && (
                <View style={{ flex: 1 }}>
                  <DetailCard 
                    iconFamily="ionicons"
                    iconName="moon-outline"
                    title="Pôr do Sol"
                    value={formatSunTime(selectedDay.sunset)}
                    subtitle="Entardecer"
                    isHalfSize={true}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}