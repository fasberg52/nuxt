<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" :disabled="loading">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = () => {
  authStore.login(username.value, password.value);
};

export default {
  layout: 'auth',
};
</script>
