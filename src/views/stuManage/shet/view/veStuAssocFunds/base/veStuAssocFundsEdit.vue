<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form
      :title="textMap[dialogStatus]"
      @ok="dialogStatus === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
      top="100px"
      width="500px"
    >
      <a-form-model ref="veStuAssocFundsDataForm" :rules="veStuAssocFundsRules" :model="veStuAssocFundsVo" labelAlign="right">
        <a-form-model-item label="社团缴费标准" prop="standardId" required>
          <edu-data v-model="veStuAssocFundsVo.standardId" stype="select" :datas="typeList" textKey="name" style="width:300px" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="社团名称" prop="assocId" required>
          <edu-data
            v-model="veStuAssocFundsVo.assocId"
            stype="select"
            :datas="shetList"
            @onChange="changeStu"
            textKey="name"
            style="width:300px"
            dtype="datas"
          />
        </a-form-model-item>
        <a-form-model-item label="学生" prop="stuId" required>
          <edu-data v-model="veStuAssocFundsVo.stuId" stype="select" id-key="stuId" :datas="stuList" textKey="xm" style="width:300px" dtype="datas" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuAssocFundsApi from '@/views/stuManage/shet/api/veStuAssocFundsApi';
import veStuAssocMemberApi from '@/views/stuManage/shet/api/veStuAssocMemberApi';

export default {
  props: {
    typeList: Array,
    shetList: Array
  },
  components: {},
  data() {
    const data = {
      veStuAssocFundsVo: this.resetveStuAssocFundsVo(),
      textMap: {
        update: '编辑-社团缴费',
        create: '新增-社团缴费'
      },
      dialogStatus: 'create',
      stuList: [],
      veStuAssocFundsRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    changeStu(oldStuId) {
      setTimeout(() => {
        veStuAssocMemberApi.findByAssocId(this.veStuAssocFundsVo.assocId).then(res => {
          this.stuList = res.result;
          setTimeout(() => {
            this.veStuAssocFundsVo.stuId = oldStuId;
          }, 0);
        });
      }, 100);
    },
    /**
     * @msg: 重置数据
     */
    resetveStuAssocFundsVo() {
      return {
        standardId: '', // 社团缴费标准id
        assocId: '', // 社团id
        addTime: this.$date.format('YYYY-MM-DD') // 缴费时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuAssocFundsVo = this.resetveStuAssocFundsVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocFundsApi.get(row.id).then(res => {
        this.veStuAssocFundsVo = res.result;
        this.changeStu(res.result.stuId);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuAssocFundsVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocFundsDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuAssocFundsApi.add(subData).then(res => {
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
      this.$refs.veStuAssocFundsDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuAssocFundsApi.update(subData).then(() => {
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
