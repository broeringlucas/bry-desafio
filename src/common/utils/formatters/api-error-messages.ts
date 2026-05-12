import { NetworkException } from '../../exceptions/network.exception';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { ForbiddenException } from '../../exceptions/forbidden.exception';
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { ApiException } from '../../exceptions/api.exception';

export function getApiErrorMessage(error: Error): string {
  if (error instanceof NetworkException) {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }

  if (error instanceof UnauthorizedException) {
    return 'Erro de autenticação. Verifique sua chave de API.';
  }

  if (error instanceof ForbiddenException) {
    return 'Acesso negado. Você não tem permissão.';
  }

  if (error instanceof BadRequestException) {
    return error.message || 'Requisição inválida. Verifique os dados.';
  }

  if (error instanceof ApiException) {
    return error.message || 'Erro na API. Tente novamente.';
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}