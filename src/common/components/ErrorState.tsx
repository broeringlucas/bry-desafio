import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorStateProps {
  message: string;
  buttonText?: string;
  onPress?: () => void;
}

export default function ErrorState({ message, buttonText = "Tentar novamente", onPress }: ErrorStateProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A', padding: 20 }}>
      <Text style={{ color: '#FF6B6B', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
        {message}
      </Text>
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={{ backgroundColor: '#FF6B6B', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}
        >
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}