<template>
  <div>
    <el-row v-if="showDemo">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <el-radio-group v-model="qrcodeComponent" size="mini" @change="qrcodeComponentChange">
          <el-radio-button label="noneLogoQrcode">无logo二维码</el-radio-button>
          <el-radio-button label="logoQrcode">有logo二维码</el-radio-button>
          <el-radio-button label="miniParamQrcode">小程序二维码</el-radio-button>
        </el-radio-group>
        <el-col v-if="qrcodeComponent === 'noneLogoQrcode'" :span="24" style="padding: 10px;">
          <div ref="qrCodeUrl" class="qrcode" />
        </el-col>
        <el-col v-if="qrcodeComponent === 'logoQrcode'" :span="24">
          <vue-qr
            :logo-src="qrdata.logo"
            :text="qrdata.qrUrl"
            :logo-scale="50"
            :size="qrdata.size"
          />
        </el-col>
        <WeappQrcode v-if="qrcodeComponent === 'miniParamQrcode'" />
      </el-col>
    </el-row>
    <div v-else>
      <template v-show="qrcodeComponent === 'noneLogoQrcode'">
        <div ref="qrCodeUrl" class="qrcode" />
      </template>
      <template v-show="qrcodeComponent === 'logoQrcode'">
        <template v-if="showInputImgUrl">
          <el-radio-group v-model="imgComponent" size="mini" style="margin-bottom: 10px;">
            <el-radio-button label="imgUrl">输入链接</el-radio-button>
            <el-radio-button label="uploadImg">上传图片</el-radio-button>
          </el-radio-group>
          <el-input v-if="imgComponent === 'imgUrl'" v-model="qrdata['logo']" placeholder="请输入链接" />
          <el-upload
            v-if="imgComponent === 'uploadImg'"
            ref="upload"
            class="qr-code-avatar-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="qrdata['logo']" :src="qrdata['logo']" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </template>
        <vue-qr :logo-src="qrdata.logo" :text="qrdata.qrUrl" :logo-scale="50" :size="qrdata.size" />
      </template>
      <WeappQrcode v-show="qrcodeComponent === 'miniParamQrcode'" />
    </div>
  </div>
</template>

<script>
import { createQrCode } from '@/utils'
import WeappQrcode from '@/components/WeappQrcode'
import VueQr from 'vue-qr'
export default {
  components: {
    VueQr,
    WeappQrcode
  },
  props: {
    qrCode: {
      type: Object,
      default: function() {
        return {
          // 二维码类型
          type: 'noneLogoQrcode',
          // 二维码内容
          content: '二维码',
          // 图片链接
          logoUrl: require('@/assets/images/logo.png')
        }
      }
    },
    showInputImgUrl: {
      type: Boolean,
      default: true
    },
    showDemo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgComponent: 'imgUrl',
      qrcodeComponent: '',
      qrdata: {
        size: 150,
        qrUrl: this.qrCode['content'],
        logo: this.qrCode['logoUrl'],
        bgColor: '#f0f',
        fgColor: '#ff0'
      }
    }
  },
  mounted() {
    this.qrcodeComponent = this.qrCode['type']
    switch (this.qrCode['type']) {
      case 'noneLogoQrcode':
        this.$nextTick(() => {
          createQrCode('.qrcode', this.$refs.qrCodeUrl, this.qrCode['content'])
        })
        break
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      } else {
        this.qrdata['logo'] = URL.createObjectURL(file)
      }
      return (isJPG || isPNG) && isLt2M
    },
    qrcodeComponentChange(val) {
      if (val === 'noneLogoQrcode') {
        createQrCode('.qrcode', this.$refs.qrCodeUrl, this.qrCode['content'])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qr-code-avatar-uploader {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
