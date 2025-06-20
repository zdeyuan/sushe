<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuRewardDataForm" :rules="veStuRewardRules" :model="veStuRewardVo" labelAlign="right">
        <a-form-model-item label="奖励类型" prop="typeId" required>
          <edu-data v-model="veStuRewardVo.typeId" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" v-if="isStu(veStuRewardVo.typeId)" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>
        <a-form-model-item label="获奖班级" v-else prop="boxZybmbj">
          <boxZybmbj ref="boxZybmbj"></boxZybmbj>
        </a-form-model-item>
        <a-form-model-item label="申请材料" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="stuReward" />
        </a-form-model-item>
        <a-form-model-item label="获奖时间" prop="rewardTime" required>
		  <DatePickByCN  v-model="veStuRewardVo.rewardTime"  placeholder="请选择获奖时间"/>
        </a-form-model-item>
        <a-form-model-item label="获奖描述" prop="content">
          <a-textarea v-model="veStuRewardVo.content" :maxLength="65535" placeholder="请输入获奖描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuRewardApi from '../../api/veStuRewardApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import boxZybmbj from '@/components/kqManageComponent/boxZybmbj';
import stuSelect from '@/components/kqManageComponent/stuSelect';
export default {
  props: {
    typeNodes: Array
  },
  components: { uploadFiles, boxZybmbj, stuSelect },
  data() {
    let validateFail = (rule, value, callback) => {
      const data = this.$refs.uploadFiles.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择申请材料'));
      }
    };
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择学生'));
      }
    };
    let validateBoxZybmbj = (rule, value, callback) => {
      const data = this.$refs.boxZybmbj.getCheck();
      if (data) {
        callback(new Error(data));
      } else {
        callback();
      }
    };
    const data = {
      veStuRewardVo: this.resetveStuRewardVo(),
      textMap: {
        update: '编辑-奖励信息',
        create: '新增-奖励信息'
      },
      dialogStatus: 'create',
      veStuRewardRules: {
		 typeId: [
		   {
		     required: true,
		     message: '请选择考勤类型',
		     trigger: 'change'
		   }
		 ],
		 rewardTime: [
		   {
		     required: true,
		     message: '请选择获奖时间',
		     trigger: 'change'
		   }
		 ],
        boxZybmbj: [{ validator: validateBoxZybmbj, trigger: 'change', required: true }],
        fileIds: [{ validator: validateFail, trigger: 'change', required: true }],
        stuId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    isStu(typeId) {
      for (let i = 0; i < this.typeNodes.length; i++) {
        const typeNode = this.typeNodes[i];
        if (typeNode.id == typeId) {
          return typeNode.attribute == 1;
        }
      }
      return true;
    },
    /**
     * @msg: 重置数据
     */
    resetveStuRewardVo() {
      return {
        stuId: '', // 学生id(个人)
        name: '', // 学生姓名
        code: '', // 学生学号
        falId: '', // 院系id
        specId: '', // 专业id
        typeId: '', // 奖励类型id
        bjId: '', // 班级id(集体)或学生所属班级id
        fileId: '', // 文件id（申请材料）
        rewardTime: '', // 获奖时间
        content: '' // 获奖描述
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuRewardVo = this.resetveStuRewardVo();
      this.$nextTick(() => {
        this.$refs.veStuRewardDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuRewardApi.get(row.id).then(res => {
        this.veStuRewardVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
        setTimeout(() => {
          if (this.$refs.boxZybmbj) this.$refs.boxZybmbj.setValue(res.result);
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.stuId);
        }, 100);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuRewardDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuRewardVo);
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      if (this.$refs.stuSelect) {
        const stus = this.$refs.stuSelect.getObj()[0];
        tempData.stuId = stus.id;
      }

      if (this.$refs.boxZybmbj) {
        this.$refs.boxZybmbj.getSetValue(tempData);
      }

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuRewardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuRewardApi.add(subData).then(res => {
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
      this.$refs.veStuRewardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuRewardApi.update(subData).then(() => {
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
