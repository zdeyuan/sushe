<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthActivitiesDataForm" :rules="hqStuHealthActivitiesRules" :model="hqStuHealthActivitiesVo" labelAlign="right">
        <a-form-model-item label="活动标题" prop="title" required>
          <a-input v-model="hqStuHealthActivitiesVo.title" :maxLength="100" placeholder="请输入活动标题" />
        </a-form-model-item>
        <a-form-model-item label="活动情况内容" prop="content">
          <ueditor ref="ueditor" style="width: 100%%;"></ueditor>
        </a-form-model-item>
        <a-form-model-item label="排序" prop="listNum" required>
          <a-input-number v-model="hqStuHealthActivitiesVo.listNum" :min="0" placeholder="请输入排序" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" required>
          <edu-data v-model="hqStuHealthActivitiesVo.status" stype="radio" code="status" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthActivitiesApi from '../../api/hqStuHealthActivitiesApi';
import ueditor from '@/components/ueditor';
export default {
  components: { ueditor },
  data() {
    const data = {
      hqStuHealthActivitiesVo: this.resethqStuHealthActivitiesVo(),
      textMap: {
        update: '编辑-心理健康活动',
        create: '新增-心理健康活动'
      },
      dialogStatus: 'create',
      hqStuHealthActivitiesRules: {
		  title: [{ required: true , message: '请输入活动标题',}],
		  status: [{ required: true , message: '请选择状态',}],
		  listNum: [{ required: true , message: '请输入排序',}],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resethqStuHealthActivitiesVo() {
      return {
        title: '', // 活动标题
        content: '', // 活动情况内容
        listNum: 999, // 排序
        code: '', // 学号
        userId: '', // 发布人
        status: 1, // 状态：0=禁用，1=启用
        name: '' // 姓名
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.hqStuHealthActivitiesVo = this.resethqStuHealthActivitiesVo();
      this.$nextTick(() => {
        this.$refs.hqStuHealthActivitiesDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      hqStuHealthActivitiesApi.get(row.id).then(res => {
        this.hqStuHealthActivitiesVo = res.result;
        this.$refs.ueditor.setValue(res.result.content);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.hqStuHealthActivitiesDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.hqStuHealthActivitiesVo);
      tempData.content = this.$refs.ueditor.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.hqStuHealthActivitiesDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          hqStuHealthActivitiesApi.add(subData).then(res => {
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
      this.$refs.hqStuHealthActivitiesDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          hqStuHealthActivitiesApi.update(subData).then(() => {
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
