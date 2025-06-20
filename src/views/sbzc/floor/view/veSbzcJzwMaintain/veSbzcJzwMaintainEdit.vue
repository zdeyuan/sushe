<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veSbzcJzwMaintainDataForm" :rules="veSbzcJzwMaintainRules" :model="veSbzcJzwMaintainVo" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="建筑物" class="ytop" prop="jzwId" required>
              <jzwList v-model="veSbzcJzwMaintainVo.jzwId" style="width:300px" @change="changeJzw"></jzwList>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="楼层编号" class="ytop" prop="floorId">
              <floorList ref="floorList" v-model="veSbzcJzwMaintainVo.floorId" style="width:300px" @change="changeFloor"></floorList>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="房间号" prop="roomId">
          <roomList ref="roomList" v-model="veSbzcJzwMaintainVo.roomId" style="width:300px"></roomList>
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="修缮开始日期" prop="startDate" required>
				<DatePickByCN v-model="veSbzcJzwMaintainVo.startDate"  placeholder="请选择修缮开始日期" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="修缮结束日期" prop="endDate" required>
				<DatePickByCN v-model="veSbzcJzwMaintainVo.endDate"  placeholder="请选择修缮结束日期" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="修缮经费" prop="money">
              <a-input-number v-model="veSbzcJzwMaintainVo.money" placeholder="请输入" style="width:150px" />元
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="修缮单位" prop="org">
              <a-input v-model="veSbzcJzwMaintainVo.org" :maxLength="255" placeholder="请输入修缮单位" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="经费来源" prop="jfSource" required>
              <edu-data v-model="veSbzcJzwMaintainVo.jfSource" stype="select" code="mainTain" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="经办人" prop="jbUser">
              <userSelectBox ref="userSelectBox"></userSelectBox>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="修缮内容" prop="content">
          <a-textarea v-model="veSbzcJzwMaintainVo.content" :maxLength="300" placeholder="请输入修缮内容" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="修缮说明" prop="remark">
          <a-textarea v-model="veSbzcJzwMaintainVo.remark" :maxLength="300" placeholder="请输入修缮说明" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcJzwMaintainApi from '@/views/sbzc/floor/api/veSbzcJzwMaintainApi';

import jzwList from '@/views/sbzc/floor/component/jzwList';
import floorList from '@/views/sbzc/floor/component/floorList';
import roomList from '@/views/sbzc/floor/component/roomList';
import userSelectBox from '@/components/userSelectBox';

export default {
  components: { jzwList, floorList, roomList, userSelectBox },
  data() {
    let validateUser = (rule, value, callback) => {
      const data = this.$refs.userSelectBox.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择经办人'));
      }
    };

    const data = {
      veSbzcJzwMaintainVo: this.resetveSbzcJzwMaintainVo(),
      textMap: {
        update: '编辑-修理记录',
        create: '新增-修理记录'
      },
      dialogStatus: 'create',
      veSbzcJzwMaintainRules: {
        jbUser: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    changeJzw() {
      setTimeout(() => {
        this.$refs.floorList.init(this.veSbzcJzwMaintainVo.jzwId);
      }, 0);
    },
    changeFloor() {
      setTimeout(() => {
        this.$refs.roomList.init(this.veSbzcJzwMaintainVo.floorId);
      }, 0);
    },
    /**
     * @msg: 重置数据
     */
    resetveSbzcJzwMaintainVo() {
      return {
        jzwId: '', // 建筑物id
        floorId: '', // 楼层id
        roomId: '', // 房间id
        startDate: '', // 修缮开始日期
        endDate: '', // 修缮结束日期
        content: '', // 修缮内容
        money: '', // 修缮经费 元
        org: '', // 修缮单位
        jfSource: '', // 经费来源码JFLY
        jbUser: '', // 经办人号
        jbUserName: '', // 经办人号
        remark: '' // 修缮说明
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veSbzcJzwMaintainVo = this.resetveSbzcJzwMaintainVo();
      this.$nextTick(() => {
        this.$refs.veSbzcJzwMaintainDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veSbzcJzwMaintainApi.get(row.id).then(res => {
        this.veSbzcJzwMaintainVo = res.result;
        if (this.veSbzcJzwMaintainVo.floorId == 0) {
          delete this.veSbzcJzwMaintainVo.floorId;
        }
        if (this.veSbzcJzwMaintainVo.roomId == 0) {
          delete this.veSbzcJzwMaintainVo.roomId;
        }
        this.changeJzw();
        if (this.veSbzcJzwMaintainVo.floorId) {
          this.changeFloor();
        }
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwMaintainDataForm.clearValidate();
        this.$refs.userSelectBox.setObj([{ id: row.jbUser, name: row.jbUserName }]);
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
      const tempData = Object.assign({}, this.veSbzcJzwMaintainVo);

      const userData = this.$refs.userSelectBox.getObj();
      tempData.jbUser = userData.id;
      tempData.jbUserName = userData.name;

      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veSbzcJzwMaintainDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veSbzcJzwMaintainApi.add(subData).then(res => {
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
      this.$refs.veSbzcJzwMaintainDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veSbzcJzwMaintainApi.update(subData).then(() => {
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
