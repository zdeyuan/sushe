<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      size="big"
      class="mini-form-item inline-form"
      :title="textMap[dialogStatus]"
      width="70%"
      top="55px"
      @ok="viewType === 'create' ? createData() : updateData()"
      @cancel="handelCancel"
    >
      <a-form-model ref="veJkyFundDataForm" :rules="veJkyFundRules" :model="veJkyFundVo" labelAlign="right">
        <a-form-model-item label="项目" prop="projectId">
          <jkyFundSelect ref="jkyFundSelect" @ok="changeFund"></jkyFundSelect>
        </a-form-model-item>
        <a-form-model-item label="费用明细" prop="projectDetail">
          <div class="detail-div">
            <table class="detail-table">
              <tr>
                <th>经费类型</th>
                <th>费用摘要</th>
                <th>预算金额</th>
                <th>报销金额</th>
                <th>操作</th>
              </tr>
              <tbody>
                <tr v-for="(item, index) in detailList" :key="index">
                  <td width="200px" valign="top">
                    <edu-data v-model="item.typeId" stype="select"  width="180px"   :datas="typeNodes" textKey="name" dtype="datas" />
                  </td>
                  <td valign="top">
                    <a-textarea v-model="item.content" :maxLength="255" placeholder="请输入费用摘要" :rows="1" />
                  </td>
                  <td valign="top" width="200">
                    <a-input v-model="item.baseCost" placeholder="请输入预算金额" />
                  </td>
                  <td valign="top" width="200">
                    <a-input v-model="item.claimCost" placeholder="请输入报销金额" />
                  </td>
                  <td>
                    <edu-pms :code="'detail' + '-btn-delete'" name="删除" type="danger" size="mini" @click="handleDelete(index)"> </edu-pms>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="new-detail" @click="doAdd()">
              新增明细
            </div>
          </div>
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="预算金额" prop="totalCost">
              <a-input v-model="stotalCost" disabled placeholder="请输入预算金额" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="报销金额" prop="totalCost">
              <a-input v-model="sclaimCost" disabled placeholder="请输入预算金额" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="审批人" prop="checkUid">
              <jkyAdminSelect ref="jkyAdminSelect"></jkyAdminSelect>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="申请时间" prop="applyTime" required>
			<DatePickByCN
			   v-model="veJkyFundVo.applyTime"
			  placeholder="请选择申请时间"  />
        </a-form-model-item>

        <a-form-model-item label="说明" prop="mark" required>
          <a-textarea v-model="veJkyFundVo.mark" :maxLength="300" placeholder="请输入说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyFundApi from '@/api/research/rfunds/veJkyFundApi';

import veJkyFundClaimApi from '@/api/research/rfunds/veJkyFundClaimApi';
import veJkyFundTypeApi from '@/api/research/rfunds/veJkyFundTypeApi';

import jkyFundSelect from '@/components/kqManageComponent/jkyFundSelect';
import jkyAdminSelect from '@/components/kqManageComponent/jkyAdminSelect';

export default {
  components: { jkyFundSelect, jkyAdminSelect },
  data() {
    let validateProject = (rule, value, callback) => {
      const data = this.$refs.jkyFundSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目'));
      }
    };
    let validateProjectDetail = (rule, value, callback) => {
      const doubleReg = /^(-?\d+)(\.\d+)?$/;
      if (this.detailList.length == 0) {
        callback(new Error('请完善项目明细'));
      }
      for (let i = 0; i < this.detailList.length; i++) {
        const item = this.detailList[i];
        if (!item.typeId) {
          callback(new Error('请完善项目类型'));
        }
        if (item.baseCost == '' || !doubleReg.test(item.baseCost)) {
          callback(new Error('请完善预算金额'));
        }
        if (item.claimCost == '' || !doubleReg.test(item.claimCost)) {
          callback(new Error('请完善报销金额'));
        }
      }
      callback();
    };
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.jkyAdminSelect.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择管理员'));
      }
    };
    let validatetotalCost = (rule, value, callback) => {
      if (this.stotalCost > 0) {
        callback();
      } else {
        callback(new Error('请完善金额'));
      }
    };
    const data = {
      veJkyFundVo: this.resetveJkyFundVo(),
      textMap: {
        update: '编辑-科研经费预算',
        create: '新增-科研经费预算'
      },
      dialogStatus: 'create',
      veJkyFundRules: {
        projectId: [{ validator: validateProject, trigger: 'change', required: true }],
        projectDetail: [{ validator: validateProjectDetail, trigger: 'change', required: true }],
        checkUid: [{ validator: validateUser, trigger: 'change', required: true }],
        totalCost: [{ validator: validatetotalCost, required: true }]
      },
      typeNodes: [],
      detailList: []
    };
    return data;
  },
  computed: {
    stotalCost() {
      let all = 0;
      this.detailList.forEach(item => {
        try {
          all += parseFloat(item.baseCost) || 0;
        } catch (e) {}
      });
      return all.toFixed(2);
    },
    sclaimCost() {
      let all = 0;
      this.detailList.forEach(item => {
        try {
          all += parseFloat(item.claimCost) || 0;
        } catch (e) {}
      });
      return all.toFixed(2);
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    changeFund(list) {
      if (list.length == 0) {
        return;
      }
      this.msgUtil.confirm('提示', `费用明细是否 根据预算  自动回填?`, () => {
        veJkyFundApi.get(list[0].fundId).then(res => {
          const data = res.result;
          data.details.forEach(element => {
            element.typeId = parseInt(element.typeId);
          });
          this.detailList = data.details;
        });
      });
    },
    doAdd() {
      this.detailList.push({});
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veJkyFundTypeApi.all(sub).then(res => {
        this.typeNodes = res.result;
      });
    },
    handleDelete(index) {
      if (this.detailList.length <= 1) {
        this.$message.error('最少添加一个明细');
        return;
      }
      this.detailList.splice(index, 1);
    },
    /**
     * @msg: 重置数据
     */
    resetveJkyFundVo() {
      return {
        status: 0, //未审核
        totalCost: '', // 预算金额
        projectId: '', // 项目id
        userId: '', // 申请人
        createTime: '', // 添加时间
        applyTime: '', // 申请时间
        checkUid: '', // 审批人
        mark: '' // 说明
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyFundVo = this.resetveJkyFundVo();
      this.detailList.push({});
      this.$nextTick(() => {
        this.$refs.veJkyFundDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyFundClaimApi.get(row.id).then(res => {
        const data = res.result;
        this.veJkyFundVo = data;
        data.details.forEach(element => {
          element.typeId = parseInt(element.typeId);
        });
        this.detailList = data.details;
        this.$refs.jkyFundSelect.setValueObj([
          {
            id: data.projectId,
            name: data.projectName
          }
        ]);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyFundDataForm.clearValidate();
        this.$refs.jkyAdminSelect.setValue([row.checkUid]);
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
      const tempData = Object.assign({}, this.veJkyFundVo);
      tempData.projectId = this.$refs.jkyFundSelect.getValue()[0];
      tempData.checkUid = this.$refs.jkyAdminSelect.getValue()[0];
      tempData.totalCost = this.stotalCost;
      tempData.claimCost = this.sclaimCost;
      tempData.details = this.detailList;
      tempData.status = 0;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyFundDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyFundClaimApi.add(subData).then(res => {
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
      this.$refs.veJkyFundDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyFundClaimApi.update(subData).then(() => {
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
<style lang="less" scoped>

</style>
