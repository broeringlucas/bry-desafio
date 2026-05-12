import { searchCities } from '../../../home/services/city.service';
import { api } from '../../../common/core/api/api';
import { mapApiError } from '../../../common/mappers/api-errors.mapper';
import { mapCitySearch } from '../../../home/mappers/city.mapper';

// Mocks
jest.mock('../../../common/core/api/api');
jest.mock('../../../common/mappers/api-errors.mapper');
jest.mock('../../../home/mappers/city.mapper');

const mockApiGet = api.get as jest.Mock;
const mockMapApiError = mapApiError as jest.Mock;
const mockMapCitySearch = mapCitySearch as jest.Mock;

describe('searchCities Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Validação de entrada', () => {
    it('deve retornar array vazio quando query é vazia', async () => {
      const result = await searchCities('');
      
      expect(result).toEqual([]);
      expect(mockApiGet).not.toHaveBeenCalled();
    });

    it('deve retornar array vazio quando query tem menos de 2 caracteres', async () => {
      const result = await searchCities('S');
      
      expect(result).toEqual([]);
      expect(mockApiGet).not.toHaveBeenCalled();
    });

    it('deve retornar array vazio quando query é apenas espaços', async () => {
      const result = await searchCities('   ');
      
      expect(result).toEqual([]);
      expect(mockApiGet).not.toHaveBeenCalled();
    });
  });

  describe('Requisição à API', () => {
    const mockApiResponse = {
      data: [
        { id: 1, name: 'São Paulo', region: 'SP', country: 'Brazil' },
        { id: 2, name: 'Santos', region: 'SP', country: 'Brazil' }
      ]
    };

    const mockMappedCities = [
      { id: 1, name: 'São Paulo', region: 'SP', country: 'Brazil', subtitle: 'SP, Brazil' },
      { id: 2, name: 'Santos', region: 'SP', country: 'Brazil', subtitle: 'SP, Brazil' }
    ];

    it('deve chamar a API com os parâmetros corretos', async () => {
      mockApiGet.mockResolvedValue(mockApiResponse);
      mockMapCitySearch.mockReturnValue(mockMappedCities);

      await searchCities('Sao');

      expect(mockApiGet).toHaveBeenCalledTimes(1);
      expect(mockApiGet).toHaveBeenCalledWith('/search.json', {
        params: { q: 'Sao' }
      });
    });

    it('deve mapear e retornar os dados corretamente', async () => {
      mockApiGet.mockResolvedValue(mockApiResponse);
      mockMapCitySearch.mockReturnValue(mockMappedCities);

      const result = await searchCities('Sao');

      expect(mockMapCitySearch).toHaveBeenCalledWith(mockApiResponse.data);
      expect(result).toEqual(mockMappedCities);
    });

    it('deve fazer requisição case-insensitive', async () => {
      mockApiGet.mockResolvedValue(mockApiResponse);
      mockMapCitySearch.mockReturnValue(mockMappedCities);

      await searchCities('SAO PAULO');
      
      expect(mockApiGet).toHaveBeenCalledWith('/search.json', {
        params: { q: 'SAO PAULO' }
      });
    });
  });

  describe('Tratamento de erros', () => {
    const mockAxiosError = {
      isAxiosError: true,
      response: { status: 404, data: { message: 'Not found' } }
    };

    const mockMappedError = new Error('Erro na API');

    it('deve lançar erro mapeado quando API falha', async () => {
      mockApiGet.mockRejectedValue(mockAxiosError);
      mockMapApiError.mockReturnValue(mockMappedError);

      await expect(searchCities('Sao')).rejects.toThrow('Erro na API');
      expect(mockMapApiError).toHaveBeenCalledWith(mockAxiosError);
    });

    it('deve lançar erro mapeado para erro de rede', async () => {
      const networkError = new Error('Network Error');
      mockApiGet.mockRejectedValue(networkError);
      mockMapApiError.mockReturnValue(new Error('Sem conexão'));

      await expect(searchCities('Sao')).rejects.toThrow('Sem conexão');
      expect(mockMapApiError).toHaveBeenCalledWith(networkError);
    });
  });

  describe('Dados da resposta', () => {
    it('deve lidar com resposta vazia da API', async () => {
      const emptyResponse = { data: [] };
      mockApiGet.mockResolvedValue(emptyResponse);
      mockMapCitySearch.mockReturnValue([]);

      const result = await searchCities('CidadeInexistente');
      
      expect(result).toEqual([]);
    });

    it('deve lidar com resposta contendo muitas cidades', async () => {
      const manyCities = {
        data: Array(20).fill(null).map((_, i) => ({
          id: i,
          name: `Cidade ${i}`,
          region: 'Região',
          country: 'Brasil'
        }))
      };
      
      mockApiGet.mockResolvedValue(manyCities);
      mockMapCitySearch.mockImplementation((data) => data);

      const result = await searchCities('Cidade');
      
      expect(result).toHaveLength(20);
    });
  });
});