<template>
  <div class="relative group">
    <div
      class="w-full px-6 py-4 text-2xl rounded editor group-focus:ring group-focus:ring-routine-gray-3 group-focus:outline-none bg-routine-gray-1 caret-routine-blue"
    ></div>

    <div
      class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none"
    >
      <img :src="logoUrl" alt="Routine logo" />
    </div>
  </div>
  <button @click="getContent">get content</button>
</template>

<script setup>
import { Editor, Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {
  placeholder,
  PlaceholderExtension,
} from '~/libs/tiptap/extensions/placeholder'
import { TextCls } from '~/libs/tiptap/extensions/text-cls'

import { onMounted, ref } from 'vue'
import logoUrl from '~/assets/logo.svg'

const message = ref('')
const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    element: document.querySelector('.editor'),
    extensions: [Document, Paragraph, Text, TextCls, PlaceholderExtension],
    content: placeholder,
  })
})

const getContent = () => {
  console.log(JSON.stringify(editor.value.getJSON()))
}
</script>

<style lang="postcss">
.ProseMirror-focused {
  @apply outline-none;
}

.placeholder {
  @apply text-red-300;
}
</style>
