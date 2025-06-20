<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuAssocActivityTypeDataForm" :rules="veStuAssocActivityTypeRules" :model="veStuAssocActivityTypeVo" labelAlign="right">
        <a-form-model-item label="活动类型名称" prop="name" required>
          <a-input v-model="veStuAssocActivityTypeVo.name" :maxLength="50" placeholder="请输入活动类型名称" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuAssocActivityTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityTypeApi from '@/views/stuManage/shet/api/veStuAssocActivityTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuAssocActivityTypeVo: this.resetveStuAssocActivityTypeVo(),
      textMap: {
        update: '编辑-社团活动类型',
        create: '新增-社团活动类型'
      },
      dialogStatus: 'create',
      veStuAssocActivityTypeRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocActivityTypeVo() {
      return {
        name: '', // 活动类型名称
        status: 1 // 状态 1=启用  0=禁用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuAssocActivityTypeVo = this.resetveStuAssocActivityTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocActivityTypeApi.get(row.id).then(res => {
        this.veStuAssocActivityTypeVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuAssocActivityTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocActivityTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuAssocActivityTypeApi.add(subData).then(res => {
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
      this.$refs.veStuAssocActivityTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuAssocActivityTypeApi.update(subData).then(() => {
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
