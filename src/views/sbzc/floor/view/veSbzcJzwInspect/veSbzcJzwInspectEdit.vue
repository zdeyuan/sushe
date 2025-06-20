<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwInspectDataForm" :rules="veSbzcJzwInspectRules" :model="veSbzcJzwInspectVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="建筑物" class="ytop" prop="jzwId" required>
              <jzwList v-model="veSbzcJzwInspectVo.jzwId" style="width:300px" @change="changeJzw"></jzwList>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="楼层编号" class="ytop" prop="floorId">
              <floorList ref="floorList" v-model="veSbzcJzwInspectVo.floorId" style="width:300px" @change="changeFloor"></floorList>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="房间号" prop="roomId">
              <roomList ref="roomList" v-model="veSbzcJzwInspectVo.roomId" style="width:300px"></roomList>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="检查类型" prop="inspectTypeId">
              <edu-tree-select ref="eduTree" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="检查时间" prop="inspectDate" required>
				<DatePickByCN v-model="veSbzcJzwInspectVo.inspectDate"  placeholder="请选择检查时间" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="检查人" prop="inspectUser">
              <userSelectBox ref="userSelectBox"></userSelectBox>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="检查情况描述" prop="description">
          <a-textarea v-model="veSbzcJzwInspectVo.description" :maxLength="300" placeholder="请输入检查情况" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcJzwInspectVo.remark" :maxLength="300" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwInspectApi from '@/views/sbzc/floor/api/veSbzcJzwInspectApi';

import jzwList from '@/views/sbzc/floor/component/jzwList';
import floorList from '@/views/sbzc/floor/component/floorList';
import roomList from '@/views/sbzc/floor/component/roomList';
import userSelectBox from '@/components/userSelectBox';

export default {
  components: { jzwList, floorList, roomList, userSelectBox },
  props: {
    categoryNodes: Array
  },
  data() {
    let validateTree = (rule, value, callback) => {
      const data = this.$refs.eduTree.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择项目分类'));
      }
    };

    let validateUser = (rule, value, callback) => {
      const data = this.$refs.userSelectBox.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择检查人'));
      }
    };

    const data = {
      veSbzcJzwInspectVo: this.resetveSbzcJzwInspectVo(),
      textMap: {
        update: '编辑-检查记录',
        create: '新增-检查记录'
      },
      dialogStatus: 'create',
      veSbzcJzwInspectRules: {
        inspectTypeId: [{ validator: validateTree, trigger: 'change', required: true }],
        inspectUser: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    changeJzw() {
      setTimeout(() => {
        this.$refs.floorList.init(this.veSbzcJzwInspectVo.jzwId);
      }, 0);
    },
    changeFloor() {
      setTimeout(() => {
        this.$refs.roomList.init(this.veSbzcJzwInspectVo.floorId);
      }, 0);
    },
    /**
     * @msg: 重置数据
     */
    resetveSbzcJzwInspectVo() {
      return {
        jzwId: '', // 建筑物id
        floorId: '', // 楼层id
        roomId: '', // 房间id
        inspectTypeId: '', // 检查类别
        inspectDate: '', // 检查时间
        inspectUser: '', // 检查人
        inspectUserName: '', // 检查人
        description: '', // 检查情况
        remark: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcJzwInspectVo = this.resetveSbzcJzwInspectVo();
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspectDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcJzwInspectApi.get(row.id).then(res => {
        this.veSbzcJzwInspectVo = res.result;

        if (this.veSbzcJzwInspectVo.floorId == 0) {
          delete this.veSbzcJzwInspectVo.floorId;
        }
        if (this.veSbzcJzwInspectVo.roomId == 0) {
          delete this.veSbzcJzwInspectVo.roomId;
        }
        this.changeJzw();
        if (this.veSbzcJzwInspectVo.floorId) {
          this.changeFloor();
        }
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspectDataForm.clearValidate();
        this.$refs.userSelectBox.setObj([{ id: row.inspectUser, name: row.inspectUserName }]);
        setTimeout(() => {
          this.$refs.eduTree.setValue([row.inspectTypeId]);
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
      const tempData = Object.assign({}, this.veSbzcJzwInspectVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.inspectTypeId = treeData ? treeData[0] : 0;

      const userData = this.$refs.userSelectBox.getObj();
      tempData.inspectUser = userData.id;
      tempData.inspectUserName = userData.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcJzwInspectDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcJzwInspectApi.add(subData).then(res => {
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
      this.$refs.veSbzcJzwInspectDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcJzwInspectApi.update(subData).then(() => {
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
