<script setup lang="ts">
import { computed, ref } from 'vue'

const {
  height,
  images,
  showCounter = false,
} = defineProps<{
  images: string[]
  showCounter?: boolean
  height?: string
}>()

const slide = ref(0)

const slideCounter = computed(() => {
  return `${slide.value + 1}/${images.length}`
})
</script>

<template>
  <div class="carousel__container">
    <q-carousel
      control
      control-type="regular"
      control-color="white"
      control-text-color="grey-6"
      :height="height"
      swipeable
      animated
      v-model="slide"
      arrows
      infinite
    >
      <q-carousel-slide
        v-for="(image, index) in images"
        :name="index"
        :img-src="image"
        :key="index"
      />
    </q-carousel>
    <span v-show="showCounter" class="carousel__counter">{{ slideCounter }}</span>
  </div>
</template>

<style lang="scss">
.carousel__container {
  position: relative;
}

.carousel__counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  color: #fff;
  background-color: #0008;
  border-radius: 12px;

  z-index: 99;
}
</style>
