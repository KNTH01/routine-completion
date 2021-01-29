import { computed, ref } from 'vue'

const editor = ref(null)

export const useEditor = () => {
  return {
    editor: computed(() => editor.value),
    setEditor(newEditor) {
      editor.value = newEditor
    },
  }
}
