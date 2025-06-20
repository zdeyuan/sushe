<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqHaopinDataForm" :rules="veHqHaopinRules" :model="veHqHaopinVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品编号" class="ytop" prop="code" required>
              <a-input v-model="veHqHaopinVo.code" :maxLength="50" placeholder="请输入物品编号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="物品名称" class="ytop" prop="name" required>
              <a-input v-model="veHqHaopinVo.name" :maxLength="50" placeholder="请输入物品名称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="品牌" prop="wppp">
              <a-input v-model="veHqHaopinVo.wppp" :maxLength="200" placeholder="请输入品牌" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="计划使用年限" prop="jhsynx">
              <a-input v-model="veHqHaopinVo.jhsynx" :maxLength="20" placeholder="请输入计划使用年限" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品单价" prop="wpdj">
              <a-input v-model="veHqHaopinVo.wpdj" placeholder="请输入物品单价" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="物品描述" prop="remark">
          <a-textarea v-model="veHqHaopinVo.remark" :maxLength="300" placeholder="请输入物品描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqHaopinApi from '@/views/logistics/bx/api/veHqHaopinApi';

export default {
  components: {},
  data() {
    const data = {
      veHqHaopinVo: this.resetveHqHaopinVo(),
      textMap: {
        update: '低耗品',
        create: '低耗品'
      },
      dialogStatus: 'create',
      veHqHaopinRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqHaopinVo() {
      return {
        code: '', // 物品编号
        name: '', // 物品名称
        remark: '', // 物品描述
        status: 1, // 物品状态
        jhsynx: '', // 计划使用年限
        wpdj: '', // 物品单价
        wppp: '', // 品牌
        useStatus: '', // 使用状态 0 正常  1报废
        sfzj: '', // 是否租借 0否 1是
        updateBy: '', // 更新人
        updateDate: '', // 更新时间
        updateName: '' // 更新人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqHaopinVo = this.resetveHqHaopinVo();
      this.$nextTick(() => {
        this.$refs.veHqHaopinDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqHaopinApi.get(row.id).then(res => {
        this.veHqHaopinVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqHaopinDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqHaopinVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqHaopinDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqHaopinApi.add(subData).then(res => {
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
      this.$refs.veHqHaopinDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqHaopinApi.update(subData).then(() => {
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
