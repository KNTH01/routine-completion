<template>
  <p class="py-4 text-gray-100">
    <span class="text-gray-500">Message:</span> {{ message }}
  </p>
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

const updateContent = () => {
  const KEYWORD = 'i pick you'
  const commands = editor.value.commands
  const contentJSON = editor.value.getJSON()
  let updateContent = false

  const paragraphContent = contentJSON.content[0]
  message.value = paragraphContent.content
    ? paragraphContent.content.map((item) => item.text).join('')
    : ''
  const searchKeywordPos = message.value.toLowerCase().search(KEYWORD)

  if (searchKeywordPos > -1) {
    if (paragraphContent.content?.length === 1) {
      const userKeyword = contentJSON.content[0].content[0].text.substr(
        searchKeywordPos,
        KEYWORD.length
      )
      contentJSON.content[0].content[0].text = contentJSON.content[0].content[0].text.replace(
        userKeyword,
        ''
      )
      contentJSON.content[0].content.push({
        type: 'text',
        marks: [{ type: 'textCls', attrs: { class: 'text-routine-blue' } }],
        text: userKeyword,
      })
      contentJSON.content[0].content.push({
        type: 'text',
        // marks: [{ type: 'textCls', attrs: { class: '' } }],
        text: ' ',
      })
      updateContent = true
    }
  } else {
    paragraphContent.content = [
      {
        type: 'text',
        text: message.value,
      },
    ]
    updateContent = true
  }

  if (contentJSON.content.length > 1) {
    // strip any new paragraph
    contentJSON.content.length = 1
    updateContent = true
  }

  // update contentJSON
  if (updateContent) {
    paragraphContent.content = paragraphContent.content.filter(
      (content) => content.text !== ''
    )
    contentJSON.content[0] = paragraphContent
    console.log('UPDATE paragraphContent:', contentJSON.content[0])
    commands.setContent(contentJSON)
  }
}

onMounted(() => {
  editor.value = new Editor({
    element: document.querySelector('.editor'),
    extensions: [Document, Paragraph, Text, TextCls, PlaceholderExtension],
    content: placeholder,

    onUpdate({ transaction }) {
      updateContent()
    },
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
