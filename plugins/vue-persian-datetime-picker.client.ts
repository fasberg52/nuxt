import { defineNuxtPlugin } from '#app';
import PersianDatepicker from 'vue3-persian-datetime-picker';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('PersianDatepicker', PersianDatepicker);
});
