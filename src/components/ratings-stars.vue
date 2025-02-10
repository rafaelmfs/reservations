<script setup lang="ts">
const { stars } = defineProps<{
  stars: number
}>()
</script>

<template>
  <div class="ratings">
    <span class="text-caption text-grey-5">{{ stars }}</span>
    <q-rating no-reset :model-value="stars" size="1.5em" color="orange" readonly />
  </div>
</template>

<style lang="scss">
.ratings {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  padding-right: 0.5rem;
  border-right: 2px solid $grey;
}
</style>
