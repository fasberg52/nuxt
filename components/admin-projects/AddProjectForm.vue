<template>
  <div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <FormField name="title">
        <FormItem v-auto-animate>
          <Label for="title">عنوان پروژه</Label>
          <FormControl>
            <Input
              v-model="form.title"
              type="text"
              id="title"
              placeholder="عنوان پروژه"
              required
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="description" v-auto-animate>
        <FormItem>
          <Label for="description">توضیحات</Label>
          <FormControl>
            <Textarea
              v-model="form.description"
              id="description"
              placeholder="توضیحات پروژه"
              required
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="thumbnail" v-auto-animate>
        <FormItem>
          <Label for="thumbnail">تصویر شاخص</Label>
          <FormControl>
            <Input
              v-model="form.thumbnail"
              type="url"
              id="thumbnail"
              placeholder="لینک تصویر شاخص"
              required
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="tags" v-auto-animate>
        <FormItem>
          <Label for="tags">برچسب‌ها</Label>
          <FormControl>
            <Input
              v-model="tagsString"
              type="text"
              id="tags"
              placeholder="برچسب‌ها را با کاما جدا کنید"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="categories">
        <FormItem>
          <Label for="categories">دسته‌بندی‌ها</Label>
          <FormControl>
            <Input
              v-model="categoriesString"
              type="text"
              id="categories"
              placeholder="دسته‌بندی‌ها را با کاما جدا کنید"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField name="startDate">
        <FormItem>
          <Label for="startDate">تاریخ شروع</Label>
          <FormControl>
            <PersianDatepicker
              v-model="form.startDate"
              placeholder="تاریخ شروع را انتخاب کنید"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="endDate">
        <FormItem>
          <Label for="endDate">تاریخ پایان</Label>
          <FormControl>
            <PersianDatepicker
              v-model="form.endDate"
              format="jYYYY/jMM/jDD HH:mm"
              placeholder="تاریخ پایان را انتخاب کنید"
              input-class="input"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="status" v-auto-animate>
        <FormItem>
          <Label for="status">وضعیت</Label>
          <FormControl>
            <Select v-model="form.status" id="status" required>
              <SelectOption value="active">فعال</SelectOption>
              <SelectOption value="inactive">غیرفعال</SelectOption>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="isActive" v-auto-animate>
        <FormItem>
          <Label for="isActive">آیا فعال است؟</Label>
          <FormControl>
            <Checkbox v-model="form.isActive" id="isActive" />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex justify-end space-x-2">
        <Button
          type="submit"
          class="bg-custom-button text-white hover:bg-sky-800"
        >
          ثبت پروژه

          <Plus class="w-[18px] pr-1" />
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';
import { fetchData } from '~/lib/custom-fetch';

import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel as Label,
  FormMessage,
} from '@/components/ui/form';

interface ProjectForm {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  categories: string[];
  startDate: string;
  endDate: string;
  status: string;
  isActive: boolean;
}
defineExpose();

const form = ref<ProjectForm>({
  title: '',
  description: '',
  thumbnail: '',
  tags: [],
  categories: [],
  startDate: '',
  endDate: '',
  status: 'active',
  isActive: true,
});

const categoriesString = computed({
  get: () => form.value.categories.join(', '),
  set: (value: string) => {
    form.value.categories = value.split(',').map((tag) => tag.trim());
  },
});

const tagsString = computed({
  get: () => form.value.tags.join(', '),
  set: (value: string) => {
    form.value.tags = value.split(',').map((tag) => tag.trim());
  },
});

async function onSubmit() {
  try {
    const response = await fetchData('project', {
      method: 'POST',
      body: JSON.stringify(form.value),
    });
    if (response.success) {
      // Handle success, e.g., reset form, show success message
      console.log('Project added successfully');
    } else {
      console.error('Failed to add project:', response);
    }
  } catch (err) {
    console.error('Error adding project:', err);
  }
}
</script>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
