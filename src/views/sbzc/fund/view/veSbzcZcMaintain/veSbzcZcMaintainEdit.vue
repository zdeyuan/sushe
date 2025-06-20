<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                :title="textMap[dialogStatus]"
                @ok="viewType==='create'?createData():updateData()"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcMaintainDataForm"
                    :rules="veSbzcZcMaintainRules"
                    :model="veSbzcZcMaintainVo"
                    labelAlign="right"
            >
                <a-form-model-item label="资产名称" prop="assetName" required>
                    <a-input v-model="veSbzcZcMaintainVo.assetName" :maxLength="0" placeholder="请输入资产名称" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="资产编号" prop="assetCode" required>
                    <a-input v-model="veSbzcZcMaintainVo.assetCode" :maxLength="0" placeholder="请输入资产编号" :disabled="true"/>
                </a-form-model-item>
                <a-form-model-item label="所属部门" prop="deptTreeOwn">
                    <dept-tree ref="deptTreeOwn"></dept-tree>
                </a-form-model-item>
                <a-form-model-item label="维修部门" prop="deptTreeMaintain">
                    <dept-tree ref="deptTreeMaintain"></dept-tree>
                </a-form-model-item>
                <a-form-model-item label="维修人" prop="maintainUser">
                    <userSelectBox ref="maintainUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="批准人" prop="checkUser">
                    <userSelectBox ref="checkUser"></userSelectBox>
                </a-form-model-item>
                <a-form-model-item label="维修时间" prop="maintainDate" required>
					<DatePickByCN v-model="veSbzcZcMaintainVo.maintainDate"  placeholder="请选择维修时间" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-textarea v-model="veSbzcZcMaintainVo.remark" :maxLength="500" placeholder="请输入备注"/>
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcMaintainApi from '@/views/sbzc/fund/api/veSbzcZcMaintainApi';
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
      let validateDeptMainTain = (rule, value, callback) => {
        const data = this.$refs.deptTreeMaintain.getValue();
        if (data && data.length > 0) {
          callback();
        } else {
          callback(new Error('请选择'));
        }
      };
      let validateMaintainUser = (rule, value, callback) => {
        const data = this.$refs.maintainUser.getValue();
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
        veSbzcZcMaintainVo: this.resetveSbzcZcMaintainVo(),
        textMap: {
          update: '编辑-设备资产维修',
          create: '新增-设备资产维修'
        },
        dialogStatus: 'create',
        veSbzcZcMaintainRules: {
          deptTreeOwn: [{ validator: validateDeptOwn, trigger: 'change', required: true }],
          deptTreeMainTain: [{ validator: validateDeptMainTain, trigger: 'change', required: true }],
          maintainUser: [{ validator: validateMaintainUser, trigger: 'change', required: true }],
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
      resetveSbzcZcMaintainVo() {
        return {
          assetId: '',// 资产ID
          assetCode: '',// 资产Code
          assetName: '',// 资产Name
          deptOwn: '123',// 所属部门
          deptMaintain: '456',// 维修单位
          maintainUserId: '',// 维修人
          maintainUserName: '',// 维修人
          checkUserId: '',// 批准人,默认为当前操作管理员
          checkUserName: '',// 批准人,默认为当前操作管理员
          maintainDate: this.$date.format('YYYY-MM-DD'),//
          descrption: '',// 情况说明
          createTime: this.$date.format('YYYY-MM-DD'),// 创建时间
          remark: '',// 备注
          assetStatus: '',//
          status: '2',// 维修状态（1.维修完成，2 维修中）
          maintainFinishDate: ''// 维修完成时间
        };
      },
      /**
       * @msg: 初始化新增
       */
      doCreate(row) {
        this.viewType = 'create';
        this.veSbzcZcMaintainVo = this.resetveSbzcZcMaintainVo();
        this.veSbzcZcMaintainVo.assetId = row.id;
        this.veSbzcZcMaintainVo.assetCode = row.code;
        this.veSbzcZcMaintainVo.assetName = row.name;
        this.$nextTick(() => {
          this.$refs.veSbzcZcMaintainDataForm.clearValidate();
        });
      },
      /**
       * @msg: 初始化修改
       */
      doUpdate(row) {
        veSbzcZcMaintainApi.get(row.id).then((res) => {
          this.veSbzcZcMaintainVo = res.result;
        });
        this.viewType = 'update';
        this.$nextTick(() => {
          this.$refs.veSbzcZcMaintainDataForm.clearValidate();
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
        const tempData = Object.assign({}, this.veSbzcZcMaintainVo);
        //维修人
        const maintainUser = this.$refs.maintainUser.getObj();
        tempData.maintainUserId = maintainUser.id;
        tempData.maintainUserName = maintainUser.name;
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
        this.$refs.veSbzcZcMaintainDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(false);
            if (subData == null) {
              return;
            }
            veSbzcZcMaintainApi.add(subData).then(res => {
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
        this.$refs.veSbzcZcMaintainDataForm.validate(valid => {
          if (valid) {
            const subData = this.getSubData(true);
            if (subData == null) {
              return;
            }
            veSbzcZcMaintainApi.update(subData).then(() => {
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