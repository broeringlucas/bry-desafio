import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../../../app/index';
import { mockForecastData } from '../../utils/mocks/weather.mock';

// Mock do AsyncStorage ANTES de importar
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock do NetInfo usando virtual
jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn().mockReturnValue({ 
    isConnected: false, 
    isInternetReachable: false 
  })
}), { virtual: true });

// Mock dos hooks
jest.mock('../../../../src/home/hooks/useForecast', () => ({
  useForecast: jest.fn()
}));

jest.mock('../../../../src/common/hooks/useLocation', () => ({
  useLocation: jest.fn()
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForecast } from '../../../../src/home/hooks/useForecast';
import { useLocation } from '../../../../src/common/hooks/useLocation';
import { useNetInfo } from '@react-native-community/netinfo';

const mockUseForecast = useForecast as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;
const mockUseNetInfo = useNetInfo as jest.Mock;

describe('Comportamento Offline', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cache', () => {
    it('deve exibir dados do cache quando offline', async () => {
      mockUseNetInfo.mockReturnValue({ isConnected: false, isInternetReachable: false });
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockForecastData));
      
      mockUseLocation.mockReturnValue({ location: { city: 'São Paulo' }, loading: false });
      mockUseForecast.mockReturnValue({
        data: { ...mockForecastData, isOffline: true },
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        dataUpdatedAt: Date.now(),
      });

      const { getByText, getAllByText } = render(<HomeScreen />);

      await waitFor(() => {
        expect(getByText('São Paulo')).toBeTruthy();
        expect(getAllByText(/22/).length).toBeGreaterThan(0);
      });
    });

    it('deve mostrar indicador de dados atualizados', async () => {
      mockUseNetInfo.mockReturnValue({ isConnected: true, isInternetReachable: true });
      
      mockUseLocation.mockReturnValue({ location: { city: 'São Paulo' }, loading: false });
      mockUseForecast.mockReturnValue({
        data: mockForecastData,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
        dataUpdatedAt: Date.now(),
      });

      const { getByText } = render(<HomeScreen />);

      await waitFor(() => {
        expect(getByText(/Atualizado/)).toBeTruthy();
      });
    });
  });

  describe('Erro', () => {
    it('deve mostrar mensagem de erro quando offline e sem cache', async () => {
      mockUseNetInfo.mockReturnValue({ isConnected: false, isInternetReachable: false });
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      mockUseLocation.mockReturnValue({ location: { city: 'São Paulo' }, loading: false });
      mockUseForecast.mockReturnValue({
        data: null,
        isLoading: false,
        error: 'Sem conexão',
        refetch: jest.fn(),
        dataUpdatedAt: 0,
      });

      const { getByText } = render(<HomeScreen />);

      await waitFor(() => {
        expect(getByText(/Sem conexão|erro/i)).toBeTruthy();
      });
    });
  });
});