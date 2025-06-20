<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdApplyDataForm" :rules="veSbzcCdApplyRules" :model="veSbzcCdApplyVo" labelAlign="right">
        <a-form-model-item label="场地编号">
          {{ veSbzcCdInfoVo.code }}
        </a-form-model-item>
        <a-form-model-item label="场地名称">
          {{ veSbzcCdInfoVo.name }}
        </a-form-model-item>
        <a-form-model-item label="所属部门" prop="applyDept">
          <deptTree ref="deptTree"></deptTree>
        </a-form-model-item>

        <a-form-model-item label="借用人" prop="applyUser">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="checkUser">
          <userSelectBox ref="checkUser"></userSelectBox>
        </a-form-model-item>

        <a-form-model-item label="申请时间" prop="applyTime" required>
			<DatePickByCN v-model="veSbzcCdApplyVo.applyTime"  placeholder="请选择申请时间" />
        </a-form-model-item>
        <a-form-model-item label="预计归还时间" prop="expecteReturnTime">
			<DatePickByCN v-model="veSbzcCdApplyVo.expecteReturnTime"  placeholder="请选择预计归还时间" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcCdApplyVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdApplyApi from '@/views/sbzc/place/api/veSbzcCdApplyApi';
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
      veSbzcCdApplyVo: this.resetveSbzcCdApplyVo(),
      textMap: {
        update: '编辑-场地借用',
        create: '场地借用'
      },
      dialogStatus: 'create',
      veSbzcCdApplyRules: {
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
    resetveSbzcCdApplyVo() {
      return {
        cdId: '', // 场地ID
        applyDeptId: '', // 所属部门
        applyDeptName: '', // 场地名称
        applyUserId: '', // 接收人
        applyUserName: '', // 接收人
        checkUserId: '', // 批准人
        checkUserName: '', // 批准人
        applyTime: this.$date.format('YYYY-MM-DD'), // 申请时间
        expecteReturnTime: '', // 预计归还时间
        remark: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(row) {
      this.veSbzcCdInfoVo = row;
      this.viewType = 'create';
      this.veSbzcCdApplyVo = this.resetveSbzcCdApplyVo();
      this.$nextTick(() => {
        this.$refs.veSbzcCdApplyDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcCdApplyApi.get(row.id).then(res => {
        this.veSbzcCdApplyVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcCdApplyDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcCdApplyVo);
      tempData.cdId = this.veSbzcCdInfoVo.id;

      const deptDpt = this.$refs.deptTree.getValueData();
      if (deptDpt && deptDpt.length > 0) {
        tempData.applyDeptId = deptDpt[0].id;
        tempData.applyDeptName = deptDpt[0].value;
      }

      const userData = this.$refs.applyUser.getObj();
      tempData.applyUserId = userData.id;
      tempData.applyUserName = userData.name;

      const userData2 = this.$refs.checkUser.getObj();
      tempData.checkUserId = userData2.id;
      tempData.checkUserName = userData2.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcCdApplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcCdApplyApi.add(subData).then(res => {
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
      this.$refs.veSbzcCdApplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcCdApplyApi.update(subData).then(() => {
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
