<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuIdxDataForm" :rules="veStuIdxRules" :model="veStuIdxVo" labelAlign="right">
        <a-form-model-item label="指标名称" prop="name" required>
          <a-input v-model="veStuIdxVo.name" :maxLength="50" placeholder="请输入分类名称" />
        </a-form-model-item>

        <a-form-model-item label="上级分类" prop="pid">
          <edu-tree-select ref="eduTree" :check="false" :nodes="treeList"></edu-tree-select>
        </a-form-model-item>
        <a-form-model-item label="指标代码" prop="code">
          {{ veStuIdxVo.code }}
        </a-form-model-item>
        <a-form-model-item label="指标描述" prop="description">
          <a-textarea v-model="veStuIdxVo.description" :maxLength="300" placeholder="请输入详细说明" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="分类排序" prop="listSort" required>
          <a-input-number v-model="veStuIdxVo.listSort" :min="0" placeholder="请输入分类排序" style="width:300px" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuIdxApi from '@/views/stuManage/jis/api/veStuIdxApi';

export default {
  components: {},
  props: {
    treeList: {
      type: Array,
      default: null
    }
  },
  data() {
    const data = {
      veStuIdxVo: this.resetveStuIdxVo(),
      textMap: {
        update: '编辑-检查分类',
        create: '新增-检查分类'
      },
      dialogStatus: 'create',
      veStuIdxRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuIdxVo() {
      return {
        name: '', // 分类名称
        description: '', // 分类名称
        pid: '', //
        isDel: 0,
        path: '-1',
        listSort: 0 //
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuIdxVo = this.resetveStuIdxVo();
      this.$nextTick(() => {
        this.$refs.veStuIdxDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuIdxApi.get(row.id).then(res => {
        this.veStuIdxVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.pid]);
        }, 0);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuIdxDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuIdxVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.pid = treeData && treeData.length > 0 ? treeData[0] : 0;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuIdxDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuIdxApi.add(subData).then(res => {
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
      this.$refs.veStuIdxDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuIdxApi.update(subData).then(() => {
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
