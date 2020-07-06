<template>
  <div>
    <div class="tinymce-editor">
      <editor
        v-if="visibile"
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        @onClick="onClick"
      />
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/icons/default/icons'
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import crudQiNiu from '@/api/tools/qiniu'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: () => [
        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat'
      ]
    },
    visibile: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js', // public目录下
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide', // public目录下
        height: 300,
        menubar: false, // 顶部菜单栏显示
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        plugins: this.plugins, // 父组件传入 或者 填写个默认的插件 要选用什么插件都可以 去官网可以查到
        toolbar: this.toolbar, // 工具栏 我用到的也就是lists image media table wordcount 这些 根据需求而定
        images_upload_url: '', // 上传路径
        branding: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler

        // 官网图片上传 项目如果用了vue-resource 可以用 $http
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure)
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
        }
      },
      myValue: this.value
    }
  },
  computed: {
    ...mapGetters(['qiNiuUploadApi'])
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('contentChange', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 图片上传
    async handleImgUpload(blobInfo, success, failure) {
      const formdata = new FormData()
      formdata.set('file', blobInfo.blob())
      try {
        const uploadFile = await request({
          url: this.qiNiuUploadApi,
          method: 'post',
          data: formdata
        })
        crudQiNiu
          .download(uploadFile.id)
          .then(res => {
            success(res.url)
          })
          .catch(err => {
            console.log(err)
            failure('error')
          })
      } catch (error) {
        console.log(error)
        failure('error')
      }
    }
  }
}
</script>
<style lang="scss">
.tox-silver-sink {
  z-index: 3000 !important;
}
</style>
