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
  getHotels: (page?: number) => Hotel[]
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

  public static getInstance(): HotelsStorage {
    if (!HotelsStorage.instance) {
      HotelsStorage.instance = new HotelsStorage()
    }

    return HotelsStorage.instance
  }

  async loadItems(): Promise<void> {
    if (!this.hotels.length) {
      const response = await import('./hotel.json')
      this.hotels = response.default as PlaceHotel[]
    }

    this.filteredHotels = this.hotels.map((item) => item.hotels).flat()
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
      return []
    }

    if (!page) {
      return this.filteredHotels
    }

    const pageSize = 10
    const start = (page - 1) * pageSize
    const end = start + pageSize

    return this.filteredHotels.slice(start, end)
  }
}
