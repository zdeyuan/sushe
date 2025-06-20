<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwInfoDataForm" :rules="veSbzcJzwInfoRules" :model="veSbzcJzwInfoVo" labelAlign="right">
        <a-form-model-item label="楼宇编号" prop="code" required>
          <a-input v-model="veSbzcJzwInfoVo.code" :maxLength="20" placeholder="请输入楼宇编号" />
        </a-form-model-item>
        <a-form-model-item label="楼宇名称" prop="name" required>
          <a-input v-model="veSbzcJzwInfoVo.name" :maxLength="45" placeholder="请输入楼宇名称" />
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="楼宇类别" prop="buildCateId">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="校区号" prop="xqh" required>
              <xiaoQuList v-model="veSbzcJzwInfoVo.xqh" width="300px"></xiaoQuList>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="楼宇地址" prop="address">
          <a-input v-model="veSbzcJzwInfoVo.address" :maxLength="200" placeholder="请输入楼宇地址" />
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="总共层数" prop="floorNum">
              <a-input-number v-model="veSbzcJzwInfoVo.floorNum" placeholder="请输入总共层数" style="width:150px" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="可用层数" prop="usableFloor">
              <a-input-number v-model="veSbzcJzwInfoVo.usableFloor" placeholder="请输入可用层数" style="width:150px" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="总建筑面积" prop="zjzmj">
              <a-input-number v-model="veSbzcJzwInfoVo.zjzmj" placeholder="请输入总建筑面积" style="width:150px" />平方米
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="总使用面积" prop="zsymj">
              <a-input-number v-model="veSbzcJzwInfoVo.zsymj" placeholder="请输入总使用面积" style="width:150px" />平方米
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="占地面积" prop="jzwzdmj" required>
          <a-input-number v-model="veSbzcJzwInfoVo.jzwzdmj" placeholder="请输入占地面积" style="width:150px" />平方米
        </a-form-model-item>

        <a-form-model-item label="权属证号" prop="qsCode">
          <a-input v-model="veSbzcJzwInfoVo.qsCode" :maxLength="60" placeholder="请输入权属证号" />
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="建成年月" prop="jcDate">
				<DatePickByCN v-model="veSbzcJzwInfoVo.jcDate"  displayFormat="YYYY-MM" mode="month" placeholder="请选择建成年月" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="设计使用年限" prop="useYear">
              <a-input-number v-model="veSbzcJzwInfoVo.useYear" placeholder="请输入" style="width:150px" />年
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcJzwInfoVo.remark" :maxLength="300" placeholder="请输入备注说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwInfoApi from '@/views/sbzc/floor/api/veSbzcJzwInfoApi';
import xiaoQuList from '@/components/xiaoQuList';
export default {
  props: {
    categoryNodes: Array
  },
  components: { xiaoQuList },
  data() {
    let validateTree = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择类别'));
      }
    };
    const data = {
      veSbzcJzwInfoVo: this.resetveSbzcJzwInfoVo(),
      textMap: {
        update: '编辑-楼宇信息',
        create: '新增-楼宇信息'
      },
      dialogStatus: 'create',
      veSbzcJzwInfoRules: { buildCateId: [{ validator: validateTree, trigger: 'change', required: true }] }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcJzwInfoVo() {
      return {
        code: '', // 建筑物号（楼宇编号）
        name: '', // 建筑物名称（楼宇名称）
        buildCateId: '', // 建筑物分类码（楼宇类别）JZWFLM
        xqh: '', // 校区号（所属校区）
        floorNum: '', // 建筑物层数（总共层数）含地下室
        usableFloor: '', // （可用层数）
        jcDate: '', // 建成年月
        zjzmj: '', // （总建筑面积）平方米
        zsymj: '', // （总使用面积）
        jzwzdmj: '', // 建筑物占地面积（占地面积）
        address: '', // 建筑物地址（楼宇地址）
        qsCode: '', // （权属证号）
        useYear: '', // （设计使用年限）
        remark: '', // 备注
        isDelete: 0 // 删除标识0未删除，1删除
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcJzwInfoVo = this.resetveSbzcJzwInfoVo();
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInfoDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcJzwInfoApi.get(row.id).then(res => {
        this.veSbzcJzwInfoVo = res.result;

        if (this.veSbzcJzwInfoVo.floorId == 0) {
          delete this.veSbzcJzwInfoVo.floorId;
        }
        if (this.veSbzcJzwInfoVo.roomId == 0) {
          delete this.veSbzcJzwInfoVo.roomId;
        }
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInfoDataForm.clearValidate();

        setTimeout(() => {
          this.$refs.eduTree.setValue([row.buildCateId]);
        }, 0);
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
      const tempData = Object.assign({}, this.veSbzcJzwInfoVo);

      const treeData = this.$refs.eduTree.getValue();
      tempData.buildCateId = treeData ? treeData[0] : 0;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcJzwInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcJzwInfoApi.add(subData).then(res => {
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
      this.$refs.veSbzcJzwInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcJzwInfoApi.update(subData).then(() => {
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
