<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-gray-900 text-gray-100 flex flex-col">
      <div class="flex items-center px-4 py-3 border-b border-gray-700">
        <NuxtImg format="webp" width="120" src="/images/logo.png" />
      </div>

      <nav class="flex-1 px-4 py-4 space-y-2">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2 w-full text-gray-300 hover:bg-gray-800 rounded-md"
          :class="{ 'bg-gray-800 text-white': isActive(item.path) }"
        >
          <EnvelopeOpenIcon class="w-4 h-4 mr-2" />
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 bg-gray-100 p-4 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const menuItems = [
  { name: 'داشبورد', path: '/admin' },
  { name: 'مدیریت کاربران', path: '/admin/users' },
  { name: 'پروژه ها', path: '/admin/projects' },
  { name: 'نوشته ها', path: '/admin/blogs' },
];

const route = useRoute();

const isActive = (path) => route.path === path;
</script>

<style scoped></style>
