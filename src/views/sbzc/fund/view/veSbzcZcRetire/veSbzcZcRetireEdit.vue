<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                :title="textMap[dialogStatus]"
                @ok="viewType==='create'?createData():updateData()"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcRetireDataForm"
                    :rules="veSbzcZcRetireRules"
                    :model="veSbzcZcRetireVo"
                    labelAlign="right"
            >
                <a-form-model-item label="资产名称" prop="assetName" required>
                    <a-input v-model="veSbzcZcRetireVo.assetName" :maxLength="0" placeholder="请输入资产名称" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="资产编号" prop="assetCode" required>
                    <a-input v-model="veSbzcZcRetireVo.assetCode" :maxLength="0" placeholder="请输入资产编号" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="数量" prop="assetNum" required>
                    <a-input-number v-model="veSbzcZcRetireVo.assetNum" placeholder="请输入数量" style="width:300px"/>
                </a-form-model-item>
                <a-form-model-item label="所属部门" prop="deptTree">
                    <dept-tree ref="deptTree"></dept-tree>
<!--                    <a-input v-model="veSbzcZcRetireVo.deptOwn" :maxLength="0" placeholder="请输入所属部门"/>-->
                </a-form-model-item>
                <a-form-model-item label="报废申请人" prop="retireUser" >
                    <userSelectBox ref="retireUser"></userSelectBox>
<!--                    <a-input v-model="veSbzcZcRetireVo.retireUserId" :maxLength="0" placeholder="请输入报废申请人"/>-->
                </a-form-model-item>
                <a-form-model-item label="批准人" prop="checkUser" >
                    <userSelectBox ref="checkUser"></userSelectBox>
<!--                    <a-input v-model="veSbzcZcRetireVo.checkUserId" :maxLength="0" placeholder="请输入批准人"/>-->
                </a-form-model-item>
                <a-form-model-item label="报废日期" prop="retireDate" required>
					<DatePickByCN v-model="veSbzcZcRetireVo.retireDate"  placeholder="请选择报废日期" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-textarea v-model="veSbzcZcRetireVo.remark" :maxLength="500" placeholder="请输入备注"/>
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcRetireApi from '@/views/sbzc/fund/api/veSbzcZcRetireApi';
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
      let validateRetireUser = (rule, value, callback) => {
        const data = this.$refs.retireUser.getValue();
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
        veSbzcZcRetireVo: this.resetveSbzcZcRetireVo(),
        textMap: {
          update: '编辑-设备资产报废',
          create: '新增-设备资产报废'
        },
        dialogStatus: 'create',
        veSbzcZcRetireRules: {
          deptTree: [{ validator: validateDept, trigger: 'change', required: true }],
          retireUser: [{ validator: validateRetireUser, trigger: 'change', required: true }],
          checkUser: [{ validator: validateCheckUser, trigger: 'change', required: true }]
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
      resetveSbzcZcRetireVo() {
        return {
          assetId: '',// 资产ID
          assetCode: '',// 资产Code
          assetName: '',// 资产Name
          assetNum: '',// 资产数量
          deptOwn: '123',// 所属部门
          retireDate: this.$date.format('YYYY-MM-DD'),// 报废日期
          retireUserId: '',// 报废申请人
          retireUserName: '',// 报废申请人姓名
          checkUserId: '',// 批准人
          checkUserName: '',// 批准人姓名
          createTime: '123',// 创建时间
          remark: ''// 备注
        };
      },
      /**
       * @msg: 初始化新增
       */
      doCreate(row) {
        this.viewType = 'create';
        this.veSbzcZcRetireVo = this.resetveSbzcZcRetireVo();
        this.veSbzcZcRetireVo.assetId = row.id;
        this.veSbzcZcRetireVo.assetCode = row.code;
        this.veSbzcZcRetireVo.assetName = row.name;
        this.$nextTick(() => {
          this.$refs.veSbzcZcRetireDataForm.clearValidate();
        });
      },
      /**
       * @msg: 初始化修改
       */
      doUpdate(row) {
        veSbzcZcRetireApi.get(row.id).then((res) => {
          this.veSbzcZcRetireVo = res.result;
        });
        this.viewType = 'update';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRetireDataForm.clearValidate();
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
        const tempData = Object.assign({}, this.veSbzcZcRetireVo);
        //报废申请人
        const retireUser = this.$refs.retireUser.getObj();
        tempData.retireUserId = retireUser.id;
        tempData.retireUserName = retireUser.name;
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
        this.$refs.veSbzcZcRetireDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(false);
            if (subData == null) {
              return;
            }
            veSbzcZcRetireApi.add(subData).then(res => {
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
        this.$refs.veSbzcZcRetireDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(true);
            if (subData == null) {
              return;
            }
            veSbzcZcRetireApi.update(subData).then(() => {
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