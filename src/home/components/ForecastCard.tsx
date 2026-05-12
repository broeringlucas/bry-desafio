import { Image, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ForecastDay } from '../models/weather.model';
import { formatWeekday } from '../../common/utils/formatters/date-utils';

type Props = {
  forecastDay: ForecastDay;
  cityName?: string;
  countryName?: string;
};

export default function ForecastCard({
  forecastDay,
  cityName,
  countryName,
}: Props) {
  function handlePress() {
    const dataToPass = {
      day: forecastDay,
      city: cityName,
      country: countryName,
    };

    router.push({
      pathname: '/details/[date]',
      params: {
        date: forecastDay.date,
        forecastData: JSON.stringify(dataToPass),
      },
    });
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 70,
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
              fontWeight: '400',
            }}
          >
            {formatWeekday(forecastDay.date)}
          </Text>
        </View>

        <View
          style={{
            width: 60,
            alignItems: 'center',
          }}
        >
          <Image
            source={{
              uri: `https:${forecastDay.iconUrl}`,
            }}
            style={{
              width: 42,
              height: 42,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Ionicons name="water-outline" size={24} color="#38BDF8" />
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
              fontWeight: '400',
            }}
          >
            {forecastDay.averageHumidity}%
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 6,
          }}
        >
          <Ionicons name="thermometer-outline" size={24} color="#38BDF8" />
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
              fontWeight: '400',
            }}
          >
            {Math.round(forecastDay.averageTemperature)}°
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}