<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuScholarshipDataForm" :rules="veStuScholarshipRules" :model="veStuScholarshipVo" labelAlign="right">
        <a-form-model-item label="奖学金类型" prop="typeId" required>
          <edu-data v-model="veStuScholarshipVo.typeId" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>
        <a-form-model-item label="获得时间" prop="actionTime" required>
			<DatePickByCN  v-model="veStuScholarshipVo.actionTime"  placeholder="请选择获得时间"/>
        </a-form-model-item>
        <a-form-model-item label="描述" prop="content">
          <a-textarea v-model="veStuScholarshipVo.content" :maxLength="65535" placeholder="请输入奖学金描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuScholarshipApi from '../../api/veStuScholarshipApi';
import boxZybmbj from '@/components/kqManageComponent/boxZybmbj';
import stuSelect from '@/components/kqManageComponent/stuSelect';
import { baseMixins } from '@/mixins/baseMixins';
export default {
  props: {
    typeNodes: Array
  },
  mixins: [baseMixins],
  components: { boxZybmbj, stuSelect },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择学生'));
      }
    };
    const data = {
      veStuScholarshipVo: {},
      textMap: {
        update: '编辑-奖学金信息',
        create: '新增-奖学金信息'
      },
      dialogStatus: 'create',
      veStuScholarshipRules: {
        stuId: [{ validator: validateUser, trigger: 'change', required: true }],
		typeId: [{ required: true , message: '请选择奖学金类型',}],
		actionTime: [{ required: true , message: '请选择获得时间',}],
      }
    };
    return data;
  },
  created() {
    this.veStuScholarshipVo = this.resetveStuScholarshipVo();
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuScholarshipVo() {
      return {
        stuId: '', // 学生id
        typeId: '', // 类型id
        actionTime: '', // 获得时间
        content: '', // 描述
        status: 2, // 发放状态;1已发放，2未发放
        giveTime: '', // 发放时间
        auditStatus: 1, // 审核状态(2待审核，1审核通过，0审核不通过）
        auditUserId: this.loginInfo.userId, // 审核人
        auditUserName: this.loginInfo.userName, //
        auditContent: '' // 审核不通过原因
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuScholarshipVo = this.resetveStuScholarshipVo();
      this.$nextTick(() => {
        this.$refs.veStuScholarshipDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuScholarshipApi.get(row.id).then(res => {
        this.veStuScholarshipVo = res.result;
        setTimeout(() => {
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.stuId);
        }, 100);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuScholarshipVo);
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
      this.$refs.veStuScholarshipDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuScholarshipApi.add(subData).then(res => {
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
      this.$refs.veStuScholarshipDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuScholarshipApi.update(subData).then(() => {
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
