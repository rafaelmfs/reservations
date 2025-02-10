import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Hotel } from 'src/storage/hotels/Hotels'

interface DrawerHotelStore {
  isOpen: boolean
  selectedHotel: Hotel
}

const initialState: DrawerHotelStore = {
  isOpen: false,
  selectedHotel: {
    id: 0,
    favorite: false,
    name: '',
    description: '',
    stars: '',
    thumb: '',
    amenities: [],
    hasBreakFast: true,
    hasRefundableRoom: true,
    hasAgreement: false,
    address: {
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      country: '',
      zipCode: null,
      fullAddress: '',
    },
    images: [],
    roomsQuantity: 0,
    price: 0,
  },
}

export const useDrawerHotelStore = defineStore('drawerHotelStore', {
  state: (): DrawerHotelStore => initialState,
  actions: {
    openDrawer(hotel: Hotel) {
      document.body.style.overflow = 'hidden'

      this.isOpen = true
      this.selectedHotel = hotel
    },

    closeDrawer() {
      document.body.style.overflow = 'auto'
      this.isOpen = false
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDrawerHotelStore, import.meta.hot))
}
