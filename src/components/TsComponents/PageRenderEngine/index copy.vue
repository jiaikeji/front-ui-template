<template>
  <div>
    <el-button type="primary" @click="msgBtn">{{ msg }}</el-button>
    <el-card shadow="always">{{ textMsgComputed | testFilter }}</el-card>
    <CarOwner ref="name" />
  </div>
</template>
<script lang='ts'>
import {
  Component,
  Prop,
  Watch,
  Emit,
  Provide,
  Ref,
  Vue
} from 'vue-property-decorator'

@Component({
  name: 'PageRenderEngine',
  components: { CarOwner: () => import('./module/CarOwner.vue') },
  filters: {
    testFilter: (value: string) => `${value} filter`
  }
})
export default class PageRenderEngine extends Vue {
  static ComponentName: string = 'PageRenderEngine' // 组件名可作为子组件调用时用
  @Prop({
    type: String, // 这里注意首字母大写
    default: '' // 默认值
  })
  text: string

  @Provide()
  bar = 'deeper 修'

  @Ref('name')
  msg: string = '默认msg'

  count: number = 0

  // 使用PropSync做双向绑定
  // @PropSync('name', { type: String }) syncedName!: string//computed使用方式
  // computed: {
  // syncedName: {
  //   get() {
  //     return this.name
  //   },
  //    set(value) {
  //    this.$emit('input', v)
  //  }
  // }
  // }

  get textMsgComputed() {
    return this.msg + this.text
  }

  @Watch('text', { immediate: true, deep: true })
  watchWext(val: string): void {
    console.log('watch: ', this.text)
    this.text = val
  }

  @Emit()
  addToCount(n: number) {
    this.count += n
    console.log(this.count)
  }

  mounted() {
    console.log('mounted...')
    this.$nextTick(() => {
      console.log(this.$refs['name'])
    })
  }

  msgBtn(ev: any) {
    this.msg = '点击了typescript'
    console.log('点击事件', ev)
    console.log(this.msg)
  }
}
</script>

<style>
</style>
