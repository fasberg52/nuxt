<template>
  <div class="p-4" dir="rtl">
    <h1 class="text-2xl font-bold mb-4">Job Requests</h1>

    <DataTable
      v-if="jobRequests.length > 0"
      :columns="columns"
      :data="jobRequests"
    />

    <div
      v-if="jobRequests.length === 0 && !isLoading"
      class="text-gray-500 mt-4"
    >
      No data available
    </div>

    <div v-if="isLoading" class="text-blue-500">Loading...</div>

    <div v-if="error" class="text-red-500">
      Error fetching data: {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "#app";
import DataTable from "~/components/job-request/DataTable.vue";
import { formatSalartyPersian } from "~/global/scripts/format-number";
import { getTranslatedStatus } from "~/global/scripts/status-helper";
import type { Column } from "~/components/job-request/columns";
import type { Job } from "~/interfaces/jobOpportunity.interface";

const jobRequests = ref<Job[]>([]);
const isLoading = ref(true);
const error = ref<Error | null>(null);

const columns: Column[] = [
  { label: "#", key: "id" },
  { label: "عنوان", key: "title" },
  {
    label: "وضعیت",
    key: "status",
    render: (row) => getTranslatedStatus(row.status),
  },
  { label: "تایپ کار", key: "workType" },
  { label: "نوع کار", key: "workModel" },
  {
    label: "میانگین حقوق",
    key: "salary",
    render: (row) => formatSalartyPersian(row.salary),
  },
  { label: "دسته بندی", key: "category.name" },
  {
    label: "عملیات",
    key: "actions",
    isDropdown: true,
    dropdownOptions: [
      {
        label: "View",
        action: (row) => viewJob(row.id),
      },
      {
        label: "Edit",
        action: (row) => editJob(row.id),
      },
    ],
  },
];

const { data: result, error: fetchError } = await useFetch(
  "http://localhost:3001/api/job-opportunity",
  { server: true, credentials: "include" }
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
    error.value = new Error("Unexpected response structure");
    isLoading.value = false;
  }
} else if (fetchError.value) {
  error.value = fetchError.value;
  isLoading.value = false;
}
const viewJob = (jobId: number) => {
  alert(`Viewing job with ID: ${jobId}`);
};

const editJob = (jobId: number) => {
  alert(`Editing job with ID: ${jobId}`);
};
</script>
