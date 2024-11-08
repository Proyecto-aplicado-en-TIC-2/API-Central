export class DbOperationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DbOperationException';
  }
}
