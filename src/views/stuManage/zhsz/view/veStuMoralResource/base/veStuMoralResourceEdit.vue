<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuMoralResourceDataForm" :rules="veStuMoralResourceRules" :model="veStuMoralResourceVo" labelAlign="right">
        <a-form-model-item label="德育资源标题" prop="title" required>
          <a-input v-model="veStuMoralResourceVo.title" :maxLength="200" placeholder="请输入德育资源标题" />
        </a-form-model-item>
        <a-form-model-item label="德育资源内容" prop="content">
          <ueditor ref="ueditor" style="width: 100%%;"></ueditor>
        </a-form-model-item>

        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuMoralResourceVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
        <a-form-model-item label="附件">
          <uploadFiles ref="uploadFiles" serviceType="veStuMoralResource" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralResourceApi from '../../../api/veStuMoralResourceApi';
import ueditor from '@/components/ueditor';
import { baseMixins } from '@/mixins/baseMixins';
import uploadFiles from '@/components/uploadFiles';
export default {
  mixins: [baseMixins],
  components: { ueditor, uploadFiles },
  data() {
    const data = {
      veStuMoralResourceVo: this.resetveStuMoralResourceVo(),
      textMap: {
        update: '编辑-德育德育资源',
        create: '新增-德育德育资源'
      },
      dialogStatus: 'create',
      veStuMoralResourceRules: {
		  title: [
		    {
		      required: true,
		      message: '请填写德育资源标题',
		      trigger: 'change',
		    }
		  ],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuMoralResourceVo() {
      return {
        title: '', // 德育资源标题
        content: '', // 内容
        status: 1, // 是否发布（0：未发布，1：发布）
        pushTime: this.$date.format('YYYY-MM-DD'), // 发布时间
        isAll: 1 // 是否所有人员（0：否，1：是）
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuMoralResourceVo = this.resetveStuMoralResourceVo();
      this.$nextTick(() => {
        this.$refs.veStuMoralResourceDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuMoralResourceApi.get(row.id).then(res => {
        this.veStuMoralResourceVo = res.result;
        this.$refs.ueditor.setValue(res.result.content);
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuMoralResourceDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuMoralResourceVo);
      tempData.content = this.$refs.ueditor.getValue();
      tempData.fileIds = this.$refs.uploadFiles.getValue();

      tempData.pushUserId = this.loginInfo.userId; // 发布人
      tempData.pushUserName = this.loginInfo.userName; //
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuMoralResourceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuMoralResourceApi.add(subData).then(res => {
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
      this.$refs.veStuMoralResourceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuMoralResourceApi.update(subData).then(() => {
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
