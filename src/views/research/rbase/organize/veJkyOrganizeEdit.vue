<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyOrganizeDataForm" :rules="veJkyOrganizeRules" :model="veJkyOrganizeVo" labelAlign="right">
        <a-form-model-item label="组织名称" prop="name" required>
          <a-input v-model="veJkyOrganizeVo.name" :maxLength="100" placeholder="请输入组织机构名称" />
        </a-form-model-item>
        <a-form-model-item label="专业组长" prop="masterUid">
          <jkyUserSelect ref="jkyUserSelect"></jkyUserSelect>
        </a-form-model-item>
        <a-form-model-item label="组织成员" prop="userIds">
          <jkyUserSelect ref="jkyUserSelectZy" :check="true"></jkyUserSelect>
        </a-form-model-item>
        <a-form-model-item label="成立时间" prop="foundTime" required>
			<DatePickByCN
			   v-model="veJkyOrganizeVo.foundTime"
			  placeholder="请选择成立时间"  />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyOrganizeVo.status" stype="radio" code="status" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="mark">
          <a-textarea v-model="veJkyOrganizeVo.mark" :maxLength="300" placeholder="请输入说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyOrganizeApi from '@/api/research/rbase/veJkyOrganizeApi';
import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';

export default {
  components: { jkyUserSelect },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.jkyUserSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择专业组长'));
      }
    };
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.jkyUserSelectZy.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择组员'));
      }
    };
    const data = {
      veJkyOrganizeVo: this.resetveJkyOrganizeVo(),
      textMap: {
        update: '编辑组织',
        create: '新增组织'
      },
      dialogStatus: 'create',
      veJkyOrganizeRules: {
        masterUid: [{ validator: validateUser, trigger: 'change', required: true }],
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyOrganizeVo() {
      return {
        name: '', // 组织机构名称
        masterUid: '', // 教研组长id
        markUid: '', // 审批人
        mark: '', // 说明
        status: 1,
        foundTime: '', // 成立时间
        createTime: '' // 添加时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyOrganizeVo = this.resetveJkyOrganizeVo();
      this.$nextTick(() => {
        this.$refs.veJkyOrganizeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyOrganizeApi.get(row.id).then(res => {
        this.veJkyOrganizeVo = res.result;
        this.$refs.jkyUserSelect.setValue([res.result.masterUid]);
        this.$refs.jkyUserSelectZy.setValue([res.result.userIds]);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyOrganizeDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyOrganizeVo);
      tempData.masterUid = this.$refs.jkyUserSelect.getValue()[0];
      tempData.userIds = this.$refs.jkyUserSelectZy.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyOrganizeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyOrganizeApi.add(subData).then(res => {
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
      this.$refs.veJkyOrganizeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyOrganizeApi.update(subData).then(() => {
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
<style lang="less" scoped>
	
</style>
