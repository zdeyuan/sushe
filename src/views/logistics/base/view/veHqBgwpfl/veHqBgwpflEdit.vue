<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqBgwpflDataForm" :rules="veHqBgwpflRules" :model="veHqBgwpflVo" labelAlign="right">
        <a-form-model-item label="分类名称" prop="name" required>
          <a-input v-model="veHqBgwpflVo.name" :maxLength="50" placeholder="请输入分类名称" />
        </a-form-model-item>
        <a-form-model-item label="分类排序" prop="listSort" required>
          <a-input-number v-model="veHqBgwpflVo.listSort" :min="0" placeholder="请输入分类排序" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="启用状态" prop="status" required>
          <edu-data v-model="veHqBgwpflVo.status" stype="radio" code="qstatus" />
        </a-form-model-item>
        <a-form-model-item label="是否为耗材" prop="sfhc" required>
          <edu-data v-model="veHqBgwpflVo.sfhc" stype="radio" code="shifou" />
        </a-form-model-item>
        <a-form-model-item label="上级分类" prop="pid">
          <edu-tree-select ref="eduTree" :check="false" :nodes="treeList"></edu-tree-select>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqBgwpflApi from '@/views/logistics/base/api/veHqBgwpflApi';

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
      veHqBgwpflVo: this.resetveHqBgwpflVo(),
      textMap: {
        update: '办公物品分类',
        create: '办公物品分类'
      },
      dialogStatus: 'create',
      veHqBgwpflRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqBgwpflVo() {
      return {
        name: '', // 分类名称
        status: 1, // 状态码 ：0为禁用，1启用
        sfhc: 1, // 是否为耗材 0否1是
        pid: '', //
        listSort: 999 //
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqBgwpflVo = this.resetveHqBgwpflVo();
      this.$nextTick(() => {
        this.$refs.veHqBgwpflDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqBgwpflApi.get(row.id).then(res => {
        this.veHqBgwpflVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.pid]);
        }, 0);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqBgwpflDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqBgwpflVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.pid = treeData && treeData.length > 0 ? treeData[0] : 0;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqBgwpflDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqBgwpflApi.add(subData).then(res => {
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
      this.$refs.veHqBgwpflDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqBgwpflApi.update(subData).then(() => {
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
