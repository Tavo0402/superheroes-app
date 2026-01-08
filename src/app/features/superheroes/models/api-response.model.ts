export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  errors?: string[];
  data: T;
}
