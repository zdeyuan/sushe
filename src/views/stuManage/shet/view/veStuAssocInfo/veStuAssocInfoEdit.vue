<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuAssocInfoDataForm" :rules="veStuAssocInfoRules" :model="veStuAssocInfoVo" labelAlign="right">
        <a-form-model-item label="社团名称" prop="name" required>
          <a-input v-model="veStuAssocInfoVo.name" :maxLength="50" placeholder="请输入社团名称" />
        </a-form-model-item>

        <a-form-model-item label="负责人" prop="stuId">
          <stuSelect ref="stuSelect" :check="true"></stuSelect>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuAssocInfoApi from '@/views/stuManage/shet/api/veStuAssocInfoApi';
import stuSelect from '@/components/stuSelect';
export default {
  components: { stuSelect },
  data() {
    const data = {
      veStuAssocInfoVo: this.resetveStuAssocInfoVo(),
      textMap: {
        update: '编辑-学生社团信息',
        create: '新增-学生社团信息'
      },
      dialogStatus: 'create',
      veStuAssocInfoRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocInfoVo() {
      return {
        logo: '', // 社团logo
        name: '', // 社团名称
        intro: '', // 社团介绍
        status: 1, // 社团状态 1=启用 0=禁用
        addTime: this.$date.format('YYYY-MM-DD') // 创建时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuAssocInfoVo = this.resetveStuAssocInfoVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocInfoDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocInfoApi.get(row.id).then(res => {
        this.veStuAssocInfoVo = res.result;
        setTimeout(() => {
          this.$refs.stuSelect.setValue(res.result.userIds);
        }, 100);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuAssocInfoDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuAssocInfoVo);

      const stus = this.$refs.stuSelect.getValue();
      tempData.userIds = stus;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuAssocInfoApi.add(subData).then(res => {
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
      this.$refs.veStuAssocInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuAssocInfoApi.update(subData).then(() => {
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
