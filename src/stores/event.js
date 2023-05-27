import { ref } from "vue";
import { defineStore } from "pinia";

export const useEventStore = defineStore('event', () => {
  let eventId = ref(0)
  let eventList = ref([])
  return { eventId, eventList }
})
