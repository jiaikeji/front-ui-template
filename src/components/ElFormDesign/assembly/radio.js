import assembly from './assembly'
export default class MRadio extends assembly {
  constructor(
    type = 'Radio',
    name = '单选',
    col = 24,
    key = 'Radio' + new Date().getTime()
  ) {
    super(type, name, col, key)
    this.showFrom = ['name', 'col', 'key',
      'disabled', 'radiotype', 'datatype', 'option', 'url'
    ]
    // button
    this.radiotype = 'yuan'
    this.disabled = false

    // 数据类型 option 和 url
    this.datatype = 'option'
    // 请求接口
    this.url = ''
    // 下拉框的选项
    this.option = [{
      value: 'radio1',
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
