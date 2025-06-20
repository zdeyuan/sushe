<template>
  <a-modal
    title="筛选"
    :width="500"
    placement="right"
    okText="确定"
    cancel-text="取消"
    @ok="
      () => {
        handleOk()
      }
    "
    @cancel="
      () => {
        handleCancel()
      }
    "
    :visible="visible"
  >
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="选课模式" prop="msid">
        <a-select v-model="form.msid" placeholder="请选择选课模式">
          <a-select-option value=""> 请选择 </a-select-option>
          <a-select-option v-for="(item, index) in xkmsData" :key="index" :value="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="学生" prop="stuname">
        <a-input v-model="form.stuname" placeholder="请选择学生" @click="handleSelect" />
      </a-form-model-item>
      <a-form-model-item label="学期" prop="semid">
        <a-select v-model="form.semid" placeholder="请选择学期">
          <a-select-option value=""> 请选择 </a-select-option>
          <a-select-option v-for="(item, index) in semesterData" :key="index" :value="item.id">{{
            item.xqmc
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="课程" prop="kcid" v-if="false">
        <a-select
            allow-clear
            show-search
            option-filter-prop="children"
            v-model="form.kcid"
            placeholder="请选择课程"
            :filter-option="filterOption"
          >
            <a-select-option v-for="item in courseData" :key="item.id" :value="item.id">{{item.kcmc}}</a-select-option>
          </a-select>
      </a-form-model-item>
    </a-form-model>
    <select-model
      ref="selectModel"
      :semester-data="semesterData"
      :visible="studentVisible"
      v-if="studentVisible"
      @cancel="handleSelectCancel"
      @ok="handleSelectOk"
      @select="handleSelectItem"
    ></select-model>
  </a-modal>
</template>
<script>
import selectModel from '@/views/jwManage/curriculas/components/selectModel'
import { getKCPageList } from '@/api/kw/veIntegration'
export default {
  name: 'students-filter-model',
  props: {
    semesterData: {
      type: Array,
      default: () => {
        return []
      },
    },
    xkmsData: {
      type: Array,
      default: () => {
        return []
      },
    },
    visible: {
      type: Boolean,
      required: true,
    },
    semId: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      form: {
        msid: undefined,
        stuname: '',
        semid: undefined,
      },
      studentVisible: false,
      courseData:[]
    }
  },
  created() {
    this.form.semid = this.simId;
    // this.getCourseList()
  },
  computed: {},
  components: {
    selectModel,
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handleOk() {
      this.$emit('ok',this.form)
    },
    // 筛选回调
    handleSelectOk(val) {
      this.studentVisible = false;

    },
    // 筛选取消
    handleSelectCancel() {
      this.studentVisible = false
    },

    handleSelect() {
      this.studentVisible = true
    },

    // 选中
    handleSelectItem(name){
      this.form.stuname = name;
    },

    // 获取课程
    getCourseList(){
      let params ={
        pageNo:1,
        pageSize:1000,
      }
      getKCPageList(params).then(res => {
        if(res.code == 200){
          this.courseData = res.result.list || []
        }
      })
    },

    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
  },
}
</script>
<style scoped>
:global(.ant-form-item) {
  margin-bottom: 0;
}
</style>
