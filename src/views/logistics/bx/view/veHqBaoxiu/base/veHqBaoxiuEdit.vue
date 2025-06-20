<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqBaoxiuDataForm" :rules="veHqBaoxiuRules" :model="veHqBaoxiuVo" labelAlign="right">
        <a-form-model-item label="物品名称" prop="name" required>
          <a-input v-model="veHqBaoxiuVo.name" :maxLength="50" placeholder="请输入物品名称" />
        </a-form-model-item>
        <a-form-model-item label="维修地点" prop="place" required>
          <a-input v-model="veHqBaoxiuVo.place" :maxLength="100" placeholder="请输入维修地点" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veHqBaoxiuVo.remark" :maxLength="500" placeholder="请输入备注" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqBaoxiuApi from '@/views/logistics/bx/api/veHqBaoxiuApi';

export default {
  components: {},
  data() {
    const data = {
      veHqBaoxiuVo: this.resetveHqBaoxiuVo(),
      textMap: {
        update: '修改申请记录',
        create: '报修申请'
      },
      dialogStatus: 'create',
      veHqBaoxiuRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqBaoxiuVo() {
      return {
        name: '', // 物品名称
        status: 1, // 维修结果：0,不通过  1 代审核 2, 代维修  3, 已完成 4 未完成
        type: '', // 维修方式
        remark: '', // 备注
        place: '', // 维修地点
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
    doCreate() {
      this.viewType = 'create';
      this.veHqBaoxiuVo = this.resetveHqBaoxiuVo();
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqBaoxiuApi.get(row.id).then(res => {
        this.veHqBaoxiuVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqBaoxiuVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqBaoxiuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqBaoxiuApi.add(subData).then(res => {
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
      this.$refs.veHqBaoxiuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqBaoxiuApi.update(subData).then(() => {
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
