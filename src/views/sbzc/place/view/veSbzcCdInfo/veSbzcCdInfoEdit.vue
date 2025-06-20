<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdInfoDataForm" :rules="veSbzcCdInfoRules" :model="veSbzcCdInfoVo" labelAlign="right">
        <a-form-model-item label="场地编号" prop="code" required>
          <a-input v-model="veSbzcCdInfoVo.code" style="width:300px" :maxLength="50" placeholder="请输入场地编号" />
        </a-form-model-item>
        <a-form-model-item label="场地名称" prop="name" required>
          <a-input v-model="veSbzcCdInfoVo.name" style="width:300px" :maxLength="100" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="场地类型" prop="cateId">
          <edu-tree-select ref="eduTree" :check="false" :nodes="cateList"></edu-tree-select>
        </a-form-model-item>
        <a-form-model-item label="所属校区" prop="xqh" required>
          <xiaoQuList v-model="veSbzcCdInfoVo.xqh" width="300px"></xiaoQuList>
        </a-form-model-item>
        <a-form-model-item label="占地面积" prop="area">
          <a-input v-model="veSbzcCdInfoVo.area" style="width:300px" placeholder="请输入占地面积" /> ㎡
        </a-form-model-item>
        <a-form-model-item label="地址" prop="address">
          <a-input v-model="veSbzcCdInfoVo.address" :maxLength="200" placeholder="请输入地址" />
        </a-form-model-item>
        <a-form-model-item label="申请人" prop="responseUser">
          <userSelectBox ref="responseUser"></userSelectBox>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcCdInfoVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdInfoApi from '@/views/sbzc/place/api/veSbzcCdInfoApi';
import xiaoQuList from '@/components/xiaoQuList';
import userSelectBox from '@/components/userSelectBox';

export default {
  components: { xiaoQuList, userSelectBox },
  props: {
    cateList: {
      type: Array,
      default: null
    }
  },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    let validateUser2 = (rule, value, callback) => {
      const data = this.$refs.responseUser.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    const data = {
      veSbzcCdInfoVo: this.resetveSbzcCdInfoVo(),
      textMap: {
        update: '编辑-场地',
        create: '新增-场地'
      },
      dialogStatus: 'create',
      veSbzcCdInfoRules: {
        cateId: [{ validator: validateUser, trigger: 'change', required: true }],
        responseUser: [{ validator: validateUser2, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveSbzcCdInfoVo() {
      return {
        code: '', // 场地编号
        name: '', // 名称
        cateId: '', // 场地类型
        xqh: '', // 所属校区
        area: '', // 占地面积
        address: '', // 地址
        remark: '', // 备注
        responseUserId: '', // 负责人
        responseUserName: '', // 负责人
        isAppliable: 1, // 是否可借用（1可以，0不可以）
        isDelete: 0 // 删除标识0未删除，1删除
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcCdInfoVo = this.resetveSbzcCdInfoVo();
      this.$nextTick(() => {
        this.$refs.veSbzcCdInfoDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcCdInfoApi.get(row.id).then(res => {
        this.veSbzcCdInfoVo = res.result;
        setTimeout(() => {
          this.$refs.eduTree.setValue([res.result.cateId]);
        }, 0);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.responseUser.setObj([{ id: row.responseUserId, name: row.responseUserName }]);
        this.$refs.veSbzcCdInfoDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veSbzcCdInfoVo);

      const userData = this.$refs.responseUser.getObj();
      tempData.responseUserId = userData.id;
      tempData.responseUserName = userData.name;

      const treeData = this.$refs.eduTree.getValue();
      if (treeData && treeData.length > 0) {
        tempData.cateId = treeData[0];
      }
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcCdInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcCdInfoApi.add(subData).then(res => {
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
      this.$refs.veSbzcCdInfoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcCdInfoApi.update(subData).then(() => {
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
