interface Address {
  street: string
  number: string
  district: string
  city: string
  state: string
  country: string
  zipCode: string | null
  fullAddress: string
}

interface Amenity {
  key: string
  label: string
}

export interface Hotel {
  id: number
  favorite: boolean
  name: string
  description: string
  stars: string
  thumb: string
  amenities: Amenity[]
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  address: Address
  images: string[]
  roomsQuantity: number
  price: number
}

type PlaceHotel = {
  hotels: Hotel[]
  placeId: number
}

type FilterByNameParams = { hotels?: Hotel[]; name: string }
type OrderParams = { hotels?: Hotel[]; desc?: boolean }

interface HotelsStorageProperties {
  isLoading: boolean
  hotels: PlaceHotel[]
  filteredHotels: Hotel[]
  filterByPlace: (placeId: number) => HotelsStorage
  filterByName: (params: FilterByNameParams) => HotelsStorage
  clearFilters: () => HotelsStorage
  orderByPrice: (params: OrderParams) => HotelsStorage
  orderByStars: (params: OrderParams) => HotelsStorage
  getHotels: (page?: number) => { hotels: Hotel[]; lastPage: number }
  loadItems: () => Promise<void>
}

export class HotelsStorage implements HotelsStorageProperties {
  isLoading: boolean
  hotels: PlaceHotel[]
  filteredHotels: Hotel[]
  static instance: HotelsStorage

  private constructor() {
    this.isLoading = true
    this.hotels = []
    this.filteredHotels = []
  }

  formatHotelsObject(hotels: Hotel[]): Hotel[] {
    return hotels.map((item) => {
      const amenities = item.amenities
        ? item.amenities?.filter((amenit) => !Array.isArray(amenit))
        : []

      return {
        id: item.id,
        favorite: item.favorite,
        name: item.name,
        description: item.description,
        stars: item.stars,
        thumb: item.thumb,
        hasBreakFast: item.hasBreakFast,
        hasRefundableRoom: item.hasRefundableRoom,
        hasAgreement: item.hasAgreement,
        address: item.address,
        images: item.images,
        roomsQuantity: item.roomsQuantity,
        price: item.price,
        amenities,
      }
    })
  }

  public static getInstance(): HotelsStorage {
    if (!HotelsStorage.instance) {
      HotelsStorage.instance = new HotelsStorage()
    }

    return HotelsStorage.instance
  }

  async loadItems(): Promise<void> {
    if (!this.hotels.length) {
      const response = await import('./hotel.json')
      const receivedHotels = response.default as PlaceHotel[]

      const formattedHotelsObject: PlaceHotel[] = receivedHotels.map((item) => ({
        placeId: item.placeId,
        hotels: this.formatHotelsObject(item.hotels),
      }))
      this.hotels = formattedHotelsObject
    }

    const allHotels = this.hotels.map((item) => item.hotels).flat()

    this.filteredHotels = allHotels
    this.isLoading = false
  }

  filterByPlace(placeId: number) {
    const filteredHotels = this.hotels.find((item) => item.placeId === placeId)?.hotels || []

    this.filteredHotels = filteredHotels
    return this
  }

  filterByName({ name, hotels = this.filteredHotels }: FilterByNameParams) {
    this.filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(name.toLowerCase()),
    )

    return this
  }

  clearFilters() {
    this.filteredHotels = this.hotels.map((item) => item.hotels).flat()
    return this
  }

  orderByPrice({ desc, hotels = this.filteredHotels }: OrderParams) {
    this.filteredHotels = hotels.toSorted((a, b) => {
      const priceA = Number(a.price)
      const priceB = Number(b.price)
      return desc ? priceB - priceA : priceA - priceB
    })

    return this
  }

  orderByStars({ desc, hotels = this.filteredHotels }: OrderParams) {
    this.filteredHotels = hotels.toSorted((a, b) => {
      const starsA = Number(a.stars)
      const starsB = Number(b.stars)
      return desc ? starsB - starsA : starsA - starsB
    })

    return this
  }

  getHotels(page?: number) {
    if (this.isLoading) {
      return { hotels: [], lastPage: 1 }
    }

    if (!page) {
      return { hotels: this.filteredHotels, lastPage: 1 }
    }

    const pageSize = 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const lastPage = Math.ceil(this.filteredHotels.length / pageSize)

    return { hotels: this.filteredHotels.slice(start, end), lastPage }
  }
}
