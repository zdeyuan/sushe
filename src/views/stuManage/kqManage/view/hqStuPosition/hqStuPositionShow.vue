<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="职位信息详情"  @ok="handelApply" sureText="申请"  @cancel="handelCancel">
      <a-form-model ref="hqStuPositionDataForm" labelAlign="right">
        <a-form-model-item label="职位名称">
          {{ hqStuPositionVo.title }}
        </a-form-model-item>
        <a-form-model-item label="需要人数">
          {{ hqStuPositionVo.num }}
        </a-form-model-item>
        <a-form-model-item label="已批人数">
          {{ hqStuPositionVo.hasNum }}
        </a-form-model-item>
        <a-form-model-item label="薪资">
          {{ hqStuPositionVo.money }}
        </a-form-model-item>
        <a-form-model-item label="职位要求描述">
          {{ hqStuPositionVo.requirement }}
        </a-form-model-item>
        <a-form-model-item label="工作内容描述">
          {{ hqStuPositionVo.content }}
        </a-form-model-item>
        <a-form-model-item label="是否需要面试">
          {{ hqStuPositionVo.isView==1?'是':'否' }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
	<a-modal
	      :visible="applyModal"
	      title="申请职位"
		  okText="确认"
		  cancelText="取消"
	      @ok="applyOk"
	      @cancel="applyCancel"
	    >
	      <!-- 多行文本输入框 -->
	      <a-textarea
	        v-model="applyObj.content"
	        placeholder="请输入申请说明"
	        :auto-size="{ minRows: 3, maxRows: 5 }"
	      />
	    </a-modal>
  </div>
</template>

<script>
import hqStuPositionApplyApi from '../../api/hqStuPositionApplyApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuPositionVo: {},
	  applyObj:{},
	  applyModal:false
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuPositionVo = Object.assign({}, row);
      //    hqStuPositionApi.get(row.id).then((res) => {
      //      this.hqStuPositionVo = res.result
      // });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
	handelApply(){
		this.applyModal=true;
	},
	applyOk(){
		this.applyObj.positionId=this.hqStuPositionVo.id;
		hqStuPositionApplyApi.add(this.applyObj).then((res) => {
			this.$notification.success({
			  message: '申请成功'
			});
			this.applyModal=false;
			this.$emit('onCancel');
		});
	},
	applyCancel(){
		this.applyModal=false;
	}
  }
};
</script>
<style lang="less" scoped></style>
