//composable/project.composable.ts

import { ref } from 'vue';
import type { IProject } from '~/interfaces/project.interface';
import { fetchData } from '~/lib/custom-fetch';
import type { PaginationResponse } from '~/types/api';

export function useProjects() {
  const projects = ref<IProject[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(0);
  const totalItems = ref(0);

  const fetchProjects = async (
    page = 1,
    limit = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response: PaginationResponse<IProject> = await fetchData<IProject>(
        'api/project',
        {
          page,
          limit,
          sortField,
          sortOrder,
        },
      );

      projects.value = response.data;
      currentPage.value = response.page;
      totalPages.value = Math.ceil(response.total / response.limit);
      totalItems.value = response.total;
    } catch (err) {
      console.error('Error fetching projects:', err);
      error.value = 'Failed to fetch projects. Please try again later.';
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    fetchProjects,
  };
}
