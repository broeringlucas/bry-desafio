import { View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface DetailCardProps {
  iconFamily: 'ionicons' | 'material';
  iconName: string;
  title: string;
  value: string;
  subtitle: string;
  isHalfSize?: boolean;
}

export default function DetailCard({ 
  iconFamily, 
  iconName, 
  title, 
  value, 
  subtitle,
  isHalfSize = false
}: DetailCardProps) {
  return (
    <View
      style={{
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        paddingVertical: isHalfSize ? 12 : 16,
        paddingHorizontal: isHalfSize ? 12 : 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginBottom: 8,
        }}
      >
        {iconFamily === 'ionicons' ? (
          <Ionicons name={iconName as any} size={isHalfSize ? 20 : 24} color="#38BDF8" />
        ) : (
          <MaterialCommunityIcons name={iconName as any} size={isHalfSize ? 20 : 24} color="#38BDF8" />
        )}
        <Text
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: isHalfSize ? 14 : 16,
          }}
        >
          {title}
        </Text>
      </View>
      
      <Text
        style={{
          color: '#FFF',
          fontSize: isHalfSize ? 20 : 28,
          fontWeight: '600',
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      
      <Text
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: isHalfSize ? 11 : 14,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}