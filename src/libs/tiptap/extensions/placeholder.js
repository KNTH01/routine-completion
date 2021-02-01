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

  addCommands() {
    return {
      isEmptyWithPlaceholder(toto) {
        console.log('toto :>> ', toto)

        return true
      },

      // setTextAlign: (alignment: string): Command => ({ commands }) => {
      //   if (!this.options.alignments.includes(alignment)) {
      //     return false
      //   }

      //   return this.options.types.every(type => commands.updateNodeAttributes(type, { textAlign: alignment }))
      // },

      // unsetTextAlign: (): Command => ({ commands }) => {
      //   return this.options.types.every(type => commands.resetNodeAttributes(type, 'textAlign'))
      // },
    }
  },
})
