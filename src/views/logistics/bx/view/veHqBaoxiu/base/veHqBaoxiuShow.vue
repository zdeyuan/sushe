<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-05 11:36:43
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-07-20 16:58:04
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="a-报修记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqBaoxiuDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品名称" class="ytop">
              {{ veHqBaoxiuVo.name }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="维修地点" class="ytop">
              {{ veHqBaoxiuVo.place }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="备注">
          {{ veHqBaoxiuVo.remark }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="申请人">
              {{ veHqBaoxiuVo.applyUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="申请时间">
              {{ veHqBaoxiuVo.createDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="审核人" v-if="veHqBaoxiuVo.pjUserName">
          {{ veHqBaoxiuVo.pjUserName }}
        </a-form-model-item>
        <a-form-model-item label="审核意见" v-if="veHqBaoxiuVo.auditRemark">
          {{ veHqBaoxiuVo.auditRemark }}
        </a-form-model-item>

        <a-form-model-item label="维修人" v-if="veHqBaoxiuVo.jbUserName">
          {{ veHqBaoxiuVo.jbUserName }}
        </a-form-model-item>
        <a-form-model-item label="情况描述" v-if="veHqBaoxiuVo.wxRemark">
          {{ veHqBaoxiuVo.wxRemark }}
        </a-form-model-item>

        <a-form-model-item label="维修状态">
          <edu-dict-text code="bxStatus" :value="veHqBaoxiuVo.status"></edu-dict-text>
        </a-form-model-item>

        <template v-if="viewType == 'audit'">
          <div class="detail_title" style="margin-top:15px">报修审核</div>
          <div class="card_content">
            <a-form-model-item label="维修人员" prop="jsUser">
              <userSelectBox ref="jsUser"></userSelectBox>
            </a-form-model-item>
            <a-form-model-item label="意见" prop="jsUser">
              <a-textarea v-model="spyj" :rows="4" :maxLength="65535" placeholder="请输入审批意见" />
            </a-form-model-item>

            <div class="decision" style="padding:15px 0" align="right">
              <a-button type="primary" style="margin-right:15px" @click="audit(2)">确定指派</a-button>
              <a-button type="danger" @click="reject(0)">
                驳 回
              </a-button>
            </div>
          </div>
        </template>

        <template v-if="viewType == 'back'">
          <div class="detail_title" style="margin-top:15px">报修反馈</div>
          <div class="card_content">
            <a-form-model-item label="说明" prop="jsUser">
              <a-textarea v-model="spyj" :rows="4" :maxLength="65535" placeholder="请输入维修说明" />
            </a-form-model-item>
            <div class="decision" style="padding:15px 0" align="right">
              <a-button type="primary" style="margin-right:15px" @click="reject(3)">完 成</a-button>
              <a-button type="danger" @click="reject(4)">
                未完成
              </a-button>
            </div>
          </div>
        </template>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqBaoxiuApi from '@/views/logistics/bx/api/veHqBaoxiuApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';

export default {
  components: { userSelectBox },
  data() {
    const data = {
      veHqBaoxiuVo: {},
      viewType: 'show',
      spyj: ''
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row, type) {
      this.viewType = type || 'show';
      this.veHqBaoxiuVo = Object.assign({}, row);
      //    veHqBaoxiuApi.get(row.id).then((res) => {
      //      this.veHqBaoxiuVo = res.result
      // });
    },
    audit() {
      const tempData = {
        id: this.veHqBaoxiuVo.id
      };
      const userData = this.$refs.jsUser.getObj();
      if (!userData) {
        this.$message.error('请选择维修人员');
        return;
      }
      tempData.jsUser = userData.id;
      tempData.jbUserName = userData.name;
      tempData.auditRemark = this.spyj;
      tempData.status = 2;

      veHqBaoxiuApi.updateBaoxiu(tempData).then(res => {
        this.$message.success('指派成功');
        this.$emit('onOk');
      });
    },
    reject(status) {
      if (status == 0 && !this.spyj) {
        this.$message.error('请输入驳回原因');
        return;
      }
      if (status == 4 && !this.spyj) {
        this.$message.error('请输入未完成原因');
        return;
      }
      veHqBaoxiuApi
        .updateStatus({
          ids: [this.veHqBaoxiuVo.id],
          status: status,
          msg: this.spyj
        })
        .then(res => {
          this.$message.success('已驳回');
          this.$emit('onOk');
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
