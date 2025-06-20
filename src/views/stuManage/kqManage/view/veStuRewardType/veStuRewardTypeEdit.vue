<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuRewardTypeDataForm" :rules="veStuRewardTypeRules" :model="veStuRewardTypeVo" labelAlign="right">
        <a-form-model-item label="奖励名称" prop="title" required>
          <a-input v-model="veStuRewardTypeVo.title" :maxLength="20" placeholder="请输入奖励名称" />
        </a-form-model-item>
        <a-form-model-item label="奖励代码" prop="code" required>
          <a-input v-model="veStuRewardTypeVo.code" :maxLength="20" placeholder="请输入奖励代码" />
        </a-form-model-item>
        <a-form-model-item label="奖励级别" prop="level" required>
          <edu-data v-model="veStuRewardTypeVo.level" stype="select" code="jlJb" />
        </a-form-model-item>
        <a-form-model-item label="奖励属性" prop="attribute" required>
          <edu-data v-model="veStuRewardTypeVo.attribute" stype="radio" code="jllb" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuRewardTypeVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuRewardTypeApi from '../../api/veStuRewardTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuRewardTypeVo: this.resetveStuRewardTypeVo(),
      textMap: {
        update: '编辑-奖励类型',
        create: '新增-奖励类型'
      },
      dialogStatus: 'create',
      veStuRewardTypeRules: {
		  title: [
		    {
		      required: true,
		      message: '请填写奖励名称',
		      trigger: 'change',
		    }
		  ],
		  code: [
		    {
		      required: true,
		      message: '请填写奖励代码',
		      trigger: 'change',
		    }
		  ],
		  level: [
		    {
		      required: true,
		      message: '请选择奖励级别',
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
    resetveStuRewardTypeVo() {
      return {
        title: '', // 奖励名称
        code: '', // 奖励代码，同一终端唯一
        attribute: 1, // 奖励属性;1个人2集体
        status: 1 // 状态;1启用2禁用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuRewardTypeVo = this.resetveStuRewardTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuRewardTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuRewardTypeApi.get(row.id).then(res => {
        res.result.type = res.result.type + '';
        this.veStuRewardTypeVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuRewardTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuRewardTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuRewardTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuRewardTypeApi.add(subData).then(res => {
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
      this.$refs.veStuRewardTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuRewardTypeApi.update(subData).then(() => {
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
