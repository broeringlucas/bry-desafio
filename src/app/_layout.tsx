import { Stack } from 'expo-router';

import { QueryProvider }
  from '../features/core/providers/query_provider';

export default function Layout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{
        headerShown: false,
      }}/>
    </QueryProvider>
  );
}