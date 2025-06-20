<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form title="设置被评人员" @ok="createData()" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneStudentDataForm" :rules="veStuHygieneStudentRules" :model="veStuHygieneStudentVo" labelAlign="right">
        <a-form-model-item label="被评人员" prop="userIds">
          <stuSelect ref="stuSelect" height="300px" :check="true"></stuSelect>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneStudentApi from '../../../api/veStuHygieneStudentApi';
import stuSelect from '@/components/stuSelect';

export default {
  components: { stuSelect },
  data() {
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veStuHygieneStudentVo: this.resetveStuHygieneStudentVo(),
      dialogStatus: 'create',
      veStuHygieneStudentRules: {
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }]
      },
      checkItem: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuHygieneStudentVo() {
      return {
        judgeUserId: '', // 参评用户Id
        judgeUserName: '', //
        itemId: '' // 项目Id
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(row) {
      this.dialogStatus = 'create';
      this.checkItem = row;
      this.veStuHygieneStudentVo = this.resetveStuHygieneStudentVo();
      this.$nextTick(() => {
        this.$refs.veStuHygieneStudentDataForm.clearValidate();
      });

      const sub = {
        conditions: [{ operator: 'eq', column: 'item_id', value: row.id }]
      };

      veStuHygieneStudentApi.all(sub).then(res => {
        const datas = res.result;

        setTimeout(() => {
          this.$refs.stuSelect.setValue(datas.map(item => item.stuId));
        }, 100);
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
      const tempData = {
        itemId: this.checkItem.id,
        ids: this.$refs.stuSelect.getValue(),
        names: this.$refs.stuSelect.getNames()
      };
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHygieneStudentDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuHygieneStudentApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
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
