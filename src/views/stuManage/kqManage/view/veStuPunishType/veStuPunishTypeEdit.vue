<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuPunishTypeDataForm" :rules="veStuPunishTypeRules" :model="veStuPunishTypeVo" labelAlign="right">
        <a-form-model-item label="惩罚名称" prop="title" required>
          <a-input v-model="veStuPunishTypeVo.title" :maxLength="20" placeholder="请输入惩罚名称" />
        </a-form-model-item>
        <a-form-model-item label="惩罚代码" prop="code" required>
          <a-input v-model="veStuPunishTypeVo.code" :maxLength="20" placeholder="请输入惩罚代码" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuPunishTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuPunishTypeApi from '../../api/veStuPunishTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuPunishTypeVo: this.resetveStuPunishTypeVo(),
      textMap: {
        update: '编辑-惩罚类型',
        create: '新增-惩罚类型'
      },
      dialogStatus: 'create',
      veStuPunishTypeRules: {
		  title: [
		    {
		      required: true,
		      message: '请填写惩罚名称',
		      trigger: 'change',
		    }
		  ],
		  code: [
		    {
		      required: true,
		      message: '请填写惩罚代码',
		      trigger: 'change',
		    }
		  ],
		  status: [
		    {
		      required: true,
		      message: '请选择状态',
		      trigger: 'change',
		    }
		  ],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuPunishTypeVo() {
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
      this.viewType = 'create';
      this.veStuPunishTypeVo = this.resetveStuPunishTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuPunishTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuPunishTypeApi.get(row.id).then(res => {
        this.veStuPunishTypeVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuPunishTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuPunishTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuPunishTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuPunishTypeApi.add(subData).then(res => {
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
      this.$refs.veStuPunishTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuPunishTypeApi.update(subData).then(() => {
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
