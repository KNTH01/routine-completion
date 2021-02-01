<template>
  <div class="relative group">
    <div
      class="w-full px-6 py-4 text-2xl rounded editor group-focus:ring group-focus:ring-routine-gray-3 group-focus:outline-none bg-routine-gray-1 caret-routine-blue"
    ></div>

    <div
      class="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none"
    >
      <img v-if="isCompleted" :src="completedIconUrl" alt="Completed" />
      <!-- TODO: hide this when not empty -->
      <img v-else :src="logoUrl" alt="Routine logo" />
    </div>
  </div>
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
import {
  useCompletionStore,
  useCompletionQuery,
} from '~/composables/use-completions'
import { useEditor } from '~/composables/use-editor'
import logoUrl from '~/assets/logo.svg'
import completedIconUrl from '~/assets/completedIcon.svg'

const message = ref('')
const { setQuery, isCompleted, setUncomplete } = useCompletionStore()
const { editor, setEditor } = useEditor()
const { QUERY_KEYWORD, findQueryNodePosition } = useCompletionQuery()

const updateContent = () => {
  const commands = editor.value.commands
  const contentJSON = editor.value.getJSON()
  let updateContent = false

  const paragraphContent = contentJSON.content[0]
  message.value = paragraphContent.content
    ? paragraphContent.content.map((item) => item.text).join('')
    : ''
  const searchKeywordPos = message.value.toLowerCase().search(QUERY_KEYWORD)

  if (searchKeywordPos > -1) {
    if (paragraphContent.content?.length === 1) {
      const userKeyword = paragraphContent.content[0].text.substr(
        searchKeywordPos,
        QUERY_KEYWORD.length
      )
      paragraphContent.content[0].text = paragraphContent.content[0].text.replace(
        userKeyword,
        ''
      )
      paragraphContent.content.push({
        type: 'text',
        marks: [{ type: 'textCls', attrs: { class: 'text-routine-blue' } }],
        text: userKeyword,
      })
      paragraphContent.content.push({
        type: 'text',
        marks: [
          {
            type: 'textCls',
            attrs: {
              class:
                'px-3 py-1 font-medium rounded text-routine-black bg-routine-black bg-opacity-10',
            },
          },
        ],
        text: ' ',
      })

      updateContent = true
    } else {
      const queryNodePosition = findQueryNodePosition(contentJSON)

      if (
        queryNodePosition > -1 &&
        paragraphContent.content[queryNodePosition]
      ) {
        if (paragraphContent.content[queryNodePosition].text.includes(' ')) {
          updateContent = true
        }

        // set query
        const query = paragraphContent.content[queryNodePosition].text.trim()
        paragraphContent.content[queryNodePosition].text = query
        setQuery(query)
      } else {
        setQuery('')
      }
    }
  } else {
    paragraphContent.content = [
      {
        type: 'text',
        text: message.value,
      },
    ]
    updateContent = true

    setQuery('')
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
    commands.setContent(contentJSON)
  }

  setUncomplete()
}

onMounted(() => {
  setEditor(
    new Editor({
      element: document.querySelector('.editor'),
      extensions: [Document, Paragraph, Text, TextCls, PlaceholderExtension],
      content: placeholder,

      onUpdate() {
        updateContent()
      },
    })
  )
})
</script>

<style lang="postcss">
.ProseMirror-focused {
  @apply outline-none;
}

.placeholder {
  @apply text-red-300;
}
</style>
