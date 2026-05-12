import { formatDate, formatHour, formatSunTime, formatWeekday } from '../../../../common/utils/formatters/date-utils';

describe('Formatters', () => {
  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      const result = formatDate('2024-01-15');
      
      expect(result).toContain('janeiro');
      expect(result).toContain('2024');
    });

    it('deve formatar outra data corretamente', () => {
      const result = formatDate('2024-12-25');
      expect(result).toContain('dezembro');
      expect(result).toContain('2024');
    });

    it('deve lidar com data inválida', () => {
      const result = formatDate('invalid');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('formatHour', () => {
    it('deve extrair hora de string ISO', () => {
      expect(formatHour('2024-01-15 14:30:00')).toBe('14:30');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(formatHour('')).toBe('');
    });
  });

  describe('formatSunTime', () => {
    it('deve remover AM/PM', () => {
      expect(formatSunTime('06:30 AM')).toBe('06:30');
      expect(formatSunTime('18:45 PM')).toBe('18:45');
    });

    it('deve retornar N/A para input vazio', () => {
      expect(formatSunTime('')).toBe('N/A');
    });
  });

  describe('formatWeekday', () => {
    it('deve retornar "Hoje" para a data atual', () => {
      // Criar uma data fixa para teste
      const fixedDate = new Date('2024-01-15T12:00:00Z');
      jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as any);
      
      const result = formatWeekday('2024-01-15');
      expect(result).toBe('Hoje');
      
      jest.restoreAllMocks();
    });

    it('deve retornar o dia da semana', () => {
      jest.restoreAllMocks();
      
      const result = formatWeekday('2024-01-16');
      // Aceitar tanto "Ter" quanto "Terça"
      expect(['Ter', 'Terça']).toContain(result);
    });
  });
});