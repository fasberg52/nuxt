<template>
    <div>
      <h1>Root Categories with User Role</h1>
      <ul>
        <li v-for="category in rootCategories" :key="category.id">
          {{ category.name }}
          <ul>
            <li v-for="child in category.childCategory" :key="child.id">
              {{ child.name }} (Roles: {{ child.roles ? child.roles.join(', ') : 'None' }})
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const rootCategories = ref([]);
  
  onMounted(async () => {
    try {
      // Fetch the categories from your API
      const response = await $fetch('http://localhost:3010/api/categories/trees');
  
      // Filter the results to get only the root categories with child categories that have the role "user"
      rootCategories.value = response.result.filter(category => {
        return category.parentId === null && category.childCategory.some(child => child.roles && child.roles.includes('user'));
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  