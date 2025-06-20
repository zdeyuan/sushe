<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryAwardDataForm" :rules="veStuLiteraryAwardRules" :model="veStuLiteraryAwardVo" labelAlign="right">
        <a-form-model-item label="选择项目" prop="itemId" required>
          <edu-data v-model="veStuLiteraryAwardVo.itemId" width="150px" stype="select" :datas="typeNodes" textKey="name" dtype="datas" />
        </a-form-model-item>
        <a-form-model-item label="学生" v-if="isStu(veStuLiteraryAwardVo.itemId)" prop="stuId">
          <stuSelect ref="stuSelect"></stuSelect>
        </a-form-model-item>
        <a-form-model-item label="获奖班级" v-else prop="boxZybmbj">
          <boxZybmbj ref="boxZybmbj"></boxZybmbj>
        </a-form-model-item>
        <a-form-model-item label="获奖等级" prop="grade" required>
          <edu-data v-model="veStuLiteraryAwardVo.grade" width="150px" stype="select" code="awardLevel" />
        </a-form-model-item>
        <a-form-model-item label="获奖描述" prop="remark">
          <a-textarea v-model="veStuLiteraryAwardVo.remark" :maxLength="65535" placeholder="请输入获奖描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryAwardApi from '../../../api/veStuLiteraryAwardApi';
import boxZybmbj from '@/components/boxZybmbj';
import stuSelect from '@/components/stuSelect';
export default {
  props: {
    typeNodes: Array
  },
  components: { boxZybmbj, stuSelect },
  data() {
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
      veStuLiteraryAwardVo: this.resetveStuLiteraryAwardVo(),
      textMap: {
        update: '编辑-奖励信息',
        create: '新增-奖励信息'
      },
      dialogStatus: 'create',
      veStuLiteraryAwardRules: {
		itemId: [
		  {
		    required: true,
		    message: '请选择项目',
		    trigger: 'change',
		  }
		],  
		grade: [
		  {
		    required: true,
		    message: '请选择获奖等级',
		    trigger: 'change',
		  }
		],  
        boxZybmbj: [{ validator: validateBoxZybmbj, trigger: 'change', required: true }],
        stuId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    isStu(typeId) {
      for (let i = 0; this.typeNodes && i < this.typeNodes.length; i++) {
        const typeNode = this.typeNodes[i];
        if (typeNode.id == typeId) {
          return typeNode.type == 0;
        }
      }
      return true;
    },
    /**
     * @msg: 重置数据
     */
    resetveStuLiteraryAwardVo() {
      return {
        itemId: '', // 项目Id
        remark: '', // 备注
        grade: '', // 获奖等级
        winnerId: '', // 获奖人Id或获奖班级Id
        winnerName: '', // 获奖人Id或获奖班级Id
        specId: '', // 专业
        falId: '', // 院系Id
        auditStatus: 0, // 审核状态（0：申请中，1：通过，2：不通过）
        auditUserId: '', // 审核人
        auditUserName: '', //
        auditTime: '' // 审核时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veStuLiteraryAwardVo = this.resetveStuLiteraryAwardVo();
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuLiteraryAwardApi.get(row.id).then(res => {
        this.veStuLiteraryAwardVo = res.result;
        setTimeout(() => {
          res.result.falId = parseInt(res.result.falId);
          res.result.bjId = parseInt(res.result.winnerId);
          if (this.$refs.boxZybmbj) this.$refs.boxZybmbj.setValue(res.result);
          if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(res.result.winnerId);
        }, 100);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuLiteraryAwardVo);
      if (this.$refs.stuSelect) {
        const stus = this.$refs.stuSelect.getObj()[0];
        tempData.winnerId = stus.id;
        tempData.winnerName = stus.name;
      } else if (this.$refs.boxZybmbj) {
        this.$refs.boxZybmbj.getSetValue(tempData);
        tempData.winnerId = tempData.bjId;
        tempData.winnerName = tempData.bjText;
      }
      tempData.auditStatus = 0;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuLiteraryAwardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuLiteraryAwardApi.add(subData).then(res => {
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
      this.$refs.veStuLiteraryAwardDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuLiteraryAwardApi.update(subData).then(() => {
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
