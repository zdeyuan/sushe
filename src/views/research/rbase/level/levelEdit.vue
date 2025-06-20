<!--
 * @Descripttion: 教科研项目级别表 编辑页
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 14:14:13
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyLevelDataForm" :rules="veJkyLevelRules" :model="veJkyLevelVo" labelAlign="right">
        <a-form-model-item label="级别名称" prop="name" class="need-top" required>
          <a-input v-model="veJkyLevelVo.name" :maxLength="100" placeholder="请输入级别名称" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listSort">
          <a-input-number v-model="veJkyLevelVo.listSort" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyLevelVo.status" stype="radio" code="status" />
        </a-form-model-item>
        <a-form-model-item label="说明" prop="mark">
          <a-textarea v-model="veJkyLevelVo.mark" :maxLength="300" placeholder="请输入说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyLevelApi from '@/api/research/rbase/veJkyLevelApi';

export default {
  data() {
    var data = {
      veJkyLevelVo: this.resetveJkyLevelVo(),
      textMap: {
        update: '编辑-项目级别',
        create: '新增-项目级别'
      },
      dialogStatus: 'create',
      veJkyLevelRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @name: Erik Zhang
     * @msg: 重置数据
     */
    resetveJkyLevelVo() {
      return {
        name: '', // 分类名称
        listSort: '', // 排序
        mark: '', // 说明
        status: 1
      };
    },
    /**
     * @name: Erik Zhang
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyLevelVo = this.resetveJkyLevelVo();
      this.$nextTick(() => {
        this.$refs.veJkyLevelDataForm.clearValidate();
      });
    },
    /**
     * @name: Erik Zhang
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyLevelApi.get(row.id).then(res => {
        this.veJkyLevelVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyLevelDataForm.clearValidate();
      });
    },
    /**
     * @name: Erik Zhang
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @name: Erik Zhang
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.veJkyLevelVo);
      return tempData;
    },
    /**
     * @name: Erik Zhang
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyLevelDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyLevelApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: `新增了一条数据`
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @name: Erik Zhang
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veJkyLevelDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyLevelApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: `修改了一条数据`
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
