// stores/auth.store.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch('http://localhost:3014/api/auth/login', {
        method: 'POST',
        body: { username, password },
      });
      const { token: responseToken, user: responseUser } = response as { token: string; user: any };
      token.value = responseToken;
      user.value = responseUser;
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      error.value = 'Failed to login. Please check your credentials.';
    } finally {
      loading.value = false;
    }
  };

  const signup = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch('http://localhost:3014/api/auth/signup', {
        method: 'POST',
        body: { username, password },
      });
      const { token: responseToken, user: responseUser } = response as { token: string; user: any };
      token.value = responseToken;
      user.value = responseUser;
      router.push('/');
    } catch (err) {
      console.error('Signup error:', err);
      error.value = 'Failed to signup. Please try again later.';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    router.push('/login');
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
  };
});
