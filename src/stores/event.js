import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', () => {
  let eventId = ref(0)
  let eventList = ref([])
  let mapEvent = ref({})
  const getMapEvent = e => {
    mapEvent.value = e
  }
  return { eventId, eventList, mapEvent, getMapEvent }
})
