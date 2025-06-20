<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcCategoryDataForm" :rules="veSbzcZcCategoryRules" :model="veSbzcZcCategoryVo" labelAlign="right">
        <a-form-model-item label="分类代码" prop="code" required>
          <a-input v-model="veSbzcZcCategoryVo.code" :maxLength="30" placeholder="请输入分类代码" />
        </a-form-model-item>
        <a-form-model-item label="分类名称" prop="name" required>
          <a-input v-model="veSbzcZcCategoryVo.name" :maxLength="30" placeholder="请输入分类名称" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listSort" required>
          <a-input-number v-model="veSbzcZcCategoryVo.listSort" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="上级分类" prop="pid">
          <edu-tree-select ref="eduTree" :check="false" :nodes="treeList"></edu-tree-select>
        </a-form-model-item>
        <!--                <a-form-model-item label="路径" prop="path" required>-->
        <!--                    <a-input v-model="veSbzcZcCategoryVo.path" :maxLength="200" placeholder="请输入路径"/>-->
        <!--                </a-form-model-item>-->
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcCategoryApi from '@/views/sbzc/fund/api/veSbzcZcCategoryApi';

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
      veSbzcZcCategoryVo: this.resetveSbzcZcCategoryVo(),
      textMap: {
        update: '编辑-设备资产分类',
        create: '新增-设备资产分类'
      },
      dialogStatus: 'create',
      veSbzcZcCategoryRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcZcCategoryVo() {
      return {
        code: '', // 分类代码
        name: '', // 分类名称
        listSort: '', // 排序
        pid: '', // 父ID
        path: '' // 路径
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcZcCategoryVo = this.resetveSbzcZcCategoryVo();
      this.$nextTick(() => {
        this.$refs.veSbzcZcCategoryDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcZcCategoryApi.get(row.id).then(res => {
        this.veSbzcZcCategoryVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.pid]);
        }, 0);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcZcCategoryDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcZcCategoryVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.pid = treeData && treeData.length > 0 ? treeData[0] : 0;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcZcCategoryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcZcCategoryApi.add(subData).then(res => {
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
      this.$refs.veSbzcZcCategoryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcZcCategoryApi.update(subData).then(() => {
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
