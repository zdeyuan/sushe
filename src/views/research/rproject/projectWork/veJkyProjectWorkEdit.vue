<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyProjectWorkDataForm" :rules="veJkyProjectWorkRules" :model="veJkyProjectWorkVo" labelAlign="right">
        <a-form-model-item label="项目名称" prop="projectId">
          <jkyProjectSelect ref="jkyProjectSelect" :disable="projectVo != null"></jkyProjectSelect>
        </a-form-model-item>
        <a-form-model-item label="工作名称" prop="title" required>
          <a-input v-model="veJkyProjectWorkVo.title" :maxLength="100" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="工作成员" prop="userIds">
          <jkyUserSelect ref="jkyUserSelectZy" :check="true"></jkyUserSelect>
        </a-form-model-item>
        <a-form-model-item label="工作开始时间" prop="startTime" required>
			<DatePickByCN
			   v-model="veJkyProjectWorkVo.startTime"
			  placeholder="请选择工作开始时间"  />
        </a-form-model-item>
        <a-form-model-item label="工作结束时间" prop="endTime" required>
			<DatePickByCN
			   v-model="veJkyProjectWorkVo.endTime"
			  placeholder="请选择工作结束时间"  />
        </a-form-model-item>
        <a-form-model-item label="附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="projectWork" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';
import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import jkyProjectSelect from '@/components/kqManageComponent/jkyProjectSelect';

export default {
  components: { jkyUserSelect, uploadFiles, jkyProjectSelect },
  props: {
    projectVo: {
      type: Object,
      default: null
    }
  },
  data() {
    let validateProject = (rule, value, callback) => {
      const data = this.$refs.jkyProjectSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目'));
      }
    };
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.jkyUserSelectZy.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择工作成员'));
      }
    };
    const data = {
      veJkyProjectWorkVo: this.resetveJkyProjectWorkVo(),
      textMap: {
        update: '编辑-科研项目工作',
        create: '新增-科研项目工作'
      },
      dialogStatus: 'create',
      veJkyProjectWorkRules: {
        projectId: [{ validator: validateProject, trigger: 'change', required: true }],
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {
    if (this.projectVo) {
      this.$refs.jkyProjectSelect.setValueObj([
        {
          id: this.projectVo.id,
          name: this.projectVo.name
        }
      ]);
    }
  },
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyProjectWorkVo() {
      return {
        projectId: '', // 项目id
        title: '', // 名称
        chargeUid: '', // 工作负责人id
        startTime: '', // 工作开始时间
        endTime: '' // 工作结束时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyProjectWorkVo = this.resetveJkyProjectWorkVo();
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyProjectWorkApi.get(row.id).then(res => {
        this.veJkyProjectWorkVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
        this.$refs.jkyUserSelectZy.setValue(res.result.userIds);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.jkyProjectSelect.setValueObj([
          {
            id: row.projectId,
            name: row.projectName
          }
        ]);
        this.$refs.veJkyProjectWorkDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyProjectWorkVo);
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      tempData.userIds = this.$refs.jkyUserSelectZy.getValue();
      tempData.projectId = this.$refs.jkyProjectSelect.getValue()[0];
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyProjectWorkDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyProjectWorkApi.add(subData).then(res => {
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
      this.$refs.veJkyProjectWorkDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyProjectWorkApi.update(subData).then(() => {
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
