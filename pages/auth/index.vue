<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      class="w-full max-w-[580px] space-y-6 bg-white p-6 shadow-lg rounded-lg"
      @submit="onSubmit"
    >
      <FormField
        name="username"
        :validate-on-blur="!isFieldDirty"
        v-slot="{ componentField }"
      >
        <FormItem v-auto-animate>
          <FormLabel>نام کاربری</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="ایمیل، موبایل و..."
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        name="password"
        :validate-on-blur="!isFieldDirty"
        v-slot="{ componentField }"
      >
        <FormItem v-auto-animate>
          <FormLabel>رمز عبور</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="••••••••"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="text-left">
        <Button type="submit">ورود</Button>
      </div>
    </form>

    <Toaster />
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth.store';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';

import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from '@/components/ui/toast';

import * as z from 'zod';

definePageMeta({
  layout: 'auth',
});

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, 'نام کاربری حداقل 3 کاراکتر است')
      .max(50, 'Username cannot exceed 50 characters'),
    password: z.string().min(6, 'رمز عبور حداقل 6 کاراکتر است'),
  }),
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.username, values.password);
    console.log('Logged in!');
    toast({
      title: 'Success',
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
        h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
      ),
      duration: 3000,
      variant: 'default',
    });

    console.log('Logged in! Toast should be displayed');
  } catch (err) {
    const errorMessage =
      (err as any).response?.data?.message ||
      'Invalid credentials. Please try again.';

    toast({
      title: 'Error',
      description: errorMessage,
    });
  }
});
</script>
