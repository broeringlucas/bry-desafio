import { AxiosError } from 'axios';
import { ApiException } from '../exceptions/api.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { NetworkException } from '../exceptions/network.exception'; 

export function mapApiError(
  error: AxiosError,
): Error {
  if (!error.response) {
      return new NetworkException();
  }

  const status =
    error.response?.status;

  const message =
    (error.response?.data as any)?.error
      ?.message;


  switch (status) {
    case 400:
      return new BadRequestException(
        message,
      );

    case 401:
      return new UnauthorizedException();

    case 403:
      return new ForbiddenException();

    default:
      return new ApiException(
        message ??
          'Erro inesperado',
        status,
      );
  }
}