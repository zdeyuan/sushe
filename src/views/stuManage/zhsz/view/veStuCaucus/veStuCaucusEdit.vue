<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuCaucusDataForm" :rules="veStuCaucusRules" :model="veStuCaucusVo" labelAlign="right">
        <a-form-model-item label="活动标题" prop="title" required>
          <a-input v-model="veStuCaucusVo.title" :maxLength="255" placeholder="请输入活动标题" />
        </a-form-model-item>
        <a-form-model-item label="组织机构" prop="organization" required>
          <a-input v-model="veStuCaucusVo.organization" :maxLength="255" placeholder="请输入组织机构" />
        </a-form-model-item>

        <a-form-model-item label="级别" prop="grade" required>
          <edu-data v-model="veStuCaucusVo.grade" stype="select" width="150px" code="caucusLevel" />
        </a-form-model-item>

        <a-form-model-item label="选择学生" prop="userIds">
          <stuSelect ref="stuSelect" :check="true"></stuSelect>
        </a-form-model-item>

        <a-form-model-item label="开始时间" prop="startTime" required>
		  <DatePickByCN
		        v-model="veStuCaucusVo.startTime"
		        placeholder="请选择开始时间"
		      />
        </a-form-model-item>
        <a-form-model-item label="结束时间" prop="endTime" required>
			<DatePickByCN
			      v-model="veStuCaucusVo.endTime"
			      placeholder="请选择结束时间"
			    />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCaucusApi from '../../api/veStuCaucusApi';
import stuSelect from '@/components/stuSelect';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  mixins: [baseMixins],
  components: { stuSelect },
  data() {
    let validateUserZy = (rule, value, callback) => {
      const data = this.$refs.stuSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veStuCaucusVo: this.resetveStuCaucusVo(),
      textMap: {
        update: '编辑-文化计划',
        create: '新增-文化计划'
      },
      dialogStatus: 'create',
      veStuCaucusRules: {
		  grade: [
		    {
		      required: true,
		      message: '请选择级别',
		      trigger: 'change',
		    }
		  ],
		  title: [
		    {
		      required: true,
		      message: '请填写活动标题',
		      trigger: 'change',
		    }
		  ],
		  organization: [
		    {
		      required: true,
		      message: '请填写组织机构',
		      trigger: 'change',
		    }
		  ],
		  startTime: [
		    {
		      required: true,
		      message: '请选择异常时间',
		      trigger: 'change',
		    }
		  ],
		  endTime: [
		    {
		      required: true,
		      message: '请选择结束时间',
		      trigger: 'change',
		    }
		  ],
        userIds: [{ validator: validateUserZy, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuCaucusVo() {
      return {
        title: '', // 活动标题
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        grade: '', // 级别（市、县区、学校）
        organization: '' // 组织机构
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuCaucusVo = this.resetveStuCaucusVo();
      this.$nextTick(() => {
        this.$refs.veStuCaucusDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuCaucusApi.get(row.id).then(res => {
        this.veStuCaucusVo = res.result;
        setTimeout(() => {
          this.$refs.stuSelect.setValue(res.result.userIds);
        }, 100);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuCaucusDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuCaucusVo);
      if (this.$refs.stuSelect) {
        tempData.userIds = this.$refs.stuSelect.getValue() || [];
        tempData.userNames = this.$refs.stuSelect.getNames().join(',');
      } else {
        tempData.userIds = [];
      }

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuCaucusDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuCaucusApi.add(subData).then(res => {
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
      this.$refs.veStuCaucusDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuCaucusApi.update(subData).then(() => {
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
