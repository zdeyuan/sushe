<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthUserDataForm" :rules="hqStuHealthUserRules" :model="hqStuHealthUserVo" labelAlign="right">
        <a-form-model-item label="学生" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title" required>
          <a-input v-model="hqStuHealthUserVo.title" :maxLength="100" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="content">
          <a-textarea v-model="hqStuHealthUserVo.content" :maxLength="1000" placeholder="请输入内容" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthUserApi from '../../api/hqStuHealthUserApi';
import stuSelect from '@/components/stuSelect';
export default {
  components: { stuSelect },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择学生'));
      }
    };
    const data = {
      hqStuHealthUserVo: this.resethqStuHealthUserVo(),
      textMap: {
        update: '编辑-心理健康个人记录',
        create: '新增-心理健康个人记录'
      },
      dialogStatus: 'create',
      hqStuHealthUserRules: {
        stuId: [{ validator: validateUser, trigger: 'change', required: true }],
		title: [{ required: true , message: '请输入标题',}],
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resethqStuHealthUserVo() {
      return {
        name: '', // 姓名
        code: '', // 学号
        userId: '', // 用户Id
        title: '', // 标题
        content: '' // 内容
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.hqStuHealthUserVo = this.resethqStuHealthUserVo();
      this.$nextTick(() => {
        this.$refs.hqStuHealthUserDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      hqStuHealthUserApi.get(row.id).then(res => {
        this.hqStuHealthUserVo = res.result;
        setTimeout(() => {
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.userId);
        }, 100);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.hqStuHealthUserDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.hqStuHealthUserVo);

      const stus = this.$refs.stuSelect.getObj()[0];
      tempData.userId = stus.id;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.hqStuHealthUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          hqStuHealthUserApi.add(subData).then(res => {
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
      this.$refs.hqStuHealthUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          hqStuHealthUserApi.update(subData).then(() => {
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
