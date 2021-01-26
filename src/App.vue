<template>
  <div class="h-screen bg-routine-dark text-routine-black">
    <main class="container">
      <section class="max-w-3xl py-28">
        <div class="relative">
          <input
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

        <div class="max-w-lg py-12">
          <div
            class="w-full p-4 rounded bg-routine-gray-1 border-routine-gray-4"
          >
            <div class="h-48 pr-4 overflow-y-scroll completion-container">
              <div
                v-for="suggestion in suggestions"
                :key="suggestion"
                class="px-3 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-routine-black hover:bg-opacity-10"
              >
                {{ suggestion }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import logoUrl from './assets/logo.svg'

const suggestions = [
  'Bulbasaur',
  'Ivisaur',
  'Venusaur',
  'Charmander',
  'Salameche',
  'Dracofeu',
  'Snubbull',
  'Grandbull',
]
</script>

<style>
.completion-container::-webkit-scrollbar {
  @apply w-1 bg-transparent;
}

.completion-container::-webkit-scrollbar-thumb {
  @apply bg-routine-gray-2 rounded-full pr-5;
}
</style>
