<!-- pages/admin//projects/create-project.vue -->
<template>
  <div>
    <h1 class="text-black">افزودن پروژه جدید</h1>
    <AddProjectForm />
  </div>
</template>

<script setup lang="ts">
import AddProjectForm from '@/components/admin-projects/AddProjectForm.vue';

definePageMeta({
  layout: 'admin',
});
</script>
