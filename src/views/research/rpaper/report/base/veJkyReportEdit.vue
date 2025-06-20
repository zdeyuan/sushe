<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyReportDataForm" :rules="veJkyReportRules" :model="veJkyReportVo" labelAlign="right">
        <template v-if="veJkyReportVo.type == 1">
          <a-form-model-item label="论文题目" prop="name" required>
            <a-input v-model="veJkyReportVo.name" :maxLength="255" placeholder="请输入论文题目" />
          </a-form-model-item>
          <a-form-model-item label="发布平台" prop="pubPt" required>
            <a-input v-model="veJkyReportVo.pubPt" :maxLength="255" placeholder="请输入发布平台" />
          </a-form-model-item>
          <a-form-model-item label="平台级别" prop="level" required>
            <a-input v-model="veJkyReportVo.level" :maxLength="255" placeholder="请输入平台级别" />
          </a-form-model-item>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="期刊此号" prop="code" required>
                <a-input v-model="veJkyReportVo.code" :maxLength="255" placeholder="请输入期刊此号" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发布时间" prop="pubTime" required>
				  <DatePickByCN
				     v-model="veJkyReportVo.pubTime"
				    placeholder="请选择发布时间"  />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否独立撰文" prop="selfType" required>
                <edu-data v-model="veJkyReportVo.selfType" stype="radio" code="shifou" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否第一作者" prop="isFrist" required>
                <edu-data v-model="veJkyReportVo.isFrist" stype="radio" code="shifou" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="veJkyReportVo.type == 2">
          <a-form-model-item label="课题名称" prop="name" required>
            <a-input v-model="veJkyReportVo.name" :maxLength="255" placeholder="请输入课题名称" />
          </a-form-model-item>
          <a-form-model-item label="课题级别" prop="level" required>
            <a-input v-model="veJkyReportVo.level" :maxLength="255" placeholder="请输入课题级别" />
          </a-form-model-item>
          <a-form-model-item label="主持人" prop="hostUser" required>
            <a-input v-model="veJkyReportVo.hostUser" :maxLength="50" placeholder="请输入主持人" />
          </a-form-model-item>
          <a-form-model-item label="课题参与人姓名" prop="joinUser" required>
            <a-input v-model="veJkyReportVo.joinUser" :maxLength="500" placeholder="请输入课题参与人姓名" />
          </a-form-model-item>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否立项" prop="isProject" required>
                <edu-data v-model="veJkyReportVo.isProject" stype="radio" code="shifou" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="立项时间" prop="projectTime" required>
				  <DatePickByCN
				     v-model="veJkyReportVo.projectTime"
				    placeholder="请选择立项时间"  />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="是否结题" prop="isOver" required>
                <edu-data v-model="veJkyReportVo.isOver" stype="radio" code="shifou" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="结题时间" prop="overTime" required>
				  <DatePickByCN
				     v-model="veJkyReportVo.overTime"
				    placeholder="请选择结题时间"  />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-form-model-item label="组织单位" prop="org" required>
            <a-input v-model="veJkyReportVo.org" :maxLength="255" placeholder="请输入组织单位" />
          </a-form-model-item>
        </template>

        <template v-if="veJkyReportVo.type == 3">
          <a-form-model-item label="标题" prop="name" required>
            <a-input v-model="veJkyReportVo.name" :maxLength="255" placeholder="请输入" />
          </a-form-model-item>
          <a-form-model-item label="描述" prop="mark" required>
            <a-textarea v-model="veJkyReportVo.mark" :maxLength="4000" placeholder="请输入描述" :rows="4" />
          </a-form-model-item>
        </template>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyReportApi from '@/api/research/rpaper/veJkyReportApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyReportVo: this.resetveJkyReportVo(),
      textMap: {
        update: '编辑-教科研工作上报',
        create: '新增-教科研工作上报'
      },
      dialogStatus: 'create',
      veJkyReportRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyReportVo() {
      return {
        userId: '', // 用户id
        userName: '', // 用户
        type: '', // 类型 1:论文  2:科研课题  3:其他
        name: '', // 论文名称,课题名称
        pubPt: '', // 发布平台
        level: '', // 平台级别,课题级别
        code: '', // 期刊此号
        pubTime: '', // 发布时间 结课时间
        selfType: '', // 是否独立撰文
        isFrist: '', // 是否第一作者
        hostUser: '', // 主持人
        joinUser: '', // 课题参与人姓名（按序）
        isProject: '', // 是否立项
        projectTime: '', // 立项时间
        isOver: '', // 是否结题
        overTime: '', // 结题时间
        org: '', // 组织单位
        status: '', // 禁用状态
        mark: '' // 论文简介
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(type) {
      this.viewType = 'create';
      this.veJkyReportVo = this.resetveJkyReportVo();
      this.veJkyReportVo.type = type;
      this.$nextTick(() => {
        this.$refs.veJkyReportDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyReportApi.get(row.id).then(res => {
        this.veJkyReportVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyReportDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyReportVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyReportDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyReportApi.add(subData).then(res => {
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
      this.$refs.veJkyReportDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyReportApi.update(subData).then(() => {
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
