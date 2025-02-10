<script setup lang="ts">
const { variant = 'primary', type = 'button' } = defineProps<{
  variant?: 'primary' | 'secondary'
  type?: string
  onClick?: () => void
}>()
</script>

<template>
  <q-btn
    rounded
    unelevated
    size="md"
    :class="['custom-button', `custom-button--${variant}`]"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </q-btn>
</template>

<style lang="scss">
.custom-button {
  font-weight: 500;
  width: fit-content;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  align-self: flex-end;

  &--primary {
    background-color: $blue-600;
    color: #fff;
  }

  &--secondary {
    background-color: transparent;
    color: $blue-600;
    border: 1px solid $blue-600;

    &:hover {
      background-color: $blue-600;
      color: #fff;
    }
  }
}
</style>
