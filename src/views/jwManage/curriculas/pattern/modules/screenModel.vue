<template>
  <a-modal :title="title" :width="width" @cancel="handleCancel" :visible="visible">
    <template slot="footer">
      <a-button key="back" @click="handleReset">
        清空
      </a-button>
      <a-button key="submit" type="primary" @click="handleOk">
        确定
      </a-button>
    </template>
    <a-button
      style="background-color: #00BAD0;color: #FFFFFF;margin-bottom: 15px;margin-left: 25px"
      @click="handleAddCounse"
    >
      <IconFont style="font-weight: bold;" type="iconjiahao" />
      添加科目
    </a-button>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-row>
        <a-col :span="12">
          <a-form-item label="选课模式" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="form.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col v-for="(item, i) in courseSource" :key="item.id || i" :span="12">
          <a-form-item
            :key="item.id || i"
            :label="'课程' + NoToChinese(i + 1)"
            :prop="i ? undefined : 'course'"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 15 }"
          >
            <div class="course-item">
              <a-input :value="item.kcmc" readonly />
              <a-button type="primary" size="small" icon="search" @click="handleCourseSearch(i)"></a-button>
              <a-button type="danger" size="small" icon="minus-square" @click="handleCourseDelete(i)"></a-button>
            </div>
          </a-form-item>
          <!-- <a-form-item :label="'课程' + NoToChinese(i + 1)" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input />
            </a-form-item> -->
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="创建时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
            <a-range-picker v-model="createtime" allowClear @change="onCreateTimeChange" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="最后修改时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
            <a-range-picker v-model="updatetime" allowClear @change="onUpdateTimeChange" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="创建者名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
            <a-input allowClear v-model="form.createusername" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <course-search-model ref="CourseSearchModel" @select="handleCourseSelect" />
  </a-modal>
</template>
<script>
import { IconFont } from '@/cas/ico'
import { NoToChinese } from '@/utils/util'
import CourseSearchModel from './courseModel'

export default {
  name: 'screenModel',
  components: {
    IconFont,
    CourseSearchModel
  },
  data() {
    return {
      width: 900,
      title: '',
      visible: false,
      form: {},
      courseSource: [],
      createtime: null,
      updatetime: null,
      targetIndex: undefined
    }
  },
  created() {
    this.initcourseDefaulit()
  },
  methods: {
    NoToChinese,
    initcourseDefaulit() {
      const courseSource = []
      for (let index = 0; index < 6; index++) {
        courseSource.push({
          id: undefined,
          kcmc: ''
        })
      }
      // this.$set(this, 'courseSource', courseSource)
      this.courseSource = courseSource
    },
    handleReset() {
      this.form = {}
      this.courseSource = []
      this.initcourseDefaulit()
      this.updatetime = null
      this.createtime = null
    },
    handleCancel() {
      this.visible = false
    },
    scre() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
      let kc = []
      this.courseSource.forEach(item => {
        const { id } = item
        if (id) {
          kc.push(id)
        }
      })
      const data = { ...this.form, kc: kc.join(',') }
      this.$emit('filter', data)
    },
    handleAddCounse() {
      this.courseSource.push({
        id: undefined,
        kcmc: undefined
      })
    },
    handleCourseDelete(index) {
      this.courseSource.splice(index, 1)
    },
    onCreateTimeChange(date, dateString) {
      if (date.length) {
        this.form.createtimestart = dateString[0]
        this.form.createtimeend = dateString[1]
      }
    },
    onUpdateTimeChange(date, dateString) {
      if (date.length) {
        this.form.updatetimestart = dateString[0]
        this.form.updatetimeend = dateString[1]
      }
    },
    handleCourseSearch(index) {
      this.targetIndex = index
      this.$refs.CourseSearchModel.show()
    },
    handleCourseSelect(data) {
      const { id, kcmc } = data
      this.$set(this.courseSource, this.targetIndex, { kcmc, id })
    }
  }
}
</script>
<style scoped>
.course-item {
  display: flex;
  align-items: center;
}
.course-item > button {
  margin-left: 4px;
  opacity: 0.6;
}
</style>
