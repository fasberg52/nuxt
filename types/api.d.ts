export interface PaginationResponse<T> {
    page: number;
    limit: number;
    total: number;
    success: boolean;
    data: T[];
  }