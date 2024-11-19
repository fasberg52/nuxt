<template>
  <div>پروژه ها</div>

  <Button> <Plus /> ایجاد پروژه</Button>

  <section>
    <div class="container py-10 mx-auto">
      <DataTable :columns="columns" :data="data" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

import { onMounted, ref } from 'vue';
import { columns } from '@/components/admin-projects/columns';
import type { IProject } from '~/interfaces/project.interface';
import DataTable from '~/components/admin-projects/DataTable.vue';

const data = ref<IProject[]>([]);

async function getData(): Promise<IProject[]> {
  const data = [
    {
      id: '728ed52f',
      title: 'string',

      description: 'pending',
      thumbnail: 'string',
    },
    {
      id: 'asdqw13',
      title: 'string',
      description: 'pending',
      thumbnail: 'string',
    },
  ];
  console.log('data =?' + data);
  return data;
}
onMounted(async () => {
  data.value = await getData();
  console.log(data.value);
});

definePageMeta({
  layout: 'admin',
});
</script>
