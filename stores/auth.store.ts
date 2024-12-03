// stores/auth.store.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { baseUrl } from '~/constant/api';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const tokenCookieName = 'Authorization';

  const setTokenCookie = (token: string) => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); 
    document.cookie = `${tokenCookieName}=${token};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
  };

  const getTokenFromCookie = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + tokenCookieName + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        body: { username, password },
      });
      const { token: responseToken } = response as { token: string };
      token.value = responseToken;
      setTokenCookie(responseToken); 

      console.log('Login response:', response);
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      error.value = (err as any).response?.data?.message;
    } finally {
      loading.value = false;
    }
  };

  const signup = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        body: { username, password },
      });
      const { token: responseToken, user: responseUser } = response as {
        token: string;
        user: any;
      };
      token.value = responseToken;
      setTokenCookie(responseToken); // Save the token in a cookie
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
    document.cookie = `${tokenCookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; // Clear the cookie
    router.push('/login');
  };

  // Automatically get token from cookie on store initialization
  if (!token.value) {
    token.value = getTokenFromCookie();
  }

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
