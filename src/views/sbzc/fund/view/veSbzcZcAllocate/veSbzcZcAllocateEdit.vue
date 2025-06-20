<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                :title="textMap[dialogStatus]"
                @ok="viewType==='create'?createData():updateData()"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcAllocateDataForm"
                    :rules="veSbzcZcAllocateRules"
                    :model="veSbzcZcAllocateVo"
                    labelAlign="right"
            >
                <a-form-model-item label="资产名称" prop="assetName" required>
                    <a-input v-model="veSbzcZcAllocateVo.assetName" :maxLength="0" placeholder="请输入资产名称" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="资产编号" prop="assetCode" required>
                    <a-input v-model="veSbzcZcAllocateVo.assetCode" :maxLength="0" placeholder="请输入资产编号" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="所属部门" prop="deptTreeOwn">
                    <dept-tree ref="deptTreeOwn"></dept-tree>
<!--                    <a-input v-model="veSbzcZcAllocateVo.deptOwn" :maxLength="0" placeholder="请输入所属部门，默认资产所属部门"/>-->
                </a-form-model-item>
                <a-form-model-item label="批准人" prop="checkUser">
                    <userSelectBox ref="checkUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="现在所属部门" prop="deptTreeNow">
                    <dept-tree ref="deptTreeNow"></dept-tree>
<!--                    <a-input v-model="veSbzcZcAllocateVo.allocateDept" :maxLength="0" placeholder="请输入现在所属部门"/>-->
                </a-form-model-item>
                <a-form-model-item label="调拨日期" prop="allocateDate" required>
					<DatePickByCN v-model="veSbzcZcAllocateVo.allocateDate"  placeholder="请选择调拨日期" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model="veSbzcZcAllocateVo.remark" :maxLength="500" placeholder="请输入备注"/>
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcAllocateApi from '@/views/sbzc/fund/api/veSbzcZcAllocateApi';
  import userSelectBox from '@/components/userSelectBox';
  import deptTree from '@/components/deptTree';

  export default {
    components: {userSelectBox,deptTree},
    data() {
      let validateDeptOwn = (rule, value, callback) => {
        const data = this.$refs.deptTreeOwn.getValue();
        if (data && data.length > 0) {
          callback();
        } else {
          callback(new Error('请选择'));
        }
      };
      let validateDeptNow = (rule, value, callback) => {
        const data = this.$refs.deptTreeNow.getValue();
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
        veSbzcZcAllocateVo: this.resetveSbzcZcAllocateVo(),
        textMap: {
          update: '编辑-设备资产调拨',
          create: '新增-设备资产调拨'
        },
        dialogStatus: 'create',
        veSbzcZcAllocateRules: {
          deptTreeOwn: [{ validator: validateDeptOwn, trigger: 'change', required: true }],
          deptTreeNow: [{ validator: validateDeptNow, trigger: 'change', required: true }],
          checkUser: [{ validator: validateCheckUser, trigger: 'change', required: true }],
        }
      };
      return data;
    },
    mounted() {
    },
    methods: {
      /**
       * @msg: 重置数据
       */
      resetveSbzcZcAllocateVo() {
        return {
          assetId: '',// 资产ID
          assetCode: '',// 资产Code
          assetName: '',// 资产Name
          deptOwn: '123',// 所属部门，默认资产所属部门
          checkUserId: '',// 批准人，默认为当前操作管理员
          checkUserName: '',// 批准人姓名
          allocateDept: '321',// 现在所属部门
          allocateDate: this.$date.format('YYYY-MM-DD'),// 调拨日期
          createTime: this.$date.format('YYYY-MM-DD'),// 记录创建时间
          remark: ''// 备注
        };
      },
      /**
       * @msg: 初始化新增
       */
      doCreate(row) {
        this.viewType = 'create';
        this.veSbzcZcAllocateVo = this.resetveSbzcZcAllocateVo();
        this.veSbzcZcAllocateVo.assetId = row.id;
        this.veSbzcZcAllocateVo.assetCode = row.code;
        this.veSbzcZcAllocateVo.assetName = row.name;
        this.$nextTick(() => {
          this.$refs.veSbzcZcAllocateDataForm.clearValidate();
        });
      },
      /**
       * @msg: 初始化修改
       */
      doUpdate(row) {
        veSbzcZcAllocateApi.get(row.id).then((res) => {
          this.veSbzcZcAllocateVo = res.result;
        });
        this.viewType = 'update';
        this.$nextTick(() => {
          this.$refs.veSbzcZcAllocateDataForm.clearValidate();
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
        const tempData = Object.assign({}, this.veSbzcZcAllocateVo);
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
        this.$refs.veSbzcZcAllocateDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(false);
            if (subData == null) {
              return;
            }
            veSbzcZcAllocateApi.add(subData).then(res => {
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
        this.$refs.veSbzcZcAllocateDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(true);
            if (subData == null) {
              return;
            }
            veSbzcZcAllocateApi.update(subData).then(() => {
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
<style lang="less" scoped>

</style>