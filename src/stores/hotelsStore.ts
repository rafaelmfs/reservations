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
  isLoading: boolean
  filters: Filters
  sortedBy: OrderByTypes
  hotels: Hotel[]
  isFiltered: boolean
  pagination: Pagination
}

const hotelsStorage = HotelsStorage.getInstance()

const initialState: HotelsStoreState = {
  isLoading: true,
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

      const result = hotelsStorage.orderByPrice({ desc: false }).getHotels(1)

      this.hotels = result.hotels
      this.pagination = {
        lastPage: result.lastPage,
        currentPage: 1,
      }
      this.isLoading = false
    },

    setFilters(filters: Filters) {
      this.filters = filters
    },
    filterHotels() {
      const { filters } = this.$state
      const filtersFieldsIsEmpty = !filters.destiny?.label && !filters.name
      const mustClearFilters = filtersFieldsIsEmpty && this.$state.isFiltered

      if (mustClearFilters) {
        this.clearFilters()
        return
      }

      const placeId = Number(filters?.destiny?.value)
      const hotelName = filters?.name

      let result = hotelsStorage
      const selectedSort = this.sortedBy === 'price' ? 'orderByPrice' : ('orderByStars' as const)

      if (placeId) {
        result = result.filterByPlace(placeId)[selectedSort]({
          desc: this.sortedBy === 'rating',
        })
      }

      if (hotelName) {
        result = result.filterByName({ name: hotelName })[selectedSort]({
          desc: this.sortedBy === 'rating',
        })
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
          : hotelsStorage.orderByStars({ desc: true })

      const result = sortedHotels.getHotels(1)

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
