import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useCitySearch } from '../hooks/useCitySearch';
import { City } from '../models/city.model';

type Props = {
  onSelect: (city: City) => void;
};

export default function CitySearch({ onSelect }: Props) {
  const { query, setQuery, cities, loading, error } = useCitySearch(); 
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleSelect = (city: City) => {
    setQuery('');
    setFocused(false);

    Keyboard.dismiss();

    onSelect(city);
  };

  const limitedCities = cities.slice(0, 4);
  const showDropdown = focused && query.trim().length >= 2 && (limitedCities.length > 0 || loading);

  return (
    <View style={{ marginBottom: 24 }}>
      <TextInput
        ref={inputRef}
        value={query}
        onChangeText={setQuery}
        placeholder="Pesquisar cidade..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setTimeout(() => setFocused(false), 300);
        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          color: '#FFF',
          fontSize: 16,
        }}
      />

      {error && (
        <View
          style={{
            backgroundColor: 'rgba(255,107,107,0.2)',
            borderRadius: 8,
            padding: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: '#FF6B6B',
          }}
        >
          <Text style={{ color: '#FF6B6B', fontSize: 14, textAlign: 'center' }}>
            {error}
          </Text>
        </View>
      )}

      {showDropdown && !error && (
        <View
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(15,23,42,0.98)',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            elevation: 10,
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          {loading && (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
              <ActivityIndicator size="small" color="#FFF" />
              <Text style={{ color: '#FFF', marginLeft: 12 }}>Buscando cidades...</Text>
            </View>
          )}

          {!loading && limitedCities.length === 0 && (
            <Text style={{ color: 'rgba(255,255,255,0.6)', padding: 16, textAlign: 'center' }}>
              Nenhuma cidade encontrada
            </Text>
          )}

          {!loading &&
            limitedCities.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                activeOpacity={0.7}
                onPress={() => handleSelect(item)}
                style={{
                  padding: 14,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }}>
                  {item.name}
                </Text>
                {item.subtitle && (
                  <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>
                    {item.subtitle}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}