import { computed, ref } from 'vue'
import useFetch from './use-fetch'

const query = ref('')

export const useCompletionStore = () => {
  return {
    query: computed(() => query.value),
    setQuery(newQuery) {
      query.value = newQuery
    },
    showCompletionBox: computed(() => query.value.trim() !== ''),
  }
}

export const useCompletions = (queryRef) => {
  const { response, error, fetchData, fetching } = useFetch()
  const fetchCompletions = () => fetchData(`completion?query=${queryRef.value}`)
  const completions = computed(() => response?.value?.completions ?? [])

  return { completions, error, fetchCompletions, fetching }
}
