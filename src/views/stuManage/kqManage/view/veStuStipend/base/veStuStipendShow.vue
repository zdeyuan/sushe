<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13 22:30:22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 10:10:42
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="助学金信息详情" @cancel="handelCancel" @ok="audit">
      <a-form-model ref="veStuStipendDataForm" :model="subData" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="助学金类型">
              {{ veStuStipendVo.typeName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="申请时间">
          {{ veStuStipendVo.applyTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veStuStipendVo.content }}
        </a-form-model-item>
        <a-form-model-item label="申请材料">
          <uploadFiles ref="uploadFiles" edit serviceType="veStuStipend"></uploadFiles>
        </a-form-model-item>
        <a-form-model-item label="审核状态" prop="auditStatus" >
         {{ veStuStipendVo.auditStatus==1?'通过':'不通过' }}
        </a-form-model-item>
        <a-form-model-item v-if="veStuStipendVo.auditStatus == 2" label="未通过原因" prop="auditReason" >
			{{veStuStipendVo.auditReason}}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuStipendApi from '../../../api/veStuStipendApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veStuStipendVo: {},
      subData: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuStipendVo = Object.assign({}, row);
      this.$refs.uploadFiles.setValue(row.id);
      //    veStuStipendApi.get(row.id).then((res) => {
      //      this.veStuStipendVo = res.result
      // });
    },
    /**
     * @msg: 调用Api创建数据
     */
    audit(status) {
      this.$refs.veStuStipendDataForm.validate(valid => {
        if (valid) {
          this.subData.ids = [this.veStuStipendVo.id];
          veStuStipendApi.audit(this.subData).then(res => {
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
