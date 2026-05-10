import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { LinearGradient }
  from 'expo-linear-gradient';

import { ForecastCard }
  from '../features/weather/components/forecastCard';

import { useForecast }
  from '../features/weather/hooks/useForecast';

export default function HomeScreen() {
  const {
    data,
    isLoading,
  } = useForecast('Florianópolis');

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <LinearGradient
      colors={[
        '#0F172A',
        '#1E3A8A',
        '#38BDF8',
      ]}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 80,
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 40,
              fontWeight: '300',
            }}
          >
            {data?.city}
          </Text>

          <Text
            style={{
              color: '#FFF',
              fontSize: 96,
              fontWeight: '200',
              marginTop: 8,
            }}
          >
            {Math.round(
              data?.current.temperature ??
                0,
            )}
            °
          </Text>

          <Text
            style={{
              color:
                'rgba(255,255,255,0.8)',
              fontSize: 24,
            }}
          >
            {data?.current.condition}
          </Text>
        </View>

        <View
          style={{
            marginTop: 48,
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 16,
            }}
          >
            Próximos dias
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
          >
            {data?.forecastDays.map(
              (forecast) => (
                <ForecastCard
                  key={forecast.date}
                  day={forecast.weekday}
                  temperature={
                    forecast.averageTemperature
                  }
                  humidity={
                    forecast.averageHumidity
                  }
                  iconUrl={
                    forecast.iconUrl
                  }
                />
              ),
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}