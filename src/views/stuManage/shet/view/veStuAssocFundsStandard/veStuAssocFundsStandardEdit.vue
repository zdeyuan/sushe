<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuAssocFundsStandardDataForm" :rules="veStuAssocFundsStandardRules" :model="veStuAssocFundsStandardVo" labelAlign="right">
        <a-form-model-item label="学期" prop="semesterId" required>
          <termList v-model="veStuAssocFundsStandardVo.semesterId" />
        </a-form-model-item>
        <a-form-model-item label="缴费名称" prop="name" required>
          <a-input v-model="veStuAssocFundsStandardVo.name" :maxLength="50" placeholder="请输入缴费名称" />
        </a-form-model-item>
        <a-form-model-item label="应缴费金额" prop="money" required>
          <a-input-number v-model="veStuAssocFundsStandardVo.money" :min="0" placeholder="请输入应缴费金额" style="width:300px" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuAssocFundsStandardApi from '@/views/stuManage/shet/api/veStuAssocFundsStandardApi';
import termList from '@/components/termList';

export default {
  components: { termList },
  data() {
    const data = {
      veStuAssocFundsStandardVo: this.resetveStuAssocFundsStandardVo(),
      textMap: {
        update: '编辑-社团缴费标准',
        create: '新增-社团缴费标准'
      },
      dialogStatus: 'create',
      veStuAssocFundsStandardRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocFundsStandardVo() {
      return {
        semesterId: '', // 学期id
        name: '', // 缴费名称
        money: '', // 应缴费金额
        addTime: this.$date.format('YYYY-MM-DD') // 创建时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuAssocFundsStandardVo = this.resetveStuAssocFundsStandardVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsStandardDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocFundsStandardApi.get(row.id).then(res => {
        this.veStuAssocFundsStandardVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsStandardDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuAssocFundsStandardVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocFundsStandardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuAssocFundsStandardApi.add(subData).then(res => {
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
      this.$refs.veStuAssocFundsStandardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuAssocFundsStandardApi.update(subData).then(() => {
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
