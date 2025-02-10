<script setup lang="ts">
import { computed, ref } from 'vue'

const { images, showCounter = false } = defineProps<{
  images: string[]
  showCounter?: boolean
}>()

const slide = ref(1)

const slideCounter = computed(() => {
  return `${slide.value}/${images.length}`
})
</script>

<template>
  <div class="carousel__container">
    <q-carousel swipeable animated v-model="slide" arrows infinite>
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
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  color: #fff;
  background-color: #0008;
  border-radius: 12px;

  z-index: 999999;
}
</style>
