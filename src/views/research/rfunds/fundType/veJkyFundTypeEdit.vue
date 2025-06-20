<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" width="40%" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyFundTypeDataForm" :rules="veJkyFundTypeRules" :model="veJkyFundTypeVo" labelAlign="right">
        <a-form-model-item label="名称" prop="name" required>
          <a-input v-model="veJkyFundTypeVo.name" :maxLength="255" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="代码" prop="codeNum" required>
          <a-input v-model="veJkyFundTypeVo.codeNum" :maxLength="50" placeholder="请输入类型代号" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listSort" required>
          <a-input-number v-model="veJkyFundTypeVo.listSort" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyFundTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyFundTypeApi from '@/api/research/rfunds/veJkyFundTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyFundTypeVo: this.resetveJkyFundTypeVo(),
      textMap: {
        update: '编辑费用类别',
        create: '新增费用类别'
      },
      dialogStatus: 'create',
      veJkyFundTypeRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyFundTypeVo() {
      return {
        status: 1,
        name: '', // 名称
        codeNum: '', // 类型代号
        listSort: '' // 排序
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyFundTypeVo = this.resetveJkyFundTypeVo();
      this.$nextTick(() => {
        this.$refs.veJkyFundTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyFundTypeApi.get(row.id).then(res => {
        this.veJkyFundTypeVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyFundTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyFundTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyFundTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyFundTypeApi.add(subData).then(res => {
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
      this.$refs.veJkyFundTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyFundTypeApi.update(subData).then(() => {
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
