import { defineStore } from 'pinia';
import { computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useAccountStore = defineStore('account', () => {
  const tokenCookieName = 'auth-token';

  const getToken = computed(() => {
    return useCookie(tokenCookieName).value;
  });

  const isLogin = computed(() => {
    return !!getToken.value;
  });

  const getUserRole = computed(() => {
    if (!getToken.value) return null;
    const token = getToken.value;
    try {
      const decoded = jwtDecode<{ role: string }>(token);
      return decoded.role;
    } catch {
      return null;
    }
  });

  const isAdmin = computed(() => getUserRole.value === 'admin');

  const getRoles = computed(() => {
    const token = getToken.value;
    if (token) {
      try {
        const decodedToken = jwtDecode<{ roles: string }>(token);
        return decodedToken.roles.split(',').map(Number);
      } catch (e) {
        return [];
      }
    }
  });

  const setAuthToken = (token: string) => {
    const cookie = useCookie(tokenCookieName);
    cookie.value = token;
  };

  return { getToken, isLogin, isAdmin, setAuthToken, getRoles };
});
