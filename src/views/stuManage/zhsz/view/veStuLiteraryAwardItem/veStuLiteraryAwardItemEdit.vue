<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryAwardItemDataForm" :rules="veStuLiteraryAwardItemRules" :model="veStuLiteraryAwardItemVo" labelAlign="right">
        <a-form-model-item label="奖励名称" prop="name" required>
          <a-input v-model="veStuLiteraryAwardItemVo.name" :maxLength="200" placeholder="请输入奖励名称" />
        </a-form-model-item>
        <a-form-model-item label="奖项类型" prop="type" required>
          <edu-data v-model="veStuLiteraryAwardItemVo.type" stype="radio" code="jllb2" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuLiteraryAwardItemVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryAwardItemApi from '../../api/veStuLiteraryAwardItemApi';

export default {
  components: {},
  data() {
    const data = {
      veStuLiteraryAwardItemVo: this.resetveStuLiteraryAwardItemVo(),
      textMap: {
        update: '编辑-文体获奖项目',
        create: '新增-文体获奖项目'
      },
      dialogStatus: 'create',
      veStuLiteraryAwardItemRules: {
		  name: [
		    {
		      required: true,
		      message: '请填写奖励名称',
		      trigger: 'change',
		    }
		  ],
		  type: [
		    {
		      required: true,
		      message: '请选择奖项类型',
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
    resetveStuLiteraryAwardItemVo() {
      return {
        name: '', // 奖励名称
        type: 0, // 奖项类型（0：个人，1：集体）
        status: 1 // 状态（0：禁用，1：启用）
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuLiteraryAwardItemVo = this.resetveStuLiteraryAwardItemVo();
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardItemDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuLiteraryAwardItemApi.get(row.id).then(res => {
        this.veStuLiteraryAwardItemVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardItemDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuLiteraryAwardItemVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuLiteraryAwardItemDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuLiteraryAwardItemApi.add(subData).then(res => {
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
      this.$refs.veStuLiteraryAwardItemDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuLiteraryAwardItemApi.update(subData).then(() => {
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
