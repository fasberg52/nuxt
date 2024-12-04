import { useAccountStore } from './../stores/account.store';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAccountStore();

  const api = $fetch.create({
    baseURL: 'http://localhost:3014/api',
    onRequest({ options }) {
      const token = authStore.getToken;
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth'));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
