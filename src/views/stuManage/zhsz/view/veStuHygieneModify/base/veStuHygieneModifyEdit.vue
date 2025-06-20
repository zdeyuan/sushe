<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneModifyDataForm" :rules="veStuHygieneModifyRules" :model="veStuHygieneModifyVo" labelAlign="right">
        <a-form-model-item label="项目" prop="itemId" required>
          <edu-data v-model="veStuHygieneModifyVo.itemId" stype="select" width="150px" @onChange="initStu" :datas="itemList" textKey="name" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" prop="stuId" required>
          <edu-data v-model="veStuHygieneModifyVo.stuId" stype="select" width="150px" :datas="stuList" textKey="xm" idKey="stuId" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="申请修改原因" prop="reason" required>
          <a-textarea v-model="veStuHygieneModifyVo.reason" :maxLength="300" placeholder="请输入申请修改原因" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneStudentApi from '../../../api/veStuHygieneStudentApi';
import veStuHygieneModifyApi from '../../../api/veStuHygieneModifyApi';
import veStuHygieneItemApi from '../../../api/veStuHygieneItemApi';
export default {
  components: {},
  data() {
    const data = {
      veStuHygieneModifyVo: this.resetveStuHygieneModifyVo(),
      textMap: {
        update: '编辑-修改申请表',
        create: '新增-修改申请表'
      },
      itemList: [],
      stuList: [],
      dialogStatus: 'create',
      veStuHygieneModifyRules: {
		  itemId: [{
		  	required: true,
		  	message: '请选择项目',
		  	trigger: 'change',
		  }],
		  stuId: [{
		  	required: true,
		  	message: '请选择学生',
		  	trigger: 'change',
		  }],
		  reason: [{
		  	required: true,
		  	message: '请输入申请修改原因',
		  }],
	  }
    };
    return data;
  },
  mounted() {
    this.initItem();
  },
  methods: {
    initItem() {
      const sub = {
        params: { tea: true }
        //  conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuHygieneItemApi.all(sub).then(res => {
        this.itemList = res.result;
      });
    },
    initStu() {
      setTimeout(() => {
        const sub = {
          size: 10000,
          current: 1,
          conditions: [],
          sorts: [{ column: 'id', asc: false }],
          conditions: [{ operator: 'eq', column: 'item_id', value: this.veStuHygieneModifyVo.itemId }]
        };
        veStuHygieneStudentApi.page(sub).then(res => {
          this.stuList = res.result.records;
        });
      }, 100);
    },
    /**
     * @msg: 重置数据
     */
    resetveStuHygieneModifyVo() {
      return {
        itemId: '', // 项目Id
        stuId: '', // 学生Id
        status: 0, // 是否修改（0：未修改，1：申请中，2：已修改
        reason: '', // 申请修改原因
        modifyUser: '', // 修改人
        modifyUserName: '', // 修改人
        modifyTime: '' // 修改日志
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuHygieneModifyVo = this.resetveStuHygieneModifyVo();
      this.$nextTick(() => {
        this.$refs.veStuHygieneModifyDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuHygieneModifyApi.get(row.id).then(res => {
        this.veStuHygieneModifyVo = res.result;
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuHygieneModifyDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuHygieneModifyVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHygieneModifyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuHygieneModifyApi.add(subData).then(res => {
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
      this.$refs.veStuHygieneModifyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuHygieneModifyApi.update(subData).then(() => {
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
