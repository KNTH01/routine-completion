import { toRefs, reactive } from 'vue'
import ky from 'ky'

const API_URL = 'https://bleeding.routine.co:8080/'

export default function () {
  const state = reactive({
    response: [],
    error: null,
    fetching: false,
  })

  const fetchData = async (url, options = {}) => {
    state.fetching = true
    try {
      state.response = await ky
        .get(
          url,
          Object.assign(
            {},
            {
              prefixUrl: API_URL,
            },
            options
          )
        )
        .json()
    } catch (errors) {
      state.error = errors
    } finally {
      state.fetching = false
    }
  }

  return { ...toRefs(state), fetchData }
}
