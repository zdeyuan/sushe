<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form title="设置参评人员" @ok="createData()" @cancel="handelCancel">
      <a-form-model ref="veStuCheckJudgerDataForm" :rules="veStuCheckJudgerRules" :model="veStuCheckJudgerVo" labelAlign="right">
        <a-form-model-item label="参评人员" prop="userIds">
          <userSelectBox ref="userSelectBox" height="300px" :check="true"></userSelectBox>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckJudgerApi from '../../../api/veStuCheckJudgerApi';
import userSelectBox from '@/components/userSelectBox';

export default {
  components: { userSelectBox },
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
      veStuCheckJudgerVo: this.resetveStuCheckJudgerVo(),
      dialogStatus: 'create',
      veStuCheckJudgerRules: {
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
    resetveStuCheckJudgerVo() {
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
      this.veStuCheckJudgerVo = this.resetveStuCheckJudgerVo();
      this.$nextTick(() => {
        this.$refs.veStuCheckJudgerDataForm.clearValidate();
      });

      const sub = {
        conditions: [{ operator: 'eq', column: 'item_id', value: row.id }]
      };

      veStuCheckJudgerApi.all(sub).then(res => {
        const datas = res.result;

        setTimeout(() => {
          this.$refs.userSelectBox.setValue(datas.map(item => item.judgeUserId));
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
        ids: this.$refs.userSelectBox.getValue(),
        names: this.$refs.userSelectBox.getNames()
      };
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuCheckJudgerDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuCheckJudgerApi.add(subData).then(res => {
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
