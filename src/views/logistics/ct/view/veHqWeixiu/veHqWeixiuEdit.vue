<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="textMap[dialogStatus]"
      :isShowBtnCancel="!isDj"
      :type="isDj ? 'view' : 'dialog'"
      @ok="viewType === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
    >
      <a-form-model ref="veHqWeixiuDataForm" :rules="veHqWeixiuRules" :model="veHqWeixiuVo" labelAlign="right">
        <a-form-model-item label="物品名称" prop="name" required>
          <a-input v-model="veHqWeixiuVo.name" :maxLength="50" placeholder="请输入物品名称" />
        </a-form-model-item>
        <a-form-model-item label="维修地点" prop="place" required>
          <a-input v-model="veHqWeixiuVo.place" :maxLength="100" placeholder="请输入维修地点" />
        </a-form-model-item>

        <a-form-model-item label="维修方式" prop="type" required>
          <a-input v-model="veHqWeixiuVo.type" :maxLength="15" placeholder="请输入维修方式" />
        </a-form-model-item>

        <a-form-model-item label="申请人" prop="applyUser">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="经手人" prop="jsUser">
          <userSelectBox ref="jsUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="pjUser">
          <userSelectBox ref="pjUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="维修结果" v-if="!isDj" prop="status" required>
          <edu-data v-model="veHqWeixiuVo.status" stype="radio" code="wxStatus" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veHqWeixiuVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqWeixiuApi from '@/views/logistics/ct/api/veHqWeixiuApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';

export default {
  components: { userSelectBox },
  props: {
    isDj: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.applyUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser1 = (rule, value, callback) => {
      const data = this.$refs.jsUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser2 = (rule, value, callback) => {
      const data = this.$refs.pjUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veHqWeixiuVo: this.resetveHqWeixiuVo(),
      textMap: {
        update: '维修记录',
        create: '维修记录'
      },
      dialogStatus: 'create',
      veHqWeixiuRules: {
        applyUser: [{ validator: validateUser, trigger: 'change', required: true }],
        jsUser: [{ validator: validateUser1, trigger: 'change', required: true }],
        pjUser: [{ validator: validateUser2, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {
    if (this.isDj) {
      this.doCreate();
    }
  },
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqWeixiuVo() {
      return {
        name: '', // 物品名称
        status: 1, // 维修结果：1=完成、2=在修，0=未修
        type: '', // 维修方式
        remark: '', // 备注
        place: '', // 维修地点
        applyUser: '', // 申请人
        applyUserName: '', // 申请人
        jsUser: '', // 经手人
        jbUserName: '', // 经手人
        pjUser: '', // 批准人
        pjUserName: '' // 批准人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqWeixiuVo = this.resetveHqWeixiuVo();
      this.$nextTick(() => {
        this.$refs.veHqWeixiuDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqWeixiuApi.get(row.id).then(res => {
        this.veHqWeixiuVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.applyUser.setObj([{ id: row.applyUser, name: row.applyUserName }]);
        this.$refs.applyUser.setValue([row.applyUser]);
        //  this.$refs.jsUser.setObj([{ id: row.jsUser, name: row.jbUserName }]);
        this.$refs.pjUser.setObj([{ id: row.pjUser, name: row.pjUserName }]);
        this.$refs.veHqWeixiuDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqWeixiuVo);
      const userData = this.$refs.applyUser.getObj();
      tempData.applyUser = userData.id;
      tempData.applyUserName = userData.name;

      const userData2 = this.$refs.jsUser.getObj();
      tempData.jsUser = userData2.id;
      tempData.jbUserName = userData2.name;

      const userData3 = this.$refs.pjUser.getObj();
      tempData.pjUser = userData3.id;
      tempData.pjUserName = userData3.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqWeixiuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqWeixiuApi.add(subData).then(res => {
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
      this.$refs.veHqWeixiuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqWeixiuApi.update(subData).then(() => {
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
