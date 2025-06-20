<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="textMap[dialogStatus]"
      class="mini-form-item inline-form"
      @ok="viewType === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
      top="10%"
      :sureText="veJkyProjectVo.checkStatus == 3 ? '再次提交审核' : '提交审核'"
    >
      <a-form-model ref="veJkyProjectDataForm" :rules="veJkyProjectRules" :model="veJkyProjectVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="项目编号" prop="serial" required>
              <a-input v-model="veJkyProjectVo.serial" :maxLength="50" placeholder="请输入项目编号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="项目名称" prop="name" required>
              <a-input v-model="veJkyProjectVo.name" :maxLength="255" placeholder="请输入项目名称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="项目分类id" prop="cateId">
              <edu-tree-select ref="eduTree" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="级别id" prop="levelId" required>
              <edu-data v-model="veJkyProjectVo.levelId" stype="select"  width="180px"   :datas="levelNodes" textKey="name" dtype="datas" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="立项组织" prop="createOragn" required>
              <edu-data v-model="veJkyProjectVo.createOragn" stype="select"  width="180px"   textKey="name" :datas="organizes" dtype="datas" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="项目经费" prop="totalCost">
              <a-input v-model="veJkyProjectVo.totalCost" placeholder="请输入项目经费" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="项目开始时间" prop="startTime">
				<DatePickByCN
				   v-model="veJkyProjectVo.startTime"
				  placeholder="请选择项目开始时间"  />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="项目结束时间" prop="endTime">
				<DatePickByCN
				   v-model="veJkyProjectVo.endTime"
				  placeholder="请选择项目结束时间"  />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="项目合同编号" prop="termNum">
              <a-input v-model="veJkyProjectVo.termNum" :maxLength="50" placeholder="请输入项目合同编号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="项目来源" prop="source">
              <a-input v-model="veJkyProjectVo.source" :maxLength="30" placeholder="请输入项目来源" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="project" />
        </a-form-model-item>
        <a-form-model-item label="项目简介" prop="remark">
          <a-textarea v-model="veJkyProjectVo.remark" :rows="4" :maxLength="65535" placeholder="请输入项目简介" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  props: {
    levelNodes: {
      type: Array
    },
    categoryNodes: {
      type: Array
    },
    organizes: {
      type: Array
    }
  },
  data() {
    let validateTree = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目分类'));
      }
    };
    const data = {
      veJkyProjectVo: this.resetveJkyProjectVo(),
      textMap: {
        update: '编辑-科研项目信息',
        create: '新增-科研项目信息'
      },
      dialogStatus: 'create',
      veJkyProjectRules: {
        cateId: [{ validator: validateTree, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyProjectVo() {
      return {
        name: '', // 项目名称
        createOragn: '', // 立项组织
        serial: '', // 项目编号
        termNum: '', // 项目合同编号
        source: '', // 项目来源
        totalCost: '', // 项目经费
        cateId: '', // 项目分类id
        levelId: '', // 级别id
        progress: 0, // 项目进度
        fileId: '', // 附件id
        createTime: '', // 添加时间
        chargeUid: '', // 责任人/负责人
        startTime: '', // 项目开始时间
        endTime: '', // 项目结束时间
        checkTime: '', // 项目验收时间
        checkStatus: 1, // 审批状态
        markUid: '', // 项目审批人
        remark: '', // 项目简介
        checkTxt: '' // 审核不通过原因
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyProjectVo = this.resetveJkyProjectVo();
      this.$nextTick(() => {
        this.$refs.veJkyProjectDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyProjectApi.get(row.id).then(res => {
        res.result.createOragn = parseInt(res.result.createOragn);
        this.veJkyProjectVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.cateId]);
          this.$refs.uploadFiles.setValue(res.result.id);
        }, 0);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyProjectDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyProjectVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.cateId = treeData ? treeData[0] : 0;
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      tempData.checkStatus = 1;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyProjectDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyProjectApi.add(subData).then(res => {
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
      this.$refs.veJkyProjectDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyProjectApi.update(subData).then(() => {
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
