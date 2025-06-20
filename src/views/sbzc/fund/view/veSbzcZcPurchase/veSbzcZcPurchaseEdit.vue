<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcPurchaseDataForm" :rules="veSbzcZcPurchaseRules" :model="veSbzcZcPurchaseVo" labelAlign="right">
        <a-form-model-item label="资产名称" prop="assetName" required>
          <a-input v-model="veSbzcZcPurchaseVo.assetName" :maxLength="200" placeholder="请输入资产名称" />
        </a-form-model-item>
        <a-form-model-item label="采购数量" prop="count" required>
          <a-input-number v-model="veSbzcZcPurchaseVo.count" placeholder="请输入采购数量" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="所属部门" prop="deptOwn">
          <dept-tree ref="deptTree"></dept-tree>
          <!--                    <a-input v-model="veSbzcZcPurchaseVo.deptOwn" :maxLength="32" placeholder="请输入所属部门"/>-->
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="checkUser">
          <userSelectBox ref="checkUser"></userSelectBox>
          <!--                    <a-input v-model="veSbzcZcPurchaseVo.checkUserId" :maxLength="32" placeholder="请输入批准人"/>-->
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcZcPurchaseVo.remark" :maxLength="500" placeholder="请输入备注" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcPurchaseApi from '@/views/sbzc/fund/api/veSbzcZcPurchaseApi';
import userSelectBox from '@/components/userSelectBox';
import deptTree from '@/components/deptTree';

export default {
  components: { userSelectBox, deptTree },
  data() {
    let validateDept = (rule, value, callback) => {
      const data = this.$refs.deptTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateCheckUser = (rule, value, callback) => {
      const data = this.$refs.checkUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veSbzcZcPurchaseVo: this.resetveSbzcZcPurchaseVo(),
      textMap: {
        update: '编辑-资产采购',
        create: '新增-资产采购'
      },
      dialogStatus: 'create',
      veSbzcZcPurchaseRules: {
        deptTree: [{ validator: validateDept, trigger: 'change', required: true }],
        checkUser: [{ validator: validateCheckUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcZcPurchaseVo() {
      return {
        assetId: '', // 资产id
        assetCode: '', // 资产编号
        assetName: '', // 资产名称
        count: '', // 采购数量
        deptOwn: '123', // 所属部门
        checkUserId: '', // 批准人
        checkUserName: '', // 批准人姓名
        createTime: this.$date.format('YYYY-MM-DD'), // 创建时间
        remark: '', // 备注
        createUserId: '', // 创建人id
        createUserName: '' // 创建人姓名
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(row) {
      this.viewType = 'create';
      this.veSbzcZcPurchaseVo = this.resetveSbzcZcPurchaseVo();
      this.veSbzcZcPurchaseVo.assetId = row.id;
      this.veSbzcZcPurchaseVo.assetCode = row.code;
      this.veSbzcZcPurchaseVo.assetName = row.name;
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcZcPurchaseApi.get(row.id).then(res => {
        this.veSbzcZcPurchaseVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcZcPurchaseVo);
      //批准人
      const checkUser = this.$refs.checkUser.getObj();
      tempData.checkUserId = checkUser.id;
      tempData.checkUserName = checkUser.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcZcPurchaseDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcZcPurchaseApi.add(subData).then(res => {
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
      this.$refs.veSbzcZcPurchaseDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcZcPurchaseApi.update(subData).then(() => {
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
