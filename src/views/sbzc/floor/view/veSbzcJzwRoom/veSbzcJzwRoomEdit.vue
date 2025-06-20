<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwRoomDataForm" :rules="veSbzcJzwRoomRules" :model="veSbzcJzwRoomVo" labelAlign="right">
        <a-form-model-item label="所属楼宇" prop="jzwId" required>
          <jzwList v-model="veSbzcJzwRoomVo.jzwId" style="width:300px" @change="changeJzw"></jzwList>
        </a-form-model-item>
        <a-form-model-item label="所属楼层" prop="floorId" required>
          <floorList ref="floorList" v-model="veSbzcJzwRoomVo.floorId" style="width:300px"></floorList>
        </a-form-model-item>
        <a-form-model-item label="房间号" prop="code" required>
          <a-input v-model="veSbzcJzwRoomVo.code" :maxLength="12" style="width:300px" placeholder="请输入房间号" />
        </a-form-model-item>
        <a-form-model-item label="房间名称" prop="name" required>
          <a-input v-model="veSbzcJzwRoomVo.name" :maxLength="11" style="width:300px" placeholder="请输入房间名称" />
        </a-form-model-item>
        <a-form-model-item label="房间类别" prop="roomCateId">
          <edu-tree-select @onChange="handleFilter" ref="eduTree" width="300px" :check="false" :nodes="categoryNodes"></edu-tree-select>
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="房间建筑面积" prop="fjjzmj">
              <a-input-number v-model="veSbzcJzwRoomVo.fjjzmj" placeholder="请输入" style="width:150px" />平方米
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="房间使用面积" prop="fjsymj">
              <a-input-number v-model="veSbzcJzwRoomVo.fjsymj" placeholder="请输入" style="width:150px" />平方米
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="备注" prop="remark">
          <a-textarea v-model="veSbzcJzwRoomVo.remark" :maxLength="300" placeholder="请输入备注说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwRoomApi from '@/views/sbzc/floor/api/veSbzcJzwRoomApi';
import veSbzcJzwRoomcateApi from '@/views/sbzc/floor/api/veSbzcJzwRoomcateApi';
import jzwList from '@/views/sbzc/floor/component/jzwList';
import floorList from '@/views/sbzc/floor/component/floorList';

export default {
  components: { jzwList, floorList },
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
      veSbzcJzwRoomVo: this.resetveSbzcJzwRoomVo(),
      textMap: {
        update: '编辑-房间信息）',
        create: '新增-房间信息'
      },
      dialogStatus: 'create',
      categoryNodes: [],
      veSbzcJzwRoomRules: {
        roomCateId: [{ validator: validateTree, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    changeJzw() {
      setTimeout(() => {
        this.$refs.floorList.init(this.veSbzcJzwRoomVo.jzwId);
      }, 0);
    },
    initData() {
      const sub = {
        conditions: [
          /* { operator: 'eq', column: 'status', value: 1 } */
        ]
      };
      veSbzcJzwRoomcateApi.all(sub).then(res => {
        this.categoryNodes = res.result;
      });
    },
    /**
     * @msg: 重置数据
     */
    resetveSbzcJzwRoomVo() {
      return {
        jzwId: '', // 建筑物id
        floorId: '', // 楼层id
        code: '', // 房间号
        name: '', // 房间名称
        roomCateId: '', // 房间用途码（房间类别）FJYT
        fjjzmj: '', // 房间建筑面积
        fjsymj: '', // （房间使用面积）
        remark: '', // 备注
        isDelete: 0 // 删除标识0未删除，1删除
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcJzwRoomVo = this.resetveSbzcJzwRoomVo();
      this.$nextTick(() => {
        this.$refs.veSbzcJzwRoomDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcJzwRoomApi.get(row.id).then(res => {
        this.veSbzcJzwRoomVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwRoomDataForm.clearValidate();

        setTimeout(() => {
          this.$refs.eduTree.setValue([row.roomCateId]);
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
      const tempData = Object.assign({}, this.veSbzcJzwRoomVo);

      const treeData = this.$refs.eduTree.getValue();
      tempData.roomCateId = treeData ? treeData[0] : 0;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcJzwRoomDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcJzwRoomApi.add(subData).then(res => {
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
      this.$refs.veSbzcJzwRoomDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcJzwRoomApi.update(subData).then(() => {
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
