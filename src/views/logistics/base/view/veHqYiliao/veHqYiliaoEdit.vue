<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqYiliaoDataForm" :rules="veHqYiliaoRules" :model="veHqYiliaoVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="患者姓名" class="ytop" prop="patient" required>
              <a-input v-model="veHqYiliaoVo.patient" :maxLength="20" placeholder="请输入患者姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="医疗时间" class="ytop" prop="ylTime" required>
				<DatePickByCN
				   v-model="veHqAnbaoVo.ylTime"
				  placeholder="请选择医疗时间"  />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="医疗原因" prop="ylyy">
          <a-textarea v-model="veHqYiliaoVo.ylyy" :maxLength="300" placeholder="请输入医疗原因" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="医疗人员" prop="hqUserId" required>
          <hqUserSelect width="300px" v-model="veHqYiliaoVo.hqUserId" hqUserType="1"></hqUserSelect>
        </a-form-model-item>
        <a-form-model-item label="是否校外治疗" prop="sfxw">
          <edu-data v-model="veHqYiliaoVo.sfxw" stype="radio" code="shifou" />
        </a-form-model-item>
        <a-form-model-item label="医疗地址" prop="address" required>
          <a-input v-model="veHqYiliaoVo.address" :maxLength="100" placeholder="请输入医疗地址" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veHqYiliaoVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqYiliaoApi from '@/views/logistics/base/api/veHqYiliaoApi';
import hqUserSelect from '@/components/kqManageComponent/hqUserSelect';

export default {
  components: { hqUserSelect },
  data() {
    const data = {
      veHqYiliaoVo: this.resetveHqYiliaoVo(),
      textMap: {
        update: '医疗记录',
        create: '医疗记录'
      },
      dialogStatus: 'create',
      veHqYiliaoRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqYiliaoVo() {
      return {
        patient: '', // 患者姓名
        ylTime: '', // 医疗时间
        ylyy: '', // 医疗原因
        hqUserId: '', // 医疗人员
        sfxw: 1, // 是否校外治疗：1=是，0=否
        address: '', // 医疗地址
        remark: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqYiliaoVo = this.resetveHqYiliaoVo();
      this.$nextTick(() => {
        this.$refs.veHqYiliaoDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqYiliaoApi.get(row.id).then(res => {
        this.veHqYiliaoVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqYiliaoDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqYiliaoVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqYiliaoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqYiliaoApi.add(subData).then(res => {
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
      this.$refs.veHqYiliaoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqYiliaoApi.update(subData).then(() => {
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
