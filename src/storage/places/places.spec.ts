import { describe, expect, it } from 'vitest'
import { PlaceStorage } from './Places'

describe('Places', () => {
  it('Shoud be able get all places', () => {
    const placesStorage = new PlaceStorage()
    const places = placesStorage.getAllPlaces()

    expect(Array.isArray(places)).toBe(true)
    expect(places.length).toBeGreaterThan(0)
  })

  it('Shoud be able get place by id', () => {
    const place = {
      name: 'Fortaleza',
      state: {
        name: 'Ceará',
        shortname: 'CE',
      },
      placeId: 2,
    }

    const placesStorage = new PlaceStorage()
    const placeById = placesStorage.getPlaceById(place.placeId)

    expect(placeById).toEqual(place)
  })
})
