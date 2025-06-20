<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" width="75%" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model
        ref="veJkyResourceDataForm"
        :rules="veJkyResourceRules"
        :model="veJkyResourceVo"
        labelAlign="right"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
      >
        <a-form-model-item label="标题" prop="title" required>
          <a-input v-model="veJkyResourceVo.title" :maxLength="255" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="textId">
          <ueditor ref="ueditor" style="width: 100%%;"></ueditor>
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyResourceVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
        <a-form-model-item label="附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="resource" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyResourceApi from '@/api/research/rwork/veJkyResourceApi';
import ueditor from '@/components/kqManageComponent/ueditor';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { ueditor, uploadFiles },
  data() {
    const data = {
      veJkyResourceVo: this.resetveJkyResourceVo(),
      textMap: {
        update: '编辑-资源引入',
        create: '新增-资源引入'
      },
      dialogStatus: 'create',
      veJkyResourceRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyResourceVo() {
      return {
        status: 1,
        title: '', // 主题
        textId: '', // 内容
        fileId: '', // 附件id
        createTime: '' // 录入时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyResourceVo = this.resetveJkyResourceVo();
      this.$nextTick(() => {
        this.$refs.veJkyResourceDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyResourceApi.get(row.id).then(res => {
        this.veJkyResourceVo = res.result;
        this.$refs.ueditor.setValue(res.result.textId);
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyResourceDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyResourceVo);
      tempData.textId = this.$refs.ueditor.getValue();
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyResourceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyResourceApi.add(subData).then(res => {
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
      this.$refs.veJkyResourceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyResourceApi.update(subData).then(() => {
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
