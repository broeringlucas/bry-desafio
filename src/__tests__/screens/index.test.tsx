import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../../app/index';
import { mockForecastData } from '../utils/mocks/weather.mock';

// Mock dos hooks
jest.mock('../../../src/home/hooks/useForecast', () => ({
  useForecast: jest.fn()
}));

jest.mock('../../../src/common/hooks/useLocation', () => ({
  useLocation: jest.fn()
}));

import { useForecast } from '../../../src/home/hooks/useForecast';
import { useLocation } from '../../../src/common/hooks/useLocation';

const mockUseForecast = useForecast as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

describe('Exibição de Previsões', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir loading enquanto carrega', () => {
    mockUseLocation.mockReturnValue({ location: null, loading: false });
    mockUseForecast.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
      dataUpdatedAt: 0,
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Carregando clima')).toBeTruthy();
  });

  it('deve exibir dados da previsão corretamente', async () => {
    mockUseLocation.mockReturnValue({ location: { city: 'São Paulo' }, loading: false });
    mockUseForecast.mockReturnValue({
      data: mockForecastData,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
      dataUpdatedAt: Date.now(),
    });

    const { getByText, getAllByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('São Paulo')).toBeTruthy();
      expect(getAllByText(/22/).length).toBeGreaterThan(0);
      expect(getByText('Partly cloudy')).toBeTruthy();
    });
  });

  it('deve exibir lista de previsões dos próximos dias', async () => {
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
      expect(getByText('Seg')).toBeTruthy();
      expect(getByText('Ter')).toBeTruthy();
      expect(getByText('Próximos dias')).toBeTruthy();
    });
  });

  it('deve exibir mensagem de erro quando falha', () => {
    mockUseLocation.mockReturnValue({ location: null, loading: false });
    mockUseForecast.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Erro ao carregar dados',
      refetch: jest.fn(),
      dataUpdatedAt: 0,
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Erro ao carregar dados')).toBeTruthy();
  });

  it('deve mostrar botão de tentar novamente no erro', () => {
    const mockRefetch = jest.fn();
    mockUseLocation.mockReturnValue({ location: null, loading: false });
    mockUseForecast.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Erro',
      refetch: mockRefetch,
      dataUpdatedAt: 0,
    });

    const { getByText } = render(<HomeScreen />);
    const button = getByText('Tentar novamente');
    
    expect(button).toBeTruthy();
  });
});