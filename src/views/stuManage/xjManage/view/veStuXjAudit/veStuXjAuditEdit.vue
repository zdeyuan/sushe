<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuXjAuditDataForm" :rules="veStuXjAuditRules" :model="veStuXjAuditVo" labelAlign="right">
        <a-form-model-item label="学生id" prop="stuId" required>
          <a-input v-model="veStuXjAuditVo.stuId" placeholder="请输入学生id" />
        </a-form-model-item>
        <a-form-model-item label="审核状态  0=待审核   1=审核通过  2=审核不通过" prop="auditStatus" required>
          <a-input v-model="veStuXjAuditVo.auditStatus" placeholder="请输入审核状态  0=待审核   1=审核通过  2=审核不通过" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuXjAuditApi from '@/views/stuManage/xjManage/api/veStuXjAuditApi';

export default {
  components: {},
  data() {
    const data = {
      veStuXjAuditVo: this.resetveStuXjAuditVo(),
      textMap: {
        update: '编辑-学生学籍审核',
        create: '新增-学生学籍审核'
      },
      dialogStatus: 'create',
      veStuXjAuditRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuXjAuditVo() {
      return {
        stuId: '', // 学生id
        info: '', // 学生学籍信息（序列化保存）
        auditStatus: '' // 审核状态  0=待审核   1=审核通过  2=审核不通过
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuXjAuditVo = this.resetveStuXjAuditVo();
      this.$nextTick(() => {
        this.$refs.veStuXjAuditDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuXjAuditApi.get(row.id).then(res => {
        this.veStuXjAuditVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuXjAuditDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuXjAuditVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuXjAuditDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuXjAuditApi.add(subData).then(res => {
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
      this.$refs.veStuXjAuditDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuXjAuditApi.update(subData).then(() => {
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
