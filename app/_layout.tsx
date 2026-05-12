import { Stack }
  from 'expo-router';

import { useState }
  from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export default function Layout() {
  const [queryClient] =
    useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 2,

              staleTime:
                1000 * 60 * 10,
            },
          },
        }),
    );

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}