import Mock from 'mockjs'
export default {
  list: {
    url: '/api/renewal/task/list',
    method: 'post',
    data: {
      'id': '@guid',
      'name': '@cname',
      'mobile': /^1[0-9]{10}$/,
      'age|18-60': 1,
      'idNo': Mock.Random.id(),
      'email': '@email',
      'region': '@region',
      'province': '@province',
      'city': '@city',
      'county': '@county',
      'insured_time': Mock.Random.date('yyyy-MM-dd')
    }
  }
}
