import { defineStore, acceptHMRUpdate } from 'pinia'
import { HotelsStorage, type Hotel } from 'src/storage/hotels/Hotels'

type Filters = {
  name?: string
  destiny?: {
    label: string
    value: string
    description: string
  }
}

type Pagination = {
  currentPage: number
  lastPage: number
}

export type OrderByTypes = 'price' | 'rating'

interface HotelsStoreState {
  filters: Filters
  sortedBy: OrderByTypes
  hotels: Hotel[]
  isFiltered: boolean
  pagination: Pagination
}

const hotelsStorage = HotelsStorage.getInstance()

const initialState: HotelsStoreState = {
  filters: {},
  isFiltered: false,
  sortedBy: 'price',
  hotels: [],
  pagination: {} as Pagination,
}

export const useHotelsStore = defineStore('hotelsStore', {
  state: (): HotelsStoreState => initialState,
  actions: {
    async loadHotels() {
      await hotelsStorage.loadItems()

      const result = hotelsStorage.getHotels(1)

      this.hotels = result.hotels
      this.pagination = {
        lastPage: result.lastPage,
        currentPage: 1,
      }
    },

    setFilters(filters: Filters) {
      this.filters = filters
    },
    filterHotels() {
      const { filters } = this.$state
      const placeId = Number(filters?.destiny?.value)
      const hotelName = filters?.name

      let result = hotelsStorage

      if (placeId) {
        result = result.filterByPlace(placeId)
      }

      if (hotelName) {
        result = result.filterByName({ name: hotelName })
      }

      const hotelsResult = result.getHotels(1)

      this.$state = {
        ...this.$state,
        isFiltered: true,
        hotels: hotelsResult.hotels,
        pagination: {
          currentPage: 1,
          lastPage: hotelsResult.lastPage,
        },
      }
    },
    loadMoreHotels() {
      const nextPage = this.pagination.currentPage + 1
      const result = hotelsStorage.getHotels(nextPage)

      this.pagination = {
        currentPage: nextPage,
        lastPage: result.lastPage,
      }
      this.hotels = this.hotels.concat(result.hotels)
    },
    clearFilters() {
      const result = hotelsStorage.clearFilters().getHotels(1)

      this.$state = {
        ...initialState,
        hotels: result.hotels,
        pagination: {
          currentPage: 1,
          lastPage: result.lastPage,
        },
      }
    },
    sortingHotels(orderBy: OrderByTypes) {
      this.sortedBy = orderBy
      const sortedHotels =
        orderBy === 'price'
          ? hotelsStorage.orderByPrice({ desc: false })
          : hotelsStorage.orderByStars({ desc: false })

      const result = sortedHotels.getHotels(1)

      console.log({ result })

      this.hotels = result.hotels
      this.pagination = {
        currentPage: 1,
        lastPage: result.lastPage,
      }
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHotelsStore, import.meta.hot))
}
