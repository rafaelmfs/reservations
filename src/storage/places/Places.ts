import places from './place.json'

interface Place {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
}

interface PlaceStorageProperties {
  places: Place[]
  getAllPlaces: () => Place[]
  getPlaceById: (placeId: number) => Place | undefined
}

export class PlaceStorage implements PlaceStorageProperties {
  places: Place[]

  constructor() {
    this.places = places
  }

  getAllPlaces(): Place[] {
    return this.places
  }

  getPlaceById(placeId: number): Place | undefined {
    return this.places.find((place) => place.placeId === placeId)
  }
}
