<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      class="w-full max-w-[580px] space-y-6 bg-white p-6 shadow-lg rounded-lg"
      @submit.prevent="signIn"
    >
      <FormField name="username" :validate-on-blur="!isFieldDirty" v-slot="{ componentField }">
        <FormItem v-auto-animate>
          <FormLabel>نام کاربری</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="ایمیل، موبایل و..."
              v-bind="componentField"
              v-model="username"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="password" :validate-on-blur="!isFieldDirty" v-slot="{ componentField }">
        <FormItem v-auto-animate>
          <FormLabel>رمز عبور</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="••••••••"
              v-bind="componentField"
              v-model="password"
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
import { useAccountStore } from '~/stores/account.store';
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
import { ToastAction, useToast } from '@/components/ui/toast';

import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import * as z from 'zod';
import { Login } from '~/services/login.service';
import { toast } from '@/components/ui/toast';
import type { UserRoleEnum } from '~/enums/auth.enum';
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

const accountStore = useAccountStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const loading = ref(false);

const signIn = async () => {
  loading.value = true;

  try {
    const result = await Login(username.value, password.value);
    loading.value = false;

    if (result.isSuccess && result.data) {
      const { token, roles } = result.data;

      const rolesArray: UserRoleEnum[] = Array.isArray(roles) ? roles : [];
      if (rolesArray.includes(0)) {
        accountStore.setAuthToken(token);

        toast({
          title: 'ورود موفق',
          description: 'شما با موفقیت وارد شدید!',
          duration: 3000,
          variant: 'default',
        });

        setTimeout(() => {
          router.push('/admin');
        }, 200);
      } else {
        toast({
          title: 'خطا',
          description: 'شما ادمین نیستید.',
          duration: 3000,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'خطا',
        description: 'ورود ناموفق. لطفا مجددا تلاش کنید.',
        duration: 3000,
        variant: 'destructive',
      });
    }
  } catch (err) {
    loading.value = false;

    toast({
      title: 'خطا',
      description: 'خطایی رخ داده است. لطفا دوباره تلاش کنید.',
      duration: 3000,
      variant: 'destructive',
    });

    console.error('Error during sign-in:', err);
  }
};
</script>
