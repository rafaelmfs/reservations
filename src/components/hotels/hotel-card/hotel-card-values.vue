<script setup lang="ts">
import { formatCurrencyValue } from 'src/utils/format-currency-value'
import { computed } from 'vue'

import CustomButton from 'components/custom-button.vue'

const { value } = defineProps<{
  value: number
}>()

const formattedPrice = computed(() => formatCurrencyValue(value))
</script>

<template>
  <div class="hotel-card__values">
    <div>
      <span>A partir de:</span>
      <span>
        R$ <strong class="hotel-card__values__price">{{ formattedPrice }}</strong>
      </span>
      <span>R$ {{ formattedPrice }} / noite</span>
      <span>impostos inclusos</span>
    </div>
    <custom-button @click="$emit('openDrawer', true)">Selecionar</custom-button>
  </div>
</template>

<style lang="scss">
.hotel-card__values {
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
</style>
