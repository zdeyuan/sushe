<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdRevertDataForm" :rules="veSbzcCdRevertRules" :model="veSbzcCdRevertVo" labelAlign="right">
        <a-form-model-item label="场地编号">
          {{ veSbzcCdInfoVo.code }}
        </a-form-model-item>
        <a-form-model-item label="场地名称">
          {{ veSbzcCdInfoVo.name }}
        </a-form-model-item>
        <a-form-model-item label="所属部门" prop="applyDept">
          <deptTree ref="deptTree"></deptTree>
        </a-form-model-item>

        <a-form-model-item label="归还人" prop="applyUser">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="接收人" prop="checkUser">
          <userSelectBox ref="checkUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="归还时间" prop="revertTime" required>
			<DatePickByCN v-model="veSbzcCdRevertVo.revertTime"  placeholder="请选择归还时间" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcCdRevertVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdRevertApi from '@/views/sbzc/place/api/veSbzcCdRevertApi';
import userSelectBox from '@/components/userSelectBox';
import deptTree from '@/components/deptTree';

export default {
  components: { userSelectBox, deptTree },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.applyUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser1 = (rule, value, callback) => {
      const data = this.$refs.checkUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateDept = (rule, value, callback) => {
      const data = this.$refs.deptTree.getValueData();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veSbzcCdRevertVo: this.resetveSbzcCdRevertVo(),
      textMap: {
        update: '场地归还',
        create: '场地归还'
      },
      dialogStatus: 'create',
      veSbzcCdRevertRules: {
        applyUser: [{ validator: validateUser, trigger: 'change', required: true }],
        checkUser: [{ validator: validateUser1, trigger: 'change', required: true }],
        applyDept: [{ validator: validateDept, trigger: 'change', required: true }]
      },
      veSbzcCdInfoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcCdRevertVo() {
      return {
        cdId: '', // 场地ID
        applyDeptId: '', // 所属部门
        applyDeptName: '', // 场地名称
        revertUserId: '', // 归还人
        revertUserName: '', // 接收人
        checkUserId: '', // 批准人
        checkUserName: '', // 批准人
        revertTime: this.$date.format('YYYY-MM-DD'), // 归还时间
        remark: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(row) {
      this.veSbzcCdInfoVo = row;
      this.viewType = 'create';
      this.veSbzcCdRevertVo = this.resetveSbzcCdRevertVo();
      this.$nextTick(() => {
        this.$refs.veSbzcCdRevertDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcCdRevertApi.get(row.id).then(res => {
        this.veSbzcCdRevertVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcCdRevertDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcCdRevertVo);
      tempData.cdId = this.veSbzcCdInfoVo.id;

      const deptDpt = this.$refs.deptTree.getValueData();
      if (deptDpt && deptDpt.length > 0) {
        tempData.applyDeptId = deptDpt[0].id;
        tempData.applyDeptName = deptDpt[0].value;
      }

      const userData = this.$refs.applyUser.getObj();
      tempData.revertUserId = userData.id;
      tempData.revertUserName = userData.name;

      const userData2 = this.$refs.checkUser.getObj();
      tempData.checkUserId = userData2.id;
      tempData.checkUserName = userData2.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcCdRevertDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcCdRevertApi.add(subData).then(res => {
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
      this.$refs.veSbzcCdRevertDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcCdRevertApi.update(subData).then(() => {
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
