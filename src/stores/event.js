import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', () => {
  let eventId = ref(0)
  let eventList = ref([])
  let mapEvent = ref({})
  let roadTag = ref(false)
  const getMapEvent = e => {
    mapEvent.value = e
  }
  const setRoadTag = boolean => {
    roadTag.value = boolean
  }
  return { eventId, eventList, mapEvent, getMapEvent, roadTag,setRoadTag }
})
