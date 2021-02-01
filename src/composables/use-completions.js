import { computed, ref } from 'vue'
import useFetch from './use-fetch'

const query = ref('')
const isCompleted = ref(false)

export const useCompletionStore = () => {
  return {
    query: computed(() => query.value),
    setQuery(newQuery) {
      query.value = newQuery
    },

    showCompletionBox: computed(() => query.value.trim() !== ''),

    isCompleted: computed(() => isCompleted.value),
    setComplete() {
      isCompleted.value = true
    },
    setUncomplete() {
      isCompleted.value = false
    },
  }
}

export const useCompletions = (queryRef) => {
  const { response, error, fetchData, fetching } = useFetch()
  const fetchCompletions = () => fetchData(`completion?query=${queryRef.value}`)
  const completions = computed(() => {
    try {
      const result = JSON.parse(
        JSON.stringify(response?.value?.completions ?? [])
      )
      return result.sort((a, b) => b.score - a.score)
    } catch (error) {
      console.error(error)
      return []
    }
  })

  return { completions, error, fetchCompletions, fetching }
}

export const useCompletionQuery = () => {
  const QUERY_KEYWORD = 'i pick you '

  const findQueryNodePosition = (docContent) => {
    const paragraphContent = docContent.content[0]

    const queryNodePosition = paragraphContent.content.findIndex(
      (content) => content.text.toLowerCase() === QUERY_KEYWORD
    )

    return queryNodePosition > -1 ? queryNodePosition + 1 : -1
  }

  return {
    QUERY_KEYWORD,
    findQueryNodePosition,
  }
}
