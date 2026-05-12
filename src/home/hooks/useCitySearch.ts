import { useEffect, useState, useCallback, useRef } from 'react';
import { searchCities } from '../services/city.service';
import { City } from '../models/city.model';
import { getApiErrorMessage } from '../../common/utils/formatters/api-error-messages';

export function useCitySearch() {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchCities = useCallback(async (searchText: string) => {
    const trimmed = searchText.trim();
    
    if (trimmed.length < 2) {
      setCities([]);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchCities(trimmed);
      if (isMounted.current) {
        setCities(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(getApiErrorMessage(err as Error));
        setCities([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  const debouncedSearch = useCallback((text: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchCities(text);
    }, 400);
  }, [fetchCities]);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    query,
    setQuery,
    cities,
    loading,
    error,
  };
}