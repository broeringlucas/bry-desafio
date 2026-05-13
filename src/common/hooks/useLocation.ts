import { useState, useEffect, useRef } from 'react';
import { getCurrentLocation } from '../services/location.service';
import { LocationData } from '../models/location.model';

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