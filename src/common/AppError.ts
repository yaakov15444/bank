
export class AppError extends Error {
  public readonly status: number;
  public readonly error: any;

  constructor(message: string, status = 500, error: any = {}) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.error = error;
  }
}
