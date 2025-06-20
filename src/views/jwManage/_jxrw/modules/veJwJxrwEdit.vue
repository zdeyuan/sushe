<template>
  <div class="edit_form">
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuGraduationDataForm" :rules="veStuGraduationRules" :model="veStuGraduationVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="学号" prop="code" required>
              <a-input v-model="veStuGraduationVo.code" :maxLength="20" placeholder="请输入学号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name" required>
              <a-input v-model="veStuGraduationVo.name" :maxLength="20" placeholder="请输入姓名" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="身份证号" prop="idcard" required>
              <a-input v-model="veStuGraduationVo.idcard" :maxLength="20" placeholder="请输入身份证号" /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item label="专业部名称" prop="falName" required>
              <a-input v-model="veStuGraduationVo.falName" :maxLength="100" placeholder="专业部名称" /> </a-form-model-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="专业名称" prop="specName" required>
              <a-input v-model="veStuGraduationVo.specName" :maxLength="100" placeholder="请输入专业名称" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="班级名称" prop="bjName" required>
              <a-input v-model="veStuGraduationVo.bjName" :maxLength="100" placeholder="请输入班级名称" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <div class="detail_title"> 毕业信息</div>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="结束学业年月" prop="jsxyDateTime" required>
				<DatePickByCN
				   v-model="veStuGraduationVo.jsxyDateTime"
				  placeholder="请输入结束学业年月"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="结束学业状态" prop="jsxym" required>
              <edu-data v-model="veStuGraduationVo.jsxym" stype="select" code="byxsStatus2" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="结束学业原因说明" prop="jsxyReson" required>
          <a-textarea v-model="veStuGraduationVo.jsxyReson" :maxLength="500" placeholder="请输入结束学业原因说明" :rows="4" />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="毕业证书号" prop="byZsh">
              <a-input v-model="veStuGraduationVo.byZsh" :maxLength="40" placeholder="请输入毕业证书号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="获毕业证书日期" prop="byDate">
				<DatePickByCN
				   v-model="veStuGraduationVo.byDate"
				  placeholder="请输入获毕业证书日期"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="结业证书号" prop="jyZsh">
              <a-input v-model="veStuGraduationVo.jyZsh" :maxLength="30" placeholder="请输入结业证书号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="获结业证书日期" prop="jyDate">
				<DatePickByCN
				   v-model="veStuGraduationVo.jyDate"
				  placeholder="请输入获结业证书日期"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuGraduationApi from '@/views/stuManage/biye/api/veStuGraduationApi';

export default {
  components: {},
  data() {
    const data = {
      veStuGraduationVo: this.resetveStuGraduationVo(),
      textMap: {
        update: '编辑-毕业查询管理',
        create: '新增-毕业查询管理'
      },
      dialogStatus: 'create',
      veStuGraduationRules: {
		 code: [{
		 	required: true,
		 	message: '请输入学号',
		 	trigger: 'change',
		 }],
		 name: [{
		 	required: true,
		 	message: '请输入姓名',
		 	trigger: 'change',
		 }],
		 idcard: [{
		 	required: true,
		 	message: '请输入身份证号',
		 	trigger: 'change',
		 }],
		 falName: [{
		 	required: true,
		 	message: '请输入专业名称',
		 	trigger: 'change',
		 }],
		 bjName: [{
		 	required: true,
		 	message: '请输入班级名称',
		 	trigger: 'change',
		 }],
		 jsxyDateTime: [{
		 	required: true,
		 	message: '请选择结束学业事件',
		 	trigger: 'change',
		 }],
		 jsxym: [{
		 	required: true,
		 	message: '请选择结束学业状态',
		 	trigger: 'change',
		 }],
		 jsxyReson: [{
		 	required: true,
		 	message: '请输入结束学业原因',
		 	trigger: 'change',
		 }],
	  }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationVo() {
      return {
        stuId: 0, // 学生id
        falId: 0, // 院系ID
        falName: '', // 院系名称
        specId: 0, // 专业ID
        specName: '', // 专业名称
        gradeId: 0, // 年级ID
        bjId: 0, // 班级ID
        bjName: '', // 班级名称
        idcard: '', // 身份证号，唯一
        code: '', // 学号
        name: '', // 姓名
        sex: '', // 性别码1男生2女生
        csDate: '', // 出生日期
        rxDate: '', // 入学年月
        xz: '', // 学制;与学制表关联
        xzName: '', // 学制名称
        jsxyDate: '', // 结束学业年月
        jsxym: '', // 结束学业码（1=>毕业，2=>结业，3=>未结业，4=>肄业）GB/T 14946.1 －2009 附录 A.27，默认为空，待录入
        jsxyReson: '', // 结束学业原因说明
        byZsh: '', // 毕业证书号
        xwZsh: '', // 学位证书号
        jyZsh: '', // 结业证书号
        byDate: '', // 获毕业证书日期
        xwDate: '', // 获学位证书日期
        jyDate: '', // 获结业证书日期
        bookPrintTimes: '', // 证书打印次数，0为未打印
        preByzsh: '' // 预先生成的毕业证书编号
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuGraduationVo = this.resetveStuGraduationVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationApi.get(row.id).then(res => {
        this.veStuGraduationVo = res.result;
        if (this.veStuGraduationVo.jsxyDate) {
          this.veStuGraduationVo.jsxyDateTime = this.$date.getDate(this.veStuGraduationVo.jsxyDate * 1000).format('YYYY-MM-DD');
        }
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuGraduationDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuGraduationVo);
      if (tempData.jsxyDateTime) {
        tempData.jsxyDate = this.$date.geTime(tempData.jsxyDateTime, 'YYYY-MM-DD') / 1000;
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuGraduationApi.add(subData).then(res => {
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
      this.$refs.veStuGraduationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuGraduationApi.update(subData).then(() => {
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
