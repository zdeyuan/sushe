<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqUserDataForm" :rules="veHqUserRules" :model="veHqUserVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="工号" prop="number" class="ytop" required>
              <a-input v-model="veHqUserVo.number" :maxLength="30" placeholder="请输入工号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name" class="ytop" required>
              <a-input v-model="veHqUserVo.name" :maxLength="20" placeholder="请输入姓名" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="性别" prop="sex" class="ntop" required>
              <edu-data v-model="veHqUserVo.sex" stype="radio" code="sex" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="身份证号" prop="sfzh" required>
              <a-input v-model="veHqUserVo.sfzh" :maxLength="25" placeholder="请输入身份证号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="出生年月" prop="csny">
				<DatePickByCN
				   v-model="veHqUserVo.csny"
				  placeholder="请选择出生年月"  />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="联系电话" prop="phone" required>
              <a-input v-model="veHqUserVo.phone" :maxLength="20" placeholder="请输入联系电话" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="人员类型" prop="userType" required>
              <edu-data v-model="veHqUserVo.userType" stype="radio" code="hqUserType" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="上岗时间" prop="sgTime">
				<DatePickByCN
				   v-model="veHqUserVo.sgTime"
				  placeholder="请选择上岗时间"  />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="离岗时间" prop="lgTime">
				<DatePickByCN
				   v-model="veHqUserVo.lgTime"
				  placeholder="请选择离岗时间"  />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="人员状态" class="ntop" prop="rzzt" required>
              <edu-data v-model="veHqUserVo.rzzt" stype="select" code="hqUserStatus" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="家庭住址" prop="address" required>
          <a-input v-model="veHqUserVo.address" :maxLength="150" placeholder="请输入家庭住址" />
        </a-form-model-item>
        <a-form-model-item label="人员备注" prop="remark">
          <a-textarea v-model="veHqUserVo.remark" :maxLength="300" placeholder="请输入人员备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqUserApi from '@/views/logistics/base/api/veHqUserApi';

export default {
  components: {},
  data() {
    const data = {
      veHqUserVo: this.resetveHqUserVo(),
      textMap: {
        update: '人员信息',
        create: '人员信息'
      },
      dialogStatus: 'create',
      veHqUserRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqUserVo() {
      return {
        userId: '', // 用户ID
        number: '', // 工号
        name: '', // 姓名
        sfzh: '', // 身份证号
        sex: '', // 性别
        csny: '', // 出生年月
        phone: '', // 联系电话
        address: '', // 家庭住址
        userType: '', // 数据字典：1=校医、2=餐厅、三=安保
        sgTime: '', // 上岗时间
        lgTime: '', // 离岗时间
        rzzt: '', // 状态：1=在岗，0=离岗
        remark: '', // 人员备注
        flag: '' // 人员状态校内人员为1 ，不是校内人员为0
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(type) {
      this.viewType = 'create';
      this.veHqUserVo = this.resetveHqUserVo();
      this.veHqUserVo.flag = type == 'in' ? 1 : 2;
      this.$nextTick(() => {
        this.$refs.veHqUserDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqUserApi.get(row.id).then(res => {
        this.veHqUserVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veHqUserDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqUserVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqUserApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
            });
            //   this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veHqUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqUserApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            //   this.$emit('onOk');
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
