import { baseUrl } from "~/constant/api";
import type { PaginationResponse } from "~/types/api";

export async function fetchData<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<PaginationResponse<T>> {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/${endpoint}?${queryString}`;
    console.log('Fetching data from:', url);

    const response = await $fetch<PaginationResponse<T>>(url, {
      method: 'GET',
    });

    if (!response.success || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format');
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch data');
  }
}
