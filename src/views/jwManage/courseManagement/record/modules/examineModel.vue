<template>
  <div>
    <a-modal  class="edu-form-size" title="查看我的调课记录" :width="width" placement="right" okText="确定" cancel-text="取消" @cancel="handleCancel" :cancelButtonProps="{ style: { display: 'none' } }" @ok="handleOk" :visible="visible$1">
      <a-form-model :form="auditModel" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
		  <a-row>
		  	<a-col :span="12">
		  		<a-form-model-item label="原上课日期"   >
		  			{{auditModel.yskrq}}
		  		</a-form-model-item>
		  	</a-col>
		  	<a-col :span="12">
		  		<a-form-model-item label="新上课日期"   >
		  			{{auditModel.xskrq}}
		  		</a-form-model-item>
		  	</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="原上课周"   >
		  				{{'星期' + this.digital2Chinese(auditModel.yweek, 'week') }}
		  			</a-form-model-item>
		  		</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="新上课周"   >
						{{'星期' + this.digital2Chinese(auditModel.xweek, 'week') }}
		  			</a-form-model-item>
		  		</a-col>
				<a-col :span="12">
					<a-form-model-item label="原上课节" class="ytop"  >
						{{this.digital2ChineseS(auditModel.section)}}
					</a-form-model-item>
				</a-col>
				<a-col :span="12">
					<a-form-model-item label="新上课节" class="ytop"  >
						{{this.digital2ChineseS(auditModel.xsection)}}
					</a-form-model-item>
				</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="原上课教室"   >
		  				{{auditModel.jsmc}}
		  			</a-form-model-item>
		  		</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="新上课教室"   >
		  				{{auditModel.xjsmc}}
		  			</a-form-model-item>
		  		</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="审核状态"   >
						<edu-dict-text code="xjAuditStatus" :value="auditModel.verifyStatus"></edu-dict-text>
		  			</a-form-model-item>
		  		</a-col>
		  		<a-col :span="12">
		  			<a-form-model-item label="审核人"   >
		  				{{auditModel.verifyUser}}
		  			</a-form-model-item>
		  		</a-col>
				</a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
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
      auditModel: {},
    }
  },
  watch: {
    visible(n) {
      if (n) {
        this.auditModel = { ...this.data }
      }
    },
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
    },
	digital2Chinese(num, identifier) {
		    const character = ['一','二', '三', '四', '五', '六','日'];
		    return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num-1];
		  },
	digital2ChineseS(num) {
	       const character =['一','二', '三', '四', '五', '六','七','八','九','晚自习第一节','晚自习第二节','晚自习第三节'];
	       return  `第${character[num-1]}节`;
	     }
  },
}
</script>
<style lang="less" scoped>
 .edu-form-size .ant-col:nth-child(odd) {
	 .ant-form-item{
		&:first-child{
			border-right-width:0!important;
		}
		
	}
}
</style>
