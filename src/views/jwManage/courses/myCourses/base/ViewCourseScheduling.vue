<template>
  <div>
    <a-modal title="详情" width="790px"
               :visible.sync="dialogVisible"
               :before-close="handleClose" >
      <a-form ref="form" :model="form" inline label-width="80px" class="tams-form-container">
        <a-form-item label="日期">
          <a-input v-model="form.date" class="tams-form-item" readonly></a-input>
        </a-form-item>
        <a-form-item label="教室">
          <a-input v-model="form.classroomName" class="tams-form-item" readonly></a-input>
        </a-form-item>
        <a-form-item label="课程">
          <a-input v-model="form.courseName" class="tams-form-item" readonly></a-input>
        </a-form-item>
        <a-form-item label="老师">
          <a-input v-model="form.teacherName" class="tams-form-item" readonly></a-input>
        </a-form-item>
        <a-form-item label="上课时间">
          <a-input v-model="form.attendTime" class="tams-form-item" readonly></a-input>
        </a-form-item>
        <a-form-item label="下课时间">
          <a-input v-model="form.finishTime" class="tams-form-item" readonly></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- <UpdateCourseScheduling :visible="updateCourseSchedulingVisible"
                            :id="id"
                            @on-success="updateSuccess"
                            @on-close="updateCourseSchedulingVisible=false"></UpdateCourseScheduling> -->
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'ViewCourseScheduling',
  components: {  },
  props: {
    visible: {
      type: Boolean
    },
    id: [Number, String]
  },
  data () {
    return {
      dialogVisible: false,
      updateCourseSchedulingVisible: false,
      form: {}
    }
  },
  methods: {
	  updateCourse(){
		  
	  },
    search () {
    },
    remove () {
      this.RemoveCourseSchedulingById(this.id).then((res) => {
        this.$emit('on-success')
        this.dialogVisible = false
      }).catch(() => {
      })
    },
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      done()
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    updateSuccess () {
      this.$emit('on-success')
      this.search()
      this.updateCourseSchedulingVisible = false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.search()
        this.dialogVisible = val
      }
    }
  }
}
</script>
