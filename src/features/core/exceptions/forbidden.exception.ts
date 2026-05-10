import { ApiException }
  from './api.exception';

export class ForbiddenException
  extends ApiException {

  constructor() {
    super(
      'Acesso negado',
      403,
    );

    this.name =
      'ForbiddenException';
  }
}