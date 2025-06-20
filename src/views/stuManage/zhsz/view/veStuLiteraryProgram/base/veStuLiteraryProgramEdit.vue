<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryProgramDataForm" :rules="veStuLiteraryProgramRules" :model="veStuLiteraryProgramVo" labelAlign="right">
        <a-form-model-item label="计划标题" prop="title" required>
          <a-input v-model="veStuLiteraryProgramVo.title" :maxLength="200" placeholder="请输入计划标题" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="content">
          <ueditor ref="ueditor" style="width: 100%;height:300px;overflow-y:auto"></ueditor>
        </a-form-model-item>
        <a-form-model-item label="全部教师" prop="isAll" required>
          <edu-data v-model="veStuLiteraryProgramVo.isAll" stype="radio" code="shifou" />
        </a-form-model-item>
        <a-form-model-item label="接收教师" v-if="veStuLiteraryProgramVo.isAll == 0" prop="userIds">
          <userSelectBox ref="userSelectBox" :check="true"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="发布状态" prop="status" required>
          <edu-data v-model="veStuLiteraryProgramVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryProgramApi from '../../../api/veStuLiteraryProgramApi';
import ueditor from '@/components/ueditor';
import userSelectBox from '@/components/userSelectBox';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  mixins: [baseMixins],
  components: { ueditor, userSelectBox },
  data() {
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.userSelectBox.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veStuLiteraryProgramVo: this.resetveStuLiteraryProgramVo(),
      textMap: {
        update: '编辑-文化计划',
        create: '新增-文化计划'
      },
      dialogStatus: 'create',
      veStuLiteraryProgramRules: {
		  title: [
		    {
		      required: true,
		      message: '请填写计划标题',
		      trigger: 'change',
		    }
		  ],
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuLiteraryProgramVo() {
      return {
        title: '', // 计划标题
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
      this.veStuLiteraryProgramVo = this.resetveStuLiteraryProgramVo();
      this.$nextTick(() => {
        this.$refs.veStuLiteraryProgramDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuLiteraryProgramApi.get(row.id).then(res => {
        this.veStuLiteraryProgramVo = res.result;
        this.$refs.ueditor.setValue(res.result.content);
        setTimeout(() => {
          this.$refs.userSelectBox.setValue(res.result.userIds);
        }, 100);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryProgramDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuLiteraryProgramVo);
      tempData.content = this.$refs.ueditor.getValue();
      if (this.$refs.userSelectBox) {
        tempData.userIds = this.$refs.userSelectBox.getValue() || [];
        tempData.userNames = this.$refs.userSelectBox.getNames().join(',');
      } else {
        tempData.userIds = [];
      }

      tempData.pushUserId = this.loginInfo.userId; // 发布人
      tempData.pushUserName = this.loginInfo.userName; //
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuLiteraryProgramDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuLiteraryProgramApi.add(subData).then(res => {
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
      this.$refs.veStuLiteraryProgramDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuLiteraryProgramApi.update(subData).then(() => {
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
