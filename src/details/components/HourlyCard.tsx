import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HourlyCardProps {
  time: string;
  temperature: number;
}

export default function HourlyCard({ time, temperature }: HourlyCardProps) {
  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        padding: 12,
        marginRight: 12,
        alignItems: 'center',
        minWidth: 70,
      }}
    >
      <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '500' }}>{time}</Text>
      <Text style={{ color: '#38BDF8', fontSize: 20, fontWeight: '600', marginVertical: 8 }}>
        {Math.round(temperature)}°
      </Text>
      <MaterialCommunityIcons name="thermometer" size={16} color="rgba(255,255,255,0.5)" />
    </View>
  );
}