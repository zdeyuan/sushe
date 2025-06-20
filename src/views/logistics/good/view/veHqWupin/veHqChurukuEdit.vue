<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="wuData.name + '-' + rukuName" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqChurukuDataForm" :rules="veHqChurukuRules" :model="veHqChurukuVo" labelAlign="right">
        <div style="color:red">注：仓库库存为0时，不能选择仓库名称,请先进行入库操作</div>
        <a-row>
          <a-col :span="12">
            <a-form-model-item :label="veHqChurukuVo.type == 6 ? '调出仓库' : '仓库'" class="ytop" prop="ckId" required>
              <ckList v-model="veHqChurukuVo.ckId" @change="changeCk"></ckList>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="库存数量" class="ytop" required>
              {{ ckNum }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="veHqChurukuVo.type == 6">
          <a-col :span="12">
            <a-form-model-item label="调入仓库" prop="ckId" required>
              <ckList v-model="veHqChurukuVo.glId" @change="changeCk2"></ckList>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="库存数量" required>
              {{ ckNum2 }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="物品名称">
          {{ wuData.name }}
        </a-form-model-item>
        <a-form-model-item :label="rukuName + '数量'" prop="number">
          <a-input-number :min="1" v-model="veHqChurukuVo.number" placeholder="请输入数量" style="width:300px" />
        </a-form-model-item>
        <a-form-model-item label="时间" prop="crTime" required>
			<DatePickByCN
			   v-model="veHqChurukuVo.crTime"
			  placeholder="请选择时间"  />
        </a-form-model-item>
        <!--     <a-form-model-item label="关联的出入库操作ID，主要是归还和调拨使用" prop="glId" required>
          <a-input v-model="veHqChurukuVo.glId" :maxLength="0" placeholder="请输入关联的出入库操作ID，主要是归还和调拨使用" />
        </a-form-model-item> -->
        <a-form-model-item :label="rukuName + '申请人'" prop="applyUser" v-if="veHqChurukuVo.type != 1">
          <userSelectBox ref="applyUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="领用班级" prop="clasId" v-if="veHqChurukuVo.type == 2">
          <clasSelectBox ref="clasSelectBox"></clasSelectBox>
        </a-form-model-item>
        <a-form-model-item label="经手人" prop="jsUser">
          <userSelectBox ref="jsUser"></userSelectBox>
        </a-form-model-item>
        <!--        <a-form-model-item label="批准人" prop="pjUser">
          <userSelectBox ref="pjUser"></userSelectBox>
        </a-form-model-item> -->
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
      wuData: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    changeCk() {
      this.ckNum = 0;
      if (!this.veHqChurukuVo.ckId) {
        this.ckNum = 0;
        return;
      }
      const params = {
        size: 1,
        current: 1,
        conditions: []
      };
      this.$utils.addPageConditions(params, 'a.id', 'eq', this.wuData.id);
      this.$utils.addPageConditions(params, 'b.id', 'eq', this.veHqChurukuVo.ckId);
      veHqChurukuApi.kcpage(params).then(res => {
        if (res.result.records.length > 0) {
          this.ckNum = res.result.records[0].number;
        }
      });
    },
    changeCk2() {
      this.ckNum2 = 0;
      if (!this.veHqChurukuVo.glId) {
        this.ckNum2 = 0;
        return;
      }
      const params = {
        size: 1,
        current: 1,
        conditions: []
      };
      this.$utils.addPageConditions(params, 'a.id', 'eq', this.wuData.id);
      this.$utils.addPageConditions(params, 'b.id', 'eq', this.veHqChurukuVo.glId);
      veHqChurukuApi.kcpage(params).then(res => {
        if (res.result.records.length > 0) {
          this.ckNum2 = res.result.records[0].number;
        }
      });
    },
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
        status: 2,
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
    doCreate(wuData, type) {
      this.viewType = 'create';
      this.veHqChurukuVo = this.resetveHqChurukuVo();
      this.veHqChurukuVo.type = type;
      this.veHqChurukuVo.wpId = wuData.id;
      //1=入库，2=领用，3=借用、4=报废、5=归还、6=调拨
      if (type == 1) {
        this.rukuName = '入库';
      } else if (type == 2) {
        this.rukuName = '领用';
      } else if (type == 3) {
        this.rukuName = '借用';
      } else if (type == 4) {
        this.rukuName = '报废';
      } else if (type == 5) {
        this.rukuName = '归还';
      } else if (type == 6) {
        this.rukuName = '调拨';
      }

      this.wuData = wuData;

      this.$nextTick(() => {
        this.$refs.veHqChurukuDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqChurukuApi.get(row.id).then(res => {
        this.veHqChurukuVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        if (this.$refs.applyUser) this.$refs.applyUser.setObj([{ id: row.applyUser, name: row.applyUserName }]);
        this.$refs.jsUser.setObj([{ id: row.jsUser, name: row.jbUserName }]);
        //  this.$refs.pjUser.setObj([{ id: row.pjUser, name: row.pjUserName }]);
        if (this.$refs.clasSelectBox) this.$refs.clasSelectBox.setObj([{ id: row.clasId, name: row.clasIds }]);
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

      /*      const userData3 = this.$refs.pjUser.getObj();
      tempData.pjUser = userData3.id;
      tempData.pjUserName = userData3.name; */

      if (this.$refs.clasSelectBox) {
        const userData44 = this.$refs.clasSelectBox.getObj();
        tempData.clasId = userData44.id;
        tempData.clasIds = userData44.name;
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqChurukuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqChurukuApi.add(subData).then(res => {
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
      this.$refs.veHqChurukuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqChurukuApi.update(subData).then(() => {
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
