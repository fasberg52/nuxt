import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useScreenSize() {
  const isMobileOrTablet = ref(false);

  function checkScreenSize() {
    isMobileOrTablet.value = window.innerWidth <= 1024;
  }

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return { isMobileOrTablet, checkScreenSize };
}
