import { useState, useEffect, useRef } from 'react';
import { getCurrentLocation } from '../services/location.service';
import { LocationData } from '../models/location.model';

const FALLBACK: LocationData = {
  city: 'São Paulo',
  region: 'São Paulo',
  country: 'Brazil',
  latitude: -23.5505,
  longitude: -46.6333,
};

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getCurrentLocation()
      .then(setLocation)
      .finally(() => setLoading(false));
  }, []);

  return { location, loading };
}