<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcAssetDataForm" :rules="veSbzcZcAssetRules" :model="veSbzcZcAssetVo" labelAlign="right">
        <a-form-model-item label="资产编号" prop="code" required>
          <a-input v-model="veSbzcZcAssetVo.code" :maxLength="30" placeholder="请输入资产编号" />
        </a-form-model-item>
        <a-form-model-item label="资产名称" prop="name" required>
          <a-input v-model="veSbzcZcAssetVo.name" :maxLength="200" placeholder="请输入资产名称" />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产分类" prop="cateId">
              <!--                            <a-input v-model="veSbzcZcAssetVo.cateId" :maxLength="0" placeholder="请输入资产分类"/>-->
              <edu-tree-select ref="eduTree" :check="false" :nodes="zcflList" width="200px"></edu-tree-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产批次" prop="zcpc" required>
              <a-input v-model="veSbzcZcAssetVo.zcpc" :maxLength="20" placeholder="请输入资产批次" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="规格型号" prop="model" required>
              <a-input v-model="veSbzcZcAssetVo.model" :maxLength="20" placeholder="请输入规格型号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="单位" prop="unit" required>
              <a-input v-model="veSbzcZcAssetVo.unit" :maxLength="10" placeholder="请输入单位" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="单价" prop="price" required>
              <a-input-number v-model="veSbzcZcAssetVo.price" :maxLength="5" placeholder="请输入单价" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="数量" prop="count" required>
              <a-input v-model="veSbzcZcAssetVo.count" :maxLength="3" placeholder="请输入数量" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="金额" prop="totalPrice" required>
          <a-input-number v-model="veSbzcZcAssetVo.totalPrice" :maxLength="10" placeholder="根据单价和数量自动计算" :disabled="true" />
        </a-form-model-item>
        <a-form-model-item label="使用方向" prop="usedFor" required>
          <a-input v-model="veSbzcZcAssetVo.usedFor" :maxLength="100" placeholder="请输入使用方向" />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="所属部门" prop="deptTreeOwn">
              <dept-tree ref="deptTreeOwn"></dept-tree>
              <!--                            <a-input v-model="veSbzcZcAssetVo.deptOwn" :maxLength="0" placeholder="请输入所属部门"/>-->
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="验收部门" prop="deptTreeCheck">
              <dept-tree ref="deptTreeCheck"></dept-tree>
              <!--                            <a-input v-model="veSbzcZcAssetVo.deptCheck" :maxLength="0" placeholder="请输入验收部门"/>-->
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="使用部门" prop="deptTreeUse">
              <dept-tree ref="deptTreeUse"></dept-tree>
              <!--                            <a-input v-model="veSbzcZcAssetVo.deptUse" :maxLength="0" placeholder="请输入使用部门"/>-->
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="使用人员" prop="useUser">
              <userSelectBox ref="useUser"></userSelectBox>
              <!--                            <a-input v-model="veSbzcZcAssetVo.userId" :maxLength="0" placeholder="请输入使用人员"/>-->
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="购买日期" prop="buyDate" required>
				<DatePickByCN v-model="veSbzcZcAssetVo.buyDate"  placeholder="请选择购买日期" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="发票编号" prop="fpNo" required>
              <a-input v-model="veSbzcZcAssetVo.fpNo" :maxLength="60" placeholder="请输入发票编号" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="存放地点" prop="location" required>
              <a-input v-model="veSbzcZcAssetVo.location" :maxLength="60" placeholder="请输入存放地点" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="供应商" prop="vendor" required>
              <a-input v-model="veSbzcZcAssetVo.vendor" :maxLength="100" placeholder="请输入供应商" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="仓库管理员" prop="ckUser">
              <userSelectBox ref="ckUser"></userSelectBox>
              <!--                            <a-input v-model="veSbzcZcAssetVo.ckUser" :maxLength="0" placeholder="请输入仓库管理员"/>-->
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="责任人" prop="responseUser">
              <!--                            <a-input v-model="veSbzcZcAssetVo.responseUserId" :maxLength="0" placeholder="请输入责任人"/>-->
              <userSelectBox ref="responseUser"></userSelectBox>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="附件" prop="attachmentId">
          <!--                    <a-input v-model="veSbzcZcAssetVo.attachmentId" :maxLength="0" placeholder="请输入附件"/>-->
          <uploadFiles ref="uploadFiles" serviceType="guide" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark" required>
          <a-textarea v-model="veSbzcZcAssetVo.remark" :maxLength="500" placeholder="请输入备注" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcAssetApi from '@/views/sbzc/fund/api/veSbzcZcAssetApi';
