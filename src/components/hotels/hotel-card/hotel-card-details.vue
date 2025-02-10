<script setup lang="ts">
import RatingsStars from '../../ratings-stars.vue'

import { type IconsKeys, iconsMapping } from 'src/constants/icons-mapping'
import type { Hotel } from 'src/storage/hotels/Hotels'
import { computed } from 'vue'

type Props = Pick<Hotel, 'name' | 'address' | 'stars' | 'amenities' | 'hasRefundableRoom'>
const { address, amenities, name, stars, hasRefundableRoom } = defineProps<Props>()

const refundableText = computed(() => (hasRefundableRoom ? 'Reembolsável' : 'Não Reembolsável'))
</script>

<template>
  <div class="hotel-card__details__info">
    <div class="hotel-card__details__info__data">
      <strong class="hotel-card__details__info__name">{{ name }}</strong>
      <span class="hotel-card__details__info__address">{{ address.fullAddress }}</span>
    </div>
    <div class="hotel-card__details__info__amenites">
      <div>
        <ratings-stars with-divider :stars="Number(stars)" />
        <div class="amenites">
          <q-icon
            v-for="(amenite, index) in amenities"
            :key="index"
            :name="iconsMapping[amenite.key as IconsKeys]"
            :title="amenite.label"
            color="grey-6"
          />
        </div>
      </div>

      <span class="hotel-card__details__info__amenites__refundable">{{ refundableText }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.hotel-card__details {
  &__container {
    display: grid;
    grid-template-columns: 40% 60%;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 16px #00000015;

    @media (max-width: 800px) {
      grid-template-columns: 1fr 1fr;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 0;
      border-bottom: 1px solid $grey-1;
    }
  }

  &__info {
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;

    justify-content: space-between;

    &__name {
      font-size: 2rem;
      font-weight: 500;
      color: $grey-6;
    }
    &__address {
      font-size: 1rem;
      color: $grey-5;
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    &__amenites {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      width: fit-content;

      & > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 0;
      }

      .amenites {
        display: flex;
        gap: 0.5rem;
        font-size: 1rem;
      }

      &__refundable {
        padding: 0.5rem 1rem;
        background-color: $grey-6;
        border-radius: 4px;
        color: #fff;
        text-align: center;
      }
    }

    @media (max-width: 800px) {
      align-items: center;

      &__address {
        text-align: center;
      }

      &__name {
        font-size: 2.25rem;
        text-align: center;
      }

      .amenites {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 500px) {
      &__name {
        font-size: 1.75rem;
      }

      .amenites {
        font-size: 0.875rem;
      }
    }

    @media (max-width: 400px) {
      &__name {
        font-size: 1.2rem;
        font-weight: 500;
        color: $grey-6;
      }
      &__address {
        font-size: 0.75rem;
        color: $grey-5;
      }

      .amenites,
      .ratings,
      .q-icon {
        font-size: 0.75rem;
      }

      &__amenites__refundable {
        font-size: 0.75rem;
      }
    }
  }
}
</style>
