<script setup lang="ts">
import { ref } from 'vue'

const { images } = defineProps<{
  images: string[]
}>()

const slide = ref(1)
</script>

<template>
  <q-carousel swipeable animated v-model="slide" arrows infinite>
    <q-carousel-slide
      v-for="(image, index) in images"
      :name="index"
      :img-src="image"
      :key="index"
    />
  </q-carousel>
</template>
