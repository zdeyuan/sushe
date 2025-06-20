<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form
      :title="textMap[dialogStatus]"
      top="200px"
      width="600px"
      @ok="dialogStatus === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
    >
      <a-form-model
        ref="hqStuHealthKnowledgeTypeDataForm"
        :rules="hqStuHealthKnowledgeTypeRules"
        :model="hqStuHealthKnowledgeTypeVo"
        labelAlign="right"
      >
        <a-form-model-item label="类型名称" prop="typeName" required>
          <a-input v-model="hqStuHealthKnowledgeTypeVo.typeName" :maxLength="100" placeholder="请输入类型名称" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="hqStuHealthKnowledgeTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthKnowledgeTypeApi from '../../api/hqStuHealthKnowledgeTypeApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthKnowledgeTypeVo: this.resethqStuHealthKnowledgeTypeVo(),
      textMap: {
        update: '编辑-心理健康知识类型',
        create: '新增-心理健康知识类型'
      },
      dialogStatus: 'create',
      hqStuHealthKnowledgeTypeRules: {
		  typeName: [{ required: true , message: '请输入类型名称',}],
		  status: [{ required: true , message: '请选择状态',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resethqStuHealthKnowledgeTypeVo() {
      return {
        typeName: '', // 类型名称
        status: 1 // 状态：0=禁用，1=启用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.hqStuHealthKnowledgeTypeVo = this.resethqStuHealthKnowledgeTypeVo();
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      hqStuHealthKnowledgeTypeApi.get(row.id).then(res => {
        this.hqStuHealthKnowledgeTypeVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.hqStuHealthKnowledgeTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.hqStuHealthKnowledgeTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          hqStuHealthKnowledgeTypeApi.add(subData).then(res => {
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
      this.$refs.hqStuHealthKnowledgeTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          hqStuHealthKnowledgeTypeApi.update(subData).then(() => {
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
