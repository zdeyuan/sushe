<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuScholarshipTypeDataForm" :rules="veStuScholarshipTypeRules" :model="veStuScholarshipTypeVo" labelAlign="right">
        <a-form-model-item label="奖学金名称" prop="title" required>
          <a-input v-model="veStuScholarshipTypeVo.title" :maxLength="20" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="奖学金代码" prop="code" required>
          <a-input v-model="veStuScholarshipTypeVo.code" :maxLength="20" placeholder="请输入代码" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuScholarshipTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuScholarshipTypeApi from '../../api/veStuScholarshipTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuScholarshipTypeVo: this.resetveStuScholarshipTypeVo(),
      textMap: {
        update: '编辑-奖学金类型',
        create: '新增-奖学金类型'
      },
      dialogStatus: 'create',
      veStuScholarshipTypeRules: {
		  title: [{ required: true , message: '请输入奖学金名称',}],
		  code: [{ required: true , message: '请选择奖学金代码',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuScholarshipTypeVo() {
      return {
        title: '', // 名称
        code: '', // 代码，同一终端唯一
        status: 1 // 状态;1启用2禁用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuScholarshipTypeVo = this.resetveStuScholarshipTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuScholarshipTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuScholarshipTypeApi.get(row.id).then(res => {
        this.veStuScholarshipTypeVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuScholarshipTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuScholarshipTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuScholarshipTypeApi.add(subData).then(res => {
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
      this.$refs.veStuScholarshipTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuScholarshipTypeApi.update(subData).then(() => {
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
