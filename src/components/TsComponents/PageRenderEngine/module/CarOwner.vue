<template>
  <span>Inject deeper: {{ bar }}</span>
</template>

<script>
export default {
  inject: ['bar'],
  data() {
    return {
      name: '123'
    }
  }
}
</script>

<style>
</style>
