<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyGainDataForm" :rules="veJkyGainRules" :model="veJkyGainVo" labelAlign="right">
        <a-form-model-item label="项目" prop="projectId" class="need-top" v-if="editViewType == 'xm'">
          <jkyProjectSelect ref="jkyProjectSelect"></jkyProjectSelect>
        </a-form-model-item>
        <a-form-model-item label="项目成果名称" prop="name" required>
          <a-input v-model="veJkyGainVo.name" :maxLength="255" placeholder="请输入项目名称" />
        </a-form-model-item>

        <a-form-model-item label="项目名称" prop="projectName" v-if="editViewType == 'ky'">
          <a-input v-model="veJkyGainVo.projectName" :maxLength="255" placeholder="请输入项目名称" />
        </a-form-model-item>

        <a-form-model-item label="项目分类" prop="cateId" v-if="editViewType == 'ky'">
          <edu-tree-select ref="eduTree" :check="false" :nodes="categoryNodes"></edu-tree-select>
        </a-form-model-item>

        <a-form-model-item label="项目级别" prop="levelId" v-if="editViewType == 'ky'">
          <edu-data v-model="veJkyGainVo.levelId" stype="select"  width="180px"   :datas="levelNodes" textKey="name" dtype="datas" />
        </a-form-model-item>

        <a-form-model-item label="项目成果参与成员" prop="userIds">
          <jkyUserSelect ref="jkyUserSelectZy" :check="true"></jkyUserSelect>
        </a-form-model-item>
        <a-form-model-item label="成果介绍" prop="textId">
          <a-textarea v-model="veJkyGainVo.textId" placeholder="请输入项目成果介绍" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status" v-if="editViewType == 'ky'">
          <edu-data v-model="veJkyGainVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
        <a-form-model-item label="附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="gain" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';
import jkyProjectSelect from '@/components/kqManageComponent/jkyProjectSelect';

export default {
  components: { jkyUserSelect, jkyProjectSelect, uploadFiles },
  props: {
    levelNodes: {
      type: Array,
      default: null
    },
    categoryNodes: {
      type: Array,
      default: null
    },
    editViewType: {
      type: String,
      required: true //project ky
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
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.jkyUserSelectZy.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择组员'));
      }
    };
    let validateProject = (rule, value, callback) => {
      const data = this.$refs.jkyProjectSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目'));
      }
    };
    const data = {
      veJkyGainVo: this.resetveJkyGainVo(),
      textMap: {
        update: '编辑-科研成果',
        create: '新增-科研成果'
      },
      viewType: 'create',
      veJkyGainRules: {
        cateId: [{ validator: validateTree, trigger: 'change', required: true }],
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }],
        projectId: [{ validator: validateProject, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyGainVo() {
      return {
        status: this.editViewType == 'ky' ? 1 : 0,
        name: '', // 项目名称
        projectId: 0, // 项目id（科研项目成果关联项目，其他则为0）
        projectName: '', // 项目id（科研项目成果关联项目，其他则为0）
        textId: '', // 详情id
        createTime: '', // 添加时间
        cateId: '', // 科研分类id（项目成果自动调用项目关联的cateid）
        levelId: '', // 科研级别id（同上）
        fileId: '', // 相关资料附件id
        addUid: '' // 添加人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyGainVo = this.resetveJkyGainVo();
      this.$nextTick(() => {
        this.$refs.veJkyGainDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyGainApi.get(row.id).then(res => {
        this.veJkyGainVo = res.result;
        this.$refs.jkyUserSelectZy.setValue([res.result.userIds]);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyGainDataForm.clearValidate();
        this.$refs.uploadFiles.setValue(row.id);

        if (this.editViewType == 'xm') {
          this.$refs.jkyProjectSelect.setValueObj([
            {
              id: row.projectId,
              name: row.projectName
            }
          ]);
        } else {
          setTimeout(() => {
            this.$refs.eduTree.setValue([row.cateId]);
          }, 0);
        }
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
      const tempData = Object.assign({}, this.veJkyGainVo);
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      tempData.userIds = this.$refs.jkyUserSelectZy.getValue();
      if (this.editViewType == 'xm') {
        tempData.projectId = this.$refs.jkyProjectSelect.getValue()[0];
      } else {
        const treeData = this.$refs.eduTree.getValue();
        tempData.cateId = treeData ? treeData[0] : 0;
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyGainDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyGainApi.add(subData).then(res => {
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
      this.$refs.veJkyGainDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyGainApi.update(subData).then(() => {
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
