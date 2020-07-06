<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="130px"
    label-position="left"
    inline-message
    style="margin-top: 10px;"
  >
    <el-form-item label="APP ID" prop="weapp_id">
      <el-input v-model.trim="form.weapp_id" placeholder="微信小程序后台APP ID" auto-complete="off" />
    </el-form-item>
    <el-form-item label="APP Secret" prop="weapp_secret">
      <el-input v-model.trim="form.weapp_secret" show-password placeholder="APP Secret" auto-complete="off" />
    </el-form-item>
    <el-form-item label="页面路径 & 参数" prop="weapp_url">
      <el-input v-model.trim="form.weapp_url" placeholder="pages/index/index?param=***">
        <FormTip slot="suffix" :title="''" :desc="'小程序页面路径是指小程序内部页面的路径，如首页一般为page/index/index'" />
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="miniParamLoading" @click="submitForm">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FormTip from '@/components/FormTip'
import { createWeappQrcode } from '@/api/otherApi'
import { debounce } from '@/utils'
export default {
  components: { FormTip },
  data() {
    return {
      miniParamLoading: false,
      form: {
        weapp_id: '',
        weapp_secret: '',
        weapp_url: ''
      },
      rules: {
        weapp_id: [
          { required: true, message: '请输入APP ID', trigger: 'blur' }
        ],
        weapp_secret: [
          { required: true, message: '请输入APP Secret', trigger: 'blur' }
        ],
        weapp_url: [
          { required: true, message: '请输入页面路径 & 参数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.miniParamLoading = true
          debounce(this.createWeappQrcode(), 2000, false)
        } else {
          return false
        }
      })
    },
    createWeappQrcode() {
      createWeappQrcode(this.form)
        .then(res => {
          this.miniParamLoading = false
          if (res.status === 0) {
            this.$message.error(res.msg)
          } else {
            this.$alert(`<img src=${res.data}></img>`, '小程序二维码', {
              dangerouslyUseHTMLString: true,
              closeOnClickModal: false,
              customClass: 'alert-message-box-img-style'
            }).catch(err => console.log(err))
          }
        })
        .catch(err => {
          console.log(err)
          this.miniParamLoading = false
        })
    }
  }
}
</script>

<style lang="scss">
.alert-message-box-img-style {
  width: auto !important;
}
</style>
