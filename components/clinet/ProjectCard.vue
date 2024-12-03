<template>
  <Card
    class="flex flex-col items-between justify-between border rounded-lg p-4 transition-shadow duration-300 hover:shadow-lg"
  >
    <CardHeader class="p-0 mb-4">
      <NuxtImg
        format="webp"
        :src="thumbnail"
        class="w-full h-40 object-cover rounded-md"
        alt="Sample work image"
      />
    </CardHeader>
    <CardTitle class="text-lg font-bold mb-2">{{ title }}</CardTitle>
    <CardContent>
      <p class="text-gray-600 mb-4">{{ description }}</p>
    </CardContent>
    <CardFooter class="p-0">
      <Button class="bg-orange-500 text-white px-4 py-2 rounded-md">
        مشاهده کارها
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { IProject } from '~/interfaces/project.interface';

defineProps<IProject>();
</script>
