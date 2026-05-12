import { ApiException }
  from './api.exception';

export class BadRequestException
  extends ApiException {

  constructor(message?: string) {
    super(
      message ?? 'Requisição inválida',
      400,
    );

    this.name =
      'BadRequestException';
  }
}