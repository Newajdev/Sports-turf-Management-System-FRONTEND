export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: paginationMeta;
}

export interface paginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: boolean;
  message: string;
}