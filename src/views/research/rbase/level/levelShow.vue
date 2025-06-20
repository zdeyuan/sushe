<!--
 * @Descripttion: 木麻模板 编辑页
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-11-25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-13 18:51:39
-->
<template>
  <div>
    <a-dialog :title="textMap[viewType]" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="edit_form">
        <!-- 编辑页 -->

        <a-form ref="templateDataForm" :rules="templateRules" :model="templateVo" laba-position="left" laba-width="150px">
          <a-row>
            <a-col :span="12">
              <a-form-item label="种子名称">
                {{ templateVo.templateName }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="模板数据">
                {{ templateVo.json }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <a-button @click="handelCancel">取 消</a-button>
        <a-button type="primary" @click="viewType === 'create' ? createData() : updateData()">确 定</a-button>
      </span>
    </a-dialog>
  </div>
</template>

<script>
import veJkyLevelApi from '@/api/research/rbase/veJkyLevelApi';

export default {
  components: {},
  data() {
    const data = {
      templateVo: this.resettemplateVo(),
      textMap: {
        update: '编辑-木麻模板',
        create: '新增-木麻模板'
      },
      viewType: 'create',
      templateRules: {},
      centerDialogVisible: false
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @name: Erik Zhang
     * @msg: 重置数据
     */
    resettemplateVo() {
      return {
        templateName: '', //种子名称
        json: '' //模板数据
      };
    },

    /**
     * @name: Erik Zhang
     * @msg: 初始化修改
     */
    doShow(row) {
      this.centerDialogVisible = true;
      templateApi.get(row.id).then(res => {
        this.templateVo = Object.assign({}, res.data); // copy obj
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.templateDataForm.clearValidate();
      });
    },
    /**
     * @name: Erik Zhang
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.centerDialogVisible = false;
      this.$emit('onCancel');
    },
    /**
     * @name: Erik Zhang
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.templateVo);
      return tempData;
    },
    /**
     * @name: Erik Zhang
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.templateDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          templateApi.add(subData).then(res => {
            this.$message.success('创建成功');
            this.centerDialogVisible = false;
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
      this.$refs.templateDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          templateApi.update(subData).then(() => {
            this.$message.success('修改成功');
            this.centerDialogVisible = false;
            this.$emit('onOk');
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
