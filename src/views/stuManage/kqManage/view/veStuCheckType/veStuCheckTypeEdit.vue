<template>
  <div class="edit_form">
		<!-- 编辑页 -->
		<edu-form width="1073px"  :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
		  <a-form-model ref="veStuCheckTypeDataForm" :rules="veStuCheckTypeRules" :model="veStuCheckTypeVo" labelAlign="right">
			<a-form-model-item label="考勤类型" prop="title" required>
			  <a-input v-model="veStuCheckTypeVo.title" :maxLength="20" placeholder="请输入考勤类型" />
			</a-form-model-item>
			<a-form-model-item label="考勤代码" prop="code" required>
			  <a-input v-model="veStuCheckTypeVo.code" :maxLength="20" placeholder="请输入考勤代码" />
			</a-form-model-item>
			<a-form-model-item label="状态" prop="status" required>
			  <edu-data v-model="veStuCheckTypeVo.status" stype="radio" code="status" />
			</a-form-model-item>
		  </a-form-model>
		</edu-form>
  </div>
</template>

<script>
import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckTypeVo: this.resetveStuCheckTypeVo(),
      textMap: {
        update: '编辑-考勤类型',
        create: '新增-考勤类型'
      },
      dialogStatus: 'create',
      veStuCheckTypeRules: {
		  title: [
		    {
		      required: true,
		      message: '考勤类型必填',
		      trigger: 'change',
		    }
		  ],
		  code: [
		    {
		      required: true,
		      message: '考勤代码必填',
		      trigger: 'change',
		    }
		  ]
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuCheckTypeVo() {
      return {
        title: '', // 名称
        code: '', // 代码，同一终端唯一
        status: 1, // 状态;1启用2禁用
        kqType: 1 // 1正常，0为异常
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuCheckTypeVo = this.resetveStuCheckTypeVo();
      this.$nextTick(() => {
        this.$refs.veStuCheckTypeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuCheckTypeApi.get(row.id).then(res => {
        this.veStuCheckTypeVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuCheckTypeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuCheckTypeVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuCheckTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuCheckTypeApi.add(subData).then(res => {
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
      this.$refs.veStuCheckTypeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuCheckTypeApi.update(subData).then(() => {
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
