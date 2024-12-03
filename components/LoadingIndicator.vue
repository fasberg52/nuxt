<template>
  <div class="loading-container">
    <NuxtImg
      format="webp"
      src="/images/Logo.png"
      alt="Loading..."
      class="loading-logo"
    />
    <div class="progress-indicator">
      <div class="progress-bullet"></div>
      <div class="progress-bullet"></div>
      <div class="progress-bullet"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add any setup logic here if needed
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
}

.loading-logo {
  width: 150px;
  margin-bottom: 20px;
}

.progress-indicator {
  display: flex;
  justify-content: center;
}

.progress-bullet {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #000000;
  animation: loading 1s infinite;
}

.progress-bullet:nth-child(1) {
  animation-delay: 0s;
}

.progress-bullet:nth-child(2) {
  animation-delay: 0.2s;
}

.progress-bullet:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
