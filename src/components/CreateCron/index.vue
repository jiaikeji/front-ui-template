<template>
  <div class="cron">
    <el-popover v-model="cronPopover">
      <el-input slot="reference" v-model="cron" placeholder="请输入Cron表达式" @click="cronPopover=true" />
      <cron i18n="cn" v-bind="$attrs" @change="changeCron" @close="cronPopover=false" />
    </el-popover>
  </div>
</template>

<script>
import { cron } from 'vue-cron'
export default {
  components: { cron },
  inheritAttrs: false, // 此处设置禁用继承特性
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cronPopover: false,
      cron: ''
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal) this.cron = newVal
    }
  },
  created() {
    if (this.value) this.cron = this.value
  },
  methods: {
    changeCron(val) {
      this.cron = val
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.cron /deep/ .bottom .value {
  margin-right: 10px;
}
</style>
