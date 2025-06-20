<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="物品归还" @ok="createData()" @cancel="handelCancel">
      <a-form-model ref="veHqChurukuDataForm" :rules="veHqChurukuRules" :model="veHqChurukuVo" labelAlign="right">
        <span v-for="(item, index) in backList" :key="item.id">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="仓库名称" :class="{ ytop: index == 0 }">
                {{ item.ckName }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="物品名称" :class="{ ytop: index == 0 }">
                {{ item.wpName }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="借用数量">
                {{ item.number }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="归还数量">
                <a-input-number :min="0" :max="item.number" v-model="item.reNum" placeholder="请输入归还数量" style="width:300px" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </span>

        <a-form-model-item label="归还时间" prop="crTime" required>
			<DatePickByCN
			   v-model="veHqChurukuVo.crTime"
			  placeholder="请选择归还时间"  />
        </a-form-model-item>
        <!--     <a-form-model-item label="关联的出入库操作ID，主要是归还和调拨使用" prop="glId" required>
          <a-input v-model="veHqChurukuVo.glId" :maxLength="0" placeholder="请输入关联的出入库操作ID，主要是归还和调拨使用" />
        </a-form-model-item> -->
        <a-form-model-item :label="'归还人'" prop="applyUser" v-if="veHqChurukuVo.type != 1">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="经手人" prop="jsUser">
          <userSelectBox ref="jsUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="pjUser">
          <userSelectBox ref="pjUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veHqChurukuVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqChurukuApi from '@/views/logistics/good/api/veHqChurukuApi';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';
import clasSelectBox from '@/components/kqManageComponent/clasSelectBox';
import ckList from '@/views/logistics/base/component/ckList';

export default {
  components: { userSelectBox, clasSelectBox, ckList },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.applyUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser1 = (rule, value, callback) => {
      const data = this.$refs.jsUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser2 = (rule, value, callback) => {
      const data = this.$refs.pjUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateNumber = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('数量必须大于0'));
      } else if (this.veHqChurukuVo.type != 1 && value > this.ckNum) {
        callback(new Error('库存数量不足'));
      } else {
        callback();
      }
    };
    const data = {
      veHqChurukuVo: this.resetveHqChurukuVo(),
      rukuName: '',
      ckNum: 0,
      ckNum2: 0,
      dialogStatus: 'create',
      veHqChurukuRules: {
        applyUser: [{ validator: validateUser, trigger: 'change', required: true }],
        jsUser: [{ validator: validateUser1, trigger: 'change', required: true }],
        pjUser: [{ validator: validateUser2, trigger: 'change', required: true }],
        number: [{ validator: validateNumber, trigger: 'change', required: true }]
      },
      backList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqChurukuVo() {
      return {
        wpId: '', // 物品Id
        ckId: '', // 仓库Id
        number: '', // 数量
        crTime: this.$date.format('YYYY-MM-DD'), // 出入时间
        type: '', // 操作类型：1=入库，2=领用，3=借用、4=报废、5=归还、6=调拨
        glId: '', // 关联的出入库操作ID，主要是归还和调拨使用
        remark: '', // 备注
        clasId: '', // 班级Id
        clasIds: '', //
        applyUser: '', // 申请人
        applyUserName: '', // 申请人
        jsUser: '', // 经手人
        jbUserName: '', // 经手人
        pjUser: '', // 批准人
        pjUserName: '' // 批准人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doReturn(backList) {
      this.viewType = 'create';
      this.veHqChurukuVo = this.resetveHqChurukuVo();
      this.veHqChurukuVo.type = 5;
      //  this.veHqChurukuVo.wpId = wuData.id;
      backList.forEach(element => {
        element.reNum = element.number;
      });
      this.backList = this.$utils.copyObject(backList);

      this.$nextTick(() => {
        this.$refs.veHqChurukuDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqChurukuVo);

      if (this.$refs.applyUser) {
        const userData = this.$refs.applyUser.getObj();
        tempData.applyUser = userData.id;
        tempData.applyUserName = userData.name;
      }
      const userData2 = this.$refs.jsUser.getObj();
      tempData.jsUser = userData2.id;
      tempData.jbUserName = userData2.name;

      const userData3 = this.$refs.pjUser.getObj();
      tempData.pjUser = userData3.id;
      tempData.pjUserName = userData3.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqChurukuDataForm.validate(valid => {
        if (valid) {
          const list = [];
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }

          this.backList.forEach(back => {
            const sub = this.$utils.copyObject(subData);
            sub.number = back.reNum;
            sub.glId = back.id;
            sub.wpId = back.wpId;
            sub.ckId = back.ckId;
            list.push(sub);
          });

          if (list.length == 0) {
            return;
          }

          veHqChurukuApi.addList(list).then(res => {
            this.$notification.success({
              message: '物品归还成功',
              description: '归还了' + list.length + '个物品'
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
