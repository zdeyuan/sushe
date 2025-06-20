<template>
  <a-modal class="edu-form-size" :width="width" title="审核" okText="确定" cancel-text="取消" @cancel="handleCancel" @ok="handleOk" :visible="visible$1">
	 
    <a-form-model  :model="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
		<a-row>
			<a-col :span="12">
				<a-form-model-item label="原上课日期" class="ytop"  >
					{{form.yskrq}}
				</a-form-model-item>
			</a-col>
			<a-col :span="12">
				<a-form-model-item label="新上课日期" class="ytop"  >
					{{form.xskrq}}
				</a-form-model-item>
			</a-col>
				<a-col :span="12">
					<a-form-model-item label="原上课周" class="ytop"  >
						{{'星期' + this.digital2Chinese(form.yweek, 'week') }}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="新上课周" class="ytop"  >
						{{'星期' + this.digital2Chinese(form.xweek, 'week') }}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="原上课节" class="ytop"  >
						{{this.digital2ChineseS(form.section)}}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="新上课节" class="ytop"  >
						{{this.digital2ChineseS(form.xsection)}}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="原上课教室" class="ytop"  >
						{{form.jsmc}}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="新上课教室" class="ytop"  >
						{{form.xjsmc}}
					</a-form-model-item>
				</a-col>
				<a-col :span="24">
					<a-form-model-item label="上课教学班" class="ytop"  >
						{{form.bjmc}}
					</a-form-model-item>
				</a-col>
				<a-col :span="24">
					<a-form-model-item label="课程名称" class="ytop"  >
						{{form.kcmc}}
					</a-form-model-item>
				</a-col>
				<a-col :span="24">
					<a-form-model-item label="申请老师名称" class="ytop"  >
						{{teacherDetail ? teacherDetail.xm : ''}}
					</a-form-model-item>
				</a-col>
				<a-col :span="24">
					<a-form-model-item label="审核状态">
					  <a-radio-group name="radioGroup" v-model="form.verifyStatus">
					    <a-radio :value="1">通过</a-radio>
					    <a-radio :value="2">未通过</a-radio>
					  </a-radio-group>
					</a-form-model-item>
				</a-col>
				<a-col :span="24">
					<a-form-model-item label="不通过原因" v-if="form.verifyStatus==2">
					  <a-textarea v-model="form.verifyreason" auto-size style="width: 100%" />
					</a-form-model-item>
				</a-col>
		</a-row>
      
      
    </a-form-model>
  </a-modal>
</template>
<script>
import { apiScheduleClassSwitchTiaoke } from '@/api/schedule/index'
import apiBaseCommonVeCommon from '@/api/base/common-veCommon.js';
export default {
  name: 'TiaokeAudit',
  props: {
    visible: { type: Boolean },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      width: 800,
      teacherDetail: null,
      form: {},
    }
  },
  created() {},
  watch: {
    visible(n) {
      if (n) {
        this.form = { ...this.data }
        this.getTeacherDetail()
      } else {
        this.teacherDetail = null
      }
    },
  },
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
  methods: {
	 digital2ChineseS(num) {
	       const character =['一','二', '三', '四', '五', '六','七','八','九','晚自习第一节','晚自习第二节','晚自习第三节'];
	       return  `第${character[num-1]}节`;
	     },
	  digital2Chinese(num, identifier) {
	  	    const character = ['一','二', '三', '四', '五', '六','日'];
	  	    return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num-1];
	  	  },
    handleCancel() {
      this.visible$1 = false
    },
    handleOk() {
      const params = { ...this.form }
      apiScheduleClassSwitchTiaoke.update(params).then((res) => {
        this.$message.success('审核成功')
        this.visible$1 = false
        this.$emit('success-callback')
      })
    },
    getTeacherDetail() {
      if (!this.data) {
        return
      }
      const params = {userId: this.data.teacherid}
      apiBaseCommonVeCommon.queryTeacherByUserId(params).then(res => {
        this.teacherDetail = res.result
      })
    }
  },
}
</script>
<style scoped lang="less">
:global {
  .ant-form-item {
    margin-bottom: 0;
    display: inline-block;
    width: 50%;
  }
  .ant-modal-header {
    background-color: #00a0e9;
  }
}

 .edu-form-size .ant-form .ant-form-item:first-child{
	border-top-width:0!important;
	//border-right-width:0!important;
}
</style>
