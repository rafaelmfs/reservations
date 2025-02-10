<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import RatingsStars from '../ratings-stars.vue'
import hotelCarousel from './hotel-carousel.vue'
import { type IconsKeys, iconsMapping } from 'src/constants/icons-mapping'
import CustomButton from 'components/custom-button.vue'
import { useDrawerHotelStore } from 'src/stores/drawerHotelStore'
import { storeToRefs } from 'pinia'

const drawerHotelStore = useDrawerHotelStore()
const { isOpen, selectedHotel } = storeToRefs(drawerHotelStore)

const screenWidth = ref(window.innerWidth)

const drawerWidth = computed(() => {
  const percent = window.innerWidth > 1024 ? 0.6 : 0.8

  return screenWidth.value * percent
})

const carrouselImages = computed(() =>
  Array.from(new Set([selectedHotel.value.thumb, ...selectedHotel.value.images])),
)

const DEFAULT_DISPLAY_ICONS_COUT = 4
const iconsLimit = ref(DEFAULT_DISPLAY_ICONS_COUT)
const iconsToDisplay = computed(() => selectedHotel.value.amenities.slice(0, iconsLimit.value))

function showAllIcons(showAll: boolean) {
  iconsLimit.value = showAll ? selectedHotel.value.amenities.length : DEFAULT_DISPLAY_ICONS_COUT
}

const updateWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <q-drawer
    @update:model-value="drawerHotelStore.closeDrawer"
    :model-value="isOpen"
    :width="drawerWidth"
    side="right"
    overlay
    behavior="mobile"
    class="drawer"
  >
    <header class="drawer__header">
      <ratings-stars :stars="Number(selectedHotel.stars)" />

      <div class="drawer__header__info">
        <strong class="drawer__header__info__name">{{ selectedHotel.name }}</strong>
        <span class="drawer__header__info__address">{{ selectedHotel.address.fullAddress }}</span>
      </div>
    </header>

    <div class="drawer__carousel">
      <hotel-carousel height="500px" :images="carrouselImages" show-counter />
    </div>

    <div class="drawer__amenites">
      <span class="title">Facilidades do hotel</span>
      <div class="drawer__amenites__content">
        <div class="drawer__amenites__content__icons">
          <div
            :key="index"
            v-for="(amenite, index) in iconsToDisplay"
            class="drawer__amenites__content__icon-item"
          >
            <q-icon :name="iconsMapping[amenite.key as IconsKeys]" color="grey-5" size="2rem" />
            <span>{{ amenite.label }}</span>
          </div>
        </div>
        <custom-button
          v-show="selectedHotel.amenities.length > 4"
          variant="secondary"
          @click="showAllIcons(iconsLimit == 4)"
        >
          {{ iconsLimit === 4 ? 'Mostrar todas as facilidades' : 'Mostrar menos' }}
        </custom-button>
      </div>
    </div>
    <div class="drawer__description">
      <span class="title">Conheça um pouco mais</span>
      <p v-html="selectedHotel.description"></p>
    </div>
  </q-drawer>
</template>

<style lang="scss">
.drawer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__info {
      display: flex;
      flex-direction: column;
      &__name {
        font-size: 2rem;
        font-weight: 500;
        color: $grey-6;
      }
      &__address {
        font-size: 1rem;
        color: $grey-5;
      }
    }
  }

  &__carousel {
    border-radius: 16px;
    overflow: hidden;
    min-height: 500px;

    @media (max-width: 1440px) {
      min-height: 400px;
      .q-carousel {
        max-height: 400px;
      }
    }
  }

  &__amenites {
    display: flex;
    flex-direction: column;
    gap: 0.24rem;

    &__content {
      padding: 1rem 0;
      border-top: 1px solid $grey-5;
      border-bottom: 1px solid $grey-5;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      & button {
        align-self: center;
      }

      &__icons {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 1rem;
      }

      &__icon-item {
        display: flex;
        gap: 0.5rem;
        color: $grey-5;
        font-size: 1.25rem;
        align-items: center;
        white-space: nowrap;
      }
    }
  }

  &__description {
    margin-top: 0.5rem;
    padding-bottom: 2rem;
    p {
      margin: 1rem 0;
      white-space: pre-line;
      color: $grey-5;
      font-size: 1rem;
    }
  }

  .title {
    font-size: 1.5rem;
    color: $grey-6;
    margin-bottom: 0.25rem;
  }
}
</style>
