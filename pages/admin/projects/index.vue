<template>
  <div>پروژه ها</div>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline"> Open </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Name </Label>
          <Input id="name" default-value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Username </Label>
          <Input id="username" default-value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit"> Save changes </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger as-child>
      <Button class="bg-custom-button text-white hover:bg-sky-800"> <Plus /> ایجاد پروژه</Button>
    </SheetTrigger>

    <SheetContent
      class="md:w-[1300px] max-w-lg sm:w-[1300px] max-w-lg custom-width-sheet bg-custom-background"
    >
      <SheetHeader>
        <SheetTitle class="text-right text-black">افزودن پروژه جدید</SheetTitle>
        <SheetDescription class="text-right mt-2"> پروژه جدید خود را ایجاد کنید </SheetDescription>
      </SheetHeader>
      <div>
        <ScrollArea class="h-[90vh] p-4" dir="rtl"> <AddProjectForm /> </ScrollArea>
      </div>
    </SheetContent>
  </Sheet>

  <section>
    <div class="container py-10 mx-auto">
      <div v-if="loading" class="text-center">
        <LoadingIndicator />
        <p>Loading...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>

      <div v-else>
        <DataTable :columns="columns" :data="data" />
      </div>
    </div>
  </section>
</template>
<style>
.custom-width-sheet {
  max-width: 48rem !important;
}
</style>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

import { onMounted, ref } from 'vue';
import { columns } from '@/components/admin-projects/columns';
import type { IProject } from '~/interfaces/project.interface';
import DataTable from '@/components/admin-projects/DataTable.vue';
import { fetchData } from '@/lib/custom-fetch';
import moment from 'moment-jalaali';
import AddProjectForm from '@/components/admin-projects/AddProjectForm.vue';

const data = ref<IProject[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function getData(): Promise<IProject[]> {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetchData<IProject>('project', {
      page: 1,
      limit: 10,
      sortField: 'createdAt',
      sortOrder: 'desc',
    });
    return response.data;
  } catch (err) {
    console.error('Fetch error:', err);
    error.value = 'Failed to fetch data';
    return [];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const rawData = await getData();
  data.value = rawData.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('jYYYY/jMM/jDD'),
  }));
});

definePageMeta({
  layout: 'admin',
});
</script>

<style>
.bg-custom-button {
  background-color: var(--button-background);
}
.bg-custom-background {
  background-color: #fff;
}
</style>
