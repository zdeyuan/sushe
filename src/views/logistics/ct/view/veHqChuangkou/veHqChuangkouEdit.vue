<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqChuangkouDataForm" :rules="veHqChuangkouRules" :model="veHqChuangkouVo" labelAlign="right">
        <a-form-model-item label="餐厅" prop="ctId" required>
          <ctList v-model="veHqChuangkouVo.ctId"></ctList>
        </a-form-model-item>
        <a-form-model-item label="窗口名称" prop="name" required>
          <a-input v-model="veHqChuangkouVo.name" :maxLength="50" placeholder="请输入窗口名称" />
        </a-form-model-item>
        <a-form-model-item label="合作者姓名" prop="hzzName">
          <a-input v-model="veHqChuangkouVo.hzzName" :maxLength="20" placeholder="请输入合作者姓名" />
        </a-form-model-item>
        <a-form-model-item label="窗口负责人" prop="fzrId">
          <userSelectBox ref="userSelectBox"></userSelectBox>
        </a-form-model-item>

        <a-form-model-item label="窗口状态" prop="status" required>
          <edu-data v-model="veHqChuangkouVo.status" stype="radio" code="ctStatus" />
        </a-form-model-item>
        <a-form-model-item label="备注说明" prop="remark">
          <a-textarea v-model="veHqChuangkouVo.remark" :maxLength="300" placeholder="请输入备注说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqChuangkouApi from '@/views/logistics/ct/api/veHqChuangkouApi';
import ctList from '@/views/logistics/ct/component/ctList';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';

export default {
  components: { ctList, userSelectBox },
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
      veHqChuangkouVo: this.resetveHqChuangkouVo(),
      textMap: {
        update: '餐厅窗口',
        create: '餐厅窗口'
      },
      dialogStatus: 'create',
      veHqChuangkouRules: {
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
    resetveHqChuangkouVo() {
      return {
        ctId: '', // 餐厅ID
        name: '', // 窗口名称
        hzzName: '', // 合作者姓名
        status: 1, // 状态：1=开放，0=未开放
        remark: '', // 备注说明
        fzrId: '', //
        fzrName: '' // 负责人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqChuangkouVo = this.resetveHqChuangkouVo();
      this.$nextTick(() => {
        this.$refs.veHqChuangkouDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqChuangkouApi.get(row.id).then(res => {
        this.veHqChuangkouVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.userSelectBox.setObj([{ id: row.fzrId, name: row.fzrName }]);
        this.$refs.veHqChuangkouDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqChuangkouVo);
      const userData = this.$refs.userSelectBox.getObj();
      tempData.fzrId = userData.id;
      tempData.fzrName = userData.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqChuangkouDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqChuangkouApi.add(subData).then(res => {
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
      this.$refs.veHqChuangkouDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqChuangkouApi.update(subData).then(() => {
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
