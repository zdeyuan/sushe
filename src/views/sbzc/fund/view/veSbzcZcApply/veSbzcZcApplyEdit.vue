<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                :title="textMap[dialogStatus]"
                @ok="viewType==='create'?createData():updateData()"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcApplyDataForm"
                    :rules="veSbzcZcApplyRules"
                    :model="veSbzcZcApplyVo"
                    labelAlign="right"
            >
                <a-form-model-item label="资产名称" prop="assetName" required>
                    <a-input v-model="veSbzcZcApplyVo.assetName" :maxLength="0" placeholder="请输入资产名称" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="资产编号" prop="assetCode" required>
                    <a-input v-model="veSbzcZcApplyVo.assetCode" :maxLength="0" placeholder="请输入资产编号" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="所属部门" prop="deptTree" >
                    <dept-tree ref="deptTree"></dept-tree>
                </a-form-model-item>
                <a-form-model-item label="借领性质" prop="applyFor" required>
                    <edu-data v-model="veSbzcZcApplyVo.applyFor" stype="radio" code="applyFor" />
<!--                    <a-input v-model="veSbzcZcApplyVo.applyFor" :maxLength="2" placeholder="请输入借领性质（借用1，领用2）"/>-->
                </a-form-model-item>
                <a-form-model-item label="借领人" prop="applyUser">
                    <userSelectBox ref="applyUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="数量" prop="applyNum" required>
                    <a-input-number v-model="veSbzcZcApplyVo.applyNum" placeholder="请输入数量" style="width:300px"/>
                </a-form-model-item>
                <a-form-model-item label="批准人" prop="checkUser">
                    <userSelectBox ref="checkUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="借领时间" prop="applyTime" required>
					<DatePickByCN v-model="veSbzcZcApplyVo.applyTime"  placeholder="请选择借领时间" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-textarea v-model="veSbzcZcApplyVo.remark" :maxLength="500" placeholder="请输入备注"/>
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcApplyApi from '@/views/sbzc/fund/api/veSbzcZcApplyApi';
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
      let validateApplyUser = (rule, value, callback) => {
        const data = this.$refs.applyUser.getValue();
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
        veSbzcZcApplyVo: this.resetveSbzcZcApplyVo(),
        textMap: {
          update: '编辑-设备资产借领',
          create: '新增-设备资产借领'
        },
        dialogStatus: 'create',
        veSbzcZcApplyRules: {
          deptTree: [{ validator: validateDept, trigger: 'change', required: true }],
          applyUser: [{ validator: validateApplyUser, trigger: 'change', required: true }],
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
      resetveSbzcZcApplyVo() {
        return {
          assetId: '',// 资产ID
          assetCode: '',// 资产code
          assetName: '',// 资产name
          deptOwn: '123',// 所属部门，默认资产所属部门
          applyFor: '1',// 借领性质（借用1，领用2）
          applyNum: '1',// 借领数量
          applyUserId: '',// 借领人
          applyUserName: '',// 借领人名称
          checkUserId: '',// 批准人，默认为当前操作管理员
          checkUserName: '',// 批准人名称
          applyTime: this.$date.format('YYYY-MM-DD'),// 借领时间
          createTime: this.$date.format('YYYY-MM-DD'),// 记录创建时间
          remark: ''// 备注
        };
      },
      /**
       * @msg: 初始化新增
       */
      doCreate(row) {
        this.viewType = 'create';
        this.veSbzcZcApplyVo = this.resetveSbzcZcApplyVo();
        this.veSbzcZcApplyVo.assetId = row.id;
        this.veSbzcZcApplyVo.assetCode = row.code;
        this.veSbzcZcApplyVo.assetName = row.name;
        this.$nextTick(() => {
          this.$refs.veSbzcZcApplyDataForm.clearValidate();
        });
      },
      /**
       * @msg: 初始化修改
       */
      doUpdate(row) {
        veSbzcZcApplyApi.get(row.id).then((res) => {
          this.veSbzcZcApplyVo = res.result;
        });
        this.viewType = 'update';
        this.$nextTick(() => {
          this.$refs.veSbzcZcApplyDataForm.clearValidate();
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
        const tempData = Object.assign({}, this.veSbzcZcApplyVo);
        //借领人
        const applyUser = this.$refs.applyUser.getObj();
        tempData.applyUserId = applyUser.id;
        tempData.applyUserName = applyUser.name;
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
        this.$refs.veSbzcZcApplyDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(false);
            if (subData == null) {
              return;
            }
            veSbzcZcApplyApi.add(subData).then(res => {
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
        this.$refs.veSbzcZcApplyDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(true);
            if (subData == null) {
              return;
            }
            veSbzcZcApplyApi.update(subData).then(() => {
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