<style lang='scss' scoped>
.tip-style:hover {
  text-decoration: underline;
}
</style>
<template>
  <div style="display: inline-block">
    <slot />
    <div style="display: inline;margin: 5px;">
      <el-tooltip :content="desc" class="item" effect="light" placement="right">
        <div style="display: inline;">
          <svg-icon icon-class="tip" />
          <span
            v-if="showTitle"
            class="tip-style"
            style="color: #1890ff; font-size: 12px; cursor: pointer;"
          >{{ title }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showTitle: { type: Boolean, default: true },
    title: { type: String, default: '提示' },
    desc: { type: String, default: '描述' }
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
