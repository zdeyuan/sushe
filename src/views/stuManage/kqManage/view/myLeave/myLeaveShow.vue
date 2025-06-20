<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="请假信息详情" @cancel="handelCancel" @ok="audit" :isShowBtnSure="showType!='show'">
      <a-form-model ref="veStuLeaveDataForm" :model="subData"  labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="学生姓名">
              {{ veStuLeaveVo.name }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="学生学号">
              {{ veStuLeaveVo.code }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="请假类型">
              <edu-dict-text code="levelType" :value="veStuLeaveVo.type"></edu-dict-text>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="申请时间">
              {{ veStuLeaveVo.createDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="开始时间">
              {{ veStuLeaveVo.startTime }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="结束时间">
              {{ veStuLeaveVo.endTime }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="请假原因">
          {{ veStuLeaveVo.content }}
        </a-form-model-item>
        <a-form-model-item label="审核状态" prop="auditStatus" required >
          <edu-data v-model="veStuLeaveVo.auditStatus" stype="radio" code="auditStatus" v-if="showType!='show'"/>
		  <edu-dict-text :value="veStuLeaveVo.auditStatus" code="fundAudit" v-else ></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item v-if="veStuLeaveVo.auditStatus == 2" label="未通过原因" prop="auditReason" required>
          <a-textarea v-model="veStuLeaveVo.auditReason" :maxLength="300" placeholder="请输入未通过原因" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLeaveApi from '../../api/veStuLeaveApi';

export default {
  components: {},
  data() {
    const data = {
      subData: {},
      veStuLeaveRules: [],
      veStuLeaveVo: {},
	  showType:''
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row,type) {
	  this.showType=type;
      this.veStuLeaveVo = Object.assign({}, row);
      //    veStuLeaveApi.get(row.id).then((res) => {
      //      this.veStuLeaveVo = res.result
      // });
    },
    /**
     * @msg: 调用Api创建数据
     */
    audit(status) {
      this.$refs.veStuLeaveDataForm.validate(valid => {
        if (valid) {
          this.subData.id = this.veStuLeaveVo.id;
          veStuLeaveApi.audit(this.subData).then(res => {
            this.$notification.success({
              message: '审核' + status == 1 ? '通过' : '不通过',
              description: '审核了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
