export abstract class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): {
    statusCode: number;
    message: string;
    details?: any;
  };
}
