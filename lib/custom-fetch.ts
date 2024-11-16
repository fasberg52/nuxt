import { baseUrl } from "~/constant/api";
import type { PaginationResponse } from "~/types/api";

export async function fetchData<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<PaginationResponse<T>> {
  try {
    const queryString = new URLSearchParams(params).toString();

    const response = await $fetch<PaginationResponse<T>>(
      `${baseUrl}/${endpoint}?${queryString}`,
    );

    if (!response.success || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch data');
  }
}
