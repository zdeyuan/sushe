<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" width="30%" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetPlaceDataForm" :rules="veJkyMeetPlaceRules" :model="veJkyMeetPlaceVo" labelAlign="right">
        <a-form-model-item label="场地名称" prop="name" required>
          <a-input v-model="veJkyMeetPlaceVo.name" :maxLength="255" placeholder="请输入场地名称" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyMeetPlaceVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetPlaceApi from '@/api/research/rwork/veJkyMeetPlaceApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyMeetPlaceVo: this.resetveJkyMeetPlaceVo(),
      textMap: {
        update: '编辑-会议场地',
        create: '新增-会议场地'
      },
      dialogStatus: 'create',
      veJkyMeetPlaceRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyMeetPlaceVo() {
      return {
        status: 1,
        name: '' // 场地名称
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyMeetPlaceVo = this.resetveJkyMeetPlaceVo();
      this.$nextTick(() => {
        this.$refs.veJkyMeetPlaceDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyMeetPlaceApi.get(row.id).then(res => {
        this.veJkyMeetPlaceVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyMeetPlaceDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyMeetPlaceVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyMeetPlaceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyMeetPlaceApi.add(subData).then(res => {
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
      this.$refs.veJkyMeetPlaceDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyMeetPlaceApi.update(subData).then(() => {
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
