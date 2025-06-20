<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuGraduationYxbysDataForm" :rules="veStuGraduationYxbysRules" :model="veStuGraduationYxbysVo" labelAlign="right">
        <a-form-model-item label="学生" prop="graduatId">
          <graduationSelect ref="graduationSelect"></graduationSelect>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark" required>
          <a-input v-model="veStuGraduationYxbysVo.remark" :maxLength="500" placeholder="请输入备注" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuGraduationYxbysApi from '@/views/stuManage/biye/api/veStuGraduationYxbysApi';
import graduationSelect from './graduationSelect';

export default {
  components: { graduationSelect },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.graduationSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择学生'));
      }
    };
    const data = {
      veStuGraduationYxbysVo: this.resetveStuGraduationYxbysVo(),
      textMap: {
        update: '编辑-优秀毕业生信息',
        create: '新增-优秀毕业生信息'
      },
      dialogStatus: 'create',
      veStuGraduationYxbysRules: {
        graduatId: [{ validator: validateUser, trigger: 'change', required: true }],
		remark: [{ trigger: 'change', required: true,message: '请输入备注',}]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationYxbysVo() {
      return {
        graduatId: '', //
        remark: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuGraduationYxbysVo = this.resetveStuGraduationYxbysVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationYxbysDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationYxbysApi.get(row.id).then(res => {
        this.veStuGraduationYxbysVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuGraduationYxbysDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuGraduationYxbysVo);
      if (this.$refs.graduationSelect) {
        const stus = this.$refs.graduationSelect.getObj()[0];
        tempData.graduatId = stus.id;
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationYxbysDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuGraduationYxbysApi.add(subData).then(res => {
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
      this.$refs.veStuGraduationYxbysDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuGraduationYxbysApi.update(subData).then(() => {
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
