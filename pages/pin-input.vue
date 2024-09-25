<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
</script>

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
