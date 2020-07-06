import assembly from './assembly'
export default class MSelect extends assembly {
  constructor(
    type = 'Select',
    name = '下拉框',
    col = 24,
    key = 'Select' + new Date().getTime()
  ) {
    super(type, name, col, key)
    this.showFrom = ['name', 'col', 'key', 'multiple', 'collapsetags', 'placeholder',
      'clearable', 'disabled', 'filterable', 'allowcreate', 'datatype', 'option', 'url'
    ]
    this.multiple = false
    this.collapsetags = false
    this.disabled = false
    this.filterable = false
    this.allowcreate = false
    this.placeholder = '请输入' + this.name
    this.clearable = true
    // 数据类型 option 和 url
    this.datatype = 'option'
    // 请求接口
    this.url = ''
    // 下拉框的选项
    this.option = [{
      value: 'select1',
      label: '选项一'
    }]
    // 校验
    this.rules = [{
      required: false,
      message: '请选择' + this.name,
      trigger: 'change'
    }]
  }

  deleteOption(index) {
    this.option.splice(index, 1)
  }
  addoption() {
    this.option.push({
      label: '新选项',
      value: 'newValue'
    })
  }
}
