<template>
  <div>
    <div>
      <FormSubLabel :form-label="'页面预览'" />
    </div>
    <FormDesign :formdata="currentFormConfig" @save="saveForm" />
    <!-- <el-form :inline="true">
      <draggable v-model="filters" dragable="true" :move="getdata" @update="datadragEnd">
        <transition-group>
          <el-col
            v-for="filter in filters"
            :key="filter.filterKey"
            :span="8"
            style="margin-top: 5px"
          >
            <el-form-item :label="filter.name" style="cursor: move;">
              <el-input
                v-model="filter.displayName"
                placeholder="请输入设置属性"
                readonly
                @focus="openFilterDialog(filter)"
              />
            </el-form-item>
          </el-col>
        </transition-group>
      </draggable>
    </el-form>-->
  </div>
</template>

<script>
import FormDesign from '@/components/ElFormDesign/formDesign'
// import draggable from 'vuedraggable'
export default {
  components: { FormDesign },
  //   , draggable
  props: {
    currentFormConfig: {
      type: Object,
      default: function() {
        return {}
      }
    },
    currentFormId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      filters: [
        { filterKey: 1, name: '姓名', displayName: 'name' },
        { filterKey: 2, name: '住址', displayName: 'address' }
      ]
    }
  },
  methods: {
    saveForm(form) {
      this.$emit('saveForm', form)
    },
    getdata(evt) {
      console.log(evt.draggedContext.filterKey)
      // 这里evt.draggedContext后续的内容根据具体的定义变量而定
    },
    datadragEnd(evt) {
      const filters = this.filters
      for (let a = 0; a < filters.length; a++) {
        filters[a].index = a
      }
      this.filters = filters
    },
    openFilterDialog(filter) {
      console.log(filter)
    }
  }
}
</script>

<style>
</style>
