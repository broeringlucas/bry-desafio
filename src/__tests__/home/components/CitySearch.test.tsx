import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CitySearch from '../../../home/components/CitySearch';
import { mockApiCityResponse } from '../../utils/mocks/city.mock';

// Mock hook useCitySearch
jest.mock('../../../home/hooks/useCitySearch', () => ({
  useCitySearch: jest.fn()
}));

import { useCitySearch } from '../../../home/hooks/useCitySearch';

const mockUseCitySearch = useCitySearch as jest.Mock;

describe('CitySearch', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar e exibir cidades ao digitar', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'Sao',
      setQuery: jest.fn(),
      cities: mockApiCityResponse,
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, getByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'Sao');

    await waitFor(() => {
      expect(getByText('São Paulo')).toBeTruthy();
      expect(getByText('Santos')).toBeTruthy();
    });
  });

  it('deve mostrar loading enquanto busca', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'Sao',
      setQuery: jest.fn(),
      cities: [],
      loading: true,
      error: null,
    });

    const { getByPlaceholderText, getByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'Sao');

    await waitFor(() => {
      expect(getByText('Buscando cidades...')).toBeTruthy();
    });
  });

  it('não deve mostrar dropdown quando não há cidades', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'XYZ',
      setQuery: jest.fn(),
      cities: [],
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, queryByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'XYZ');

    // O dropdown não deve aparecer pois não há cidades
    expect(queryByText('Buscando cidades...')).toBeNull();
    expect(queryByText('Nenhuma cidade encontrada')).toBeNull();
  });

  it('deve mostrar erro quando API falha', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'Sao',
      setQuery: jest.fn(),
      cities: [],
      loading: false,
      error: 'Erro de conexão',
    });

    const { getByPlaceholderText, getByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent.changeText(input, 'Sao');

    await waitFor(() => {
      expect(getByText('Erro de conexão')).toBeTruthy();
    });
  });

  it('deve selecionar cidade ao clicar', async () => {
    const mockSetQuery = jest.fn();
    
    mockUseCitySearch.mockReturnValue({
      query: 'Sao',
      setQuery: mockSetQuery,
      cities: mockApiCityResponse,
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, getByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'Sao');

    await waitFor(() => {
      expect(getByText('São Paulo')).toBeTruthy();
    });

    fireEvent.press(getByText('São Paulo'));

    expect(mockOnSelect).toHaveBeenCalledWith(mockApiCityResponse[0]);
    expect(mockSetQuery).toHaveBeenCalledWith('São Paulo');
  });

  it('não deve mostrar dropdown quando não está focado', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'Sao',
      setQuery: jest.fn(),
      cities: mockApiCityResponse,
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, queryByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent.changeText(input, 'Sao');
    
    // Sem focus, o dropdown não deve aparecer
    expect(queryByText('São Paulo')).toBeNull();
  });

  it('não deve mostrar dropdown com menos de 2 caracteres', async () => {
    mockUseCitySearch.mockReturnValue({
      query: 'S',
      setQuery: jest.fn(),
      cities: mockApiCityResponse,
      loading: false,
      error: null,
    });

    const { getByPlaceholderText, queryByText } = render(
      <CitySearch onSelect={mockOnSelect} />
    );

    const input = getByPlaceholderText('Pesquisar cidade...');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, 'S');

    expect(queryByText('São Paulo')).toBeNull();
  });
});