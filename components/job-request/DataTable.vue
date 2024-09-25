<!-- components/ui/DataTable.vue -->
<template>
  <div class="flex justify-center">
    <div class="overflow-x-auto size-10/12 border rounded-lg">
      <table
        class="min-w-full divide-y divide-gray-200 bg-white rounded-lg border-gray-300"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-iranyekan font-bold text-center"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-200 font-iranyekan font-200 text-gray-500 text-md text-center"
        >
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <!-- Handle if the column has a custom render function -->
              <template v-if="column.render && !column.isDropdown">
                {{ column.render(row) }}
              </template>

              <!-- Handle dropdown column -->
              <template v-if="column.isDropdown && column.dropdownOptions">
                <DataTableDropdown :options="getDropdownOptions(row, column)" />
              </template>

              <!-- Default rendering if no custom render or dropdown -->
              <template v-else-if="!column.render && !column.isDropdown">
                {{ row[column.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import DataTableDropdown from "./DataTableDropdown.vue";
import type { Column } from "./columns";

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

const getDropdownOptions = (row: any, column: Column) => {
  if (column.dropdownOptions) {
    return column.dropdownOptions.map((option) => ({
      label: option.label,
      action: () => option.action(row),
    }));
  }
  return [];
};
</script>

<style scoped>
/* Add table-specific styling here */
</style>
