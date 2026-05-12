import { ApiException }
  from './api.exception';

export class UnauthorizedException
  extends ApiException {

  constructor() {
    super(
      'Não autorizado',
      401,
    );

    this.name =
      'UnauthorizedException';
  }
}