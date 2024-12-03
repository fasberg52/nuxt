// middleware/authMiddleware.global.ts

import { useAccountStore } from '~/stores/account.store';

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();
  const token = accountStore.getToken;

  if (!token) {
    if (to.path !== '/auth') {
      return navigateTo('/auth');
    }
  }

  const roles = accountStore.getRoles;
  let rolesArray: number[] = [];

  if (roles) {
    if (Array.isArray(roles)) {
      rolesArray = roles;
    } else if (typeof roles === 'number') {
      rolesArray = [roles];
    } else {
      rolesArray = [];
    }
  }

  if (to.path.startsWith('/admin') && !rolesArray.includes(0)) {
    if (to.path !== '/') {
      return navigateTo('/');
    }
  }
});
