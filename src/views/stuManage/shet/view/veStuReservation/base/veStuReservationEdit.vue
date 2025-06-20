<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuReservationDataForm" :rules="veStuReservationRules" :model="veStuReservationVo" labelAlign="right">
        <a-form-model-item label="场地名称" prop="cdId" required>
          <edu-data v-model="veStuReservationVo.cdId" stype="select" :datas="cdList" textKey="name" style="width:300px" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="社团名称" prop="assocId" required>
          <edu-data v-model="veStuReservationVo.assocId" stype="select" :datas="shetList" textKey="name" style="width:300px" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="限制人数" prop="limitNum" required>
          <a-input-number v-model="veStuReservationVo.limitNum" placeholder="请输入" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="开始时间" prop="statusTime" required>
			<DatePickByCN  v-model="veStuReservationVo.statusTime"  placeholder="请选择开始时间"/>
        </a-form-model-item>
        <a-form-model-item label="结束时间" prop="endTime" required>
			<DatePickByCN  v-model="veStuReservationVo.endTime"  placeholder="请选择结束时间"/>
        </a-form-model-item>
        <a-form-model-item label="预约介绍" prop="yyRemark" required>
          <a-textarea v-model="veStuReservationVo.yyRemark" :rows="4" :maxLength="65535" placeholder="请输入预约介绍" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuReservationApi from '@/views/stuManage/shet/api/veStuReservationApi';

export default {
  props: {
    cdList: Array,
    shetList: Array
  },
  components: {},
  data() {
    const data = {
      veStuReservationVo: this.resetveStuReservationVo(),
      textMap: {
        update: '编辑-预约',
        create: '新增-预约'
      },
      dialogStatus: 'create',
      veStuReservationRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuReservationVo() {
      return {
        cdId: '', //
        assocId: '', //
        cdName: '', // 场地名称
        limitNum: '', // 限制人数
        statusTime: '', // 开始时间
        endTime: '', // 结束时间
        status: 1, // 状态（1：启用，0：禁用）
        authPersonId: '', // 审核人ID
        authPersonName: '', // 审核人
        authStatus: 2, // 审核状态(1通过，0不通过，2未审核)
        auditReason: '', // 不通过原因
        yyRemark: '', // 预约说明
        auditLevel: '' // 审核级别 1会长 2 副会长 3 指定审核人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuReservationVo = this.resetveStuReservationVo();
      this.$nextTick(() => {
        this.$refs.veStuReservationDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuReservationApi.get(row.id).then(res => {
        this.veStuReservationVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuReservationDataForm.clearValidate();
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.veStuReservationVo);

      const cdInfo = this.$utils.getInArr(this.cdList, 'id', tempData.cdId);
      tempData.cdName = cdInfo.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuReservationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuReservationApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veStuReservationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuReservationApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
