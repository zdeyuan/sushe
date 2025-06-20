<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                :title="textMap[dialogStatus]"
                @ok="viewType==='create'?createData():updateData()"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcRevertDataForm"
                    :rules="veSbzcZcRevertRules"
                    :model="veSbzcZcRevertVo"
                    labelAlign="right"
            >
                <a-form-model-item label="资产名称" prop="assetName" required>
                    <a-input v-model="veSbzcZcRevertVo.assetName" :maxLength="0" placeholder="请输入资产名称" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="资产编号" prop="assetCode" required>
                    <a-input v-model="veSbzcZcRevertVo.assetCode" :maxLength="0" placeholder="请输入资产编号" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="所属部门" prop="deptTree">
                    <dept-tree ref="deptTree"></dept-tree>
<!--                    <a-input v-model="veSbzcZcRevertVo.deptOwn" :maxLength="0" placeholder="请输入所属部门，默认资产所属部门"/>-->
                </a-form-model-item>
                <a-form-model-item label="归还人" prop="revertUser">
                    <userSelectBox ref="revertUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="批准人" prop="checkUser">
                    <userSelectBox ref="checkUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="归还时间" prop="revertTime" required>
					<DatePickByCN v-model="veSbzcZcRevertVo.revertTime"  placeholder="请选择归还时间" />
                </a-form-model-item>
                <a-form-model-item label="数量" prop="revertNum" required>
                    <a-input-number v-model="veSbzcZcRevertVo.revertNum" placeholder="请输入数量" style="width:300px" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-textarea v-model="veSbzcZcRevertVo.remark" :maxLength="500" placeholder="请输入备注"/>
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcRevertApi from '@/views/sbzc/fund/api/veSbzcZcRevertApi';
  import userSelectBox from '@/components/userSelectBox';
  import deptTree from '@/components/deptTree';

  export default {
    components: {userSelectBox,deptTree},
    data() {
      let validateDept = (rule, value, callback) => {
        const data = this.$refs.deptTree.getValue();
        if (data && data.length > 0) {
          callback();
        } else {
          callback(new Error('请选择'));
        }
      };
      let validateRevertUser = (rule, value, callback) => {
        const data = this.$refs.revertUser.getValue();
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
        veSbzcZcRevertVo: this.resetveSbzcZcRevertVo(),
        textMap: {
          update: '编辑-设备资产归还',
          create: '新增-设备资产归还'
        },
        dialogStatus: 'create',
        veSbzcZcRevertRules: {
          deptTree: [{ validator: validateDept, trigger: 'change', required: true }],
          revertUser: [{ validator: validateRevertUser, trigger: 'change', required: true }],
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
      resetveSbzcZcRevertVo() {
        return {
          assetId: '',// 资产ID
          applyId: '',// 资产借领ID
          deptOwn: '123',// 所属部门，默认资产所属部门
          revertUserId: '',// 归还人
          revertUserName: '',// 归还人姓名
          checkUserId: '',// 批准人
          checkUserName: '',// 批准人姓名
          revertTime: this.$date.format('YYYY-MM-DD'),// 归还时间
          createTime: this.$date.format('YYYY-MM-DD'),// 创建时间
          remark: ''// 备注
        };
      },
      /**
       * @msg: 初始化新增
       */
      doCreate(row) {
        this.viewType = 'create';
        this.veSbzcZcRevertVo = this.resetveSbzcZcRevertVo();
        this.veSbzcZcRevertVo.assetId = row.assetId;
        this.veSbzcZcRevertVo.assetCode = row.assetCode;
        this.veSbzcZcRevertVo.assetName = row.assetName;
        this.veSbzcZcRevertVo.applyId = row.id;
        this.veSbzcZcRevertVo.revertNum = row.applyNum;
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertDataForm.clearValidate();
        });
      },
      /**
       * @msg: 初始化修改
       */
      doUpdate(row) {
        veSbzcZcRevertApi.get(row.id).then((res) => {
          this.veSbzcZcRevertVo = res.result;
        });
        this.viewType = 'update';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertDataForm.clearValidate();
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
        const tempData = Object.assign({}, this.veSbzcZcRevertVo);
        //报废申请人
        const revertUser = this.$refs.revertUser.getObj();
        tempData.revertUserId = revertUser.id;
        tempData.revertUserName = revertUser.name;
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
        this.$refs.veSbzcZcRevertDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(false);
            if (subData == null) {
              return;
            }
            veSbzcZcRevertApi.add(subData).then(res => {
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
        this.$refs.veSbzcZcRevertDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(true);
            if (subData == null) {
              return;
            }
            veSbzcZcRevertApi.update(subData).then(() => {
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