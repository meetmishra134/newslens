export interface ErrorDetails {
  message: string;
  field?: string;
}
class ApiError extends Error {
  public readonly statusCode: number;
  public readonly data: null;
  public readonly success: boolean;
  public errors: ErrorDetails[];
  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: ErrorDetails[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
export default ApiError;
