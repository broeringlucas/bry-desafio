import * as Location from 'expo-location';
import { LocationData } from '../models/location.model';

export async function getCurrentLocation(): Promise<LocationData | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const lastKnown = await Location.getLastKnownPositionAsync({ maxAge: 60_000 });
    if (lastKnown) return reverseGeocode(lastKnown.coords.latitude, lastKnown.coords.longitude);

    const position = await Promise.race([
      Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }),
      new Promise<never>((_, reject) => setTimeout(() => reject('timeout'), 8000)),
    ]);

    return reverseGeocode(position.coords.latitude, position.coords.longitude);
  } catch {
    return null;
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<LocationData> {
  try {
    const [address] = await Promise.race([
      Location.reverseGeocodeAsync({ latitude: lat, longitude: lon }),
      new Promise<never>((_, reject) => setTimeout(() => reject('timeout'), 5000)),
    ]);
    return {
      city: address?.city || address?.subregion || address?.region || null!,
      region: address?.region || '',
      country: address?.country || '',
      latitude: lat,
      longitude: lon,
    };
  } catch {
    return null!;
  }
}