<template>
  <div class="cursor-pointer" :class="active ? className : defaultClassName" @click="acitveFun">
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, defineEmits, defineProps, withDefaults } from 'vue'
interface Props {
  className: string
  defaultClassName: string
}
interface Emits {
  (e: 'active'): void
}
withDefaults(defineProps<Props>(), {
  className: '',
  defaultClassName: ''
})
const context = defineEmits<Emits>()
const active = ref(false)
const acitveFun = () => {
  active.value = true
  context('active')
}
</script>

<style>
</style>
