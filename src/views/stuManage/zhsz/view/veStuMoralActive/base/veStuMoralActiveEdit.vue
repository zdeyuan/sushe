<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuMoralActiveDataForm" :rules="veStuMoralActiveRules" :model="veStuMoralActiveVo" labelAlign="right">
        <a-form-model-item label="活动标题" prop="title" required>
          <a-input v-model="veStuMoralActiveVo.title" :maxLength="200" placeholder="请输入活动标题" />
        </a-form-model-item>
        <a-form-model-item label="活动内容" prop="content">
          <ueditor ref="ueditor" style="width: 100%%;"></ueditor>
        </a-form-model-item>
        <a-form-model-item :label="$hasPer(['system'])?'是否全校':'是否全班'" prop="isAll" required>
          <edu-data v-model="veStuMoralActiveVo.isAll" stype="radio" code="shifou" />
        </a-form-model-item>
        <a-form-model-item label="参与学生" v-if="veStuMoralActiveVo.isAll == 0" prop="userIds">
          <stuSelect ref="stuSelect" :isBzr="isBzr" :check="true"></stuSelect>
        </a-form-model-item>
		<a-form-model-item label="参与班级" v-if="veStuMoralActiveVo.isAll == 1&&$hasPer(['bzr'])" prop="bjId">
			<!-- <edu-data v-model="veStuMoralActiveVo.bjId" stype="select" :datas="bjIdList" textKey="xzbmc" dtype="datas" /> -->
		   <j-select-banji v-model="veStuMoralActiveVo.bjId" placeholder="请选择班级" ></j-select-banji>
		</a-form-model-item>
        <a-form-model-item label="开始时间" prop="startTime" required>
			<DatePickByCN
			      v-model="veStuMoralActiveVo.startTime"
			      placeholder="请选择开始时间"
			    />
        </a-form-model-item>
        <a-form-model-item label="结束时间" prop="endTime" required>
			<DatePickByCN
			      v-model="veStuMoralActiveVo.endTime"
			      placeholder="请选择结束时间"
			    />
        </a-form-model-item>
		<a-form-model-item label="发布状态" prop="status" required v-if="$hasPer(['system'])">
		  <edu-data v-model="veStuMoralActiveVo.status" stype="radio" code="statusFb" />
		</a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralActiveApi from '../../../api/veStuMoralActiveApi';
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
import ueditor from '@/components/ueditor';
import stuSelect from '@/components/stuSelect';
import { baseMixins } from '@/mixins/baseMixins';
 import {getBjByTeacher} from '@/api/common/api'
export default {
  mixins: [baseMixins],
  components: { ueditor, stuSelect,JSelectBanji },
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
      veStuMoralActiveVo: this.resetveStuMoralActiveVo(),
      textMap: {
        update: '编辑-德育活动',
        create: '新增-德育活动'
      },
	  isBzr:false,
	  value:0,
	  bjIdList:[],
      dialogStatus: 'create',
      veStuMoralActiveRules: {
		  title: [
		    {
		      required: true,
		      message: '请填写活动标题',
		      trigger: 'change',
		    }
		  ],
		  startTime: [
		    {
		      required: true,
		      message: '请选择开始时间',
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
  mounted() {
	  if(this.$hasPer(['bzr'])){
		  
		  this.isBzr=true;
	  }
  },
  
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuMoralActiveVo() {
      return {
        type: 1, // 活动类型（0：班级，1：校级）
        title: '', // 活动标题
        content: '', // 内容
        endTime: '', // 发布时间
		bjId:'',
        startTime: '', // 开始时间
        status: 1, // 是否发布（0：未发布，1：发布）
        pushTime: this.$date.format('YYYY-MM-DD'), // 发布时间
        isAll: 1 // 是否所有人员（0：否，1：是）
      };
    },
    /**
     * @msg: 初始化新增
     */
	getBjList(){
		getBjByTeacher().then((res) => {
		  if (res.success) {
			 this.bjIdList=res.result;
		  }
		})
	},
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuMoralActiveVo = this.resetveStuMoralActiveVo();
      this.$nextTick(() => {
        this.$refs.veStuMoralActiveDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuMoralActiveApi.get(row.id).then(res => {
        this.veStuMoralActiveVo = res.result;
        this.$refs.ueditor.setValue(res.result.content);
        setTimeout(() => {
          this.$refs.stuSelect.setValue(res.result.userIds);
        }, 100);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veStuMoralActiveDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuMoralActiveVo);
      tempData.content = this.$refs.ueditor.getValue();
      if (this.$refs.stuSelect) {
        tempData.userIds = this.$refs.stuSelect.getValue() || [];
        tempData.userNames = this.$refs.stuSelect.getNames().join(',');
      } else {
        tempData.userIds = [];
        tempData.userNames = '全校';
      }

      tempData.pushUser = this.loginInfo.userId; // 发布人
      tempData.pushUserName = this.loginInfo.userName; //
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuMoralActiveDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuMoralActiveApi.add(subData).then(res => {
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
      this.$refs.veStuMoralActiveDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuMoralActiveApi.update(subData).then(() => {
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
