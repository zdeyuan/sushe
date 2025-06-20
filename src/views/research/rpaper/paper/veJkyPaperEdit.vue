<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="textMap[dialogStatus]"
      class="mini-form-item inline-form"
      @ok="viewType === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
    >
      <a-form-model ref="veJkyPaperDataForm" :rules="veJkyPaperRules" :model="veJkyPaperVo" labelAlign="right">
        <a-form-model-item label="教师姓名" prop="userId">
          <jkyUserSelect ref="jkyUserSelect"></jkyUserSelect>
        </a-form-model-item>
        <a-form-model-item label="论文编号" prop="code" required>
          <a-input v-model="veJkyPaperVo.code" :maxLength="255" placeholder="请输入论文编号" />
        </a-form-model-item>
        <a-form-model-item label="论文中文名称" prop="name" required>
          <a-input v-model="veJkyPaperVo.name" :maxLength="255" placeholder="请输入论文中文名称" />
        </a-form-model-item>
        <a-form-model-item label="论文英文名称" prop="engName">
          <a-input v-model="veJkyPaperVo.engName" :maxLength="255" placeholder="请输入论文英文名称" />
        </a-form-model-item>
        <a-form-model-item label="论文发布时间" prop="pubTime">
			<DatePickByCN
			   v-model="veJkyPaperVo.pubTime"
			  placeholder="请选择论文发布时间"  />
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="期刊名称" prop="journalName">
              <a-input v-model="veJkyPaperVo.journalName" :maxLength="255" placeholder="请输入期刊名称" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="出版号" prop="pubCode">
              <a-input v-model="veJkyPaperVo.pubCode" :maxLength="255" placeholder="请输入出版号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="论文简介" prop="mark">
          <a-textarea v-model="veJkyPaperVo.mark" :maxLength="300" placeholder="请输入论文简介" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyPaperApi from '@/api/research/rpaper/veJkyPaperApi';
import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';
export default {
  components: { jkyUserSelect },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.jkyUserSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择专业教师'));
      }
    };
    const data = {
      veJkyPaperVo: this.resetveJkyPaperVo(),
      textMap: {
        update: '编辑论文',
        create: '新增论文'
      },
      dialogStatus: 'create',
      veJkyPaperRules: { userId: [{ validator: validateUser, trigger: 'change', required: true }] }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyPaperVo() {
      return {
        userId: '', // 用户id(公共数据表)
        code: '', // 论文编号
        name: '', // 论文中文名称
        engName: '', // 论文中文名称
        pubTime: '', // 论文发布实际
        journalName: '', // 期刊名称
        pubCode: '', // 出版号
        mark: '' // 论文简介
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyPaperVo = this.resetveJkyPaperVo();
      this.$nextTick(() => {
        this.$refs.veJkyPaperDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyPaperApi.get(row.id).then(res => {
        this.veJkyPaperVo = res.result;
        this.$refs.jkyUserSelect.setValue([res.result.userId]);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyPaperDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyPaperVo);
      tempData.userId = this.$refs.jkyUserSelect.getValue()[0];
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyPaperDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyPaperApi.add(subData).then(res => {
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
      this.$refs.veJkyPaperDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyPaperApi.update(subData).then(() => {
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
