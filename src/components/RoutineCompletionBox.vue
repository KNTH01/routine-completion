<template>
  <div class="max-w-lg py-12">
    <div class="w-full p-4 rounded bg-routine-gray-1 border-routine-gray-4">
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
</template>

<script setup>
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

<style scoped>
.completion-container::-webkit-scrollbar {
  @apply w-1 bg-transparent;
}

.completion-container::-webkit-scrollbar-thumb {
  @apply bg-routine-gray-2 rounded-full pr-5;
}
</style>
