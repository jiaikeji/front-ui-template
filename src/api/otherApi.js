import requestFormData from '@/utils/requestFormData'

// 生成小程序二维码-采用草料api
export function createWeappQrcode(data) {
  return requestFormData({
    url: '/cliIm/Home/Weapp/create',
    method: 'post',
    data
  })
}
