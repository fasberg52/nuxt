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
            <EditorMenuBar :editor="editor" />
            <EditorContent :editor="editor" class="editor-content" />
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
              type="datetime"
              placeholder="تاریخ شروع را انتخاب کنید"
              simple
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
              type="datetime"
              placeholder="تاریخ پایان را انتخاب کنید"
              input-class="input"
              simple
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="status" v-auto-animate>
        <FormItem>
          <Label for="status" class="rtl:text-right">وضعیت</Label>
          <FormControl>
            <Select v-model="form.status" id="status" dir="rtl">
              <SelectTrigger
                class="w-[180px] rtl:flex-row-reverse rtl:text-right"
              >
                <SelectValue
                  placeholder="انتخاب وضعیت"
                  class="rtl:flex-row-reverse rtl:text-right"
                />
              </SelectTrigger>
              <SelectContent class="rtl:text-right rtl:origin-top-right">
                <SelectGroup>
                  <SelectLabel class="rtl:text-right">وضعیت</SelectLabel>
                  <SelectItem value="active" class="rtl:text-right"
                    >فعال</SelectItem
                  >
                  <SelectItem value="inactive" class="rtl:text-right"
                    >غیرفعال</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="isActive" v-auto-animate>
        <FormItem>
          <Label for="isActive" class="pl-2">آیا فعال است؟</Label>
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
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';

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

const editor = useEditor({
  extensions: [
    StarterKit,
    Link,
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableCell,
    TableHeader,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  content: form.value.description,
  onUpdate: ({ editor }) => {
    form.value.description = editor.getHTML();
  },
});

onMounted(() => {
  if (!!unref(editor)) {
    unref(editor).commands.setContent(
      "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    );
  }
});

onBeforeUnmount(() => {
  unref(editor).destroy();
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

.editor-content {
  min-height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
.editor-content:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.5);
}
</style>
