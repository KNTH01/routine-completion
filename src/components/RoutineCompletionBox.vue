<template>
  <div class="max-w-lg py-12" v-if="showCompletionBox">
    <div class="w-full p-4 rounded bg-routine-gray-1 border-routine-gray-4">
      <div class="pr-4 overflow-y-scroll max-h-48 completion-container">
        <template v-if="completions.length > 0">
          <a
            href="#"
            v-for="(completion, i) in completions"
            :key="i"
            class="block px-3 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-routine-black hover:bg-opacity-10 focus:outline-none focus:bg-routine-black focus:bg-opacity-10"
            @click.prevent="complete(completion.phrase)"
          >
            {{ completion.phrase }}
          </a>
        </template>
        <!-- TODO: add loader -->
        <div v-else-if="fetching" class="">Loading...</div>
        <div v-else class="">No result...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import {
  useCompletions,
  useCompletionStore,
} from '~/composables/use-completions'
import { useEditor } from '~/composables/use-editor'

const { query, setQuery, showCompletionBox, setComplete } = useCompletionStore()
const { completions, fetchCompletions, fetching } = useCompletions(query)
const { editor } = useEditor()

// TODO: sort completion by score
watch(query, fetchCompletions)

const complete = (completionPhrase) => {
  const KEYWORD = 'i pick you '
  const doc = editor.value.getJSON()
  const paragraphContent = doc.content[0]

  const queryNodePosition =
    paragraphContent.content.findIndex(
      (content) => content.text.toLowerCase() === KEYWORD
    ) + 1

  if (paragraphContent.content[queryNodePosition]) {
    paragraphContent.content[queryNodePosition].text = completionPhrase
    doc.content[0] = paragraphContent
    editor.value.commands.setContent(doc)
  }

  setQuery('')
  setComplete()
}
</script>

<style lang="postcss" scoped>
.completion-container::-webkit-scrollbar {
  @apply w-1 bg-transparent;
}

.completion-container::-webkit-scrollbar-thumb {
  @apply bg-routine-gray-2 rounded-full pr-5;
}
</style>
