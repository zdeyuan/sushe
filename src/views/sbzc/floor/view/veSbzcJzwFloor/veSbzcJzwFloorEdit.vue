<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwFloorDataForm" :rules="veSbzcJzwFloorRules" :model="veSbzcJzwFloorVo" labelAlign="right">
        <a-form-model-item label="所属楼宇" prop="jzwId" required>
          <jzwList v-model="veSbzcJzwFloorVo.jzwId" style="width:300px"></jzwList>
        </a-form-model-item>
        <a-form-model-item label="楼层编号" prop="code" required>
          <a-input v-model="veSbzcJzwFloorVo.code" :maxLength="6" style="width:300px" placeholder="请输入楼层编号" />
          <div style="color:#aaa;font-size:12px">地上楼层直接用阿拉伯数字表示，地下楼层在阿拉伯数字前加“B”</div>
        </a-form-model-item>
        <a-form-model-item label="房间数量" prop="roomCount">
          <a-input-number v-model="veSbzcJzwFloorVo.roomCount" placeholder="请输入房间数量" style="width:300px" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwFloorApi from '@/views/sbzc/floor/api/veSbzcJzwFloorApi';
import jzwList from '@/views/sbzc/floor/component/jzwList';
export default {
  components: { jzwList },
  data() {
    const data = {
      veSbzcJzwFloorVo: this.resetveSbzcJzwFloorVo(),
      textMap: {
        update: '编辑-楼层',
        create: '新增-楼层'
      },
      dialogStatus: 'create',
      veSbzcJzwFloorRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcJzwFloorVo() {
      return {
        jzwId: '', // 建筑物id
        code: '', // 地上楼层直接用阿拉伯数字表示，地下楼层在阿拉伯数字前加“B”
        roomCount: '' // 房间数量
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcJzwFloorVo = this.resetveSbzcJzwFloorVo();
      this.$nextTick(() => {
        this.$refs.veSbzcJzwFloorDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcJzwFloorApi.get(row.id).then(res => {
        this.veSbzcJzwFloorVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwFloorDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcJzwFloorVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcJzwFloorDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcJzwFloorApi.add(subData).then(res => {
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
      this.$refs.veSbzcJzwFloorDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcJzwFloorApi.update(subData).then(() => {
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
