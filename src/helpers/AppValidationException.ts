export class AppValidationException extends Error {
  constructor(message: string) {
      super(message);
      this.name = "AppValidationException";
  }
}