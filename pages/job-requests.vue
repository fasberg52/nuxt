<template>
  <div class="p-4" dir="rtl">
    <h1 class="text-2xl font-bold mb-4">Job Requests</h1>

    <div v-if="isLoading" class="text-blue-500">Loading...</div>

    <div v-if="error" class="text-red-500">
      Error fetching data: {{ error.message }}
    </div>

    <table
      v-if="jobRequests.length > 0"
      class="min-w-full bg-white border border-gray-200 text-center"
    >
      <thead class="font-iranyekan font-bold bg-gray-100">
        <tr>
          <th class="p-2 border-b">#</th>
          <th class="p-2 border-b">عنوان</th>
          <th class="p-2 border-b">وضعیت</th>
          <th class="p-2 border-b">تایپ کار</th>
          <th class="p-2 border-b">نوع کار</th>
          <th class="p-2 border-b">میانگین حقوق</th>
          <th class="p-2 border-b">دسته بندی</th>
        </tr>
      </thead>
      <tbody class="font-iranyekan font-200 text-gray-500 text-md">
        <tr class="mt-2" v-for="job in jobRequests" :key="job.id">
          <td class="p-3 border-b">{{ formatSalartyPersian(job.id) }}</td>
          <td class="p-3 border-b">{{ job.title }}</td>

          <td class="p-3 border-b" :class="getStatusClass(job.status)">
            {{ getTranslatedStatus(job.status) }}
          </td>

          <td class="p-3 border-b">{{ job.workType }}</td>

          <td class="p-3 border-b">{{ job.workModel }}</td>

          <td class="p-3 border-b">{{ formatSalartyPersian(job.salary) }}</td>

          <td class="p-3 border-b">
            {{ job.category.name }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="jobRequests.length === 0 && !isLoading"
      class="text-gray-500 mt-4"
    >
      No data available
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Job } from '../interfaces/jobOpportunity.interface';
import { JobOpportunityStatusEnum } from '../enums/jobOpportunity.enum';
import { formatSalartyPersian } from '../global/scripts/format-number';
import { useFetch } from 'nuxt/app';

const jobRequests = ref<Job[]>([]);
const isLoading = ref(true);
const error = ref<Error | null>(null);

const { data: result, error: fetchError } = await useFetch(
  'http://localhost:3001/api/job-opportunity',
  { server: true },
);
interface JobOpportunityResponse {
  success: boolean;
  result: Job[];
}

if (result.value) {
  const typedResult = result.value as JobOpportunityResponse;
  if (typedResult.success) {
    jobRequests.value = typedResult.result;
    isLoading.value = false;
  } else {
    error.value = new Error('Unexpected response structure');
    isLoading.value = false;
  }
} else if (fetchError.value) {
  error.value = fetchError.value;
  isLoading.value = false;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusClass = (status: string) => {
  if (status === JobOpportunityStatusEnum.NOTACTIVE) {
    return 'bg-red-100 text-red-700';
  }
  return 'bg-green-100 text-green-700 text-center rounded-xl mt-2';
};

function getTranslatedStatus(status: JobOpportunityStatusEnum): string {
  const translations = {
    [JobOpportunityStatusEnum.ACTIVE]: 'فعال',
    [JobOpportunityStatusEnum.NOTACTIVE]: 'غیر فعال',
  };
  return translations[status];
}

const viewJob = (jobId: number) => {
  alert(`View job with ID: ${jobId}`);
};
</script>

<style scoped></style>
