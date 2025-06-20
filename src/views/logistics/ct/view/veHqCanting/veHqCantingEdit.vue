<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqCantingDataForm" :rules="veHqCantingRules" :model="veHqCantingVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="餐厅名称" class="ytop" prop="name" required>
              <a-input v-model="veHqCantingVo.name" :maxLength="50" placeholder="请输入餐厅名称" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="餐厅位置" class="ytop" prop="ctwz" required>
              <a-input v-model="veHqCantingVo.ctwz" :maxLength="100" placeholder="请输入餐厅位置" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="餐厅楼层" prop="ctlc" required>
              <a-input-number v-model="veHqCantingVo.ctlc" placeholder="请输入餐厅楼层" style="width:150px" />层
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="开放窗口数" prop="kfcks" required>
              <a-input-number v-model="veHqCantingVo.kfcks" placeholder="请输入开放窗口数" style="width:150px" />个
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="容纳人数" prop="rnrs">
              <a-input-number v-model="veHqCantingVo.rnrs" placeholder="请输入容纳人数" style="width:150px" />个
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="建设时间" prop="jsTime">
				<DatePickByCN
				   v-model="veHqCantingVo.jsTime"
				  placeholder="请选择建设时间"  />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="负责人" prop="fzrId">
          <userSelectBox ref="userSelectBox"></userSelectBox>
        </a-form-model-item>

        <a-form-model-item label="餐厅状态" prop="ctzt">
          <edu-data v-model="veHqCantingVo.status" stype="radio" code="status" />
        </a-form-model-item>
        <a-form-model-item label="备注说明" prop="remark">
          <a-textarea v-model="veHqCantingVo.remark" :maxLength="300" placeholder="请输入备注说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqCantingApi from '@/views/logistics/ct/api/veHqCantingApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';

export default {
  components: { userSelectBox },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.userSelectBox.getValue();
      if (data) {
        callback();
      } else {
        callback(new Error('请选择负责人'));
      }
    };
    const data = {
      veHqCantingVo: this.resetveHqCantingVo(),
      textMap: {
        update: '餐厅',
        create: '餐厅'
      },
      dialogStatus: 'create',
      veHqCantingRules: {
        fzrId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqCantingVo() {
      return {
        name: '', // 餐厅名称
        ctwz: '', // 餐厅位置
        fzrId: '', //
        fzrName: '', // 负责人
        ctlc: '', // 餐厅楼层
        jsTime: '', // 建设时间
        rnrs: '', // 容纳人数
        kfcks: '', // 开放窗口数
        status: 1, // 状态：1=在用，0=废弃
        remark: '' // 备注说明
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqCantingVo = this.resetveHqCantingVo();
      this.$nextTick(() => {
        this.$refs.veHqCantingDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqCantingApi.get(row.id).then(res => {
        this.veHqCantingVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.userSelectBox.setObj([{ id: row.fzrId, name: row.fzrName }]);
        this.$refs.veHqCantingDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqCantingVo);
      const userData = this.$refs.userSelectBox.getObj();
      tempData.fzrId = userData.id;
      tempData.fzrName = userData.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqCantingDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqCantingApi.add(subData).then(res => {
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
      this.$refs.veHqCantingDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqCantingApi.update(subData).then(() => {
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
