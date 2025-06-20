<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model
        ref="veHqCangkuDataForm"
        :rules="veHqCangkuRules"
        :model="veHqCangkuVo"
        labelAlign="right"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-model-item label="仓库名称" prop="name" required>
          <a-input v-model="veHqCangkuVo.name" :maxLength="50" placeholder="请输入仓库名称" />
        </a-form-model-item>
        <a-form-model-item label="仓库地址" prop="address" required>
          <a-input v-model="veHqCangkuVo.address" :maxLength="200" placeholder="请输入仓库地址" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="phone" required>
          <a-input v-model="veHqCangkuVo.phone" :maxLength="15" placeholder="请输入联系电话" />
        </a-form-model-item>
        <a-form-model-item label="负责人" prop="fzrId">
          <userSelectBox ref="userSelectBox"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veHqCangkuVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqCangkuApi from '@/views/logistics/base/api/veHqCangkuApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';

export default {
  components: { userSelectBox },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.userSelectBox.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择负责人'));
      }
    };
    const data = {
      veHqCangkuVo: this.resetveHqCangkuVo(),
      textMap: {
        update: '仓库',
        create: '仓库'
      },
      dialogStatus: 'create',
      veHqCangkuRules: {
        fzrId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqCangkuVo() {
      return {
        name: '', // 仓库名称
        address: '', // 仓库地址
        fzrId: '', // 负责人
        fzrText: '', // 负责人
        phone: '', // 联系电话
        remark: '', // 备注
        status: 1 //
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqCangkuVo = this.resetveHqCangkuVo();
      this.$nextTick(() => {
        this.$refs.veHqCangkuDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqCangkuApi.get(row.id).then(res => {
        this.veHqCangkuVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.userSelectBox.setObj([{ id: row.fzrId, name: row.fzrText }]);
        this.$refs.veHqCangkuDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqCangkuVo);
      const userData = this.$refs.userSelectBox.getObj();
      tempData.fzrId = userData.id;
      tempData.fzrText = userData.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqCangkuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqCangkuApi.add(subData).then(res => {
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
      this.$refs.veHqCangkuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqCangkuApi.update(subData).then(() => {
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
