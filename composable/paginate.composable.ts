// composable/pagination.composable.ts

import { ref } from 'vue';

export function usePagination<T>(fetchFunction: (params: any) => Promise<any>) {
  const items = ref<T[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const totalItems = ref(0);
  const limit = ref(10);
  const sortField = ref('createdAt');
  const sortOrder = ref('desc');

  const fetchItems = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchFunction({
        page: currentPage.value,
        limit: limit.value,
        sortField: sortField.value,
        sortOrder: sortOrder.value,
      });

      items.value = response.data;
      currentPage.value = response.page;
      totalPages.value = Math.ceil(response.total / response.limit);
      totalItems.value = response.total;
    } catch (err) {
      console.error('Error fetching items:', err);
      error.value = 'Failed to fetch items. Please try again later.';
    } finally {
      loading.value = false;
    }
  };

  const changePage = (page: number) => {
    currentPage.value = page;
    fetchItems();
  };

  return {
    items,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    limit,
    sortField,
    sortOrder,
    fetchItems,
    changePage,
  };
}
