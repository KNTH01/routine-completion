<template>
  <div class="h-screen bg-routine-dark text-routine-black">
    <main class="container">
      <section class="max-w-3xl py-28">
        <div class="relative">
          <input
            placeholder="What will you pick?"
            class="w-full px-6 py-4 text-2xl focus:ring focus:ring-routine-gray-3 focus:outline-none bg-routine-gray-1 placeholder-routine-gray-3"
            type="text"
          />

          <div
            class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none"
          >
            <img :src="logoUrl" alt="Routine logo" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import logoUrl from './assets/logo.svg'
</script>

<style></style>
