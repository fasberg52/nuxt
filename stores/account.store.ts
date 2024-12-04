import { defineStore } from 'pinia';
import { computed } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { UserRoleEnum } from '~/enums/auth.enum';

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
      const decoded = jwtDecode<{ role: number }>(token);
      return decoded.role;
    } catch {
      return null;
    }
  });

  const isAdmin = computed(() => getRoles.value.includes(UserRoleEnum.ADMIN));

  const getRoles = computed(() => {
    const token = getToken.value;
    if (!token) return [];
    try {
      const decodedToken = jwtDecode<{ roles: number[] | string }>(token);
      if (Array.isArray(decodedToken.roles)) {
        return decodedToken.roles as UserRoleEnum[];
      } else if (typeof decodedToken.roles === 'string') {
        return decodedToken.roles.split(',').map(Number) as UserRoleEnum[];
      }
      return [];
    } catch {
      return [];
    }
  });

  const setAuthToken = (token: string) => {
    const cookie = useCookie(tokenCookieName);
    cookie.value = token;
  };

  const logout = () => {
    const cookie = useCookie(tokenCookieName);
    cookie.value = '';
    window.localStorage.removeItem(tokenCookieName);
  };

  return { getToken, isLogin, isAdmin, setAuthToken, getRoles, logout };
});
