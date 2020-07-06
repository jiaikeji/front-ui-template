<template>
  <div style="display: flex;justify-content: space-between;">
    <div id="capture" style="padding: 10px;">
      <slot />
    </div>
    <el-button
      type="primary"
      icon="el-icon-scissors"
      style="height: 30px;"
      @click.stop="saveAsImg"
    >截图</el-button>
  </div>
</template>

<script>
import { saveFile } from '@/utils'
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      dataURL: ''
    }
  },
  methods: {
    saveAsImg() {
      html2canvas(document.querySelector('#capture'), {
        // 转换为图片
        useCORS: true // 解决资源跨域问题
      }).then(canvas => {
        this.dataURL = canvas.toDataURL('image/png')
        this.$confirm(`<img src=${this.dataURL}></img>`, '保存截图', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          customClass: 'message-box-img-style',
          closeOnClickModal: false
        })
          .then(() => {
            saveFile(this.dataURL, this._.now())
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            })
          })
      })
    }
  }
}
</script>

<style lang="scss">
.message-box-img-style {
  width: auto !important;
}
</style>

