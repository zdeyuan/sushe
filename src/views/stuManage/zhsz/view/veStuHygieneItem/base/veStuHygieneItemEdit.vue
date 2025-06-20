<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneItemDataForm" :rules="veStuHygieneItemRules" :model="veStuHygieneItemVo" labelAlign="right">
        <a-form-model-item label="项目名称" prop="name" required>
          <a-input v-model="veStuHygieneItemVo.name" :maxLength="200" placeholder="请输入项目名称" />
        </a-form-model-item>
        <a-form-model-item label="负责人" prop="fzrId">
          <userSelectBox ref="userSelectBox"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="开始时间" prop="startTime" required>
		  <DatePickByCN
		        v-model="veStuHygieneItemVo.startTime"
		        placeholder="请选择开始时间"
		      />
        </a-form-model-item>
        <a-form-model-item label="结束时间" prop="endTime" required>
		  <DatePickByCN
		        v-model="veStuHygieneItemVo.endTime"
		        placeholder="请选择结束时间"
		      />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="veStuHygieneItemVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneItemApi from '../../../api/veStuHygieneItemApi';
import userSelectBox from '@/components/userSelectBox';

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
      veStuHygieneItemVo: this.resetveStuHygieneItemVo(),
      textMap: {
        update: '编辑-项目表',
        create: '新增-项目表'
      },
      dialogStatus: 'create',
      veStuHygieneItemRules: {
		  name: [
		    {
		      required: true,
		      message: '请填写项目名称',
		      trigger: 'change',
		    }
		  ],startTime: [
		   {
		     required: true,
		     message: '请选择开始时间',
		     trigger: 'change',
		   }
		 ],
		 endTime: [
		   {
		     required: true,
		     message: '请选择结束时间',
		     trigger: 'change',
		   }
		 ], 
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
    resetveStuHygieneItemVo() {
      return {
        name: '', // 项目名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: 1, // 状态（0：禁用，1：启用）
        userId: '', // 项目负责人
        userName: '', //
        isDelete: '' // 是否删除（0：否，1：是）
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuHygieneItemVo = this.resetveStuHygieneItemVo();
      this.$nextTick(() => {
        this.$refs.veStuHygieneItemDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuHygieneItemApi.get(row.id).then(res => {
        this.veStuHygieneItemVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.userSelectBox.setObj([{ id: row.userId, name: row.userName }]);
        this.$refs.veStuHygieneItemDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuHygieneItemVo);
      const userData = this.$refs.userSelectBox.getObj();
	  console.log(userData,'userData?????????')
      tempData.userId = userData.id;
      tempData.userName = userData.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHygieneItemDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuHygieneItemApi.add(subData).then(res => {
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
      this.$refs.veStuHygieneItemDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuHygieneItemApi.update(subData).then(() => {
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
