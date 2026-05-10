import {
  Image,
  Text,
  View,
} from 'react-native';

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

type Props = {
  day: string;
  temperature: number;
  humidity: number;
  iconUrl: string;
};

export function ForecastCard({
  day,
  temperature,
  humidity,
  iconUrl,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor:
          'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor:
          'rgba(255,255,255,0.2)',
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
          {day}
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
            uri: `https:${iconUrl}`,
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
        <MaterialCommunityIcons
          name="water-percent"
          size={24}
          color="#93C5FD"
        />
        <Text
          style={{
            color: '#FFF',
            fontSize: 24,
            fontWeight: '400',
          }}
        >
          {humidity}%
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
        <MaterialCommunityIcons
          name="thermometer"
          size={24}
          color="#FCA5A5"
        />
        <Text
          style={{
            color: '#FFF',
            fontSize: 24,
            fontWeight: '400',
          }}
        >
          {Math.round(temperature)}°
        </Text>
      </View>
    </View>
  );
}