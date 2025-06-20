<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuStipendTypeDataForm" :rules="veStuStipendTypeRules" :model="veStuStipendTypeVo" labelAlign="right">
        <a-form-model-item label="助学金名称" prop="title" required>
          <a-input v-model="veStuStipendTypeVo.title" :maxLength="20" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="助学金代码" prop="code" required>
          <a-input v-model="veStuStipendTypeVo.code" :maxLength="20" placeholder="请输入代码" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuStipendTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuStipendTypeApi from '../../api/veStuStipendTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuStipendTypeVo: this.resetveStuStipendTypeVo(),
      textMap: {
        update: '编辑-助学金类型',
        create: '新增-助学金类型'
      },
      dialogStatus: 'create',
      veStuStipendTypeRules: {
		  title: [{ required: true , message: '请输入助学金名称',}],
		  code: [{ required: true , message: '请选择助学金代码',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuStipendTypeVo() {
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
      this.veStuStipendTypeVo = this.resetveStuStipendTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuStipendTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuStipendTypeApi.get(row.id).then(res => {
        this.veStuStipendTypeVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuStipendTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuStipendTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuStipendTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuStipendTypeApi.add(subData).then(res => {
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
      this.$refs.veStuStipendTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuStipendTypeApi.update(subData).then(() => {
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
