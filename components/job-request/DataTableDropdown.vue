<!-- components/ui/DataTableDropdown.vue -->
<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
    >
      Options
    </button>
    <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="handleOptionClick(option)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

interface Option {
  label: string;
  action: () => void;
}

const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
});

const isOpen = ref(false);

const handleOptionClick = (option: Option) => {
  isOpen.value = false;
  option.action();
};
</script>

<style scoped>
/* Add dropdown-specific styling here if necessary */
</style>
