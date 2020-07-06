<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <TinymceEditor v-model="editorContent" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <HtmlToCanvas>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </HtmlToCanvas>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <QrCode show-demo />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <QrCode :qr-code="{ type: '', content: '带logo二维码', logoUrl: logoUrl }" />
      </el-col>
      <el-divider />
    </el-row>
  </div>
</template>

<script>
import QrCode from '@/components/QrCode/index.vue'
import HtmlToCanvas from '@/components/HtmlToCanvas/index.vue'
import TinymceEditor from '@/components/Tinymce/index.vue'
export default {
  name: 'Editor',
  components: {
    TinymceEditor,
    HtmlToCanvas,
    QrCode
  },
  data() {
    return {
      logoUrl: require('@/assets/images/logo.png'),
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      editorContent: `
        <h2>
          富文本编辑器
        </h2>`
    }
  }
}
</script>

