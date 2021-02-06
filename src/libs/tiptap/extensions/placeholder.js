import { Extension } from '@tiptap/core'

export const placeholder = `<p><span class="text-routine-gray-3">What will you pick?</span></p>`

export const PlaceholderExtension = Extension.create({
  name: 'placeholder',

  onFocus({ event }) {
    if (this.editor.getHTML() === placeholder) {
      this.editor.commands.clearContent()
    }
  },

  onBlur({ event }) {
    if (this.editor.isEmpty()) {
      this.editor.commands.setContent(placeholder)
    }
  },
})
