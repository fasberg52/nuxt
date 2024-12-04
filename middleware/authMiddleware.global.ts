// middleware/authMiddleware.global.ts

import type { UserRoleEnum } from '~/enums/auth.enum';
import { useAccountStore } from '~/stores/account.store';

export default defineNuxtRouteMiddleware((to, from) => {
  const accountStore = useAccountStore();

  const roles = accountStore.getRoles;
  const rolesArray: UserRoleEnum[] = Array.isArray(roles) ? roles : [];

  if (to.path.startsWith('/admin') && !rolesArray.includes(0)) {
    return navigateTo('/');
  }
});
