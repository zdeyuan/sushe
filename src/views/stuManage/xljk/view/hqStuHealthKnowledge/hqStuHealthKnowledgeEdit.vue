<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthKnowledgeDataForm" :rules="hqStuHealthKnowledgeRules" :model="hqStuHealthKnowledgeVo" labelAlign="right">
        <a-form-model-item label="知识类型" prop="typeId" required>
          <edu-data v-model="hqStuHealthKnowledgeVo.typeId" width="150px" stype="select" :datas="typeNodes" textKey="typeName" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title" required>
          <a-input v-model="hqStuHealthKnowledgeVo.title" :maxLength="100" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="content">
          <ueditor ref="ueditor" style="width: 100%;"></ueditor>
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listNum" required>
          <a-input-number v-model="hqStuHealthKnowledgeVo.listNum" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthKnowledgeApi from '../../api/hqStuHealthKnowledgeApi';
import ueditor from '@/components/ueditor';
export default {
  props: {
    typeNodes: Array
  },
  components: { ueditor },
  data() {
    const data = {
      hqStuHealthKnowledgeVo: this.resethqStuHealthKnowledgeVo(),
      textMap: {
        update: '编辑-心理健康知识',
        create: '新增-心理健康知识'
      },
      dialogStatus: 'create',
      hqStuHealthKnowledgeRules: {
		  typeId: [{ required: true , message: '请输入知识内容',}],
		  title: [{ required: true , message: '请输入标题',}],
		  listNum: [{ required: true , message: '请输入排序',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resethqStuHealthKnowledgeVo() {
      return {
        typeId: '', // 知识类型Id
        title: '', // 标题
        content: '', // 内容
        listNum: 0, // 排序
        userId: '', // 发布人
        userName: '', //
        status: 1 // 状态：0=禁用，1=启用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.hqStuHealthKnowledgeVo = this.resethqStuHealthKnowledgeVo();
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      hqStuHealthKnowledgeApi.get(row.id).then(res => {
        this.hqStuHealthKnowledgeVo = res.result;
        this.$refs.ueditor.setValue(res.result.content);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.hqStuHealthKnowledgeVo);
      tempData.content = this.$refs.ueditor.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.hqStuHealthKnowledgeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          hqStuHealthKnowledgeApi.add(subData).then(res => {
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
      this.$refs.hqStuHealthKnowledgeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          hqStuHealthKnowledgeApi.update(subData).then(() => {
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
