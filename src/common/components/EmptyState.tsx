import { View, Text, TouchableOpacity } from 'react-native';

interface EmptyStateProps {
  message: string;
  buttonText?: string;
  onPress?: () => void;
}

export default function EmptyState({ message, buttonText = "Tentar novamente", onPress }: EmptyStateProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A', padding: 20 }}>
      <Text style={{ color: '#FFF', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
        {message}
      </Text>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={{ backgroundColor: '#38BDF8', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}