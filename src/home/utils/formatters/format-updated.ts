export function formatUpdated(timestamp: number) {
  if (!timestamp) return 'Atualizando...';

  const diffInMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffInMinutes < 1) return 'Atualizado agora';
  if (diffInMinutes < 60) return `Atualizado há ${diffInMinutes} min`;
  return `Atualizado às ${new Date(timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}