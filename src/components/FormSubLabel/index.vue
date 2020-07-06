<style lang='scss'>
</style>
<template>
  <div class>
    <div style="font-weight: bold;padding: 10px;">
      <slot name="preSlot" />
      <span style="margin-right: 6px; background: #1890ff;">&nbsp;</span>
      {{ formLabel }}
      <slot name="sufSlot" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formLabel: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>
