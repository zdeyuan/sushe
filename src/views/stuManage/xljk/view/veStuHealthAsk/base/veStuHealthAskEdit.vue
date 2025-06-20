<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuHealthAskDataForm" :rules="veStuHealthAskRules" :model="veStuHealthAskVo" labelAlign="right">
        <a-form-model-item label="标题" prop="title" required>
          <a-input v-model="veStuHealthAskVo.title" :maxLength="100" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="问题内容" prop="content" required>
          <a-textarea v-model="veStuHealthAskVo.content" :maxLength="300" placeholder="请输入问题内容" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHealthAskApi from '../../../api/veStuHealthAskApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHealthAskVo: this.resetveStuHealthAskVo(),
      textMap: {
        update: '编辑-心理咨询表',
        create: '新增-心理咨询表'
      },
      dialogStatus: 'create',
      veStuHealthAskRules: {
		  title: [{ required: true , message: '请输入标题',}],
		  content: [{ required: true , message: '请输入问题内容',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuHealthAskVo() {
      return {
        name: '', // 姓名
        code: '', // 学号
        userId: '', // 用户Id
        userName: '', //
        title: '', // 标题
        isDelete: 0, // 是否删除（0：否，1：是）
        content: '' // 问题内容
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuHealthAskVo = this.resetveStuHealthAskVo();
      this.$nextTick(() => {
        this.$refs.veStuHealthAskDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuHealthAskApi.get(row.id).then(res => {
        this.veStuHealthAskVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuHealthAskDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuHealthAskVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHealthAskDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuHealthAskApi.add(subData).then(res => {
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
      this.$refs.veStuHealthAskDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuHealthAskApi.update(subData).then(() => {
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
