<template>
  <div class="relative">
    <input
      v-model="message"
      placeholder="What will you pick?"
      class="w-full px-6 py-4 text-2xl focus:ring focus:ring-routine-gray-3 focus:outline-none bg-routine-gray-1 placeholder-routine-gray-3 caret-routine-blue"
      type="text"
    />

    <div
      class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none"
    >
      <img :src="logoUrl" alt="Routine logo" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logoUrl from '~/assets/logo.svg'
const message = ref('')
</script>

<style scoped></style>
