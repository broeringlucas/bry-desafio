import {
  FlatList,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ForecastCard from '../src/home/components/ForecastCard';
import CitySearch from '../src/home/components/CitySearch'
import LoadingIndicator from '../src/common/components/LoadingIndicator';
import ErrorState  from '../src/common/components/ErrorState';
import EmptyState from '../src/common/components/EmptyState';
import { useForecast } from '../src/home/hooks/useForecast';
import { City } from '../src/home/models/city.model';
import { formatUpdated } from '../src/home/utils/formatters/format-updated';
import { useLocation } from '../src/common/hooks/useLocation';
import { DEFAULT_CITY } from '../src/common/core/constants/default-city';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { location, loading: locationLoading } = useLocation();
  const currentCity = selectedCity || location?.city || DEFAULT_CITY;

  const { data, isLoading, isRefetching, refetch, dataUpdatedAt, error } = useForecast(currentCity);

  useEffect(() => {
    const interval = setInterval(() => setRefreshKey(prev => prev + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  function handleSelectCity(city: City) {
    let query = city.name;
    if (city.region && city.region !== city.name) {
      query = `${city.name}, ${city.region}`;
    } else if (city.country && !city.region) {
      query = `${city.name}, ${city.country}`;
    }
    setSelectedCity(query);
  }

  if (locationLoading) {
    return <LoadingIndicator message="Obtendo localização" />;
  }
  
  if (isLoading && !data) {
    return <LoadingIndicator message="Carregando clima" />;
  }

  if (error && !data) {
    return (
      <ErrorState
        message={error}
        onPress={() => refetch()}
      />
    );
  }

  if (data && (!data.forecastDays || data.forecastDays.length === 0)) {
    return (
      <EmptyState 
        message="Nenhuma previsão encontrada"
        onPress={() => refetch()}
      />
    );
  }

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={{ flex: 1 }}>
      <FlatList
        key={`flatlist-${refreshKey}`}
        data={data?.forecastDays ?? []}
        keyExtractor={(item) => item.date}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#FFF" />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 80, paddingBottom: 40 }}
        ListHeaderComponent={
          <>
            <CitySearch onSelect={handleSelectCity} />
            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
              <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '300' }}>{data?.city}</Text>
              <Text style={{ color: '#FFF', fontSize: 96, fontWeight: '200', marginTop: 8 }}>
                {Math.round(data?.current.temperature ?? 0)}°
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 24 }}>{data?.current.condition}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>
                {formatUpdated(dataUpdatedAt)}
              </Text>
            </View>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
              Próximos dias
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <ForecastCard
            forecastDay={item}
            cityName={data?.city}
            countryName={data?.country}
          />
        )}
      />
    </LinearGradient>
  );
}