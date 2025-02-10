<script setup lang="ts">
import { computed } from 'vue'
import type { Hotel } from 'src/storage/hotels/Hotels'

import HotelCardDetails from './hotel-card-details.vue'
import hotelCardCarousel from './hotel-card-carousel.vue'
import hotelCardValues from './hotel-card-values.vue'

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const carrouselImages = computed(() => Array.from(new Set([hotel.thumb, ...hotel.images])))
</script>

<template>
  <div class="hotel-card__container" style="width: 100%">
    <div class="hotel-card__details__container">
      <hotel-card-carousel :images="carrouselImages" />
      <hotel-card-details
        :address="hotel.address"
        :amenities="hotel.amenities"
        :name="hotel.name"
        :stars="hotel.stars"
        :hasRefundableRoom="hotel.hasRefundableRoom"
      />
    </div>
    <hotel-card-values :value="hotel.price" />
  </div>
</template>

<style lang="scss">
.hotel-card {
  &__container {
    width: 100%;
    display: grid;
    grid-template-columns: 80% 20%;
    gap: 0.5rem;
  }
}
</style>
