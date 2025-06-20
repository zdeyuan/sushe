<template>
  <div>
    <a-modal :title="title" :width="width" okText="确定" cancel-text="取消" @cancel="handleCancel" @ok="handleOk" :visible="visible$1">
      <a-form-model :model="data" :label-col="{ span:8 }" :wrapper-col="{ span:16 }">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="开始选课时间" >
              <a-range-picker v-model="data.starttime" value-format="YYYY-MM-DD"/>
            </a-form-model-item>
          </a-col>
        
          <a-col :span="12">
            <a-form-model-item label="停止选课时间" >
              <a-range-picker v-model="data.endtime" value-format="YYYY-MM-DD"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="创建时间" >
              <a-range-picker v-model="data.createtime" value-format="YYYY-MM-DD"/>
            </a-form-model-item>
          </a-col>
        
          <a-col :span="12">
            <a-form-model-item label="最后修改时间" >
              <a-range-picker v-model="data.updatetime" value-format="YYYY-MM-DD"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="是否有效" >
              <a-select v-model="data.status" style="width: 100%" placeholder="请选择状态">
                <a-select-option :value="0">无效</a-select-option>
                <a-select-option :value="1">有效</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        
          <a-col :span="12">
            <a-form-model-item label="创建者名称" >
              <a-input v-model="data.createusername" placeholder="请输入创建者名称" :max-length="50"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'XKSJScreen',
  props: {
    visible: { type: Boolean },
    data: { type: Object, default() {return {}}},
  },
  data() {
    return {
      width: 800,
      title: '筛选',
    }
  },
  created() {},
  computed: {
    visible$1: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },
  components: {},
  methods: {
    handleCancel() {
      this.visible$1 = false
    },
    handleOk() {
      this.visible$1 = false
      this.$emit('ok')
    },
  },
}
</script>
<style scoped>
</style>
