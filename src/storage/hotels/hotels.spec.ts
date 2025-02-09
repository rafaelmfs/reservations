import { beforeAll, describe, expect, it } from 'vitest'
import { HotelsStorage } from './Hotels'

describe('Hotels', () => {
  beforeAll(async () => {
    const hotelsStorage = HotelsStorage.getInstance()
    await hotelsStorage.loadItems()
  })

  it('Shoud be able to filter by place', () => {
    const place = {
      name: 'Belo Horizonte',
      state: {
        name: 'Minas Gerais',
        shortname: 'MG',
      },
      placeId: 1,
    }

    const hotelsStorage = HotelsStorage.getInstance()
    const filteredHotels = hotelsStorage.filterByPlace(place.placeId).getHotels()

    expect(Array.isArray(filteredHotels)).toBeTruthy()
    expect(filteredHotels.length).toBeGreaterThan(0)
    expect(
      filteredHotels.every((hotel) => {
        const { name, shortname } = place.state
        const stateNames = [name.toLocaleLowerCase(), shortname.toLocaleLowerCase()]
        const pass = stateNames.includes(hotel.address.state.toLocaleLowerCase())

        if (!pass) {
          console.log(hotel)
        }
        return pass
      }),
    ).toBeTruthy()
  })

  it('Shoud be able to filter by name', () => {
    const hotelName = 'Baia Cabrália Hotel.'
    const hotelsStorage = HotelsStorage.getInstance()
    const filteredHotels = hotelsStorage.filterByName({ name: hotelName }).getHotels()

    expect(Array.isArray(filteredHotels)).toBeTruthy()
  })

  it('Shoud be able to paginate', () => {
    const hotelsStorage = HotelsStorage.getInstance()
    const paginatedHotels = hotelsStorage.getHotels(1)

    expect(Array.isArray(paginatedHotels)).toBeTruthy()
    expect(paginatedHotels.length).toBeLessThanOrEqual(10)
  })

  it('Shoud be able to order by price ASC', () => {
    const hotelsStorage = HotelsStorage.getInstance()
    const orderedHotels = hotelsStorage.orderByPrice({ desc: false }).getHotels(1)

    expect(Array.isArray(orderedHotels)).toBeTruthy()

    const pass = orderedHotels.every((hotel, index, hotels) => {
      if (index === 0) return true

      const higherPrice = Number(hotel.price)
      const lowerPrice = Number(hotels[index - 1]?.price)
      return higherPrice >= lowerPrice
    })

    expect(pass).toBeTruthy()
  })

  it('Shoud be able to order by stars', () => {
    const hotelsStorage = HotelsStorage.getInstance()
    const orderedHotels = hotelsStorage.orderByStars({ desc: true }).getHotels(1)

    expect(Array.isArray(orderedHotels)).toBeTruthy()

    const pass = orderedHotels.every((hotel, index, hotels) => {
      if (index === 0) return true

      const higherStars = Number(hotel.stars)
      const lowerStars = Number(hotels[index - 1]?.stars)
      return higherStars <= lowerStars
    })

    expect(pass).toBeTruthy()
  })
})
