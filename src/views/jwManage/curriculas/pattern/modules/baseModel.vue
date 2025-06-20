<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible$1"
    placement="right"
    okText="确定"
    cancel-text="取消"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-model-item label="图片" prop="imgurl">
        <image-upload text="上传" v-model="form.imgurl" />
        <!-- <j-image-upload text="上传" v-model="form.imgurl" /> -->
      </a-form-model-item>
      <a-form-model-item label="模式名称" prop="name">
        <a-input v-model="form.name" :disabled="isDisabled" />
      </a-form-model-item>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="最低限制人数" prop="minlimit" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input-number v-model="form.minlimit" :min="0" :disabled="isDisabled" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="最高限制人数" prop="maxlimit" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input-number v-model="form.maxlimit" :min="0" :disabled="isDisabled" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="学期">
        <a-select v-model="form.semid" @change="handleSelectChange" :disabled="isDisabled">
          <a-select-option v-for="item in semesters" :key="item.id" :value="item.id">
            {{ item.xqmc }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-for="(item, i) in courseSource"
        :key="item.id || i"
        :label="'课程' + NoToChinese(i + 1)"
        :prop="i ? undefined : 'course'"
      >
        <div class="course-item">
          <!-- <j-dict-select-tag
            type="list"
            v-decorator="['kcid']"
            :trigger-change="true"
            dictCode="edu_dev.ve_jw_kecheng,KCMC,id"
          /> -->
          <a-input :value="item.kcmc" :disabled="isDisabled" />
          <a-button type="primary" size="small" icon="search" @click="handleCourseSearch(i)"></a-button>
          <a-button type="danger" size="small" icon="minus-square" @click="handleCourseDelete(i)"></a-button>
        </div>
      </a-form-model-item>
      <a-row v-show="!isDisabled">
        <a-button
          @click="handleAddCounse"
          style="background-color: #00BAD0;color: #FFFFFF;margin-left: 140px;margin-bottom: 12px"
          icon="plus"
        >
          添加课程
        </a-button>
      </a-row>
      <a-form-model-item label="描述">
        <a-textarea v-model="form.remark" :maxLength="100" row="4" allowClear :disabled="isDisabled" />
      </a-form-model-item>
    </a-form-model>
    <course-search-model ref="CourseSearchModel" @select="handleCourseSelect" />
  </a-modal>
</template>
<script>
import { apiScheduleClassChoiceXkms,apiScheduleClassChoiceXkmskc } from '@/api/schedule'
import { NoToChinese } from '@/utils/util'
import CourseSearchModel from './courseModel'
import ImageUpload from '@/views/jwManage/curriculas/components/ImageUpload'

const titles = ['添加', '编辑', '查看']
const baseForm = {
  id: undefined,
  imgurl: undefined,
  // imgurl: 'http://img.mp.sohu.com/upload/20170719/6b94542780844eb0b406d5935b015861_th.png',
  maxlimit: undefined,
  minlimit: undefined,
  name: undefined,
  remark: undefined,
  semid: undefined,
  semname: undefined
}

export default {
  name: 'BaseXKmsModel',
  components: {
    CourseSearchModel,
    ImageUpload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: { type: Object | undefined },
    semesters: {
      type: Array,
      default() {
        return []
      }
    },
    mode: { type: Number, default: 1 } // 1 添加/ 2 编辑/ 3 查看
  },
  data() {
    const validateCourseSelect = (rule, value, callback) => {
      for (let index = 0; index < this.courseSource.length; index++) {
        const item = this.courseSource[index]
        if (item.kcid) {
          return callback()
        }
      }
      callback(new Error('最少选择设置一门课程！'))
    }
    return {
      width: 860,
      editModel: true,
      form: { ...baseForm },
      // 课程数据
      courseSource: [],
      targetIndex: null,
      rules: {
        imgurl: [{ required: true, message: '请上传选课模式图片！', trigger: 'blur' }],
        name: [{ required: true, message: '请输入模式名称！', trigger: 'blur' }],
        maxlimit: [{ required: true, message: '请输入！', trigger: 'blur' }],
        minlimit: [{ required: true, message: '请输入！', trigger: 'blur' }],
        // course: [{ required: true, message: '最少选择设置一门课程！', trigger: 'blur' }],
        course: [{ required: true, validator: validateCourseSelect, trigger: 'blur' }]
      }
    }
  },
  computed: {
    visible$1: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    title() {
      return titles[this.mode - 1]
    },
    isDisabled() {
      return this.mode === 3
    }
  },
  watch: {
    visible(val) {
      if (!val) return
      if (this.mode === 1) {
        this.form = { ...baseForm }
        this.initcourseDefaulit()
      }
      if (this.mode === 2 || this.mode === 3) {
        this.initData()
      }
    }
  },
  created() {
    this.initcourseDefaulit()
  },
  methods: {
    NoToChinese,
    // 初始化默认课程数据
    initcourseDefaulit() {
      const courseSource = []
      for (let index = 0; index < 6; index++) {
        courseSource.push({
          id: undefined,
          kcid: undefined,
          kcmc: '',
          msid: undefined
        })
      }
      this.courseSource = courseSource
    },
    // 初始化查看修改数据
    initData() {
      this.form = { ...this.data }
      apiScheduleClassChoiceXkmskc.getPageList({ msid: this.data.id }).then(res => {
        const { success, result, message } = res
        if (!success) {
          return this.$message.warning(message)
        }
        this.courseSource = result.records
      })
    },
    handleCourseDelete(index) {
      if (this.courseSource.length === 1) {
        return this.$message.warning('请至少设置一门课程！')
      }
      this.courseSource.splice(index, 1)
    },
    handleCourseSearch(index) {
      this.targetIndex = index
      this.$refs.CourseSearchModel.show()
    },
    handleCancel() {
      // this.$refs.form.resetFields()
      this.visible$1 = false
    },
    handleAddCounse() {
      this.courseSource.push({
        id: undefined,
        kcid: undefined,
        kcmc: undefined,
        msid: undefined
      })
    },
    handleCourseSelect(data) {
      const { id, kcmc } = data
      this.$set(this.courseSource, this.targetIndex, { kcmc, kcid: id })
    },
    handleSelectChange(value) {
      const semesItem = this.semesters.find(item => item.id === value)
      this.form.semname = semesItem ? semname.xqmc : undefined
    },
    handleOk() {
      if (this.isDisabled) {
        this.visible$1 = false
        return
      }
      this.onSubmit()
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return
        }
        const data = { ...this.form }
        const isUpdated = !!this.form.id
        const action = isUpdated ? apiScheduleClassChoiceXkms.update : apiScheduleClassChoiceXkms.create
        const res = await action(data)
        const { success, message, result } = res
        if (!success) {
          return this.$message.warning(message)
        }
        const courseData = []
        this.courseSource.forEach(item => {
          const { kcid, kcmc, id } = item
          if (kcid) {
            courseData.push({
              id,
              kcid: kcid,
              kcmc: kcmc,
              msid: isUpdated ? this.form.id : result
            })
          }
        })
        const res2 = await apiScheduleClassChoiceXkmskc.saveBatch(courseData)
        if (!res2.success) {
          return this.$message.warning(res2.message)
        }
        this.$message.success('提交成功！')
        this.$emit('success')
        this.visible$1 = false
      })
    }
  }
}
</script>
<style scoped>
:global(.ant-form-item) {
  margin-bottom: 5px;
}
.course-item {
  display: flex;
  align-items: center;
}
.course-item > button {
  margin-left: 4px;
  opacity: 0.6;
}
</style>
