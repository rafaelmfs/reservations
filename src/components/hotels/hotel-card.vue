<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomButton from '../custom-button.vue'
import type { Hotel } from 'src/storage/hotels/Hotels'
import type { IconsKeys } from 'src/constants/icons-mapping'
import { iconsMapping } from 'src/constants/icons-mapping'
import { formatCurrencyValue } from 'src/utils/format-currency-value'

const { hotel } = defineProps<{
  hotel: Hotel
}>()

const slide = ref(1)

const refundableText = computed(() =>
  hotel.hasRefundableRoom ? 'Reembolsável' : 'Não Reembolsável',
)

const carrouselImages = computed(() => new Set([hotel.thumb, ...hotel.images]))
const price = computed(() => formatCurrencyValue(hotel.price))
</script>

<template>
  <div class="hotel-card__container" style="width: 100%">
    <div class="hotel-card__details__container">
      <div class="hotel-card__details__carousel">
        <q-carousel swipeable animated v-model="slide" arrows infinite>
          <q-carousel-slide
            v-for="(image, index) in carrouselImages"
            class="hotel-card__carousel__image"
            :name="index"
            :img-src="image"
            :key="index"
          />
        </q-carousel>
      </div>
      <div class="hotel-card__details__info">
        <div class="hotel-card__details__info__data">
          <strong class="hotel-card__details__info__name">{{ hotel.name }}</strong>
          <span class="hotel-card__details__info__address">{{ hotel.address.fullAddress }}</span>
        </div>
        <div class="hotel-card__details__info__amenites">
          <div>
            <div class="ratings">
              <span class="text-caption text-grey-5">{{ hotel.stars }}</span>
              <q-rating
                no-reset
                :model-value="Number(hotel.stars)"
                size="1.5em"
                color="orange"
                readonly
              />
            </div>
            <div class="amenites">
              <q-icon
                v-for="(amenite, index) in hotel.amenities"
                :key="index"
                :name="iconsMapping[amenite.key as IconsKeys]"
                color="grey-6"
                size="1rem"
              />
            </div>
          </div>

          <span class="hotel-card__details__info__amenites__refundable">{{ refundableText }}</span>
        </div>
      </div>
    </div>
    <div class="hotel-card__values">
      <div>
        <span>A partir de:</span>
        <span
          >R$ <strong class="hotel-card__values__price">{{ price }}</strong></span
        >
        <span>R$ {{ price }} / noite</span>
        <span>impostos inclusos</span>
      </div>
      <custom-button>Selecionar</custom-button>
    </div>
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

  &__details {
    &__container {
      display: grid;
      grid-template-columns: 40% 60%;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 2px 16px #00000015;
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
        gap: 4px;
      }
      &__amenites {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: fit-content;

        & > div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0;
        }

        .ratings {
          display: flex;
          align-items: center;
          gap: 0.25rem;

          padding-right: 0.5rem;
          border-right: 2px solid $grey;
        }

        .amenites {
          display: flex;
          gap: 0.5rem;
        }

        &__refundable {
          padding: 0.5rem 1rem;
          background-color: $grey-6;
          border-radius: 4px;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

  &__values {
    background-color: #fff;
    box-shadow: 0 2px 16px #00000015;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 1rem 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & button {
      align-self: center;
      width: 100%;
    }

    &__price {
      color: $grey-6;
      font-size: 2rem;
      font-weight: 500;
    }

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        font-size: 1rem;

        &:first-child {
          font-size: 0.875rem;
        }

        color: $grey-5;
      }
    }
  }
}
</style>
