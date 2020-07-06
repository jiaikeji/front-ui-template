const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)

  plop.setHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this)
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this)
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this)
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this)
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this)
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this)
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this)
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this)
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this)
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this)
      default:
        return options.inverse(this)
    }
  })
  plop.setHelper('ifNoExistShowForm', function(val, options) {
    return ['TableForm', 'Divider', 'p'].indexOf(val) === -1 ? options.fn(this) : options.inverse(this)
  })
  plop.setHelper('ifDateTypeIsDate', function(datetype, options) {
    return ['date', 'dates', 'daterange'].indexOf(datetype) === -1 ? options.fn(this) : options.inverse(this)
  })
  plop.setHelper('ifDateTypeIsWeek', function(datetype, options) {
    return datetype === 'week' ? options.fn(this) : options.inverse(this)
  })
  plop.setHelper('ifDateTypeIsMonth', function(datetype, options) {
    return ['month', 'monthrange'].indexOf(datetype) === -1 ? options.fn(this) : options.inverse(this)
  })
  plop.setHelper('ifDateTypeIsYear', function(datetype, options) {
    return datetype === 'year' ? options.fn(this) : options.inverse(this)
  })
  plop.setHelper('ifDateTypeIsDateTime', function(datetype, options) {
    return ['datetime', 'datetimerange'].indexOf(datetype) === -1 ? options.fn(this) : options.inverse(this)
  })
}
