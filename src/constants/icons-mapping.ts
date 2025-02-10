export const iconsMapping = {
  WI_FI: 'wifi',
  RESTAURANT: 'restaurant',
  ROOM_SERVICE: 'room_service',
  PUB: 'local_bar',
  POOL: 'pool',
  PETS: 'pets',
  AIR_CONDITIONING: 'air',
  SAFE: 'lock_person',
  PARKING: 'local_parking',
  LAUNDRY: 'local_laundry_service',
  BREAKFAST: 'free_breakfast',
  FITNESS_CENTER: 'fitness_center',
  MEETING_ROOM: 'meeting_room',
  STEAM_ROOM: 'hot_tub',
  SPA: 'spa',
  ROOM_TV: 'live_tv',
  TRANSFER: 'transfer_tithin_a_station',
  STAGE: 'mic_external_on',
  AUDITORIUM: 'stadium',
  MASSAGE: 'air_line_seat_flat',
  ACEPTED_CAR_CREDIT: 'credit_score',
  RECEPTION_24_HOURS: 'local_convenience_store',
  PLAY_GROUND: 'sports_bolleyball',
} as const

export type IconsKeys = keyof typeof iconsMapping
