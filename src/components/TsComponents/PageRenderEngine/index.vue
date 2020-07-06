<template>
  <div style="display: flex;flex-direction: flex-start;justify-content: space-between;">
    <div ref="config">
      <div>
        <FormSubLabel :form-label="'业务类别'" />
        <el-select
          v-model="serviceType"
          placeholder="请选择"
          style="margin-left: 20px;"
          @change="serviceTypeChange"
        >
          <el-option-group
            v-for="group in serviceTypeOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="(item, index) in group.options"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
        <ul v-if="productShow">
          <li v-for="(product, index) in productList" :key="index" style="margin: 10px;">
            {{ product.name }}
            <el-button
              type="primary"
              plain
              size="mini"
              @click="configProduct(product.id, product.formConfig)"
            >配置</el-button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="字段配置"
      append-to-body
      :visible.sync="configVisible"
      width="80%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <Preview :current-form-config="currentFormConfig" @saveForm="saveForm" />
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import Preview from './module/Preview/index.vue'
import { mapGetters } from 'vuex'
import {
  Component,
  Prop,
  Watch,
  Emit,
  Provide,
  // Ref,
  Vue
} from 'vue-property-decorator'

@Component({
  name: 'PageRenderEngine',
  components: { CarOwner: () => import('./module/CarOwner.vue'), Preview },
  filters: {
    testFilter: (value: string) => `${value} filter`
  },
  computed: {
    ...mapGetters(['dicts']),
    serviceTypeGroup() {
      return this.dicts['job_status']
    }
  }
})
export default class PageRenderEngine extends Vue {
  static ComponentName: string = 'PageRenderEngine' // 组件名可作为子组件调用时用
  @Prop({
    type: [String, Number], // 这里注意首字母大写
    default: '' // 默认值
  })
  pk: string // 全局关联主键

  @Provide()
  bar = 'deeper 修'

  msg: string = '默认msg'

  serviceType: string = ''

  count: number = 0

  configVisible: boolean = false

  productShow: boolean = false

  currentFormId: any

  productList: any[]

  currentFormConfig = {
    data: [],
    formsetting: {
      labelPosition: 'left',
      labelwidth: 80,
      formsize: 'mini'
    }
  }

  serviceTypeOptions = [
    {
      label: '业务模块',
      options: [
        {
          value: 'productCenter',
          label: '我的业务'
        }
      ]
    }
    //, {
    //   label: '系统模块',
    //   options: [
    //     {
    //       value: 'carModelLib',
    //       label: '车型库'
    //     }
    //   ]
    // }
  ]

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

  get pkMsgComputed() {
    return this.msg + this.pk
  }

  get dictsComputed() {
    return mapGetters(['dicts'])
  }

  @Watch('pk', { immediate: true, deep: true })
  watchWext(val: string): void {
    console.log('watch: ', this.pk)
    this.pk = val
  }

  @Emit()
  addToCount(n: number) {
    this.count += n
    console.log(this.count)
  }

  mounted() {
    console.log('mounted...')
    this.$nextTick(() => {
      console.log(this.$refs['config'])
    })
  }

  msgBtn(ev: any) {
    this.msg = '点击了typescript'
    console.log('点击事件', ev)
    console.log(this.msg)
  }

  saveForm(form) {
    if (this.serviceType === 'productCenter') {
      this.productList.filter(item => {
        if (item.id === this.currentFormId) {
          item.formConfig = form
          this.configVisible = false
        }
      })
    }
  }

  handleClose() {
    this.configVisible = false
    this.currentFormConfig = {
      data: [],
      formsetting: {
        labelPosition: 'left',
        labelwidth: 80,
        formsize: 'mini'
      }
    }
  }

  serviceTypeChange(val) {
    this.productShow = false
    if (val === 'productCenter') {
      this.productShow = true
      // Mock 查询产品列表
      this.productList = [
        {
          id: 1,
          name: '业务一',
          formConfig: {
            formsetting: {
              labelPosition: 'left',
              labelwidth: 80,
              formsize: 'mini'
            },
            forms: [
              {
                id: 'p1593771315845',
                type: 'p',
                name: '',
                col: 24,
                key: 'p1593771315845',
                showFrom: [
                  'col',
                  'text',
                  'contentposition',
                  'fontsize',
                  'textcolor'
                ],
                text: '文字',
                contentposition: 'center',
                fontsize: 18,
                textcolor: '#333',
                rules: []
              }
            ]
          }
        },
        {
          id: 2,
          name: '业务二',
          formConfig: {
            data: [],
            formsetting: {
              labelPosition: 'left',
              labelwidth: 80,
              formsize: 'mini'
            }
          }
        }
      ]
    }
  }

  configProduct(id, formConfig) {
    this.configVisible = true
    this.currentFormId = id
    this.currentFormConfig = formConfig
  }
}
</script>

<style>
</style>
