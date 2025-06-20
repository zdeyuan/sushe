<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyProjectPlanDataForm" :rules="veJkyProjectPlanRules" :model="veJkyProjectPlanVo" labelAlign="right" width="40%">
        <a-form-model-item label="项目" prop="projectId">
          <jkyProjectSelect ref="jkyProjectSelect"></jkyProjectSelect>
        </a-form-model-item>
        <a-form-model-item label="项目计划名称" prop="title" required>
          <a-input v-model="veJkyProjectPlanVo.title" :maxLength="100" placeholder="请输入项目计划名称" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="remark" required>
          <a-textarea v-model="veJkyProjectPlanVo.remark" :maxLength="300" placeholder="请输入内容" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="项目计划附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="projectPlan" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectPlanApi from '@/api/research/rproject/veJkyProjectPlanApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import jkyProjectSelect from '@/components/kqManageComponent/jkyProjectSelect';
export default {
  components: { uploadFiles, jkyProjectSelect },
  data() {
    let validateProject = (rule, value, callback) => {
      const data = this.$refs.jkyProjectSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目'));
      }
    };
    const data = {
      veJkyProjectPlanVo: this.resetveJkyProjectPlanVo(),
      textMap: {
        update: '编辑-项目计划',
        create: '新增-项目计划'
      },
      dialogStatus: 'create',
      veJkyProjectPlanRules: { projectId: [{ validator: validateProject, trigger: 'change', required: true }] }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyProjectPlanVo() {
      return {
        createTime: '', // 提交时间
        textId: '', // 内容id
        title: '', // 主题
        fileId: '', // 附件id
        projectId: '', // 项目id
        remark: '', // 内容
        checkTxt: '', // 不发布原因
        checkUserId: '' // 发布人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyProjectPlanVo = this.resetveJkyProjectPlanVo();
      this.$nextTick(() => {
        this.$refs.veJkyProjectPlanDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyProjectPlanApi.get(row.id).then(res => {
        this.veJkyProjectPlanVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.jkyProjectSelect.setValueObj([
          {
            id: row.projectId,
            name: row.projectName
          }
        ]);
        this.$refs.veJkyProjectPlanDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyProjectPlanVo);
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      tempData.projectId = this.$refs.jkyProjectSelect.getValue()[0];
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyProjectPlanDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyProjectPlanApi.add(subData).then(res => {
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
      this.$refs.veJkyProjectPlanDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyProjectPlanApi.update(subData).then(() => {
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
