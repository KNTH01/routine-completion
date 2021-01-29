import { Mark, mergeAttributes } from '@tiptap/core'

export const TextCls = Mark.create({
  name: 'textCls',

  defaultOptions: {
    types: ['textCls'],
    HTMLAttributes: {},
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          class: {
            default: '',
            renderHTML: (attributes) => {
              if (!attributes.class) {
                return {}
              }

              return {
                class: attributes.class,
              }
            },
            parseHTML: (element) => ({
              class: element.getAttribute('class'),
            }),
          },
        },
      },
    ]
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element) => {
          return element.getAttribute('class')
            ? {
                cls: element.getAttribute('class'),
              }
            : false
        },
      },
    ]
  },

  renderHTML(attr) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, attr.HTMLAttributes),
      0,
    ]
  },
})
