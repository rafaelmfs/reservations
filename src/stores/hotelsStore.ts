import { defineStore, acceptHMRUpdate } from 'pinia'
import { HotelsStorage, type Hotel } from 'src/storage/hotels/Hotels'

type Filters = {
  name?: string
  destiny?: {
    label: string
    value: string
    description: string
  }
  page: number
}

type OrderByTypes = 'price' | 'rating'

interface HotelsStoreState {
  filters: Filters
  sortedBy: OrderByTypes
  hotels: Hotel[]
  isFiltered: boolean
}

const hotelsStorage = HotelsStorage.getInstance()

export const useHotelsStore = defineStore('hotelsStore', {
  state: (): HotelsStoreState => ({
    filters: {
      page: 1,
    },
    isFiltered: false,
    sortedBy: 'price',
    hotels: [],
  }),
  actions: {
    async loadHotels() {
      await hotelsStorage.loadItems()
      this.hotels = hotelsStorage.getHotels(1)
    },
    setFilters(filters: Filters) {
      this.filters = filters
    },
    filterHotels() {
      const currentState = this.$state
      const placeId = Number(currentState.filters?.destiny?.value)
      const hotelName = currentState.filters?.name

      if (placeId && hotelName) {
        this.isFiltered = true
        this.hotels = hotelsStorage
          .filterByPlace(placeId)
          .filterByName({ name: hotelName })
          .getHotels(1)
      }

      if (placeId) {
        this.isFiltered = true
        this.hotels = hotelsStorage.filterByPlace(placeId).getHotels(1)
      }

      if (hotelName) {
        this.isFiltered = true
        this.hotels = hotelsStorage.filterByName({ name: hotelName }).getHotels(1)
      }
    },
    loadMoreHotels(nextPage: number) {
      this.hotels = this.hotels.concat(hotelsStorage.getHotels(nextPage))
    },
    clearFilters() {
      this.filters = {
        name: '',
        destiny: {
          label: '',
          value: '',
          description: '',
        },
        page: 1,
      }
      this.hotels = hotelsStorage.clearFilters().getHotels(1)
      this.isFiltered = false
    },
    sortingHotels(orderBy: OrderByTypes) {
      this.sortedBy = orderBy
      if (orderBy === 'price') {
        this.hotels = hotelsStorage.orderByPrice({ desc: false }).getHotels(1)
        return this
      }

      this.hotels = hotelsStorage.orderByStars({ desc: false }).getHotels(1)
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHotelsStore, import.meta.hot))
}
