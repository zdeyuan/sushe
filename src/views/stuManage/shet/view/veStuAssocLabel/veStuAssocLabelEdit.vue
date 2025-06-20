<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuAssocLabelDataForm" :rules="veStuAssocLabelRules" :model="veStuAssocLabelVo" labelAlign="right">
        <a-form-model-item label="名称" prop="name" required>
          <a-input v-model="veStuAssocLabelVo.name" :maxLength="50" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuAssocLabelVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuAssocLabelApi from '@/views/stuManage/shet/api/veStuAssocLabelApi';

export default {
  components: {},
  data() {
    const data = {
      veStuAssocLabelVo: this.resetveStuAssocLabelVo(),
      textMap: {
        update: '编辑-社团标签',
        create: '新增-社团标签'
      },
      dialogStatus: 'create',
      veStuAssocLabelRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocLabelVo() {
      return {
        name: '', // 名称
        addTime: this.$date.format('YYYY-MM-DD'), // 创建时间
        status: '' // 状态  1=启用 0=禁用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuAssocLabelVo = this.resetveStuAssocLabelVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocLabelDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocLabelApi.get(row.id).then(res => {
        this.veStuAssocLabelVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuAssocLabelDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuAssocLabelVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocLabelDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuAssocLabelApi.add(subData).then(res => {
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
      this.$refs.veStuAssocLabelDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuAssocLabelApi.update(subData).then(() => {
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
