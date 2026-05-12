export class NetworkException
  extends Error {

  constructor() {
    super(
      'Sem conexão com internet',
    );

    this.name =
      'NetworkException';
  }
}