import uploadFiles from '@/components/uploadFiles';
import userSelectBox from '@/components/userSelectBoxbyUserId';
import veSbzcZcCategoryApi from '@/views/sbzc/fund/api/veSbzcZcCategoryApi';
import deptTree from '@/components/deptTree';

export default {
  components: { uploadFiles, userSelectBox, deptTree },
  props: {},
  data() {
    let validateTree = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择分类'));
      }
    };
    let validateDeptOwn = (rule, value, callback) => {
      const data = this.$refs.deptTreeOwn.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateDeptCheck = (rule, value, callback) => {
      const data = this.$refs.deptTreeCheck.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateDeptUse = (rule, value, callback) => {
      const data = this.$refs.deptTreeUse.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUseUser = (rule, value, callback) => {
      const data = this.$refs.useUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateCkUser = (rule, value, callback) => {
      const data = this.$refs.ckUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateResponseUser = (rule, value, callback) => {
      const data = this.$refs.responseUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veSbzcZcAssetVo: this.resetveSbzcZcAssetVo(),
      textMap: {
        update: '编辑-设备资产',
        create: '新增-设备资产'
      },
      dialogStatus: 'create',
      veSbzcZcAssetRules: {
        cateId: [{ validator: validateTree, trigger: 'change', required: true }],
        deptTreeOwn: [{ validator: validateDeptOwn, trigger: 'change', required: true }],
        deptTreeCheck: [{ validator: validateDeptCheck, trigger: 'change', required: true }],
        deptTreeUse: [{ validator: validateDeptUse, trigger: 'change', required: true }],
        useUser: [{ validator: validateUseUser, trigger: 'change', required: true }],
        ckUser: [{ validator: validateCkUser, trigger: 'change', required: true }],
        responseUser: [{ validator: validateResponseUser, trigger: 'change', required: true }],
		code: [{
			required: true,
			message: '资产编号必填',
			trigger: 'change',
		}],
		zcpc: [{
			required: true,
			message: '资产批次必填',
			trigger: 'change',
		}],
		model: [{
			required: true,
			message: '规格型号必填',
			trigger: 'change',
		}],
		unit: [{
			required: true,
			message: '单位必填',
			trigger: 'change',
		}],
		count: [{
			required: true,
			message: '数量必填',
			trigger: 'change',
		}],
		totalPrice: [{
			required: true,
			message: '金额必填',
			trigger: 'change',
		}],
		usedFor: [{
			required: true,
			message: '使用方向必填',
			trigger: 'change',
		}],
		buyDate: [{
			required: true,
			message: '购买日期必填',
			trigger: 'change',
		}],
		price: [{
			required: true,
			message: '单价必填',
			trigger: 'change',
		}],
		fpNo: [{
			required: true,
			message: '发票编号必填',
			trigger: 'change',
		}],
		location: [{
			required: true,
			message: '存放地点必填',
			trigger: 'change',
		}],vendor: [{
			required: true,
			message: '供应商必填',
			trigger: 'change',
		}],remark: [{
			required: true,
			message: '备注必填',
			trigger: 'change',
		}],
      }
    };
    data.zcflList = [];
    return data;
  },
  mounted() {
    this.initZcfl();
  },
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcZcAssetVo() {
      return {
        code: '', // 资产编号
        name: '', // 资产名称
        zcpc: '', // 资产批次
        model: '', // 规格型号
        unit: '', // 单位
        price: '', // 单价
        count: '', // 数量
        totalPrice: '', // 金额（数量和单价自动生成）
        deptOwn: '', // 所属部门
        deptCheck: '', // 验收部门
        deptUse: '', // 使用部门
        userId: '', // 使用人员
        userName: '', // 使用人员
        ckUserId: '', // 仓库管理员
        ckUserName: '', // 仓库管理员
        buyDate: '', // 购买日期
        fpNo: '', // 发票编号
        pzNo: '', // 凭证号码
        cateId: '', // 资产分类
        location: '', // 存放地点
        remark: '', // 备注
        usedFor: '', // 使用方向
        vendor: '', // 供应商
        responseUserId: '', // 责任人
        responseUserName: '', // 责任人
        enableDate: '', // 启用日期
        attachmentId: '', // 附件
        status: '', // 状态（未分配unallocated，被借领apply，维修maintain，报废discard）
        isDelete: '' // 删除标识0未删除，1删除
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcZcAssetVo = this.resetveSbzcZcAssetVo();
      this.$nextTick(() => {
        this.$refs.veSbzcZcAssetDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcZcAssetApi.get(row.id).then(res => {
        this.veSbzcZcAssetVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.eduTree.setValue([row.cateId]);
		  this.$refs.deptTreeCheck.setValue([row.deptCheck]);
		  this.$refs.deptTreeOwn.setValue([row.deptOwn]);
		  this.$refs.deptTreeUse.setValue([row.deptUse]);
		  this.$refs.useUser.setValue([row.userId]);
		  this.$refs.ckUser.setValue([row.ckUserId]);
		
        }, 0);
        this.$refs.veSbzcZcAssetDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcZcAssetVo);
	  const dept = this.$refs.deptTreeOwn.getValue();
	  tempData.deptOwn=dept.id;
	  const dept2= this.$refs.deptTreeCheck.getValue();
	  tempData.deptCheck=dept2.id;
	  const dept3 = this.$refs.deptTreeUse.getValue();
	  tempData.deptUse=dept3.id;
	  // tempData.deptOwn: = this.$refs.uploadFiles.getValue();
	  console.log("dept",dept,dept2,dept3)
      const treeData = this.$refs.eduTree.getValue();
      tempData.cateId = treeData ? treeData[0] : 0;
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      //使用人
      const useUser = this.$refs.useUser.getObj();
      tempData.userId = useUser.id;
      tempData.userName = useUser.name;
      //仓库管理员
      const ckUser = this.$refs.ckUser.getObj();
      tempData.ckUserId = ckUser.id;
      tempData.ckUserName = ckUser.name;
      //仓库管理员
      const responseUser = this.$refs.responseUser.getObj();
      tempData.responseUserId = responseUser.id;
      tempData.responseUserName = responseUser.name;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.veSbzcZcAssetVo.totalPrice = this.veSbzcZcAssetVo.price * this.veSbzcZcAssetVo.count;
      this.$refs.veSbzcZcAssetDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          subData.status = 'unallocated';
          if (subData == null) {
            return;
          }
          veSbzcZcAssetApi.add(subData).then(res => {
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
      this.veSbzcZcAssetVo.totalPrice = this.veSbzcZcAssetVo.price * this.veSbzcZcAssetVo.count;
      this.$refs.veSbzcZcAssetDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcZcAssetApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    initZcfl() {
      const params = {
        sorts: [{ column: 'list_sort', asc: true }]
      };
      //this.$utils.addPageConditions(params, 'status', 'eq', 1);
      veSbzcZcCategoryApi.all(params).then(res => {
        this.zcflList = res.result;
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
