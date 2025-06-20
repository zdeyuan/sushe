<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqHaopinCrDataForm" :rules="veHqHaopinCrRules" :model="veHqHaopinCrVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="低耗品名称">
              {{ haoData.name }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item class="ytop" label="低耗品数量">
              {{ haoData.num }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="操作数量" prop="number" required>
          <a-input v-model="veHqHaopinCrVo.number" placeholder="请输入数量" />
        </a-form-model-item>
        <a-form-model-item label="操作时间" prop="crTime" required>
			<DatePickByCN
			   v-model="veHqHaopinCrVo.crTime"
			  placeholder="请选择操作时间"  />
        </a-form-model-item>
        <a-form-model-item :label="'领用人'" prop="applyUser" v-if="veHqHaopinCrVo.type != 1">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="pjUser">
          <userSelectBox ref="pjUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark" required>
          <a-textarea v-model="veHqHaopinCrVo.remark" :maxLength="300" placeholder="请输入详细说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqHaopinCrApi from '@/views/logistics/bx/api/veHqHaopinCrApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';
export default {
  components: { userSelectBox },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.applyUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser2 = (rule, value, callback) => {
      const data = this.$refs.pjUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateNumber = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('数量必须大于0'));
      } else if (this.veHqHaopinCrVo.type != 1 && value > this.haoData.num) {
        callback(new Error('库存数量不足'));
      } else {
        callback();
      }
    };

    const data = {
      veHqHaopinCrVo: this.resetveHqHaopinCrVo(),
      textMap: {
        update: '低耗品出入库',
        create: '低耗品出入库'
      },
      dialogStatus: 'create',
      veHqHaopinCrRules: {
        applyUser: [{ validator: validateUser, trigger: 'change', required: true }],
        pjUser: [{ validator: validateUser2, trigger: 'change', required: true }],
        number: [{ validator: validateNumber, trigger: 'change', required: true }]
      },
      haoData: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqHaopinCrVo() {
      return {
        hqId: '', // 物品Id
        number: '', // 数量
        crTime: this.$date.format('YYYY-MM-DD'), // 出入时间
        type: '', // 操作类型：1=入库，2=领用，3=借用、4=报废、5=归还、6=调拨
        glId: '', // 关联的出入库操作ID，主要是归还和调拨使用
        remark: '', // 备注
        clasId: '', // 班级Id
        clasIds: '', //
        applyUser: '', // 申请人
        applyUserName: '', // 申请人
        jsUser: '', // 经手人
        jbUserName: '', // 经手人
        pjUser: '', // 批准人
        pjUserName: '' // 批准人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(haoData, type) {
      this.viewType = 'create';
      this.haoData = haoData;
      this.veHqHaopinCrVo = this.resetveHqHaopinCrVo();
      this.veHqHaopinCrVo.type = type;
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqHaopinCrApi.get(row.id).then(res => {
        this.veHqHaopinCrVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqHaopinCrVo);
      tempData.hqId = this.haoData.id;

      if (this.$refs.applyUser) {
        const userData = this.$refs.applyUser.getObj();
        tempData.applyUser = userData.id;
        tempData.applyUserName = userData.name;
      }

      const userData3 = this.$refs.pjUser.getObj();
      tempData.pjUser = userData3.id;
      tempData.pjUserName = userData3.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqHaopinCrDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqHaopinCrApi.add(subData).then(res => {
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
      this.$refs.veHqHaopinCrDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqHaopinCrApi.update(subData).then(() => {
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
