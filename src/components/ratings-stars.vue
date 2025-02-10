<script setup lang="ts">
const { stars, withDivider = false } = defineProps<{
  stars: number
  withDivider?: boolean
}>()
</script>

<template>
  <div class="ratings" :class="{ divider: withDivider }">
    <span class="text-caption text-grey-5">{{ stars }}</span>
    <q-rating no-reset :model-value="stars" size="1.5em" color="orange" readonly />
  </div>
</template>

<style lang="scss">
.divider {
  border-right: 2px solid $grey;
}
.ratings {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  padding-right: 0.5rem;
}
</style>
