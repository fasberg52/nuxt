<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

console.log(colorMode.preference);
</script>

<template>
  <Button variant="outline" @click="toggleColorMode">
    <Icon
      icon="radix-icons:moon"
      v-if="
        colorMode.preference === 'light' || colorMode.preference === 'system'
      "
      class="h-[1.2rem] w-[1.2rem] transition-all"
    />
    <Icon
      icon="radix-icons:sun"
      v-if="colorMode.preference === 'dark'"
      class="h-[1.2rem] w-[1.2rem] transition-all"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<style scoped>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
