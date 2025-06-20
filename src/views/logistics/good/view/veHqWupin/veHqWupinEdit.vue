<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veHqWupinDataForm" :rules="veHqWupinRules" :model="veHqWupinVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品编号" class="ytop" prop="code" required>
              <a-input v-model="veHqWupinVo.code" :maxLength="50" placeholder="请输入物品编号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="物品名称" class="ytop" prop="name" required>
              <a-input v-model="veHqWupinVo.name" :maxLength="50" placeholder="请输入物品名称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品分类" prop="wpflId">
              <edu-tree-select ref="eduTree" :check="false" :nodes="bgwuList"></edu-tree-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="品牌" prop="wppp">
              <a-input v-model="veHqWupinVo.wppp" :maxLength="200" placeholder="请输入品牌" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="物品图片">
          <uploadFiles ref="uploadFiles" fileType="image" isImg serviceType="veHqWupin">
            <a-table-column dataIndex="ext" title="图片">
              <template slot-scope="ext, row">
                <img :src="$http.baseServer + '/' + $http.service.hq + 'veHqFile/download?id=' + row.id" style="height:50px" />
              </template>
            </a-table-column>
          </uploadFiles>
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="物品单价" prop="wpdj" required>
              <a-input v-model="veHqWupinVo.wpdj" placeholder="请输入物品单价" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="购置时间" prop="gzTime">
				<DatePickByCN
				   v-model="veHqWupinVo.gzTime"
				  placeholder="请选择购置时间"  />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="计划使用年限" prop="jhsynx" required>
          <a-input v-model="veHqWupinVo.jhsynx" :maxLength="20" placeholder="请输入计划使用年限" />
        </a-form-model-item>
        <a-form-model-item label="物品状态" prop="status">
          <edu-data v-model="veHqWupinVo.status" stype="radio" code="status" />
        </a-form-model-item>
        <a-form-model-item label="是否租借" prop="sfzj">
          <edu-data v-model="veHqWupinVo.sfzj" stype="radio" code="shifou" />
        </a-form-model-item>
        <a-form-model-item label="物品描述" prop="remark">
          <a-textarea v-model="veHqWupinVo.remark" :maxLength="300" placeholder="请输入物品描述" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqWupinApi from '@/views/logistics/good/api/veHqWupinApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  props: {
    bgwuList: {
      type: Array,
      default: []
    }
  },
  components: { uploadFiles },
  data() {
    let validateTree = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择分类'));
      }
    };
    const data = {
      veHqWupinVo: this.resetveHqWupinVo(),
      textMap: {
        update: '编辑物品',
        create: '新增物品'
      },
      dialogStatus: 'create',
      veHqWupinRules: {
        wpflId: [{ validator: validateTree, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveHqWupinVo() {
      return {
        code: '', // 物品编号
        name: '', // 物品名称
        wpflId: '', // 物品分类ID
        remark: '', // 物品描述
        status: 1, // 物品状态
        gzTime: '', // 购置时间
        jhsynx: '', // 计划使用年限
        wpdj: '', // 物品单价
        wppp: '', // 品牌
        useStatus: 0, // 使用状态 0 正常  1报废
        sfzj: 1, // 是否租借 0否 1是
        updateBy: '', // 更新人
        updateDate: '', // 更新时间
        updateName: '' // 更新人
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veHqWupinVo = this.resetveHqWupinVo();
      this.$nextTick(() => {
        this.$refs.veHqWupinDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqWupinApi.get(row.id).then(res => {
        this.veHqWupinVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.eduTree.setValue([row.wpflId]);
        }, 0);
        this.$refs.veHqWupinDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veHqWupinVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.wpflId = treeData ? treeData[0] : 0;
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veHqWupinDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veHqWupinApi.add(subData).then(res => {
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
      this.$refs.veHqWupinDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veHqWupinApi.update(subData).then(() => {
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
