export class NetworkException extends Error {
  readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'NetworkException';
    this.statusCode = statusCode;
  }
}