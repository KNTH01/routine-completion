import { computed } from 'vue'
import useFetch from './use-fetch'

export default function (queryRef) {
  const { response, error, fetchData, fetching } = useFetch()
  const fetchCompletions = () => fetchData(`completion?query=${queryRef.value}`)
  const completions = computed(() => response?.value?.completions ?? [])

  return { completions, error, fetchCompletions, fetching }
}
