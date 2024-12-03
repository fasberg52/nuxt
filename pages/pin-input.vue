<script setup lang="ts"></script>

<template>
  <PinInput
    id="pin-input"
    placeholder="○"
    class="flex gap-2 items-center mt-1"
    otp
    type="number"
  >
    <PinInputInput v-for="(id, index) in 5" :key="id" :index="index" />
  </PinInput>
</template>
