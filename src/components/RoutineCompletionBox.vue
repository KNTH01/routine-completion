<template>
  <div class="max-w-lg py-12">
    <div class="w-full p-4 rounded bg-routine-gray-1 border-routine-gray-4">
      <div class="pr-4 overflow-y-scroll max-h-48 completion-container">
        <template v-if="completions.length > 0">
          <div
            v-for="(completion, i) in completions"
            :key="i"
            class="px-3 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-routine-black hover:bg-opacity-10"
          >
            {{ completion.phrase }}
          </div>
        </template>
        <!-- TODO: add loader -->
        <div v-else class="animate-ping">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useCompletions from '~/composables/use-completions'

const query = ref('ika')
const { completions, fetchCompletions, fetching } = useCompletions(query)

fetchCompletions()
</script>

<style lang="postcss" scoped>
.completion-container::-webkit-scrollbar {
  @apply w-1 bg-transparent;
}

.completion-container::-webkit-scrollbar-thumb {
  @apply bg-routine-gray-2 rounded-full pr-5;
}
</style>
