<template>
  <div dir="rtl">
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <transition name="page" mode="out-in">
        <NuxtPage />
      </transition>
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>

<script setup lasng="ts">
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>
