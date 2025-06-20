<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuStipendDataForm" :rules="veStuStipendRules" :model="veStuStipendVo" labelAlign="right">
        <a-form-model-item label="助学金类型" prop="typeId" required>
          <edu-data v-model="veStuStipendVo.typeId" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>

        <a-form-model-item label="申请材料" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="veStuStipend" />
        </a-form-model-item>

        <a-form-model-item label="申请时间" prop="applyTime" required>
			<DatePickByCN  v-model="veStuStipendVo.applyTime"  placeholder="请选择申请时间"/>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="content">
          <a-textarea v-model="veStuStipendVo.content" :maxLength="65535" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuStipendApi from '../../../api/veStuStipendApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import stuSelect from '@/components/kqManageComponent/stuSelect';
export default {
  props: {
    typeNodes: Array
  },
  components: { uploadFiles, stuSelect },
  data() {
    let validateFail = (rule, value, callback) => {
      const data = this.$refs.uploadFiles.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择申请材料'));
      }
    };
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择学生'));
      }
    };
    const data = {
      veStuStipendVo: this.resetveStuStipendVo(),
      textMap: {
        update: '编辑-助学金信息',
        create: '新增-助学金信息'
      },
      dialogStatus: 'create',
      veStuStipendRules: {
        stuId: [{ validator: validateUser, trigger: 'change', required: true }],
		typeId: [{ required: true , message: '请选择助学金类型',}],
		applyTime: [{ required: true , message: '请选申请时间',}],
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    isStu(typeId) {
      for (let i = 0; i < this.typeNodes.length; i++) {
        const typeNode = this.typeNodes[i];
        if (typeNode.id == typeId) {
          return typeNode.attribute == 1;
        }
      }
      return true;
    },
    /**
     * @msg: 重置数据
     */
    resetveStuStipendVo() {
      return {
        stuId: '', // 学生id
        typeId: '', // 类型id
        fileId: '', // 文件id(申请凭证)
        applyTime: '', // 申请时间
        auditTime: '', // 审核时间
        auditUserId: '', // 审核人
        auditUserName: '', //
        auditStatus: 0, // 审核状态;0待审核 1通过2未通过
        auditReason: '', // 未通过原因
        content: '', // 备注
        status: '', // 发放状态;1已发放，2未发放
        giveTime: '' // 发放时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuStipendVo = this.resetveStuStipendVo();
      this.$nextTick(() => {
        this.$refs.veStuStipendDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuStipendApi.get(row.id).then(res => {
        this.veStuStipendVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
        setTimeout(() => {
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.stuId);
        }, 100);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuStipendDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuStipendVo);
      tempData.auditStatus = 0;
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      if (this.$refs.stuSelect) {
        const stus = this.$refs.stuSelect.getObj()[0];
        tempData.stuId = stus.id;
      }

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuStipendDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuStipendApi.add(subData).then(res => {
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
      this.$refs.veStuStipendDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuStipendApi.update(subData).then(() => {
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
