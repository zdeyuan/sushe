<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuPunishDataForm" :rules="veStuPunishRules" :model="veStuPunishVo" labelAlign="right">
        <a-form-model-item label="惩罚类型" prop="typeId" required>
          <edu-data v-model="veStuPunishVo.typeId" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>
		<a-form-model-item label="相关材料" prop="fileId">
		  <uploadFiles ref="uploadFiles" serviceType="stuPunish" />
		</a-form-model-item>
        <a-form-model-item label="惩罚时间" prop="punishTime" required>
			<DatePickByCN
				  v-model="veStuPunishVo.punishTime"
				  placeholder="请选择惩罚时间"  />
        </a-form-model-item>
        <a-form-model-item label="惩罚描述" prop="content">
          <a-textarea v-model="veStuPunishVo.content" :maxLength="65535" placeholder="请输入惩罚描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuPunishApi from '../../api/veStuPunishApi';
import boxZybmbj from '@/components/kqManageComponent/boxZybmbj';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import stuSelect from '@/components/kqManageComponent/stuSelect';
export default {
  props: {
    typeNodes: Array
  },
  components: { boxZybmbj, stuSelect, uploadFiles },
  data() {
	let validateFail = (rule, value, callback) => {
	  const data = this.$refs.uploadFiles.getValue();
	  if (data && data.length > 0) {
	    callback();
	  } else {
	    callback(new Error('请上传相关材料'));
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
    const data = {
      veStuPunishVo: this.resetveStuPunishVo(),
      textMap: {
        update: '编辑-惩罚信息',
        create: '新增-惩罚信息'
      },
      dialogStatus: 'create',
      veStuPunishRules: {
		  typeId: [
		    {
		      required: true,
		      message: '请选择考勤类型',
		      trigger: 'change'
		    }
		  ],
		  punishTime: [
		    {
		      required: true,
		      message: '请选择惩罚时间',
		      trigger: 'change'
		    }
		  ],
        stuId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuPunishVo() {
      return {
        stuId: '', // 学生id(个人)
        name: '', // 学生姓名
        code: '', // 学生学号
        falId: '', // 院系id
        specId: '', // 专业id
        typeId: '', // 惩罚类型id
        bjId: '', // 班级id(集体)或学生所属班级id
        fileId: '', // 文件id（申请材料）
        punishTime: '', // 惩罚时间
        content: '' // 惩罚描述
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuPunishVo = this.resetveStuPunishVo();
      this.$nextTick(() => {
        this.$refs.veStuPunishDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
	  console.log(row,'row')
	  this.$refs.uploadFiles.setValue(row.id);
      veStuPunishApi.get(row.id).then(res => {
        this.veStuPunishVo = res.result;
        setTimeout(() => {
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.stuId);
        }, 100);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuPunishDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuPunishVo);
	  tempData.fileIds = this.$refs.uploadFiles.getValue();
      if (this.$refs.stuSelect) {
        const stus = this.$refs.stuSelect.getObj()[0];
        tempData.stuId = stus.id;
      }

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuPunishDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuPunishApi.add(subData).then(res => {
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
      this.$refs.veStuPunishDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuPunishApi.update(subData).then(() => {
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
