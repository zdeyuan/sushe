<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form width="40%" :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyCategoryDataForm" :rules="veJkyCategoryRules" :model="veJkyCategoryVo" labelAlign="right">
        <a-form-model-item label="分类编码" prop="codeNum" required>
          <a-input v-model="veJkyCategoryVo.codeNum" :maxLength="30" placeholder="请输入类型代码" />
        </a-form-model-item>
        <a-form-model-item label="分类名称" prop="name" required>
          <a-input v-model="veJkyCategoryVo.name" :maxLength="100" placeholder="请输入分类名称" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listSort">
          <a-input-number v-model="veJkyCategoryVo.listSort" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>

        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyCategoryVo.status" stype="radio" code="status" />
        </a-form-model-item>
        <a-form-model-item label="上级分类" prop="pid">
          <edu-tree-select ref="eduTree" :check="false" :nodes="treeList"></edu-tree-select>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyCategoryApi from '@/api/research/rbase/veJkyCategoryApi';

export default {
  components: {},
  props: {
    treeList: {
      type: Array,
      default: null
    }
  },
  data() {
    var data = {
      veJkyCategoryVo: this.resetveJkyCategoryVo(),
      textMap: {
        update: '编辑-项目类型',
        create: '新增-项目类型'
      },
      dialogStatus: 'create',
      veJkyCategoryRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyCategoryVo() {
      return {
        status: 1,
        name: '', // 分类名称
        listSort: '', // 排序
        codeNum: '', // 类型代码
        pid: '' // 父id
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyCategoryVo = this.resetveJkyCategoryVo();
      this.$nextTick(() => {
        this.$refs.veJkyCategoryDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.viewType = 'update';
      veJkyCategoryApi.get(row.id).then(res => {
        this.veJkyCategoryVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.pid]);
        }, 0);
      });
      this.$nextTick(() => {
        this.$refs.veJkyCategoryDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyCategoryVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.pid = treeData ? treeData[0] : 0;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyCategoryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyCategoryApi.add(subData).then(res => {
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
      this.$refs.veJkyCategoryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyCategoryApi.update(subData).then(() => {
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
