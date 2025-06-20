<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="textMap[dialogStatus]"
      size="big"
      class="mini-form-item inline-form"
      width="40%"
      @ok="viewType === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
    >
      <a-form-model ref="veJkyUserDataForm" :rules="veJkyUserRules" :model="veJkyUserVo" labelAlign="right">
        <a-form-model-item label="用户id" prop="userId" required>
          <a-input v-model="veJkyUserVo.userId" placeholder="请输入用户id(公共数据表)" />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="realname" required>
              <a-input v-model="veJkyUserVo.realname" :maxLength="20" placeholder="请输入姓名" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="性别" prop="sexNum">
              <edu-data v-model="veJkyUserVo.sexNum" stype="radio" code="sex" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="出生日期" prop="birthday">
			<DatePickByCN
			   v-model="veJkyUserVo.birthday"
			  placeholder="请选择出生日期"  />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="职称" prop="proCall">
              <edu-data v-model="veJkyUserVo.proCall" stype="select"  width="180px"   code="zhichen" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="学历" prop="educate">
              <edu-data v-model="veJkyUserVo.educate" stype="select"  width="180px"   code="xueli" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="科研方向" prop="direction">
          <a-input v-model="veJkyUserVo.direction" :maxLength="255" placeholder="请输入科研方向" />
        </a-form-model-item>
        <a-form-model-item label="毕业院校" prop="graCollege">
          <a-input v-model="veJkyUserVo.graCollege" :maxLength="60" placeholder="请输入毕业院校" />
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="idCard">
          <a-input v-model="veJkyUserVo.idCard" :maxLength="20" placeholder="请输入身份证号" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="phone" required>
          <a-input v-model="veJkyUserVo.phone" :maxLength="30" placeholder="请输入联系电话" />
        </a-form-model-item>

        <a-form-model-item label="项目经历" prop="joinGain">
          <a-textarea v-model="veJkyUserVo.joinGain" :maxLength="300" placeholder="请输入主持参与、承担、过的项目和所获得成果" />
        </a-form-model-item>
        <a-form-model-item label="著作及论文" prop="selfWriting">
          <a-textarea v-model="veJkyUserVo.selfWriting" :maxLength="300" placeholder="请输入公开出版著作及论文" />
        </a-form-model-item>
        <a-form-model-item label="个人简介" prop="resume">
          <a-textarea v-model="veJkyUserVo.resume" :maxLength="300" placeholder="请输入个人简介" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyUserApi from '@/api/research/rbase/veJkyUserApi';

export default {
  components: {},
  data() {
    var data = {
      veJkyUserVo: this.resetveJkyUserVo(),
      textMap: {
        update: '编辑人员',
        create: '新增人员'
      },
      dialogStatus: 'create',
      veJkyUserRules: {},
      type: 'out'
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyUserVo() {
      return {
        status: 1,
        userId: '', // 用户id(公共数据表)
        direction: '', // 科研方向
        resume: '', // 个人简介
        specId: '', // 专业（调用系统专业基础数据）
        proCall: '', // 职称
        realname: '', // 姓名
        idCard: '', // 身份证号
        sexNum: 1, // 性别码1，男2女
        educate: '', // 学历
        graCollege: '', // 毕业院校
        phone: '', // 联系电话
        joinGain: '', // 主持参与、承担、过的项目和所获得成果
        selfWriting: '', // 公开出版著作及论文
        typeNum: '', // 人员类型（1校内，2校外）
        birthday: '', // 出生日期
        age: '' // 年龄
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(type) {
      this.type = type;
      this.viewType = 'create';
      this.veJkyUserVo = this.resetveJkyUserVo();
      this.veJkyUserVo.typeNum = type == 'in' ? 1 : 2;
      this.$nextTick(() => {
        this.$refs.veJkyUserDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyUserApi.get(row.id).then(res => {
        this.veJkyUserVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyUserDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyUserVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyUserApi.add(subData).then(res => {
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
      this.$refs.veJkyUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyUserApi.update(subData).then(() => {
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
