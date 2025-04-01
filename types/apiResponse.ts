
export interface ApiResponse<T> {
  result?: T;
  statusCode?: number;
  error?: string;
  message?: string;
}

