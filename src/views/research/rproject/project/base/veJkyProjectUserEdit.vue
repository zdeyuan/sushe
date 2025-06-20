<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[viewType]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model
        ref="veJkyProjectUserDataForm"
        :rules="veJkyProjectUserRules"
        :model="veJkyProjectUserVo"
        labelAlign="right"
        top="20%"
        width="40%"
      >
        <a-form-model-item label="项目成员" prop="jkyUserId">
          <template v-if="viewType === 'create'">
            <jkyUserSelect ref="jkyUserSelect" :check="true"></jkyUserSelect>
          </template>
          <span v-else> {{ veJkyProjectUserVo.userName }}</span>
        </a-form-model-item>
        <a-form-model-item label="项目名称" prop="projectId">
          {{ projectVo.name }}
        </a-form-model-item>
        <a-form-model-item label="主要工作及描述" prop="textId" required>
          <a-textarea v-model="veJkyProjectUserVo.textId" :maxLength="300" placeholder="请输入主要工作及描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectUserApi from '@/api/research/rproject/veJkyProjectUserApi';
import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';
export default {
  components: { jkyUserSelect },
  data() {
    const data = {
      veJkyProjectUserVo: this.resetveJkyProjectUserVo(),
      textMap: {
        update: '编辑-科研项目成员',
        create: '新增-科研项目成员'
      },
      viewType: 'create',
      veJkyProjectUserRules: {},
      projectVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyProjectUserVo() {
      return {
        status: 1,
        jkyUserId: '', // 用户id
        projectId: '', // 项目id
        textId: '' // 主要工作及描述
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(projectVo) {
      this.viewType = 'create';
      this.veJkyProjectUserVo = this.resetveJkyProjectUserVo();
      this.projectVo = projectVo;
      this.$nextTick(() => {
        this.$refs.veJkyProjectUserDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row, projectVo) {
      this.projectVo = projectVo;
      veJkyProjectUserApi.get(row.id).then(res => {
        this.veJkyProjectUserVo = res.result;
        this.veJkyProjectUserVo.userName = row.userName;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.jkyUserSelect.setValue([row.jkyUserId]);
        this.$refs.veJkyProjectUserDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyProjectUserVo);
      tempData.projectId = this.projectVo.id;
      if (isUpdate) {
        //
      } else {
        tempData.userIds = this.$refs.jkyUserSelect.getValue();
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyProjectUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyProjectUserApi.add(subData).then(res => {
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
      this.$refs.veJkyProjectUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyProjectUserApi.update(subData).then(() => {
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
