import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingIndicator({ message }: { message: string }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' }}>
      <ActivityIndicator size="large" color="#FFF" />
      <Text style={{ color: '#FFF', marginTop: 12 }}>{message}</Text>
    </View>
  );
}