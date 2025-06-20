<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="科研成果详情" @cancel="handelCancel" :isShowBtnSure="false">
      <a-form-model ref="veJkyGainDataForm" labelAlign="right" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <div class="detail_title">基本信息</div>
        <a-form-model-item label="项目编号" prop="serial">
          {{ veJkyGainVo.serial }}
        </a-form-model-item>
        <a-form-model-item label="项目名称" prop="name">
          {{ veJkyGainVo.projectName }}
        </a-form-model-item>
        <a-form-model-item label="项目成果名称" prop="name" required>
          {{ veJkyGainVo.name }}
        </a-form-model-item>
        <a-form-model-item label="项目成果参与成员" prop="userIds">
          {{ veJkyGainVo.userNames }}
        </a-form-model-item>
        <a-form-model-item label="成果类型" prop="userIds">
          {{ veJkyGainVo.cateIdText }}
        </a-form-model-item>
        <a-form-model-item label="成果性质" prop="userIds">
          <span>{{ projectId == 0 ? '科研成果' : '项目成果' }}</span>
        </a-form-model-item>
        <a-form-model-item label="成果级别" prop="name" required>
          {{ veJkyGainVo.levelIdText }}
        </a-form-model-item>

        <a-form-model-item label="成果介绍" prop="textId">
          {{ veJkyGainVo.textId }}
        </a-form-model-item>
        <uploadFiles ref="uploadFiles" serviceType="project" edit />
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';

export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyGainVo: {},
      viewType: 'create',
      veJkyGainRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veJkyGainVo = Object.assign({}, row);
      this.viewType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyGainDataForm.clearValidate();
        this.$refs.uploadFiles.setValue(row.id);
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
