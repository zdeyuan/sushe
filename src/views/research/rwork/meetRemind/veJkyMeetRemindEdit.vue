<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetRemindDataForm" :rules="veJkyMeetRemindRules" :model="veJkyMeetRemindVo" labelAlign="right">
        <a-form-model-item label="会议" prop="meetId">
          {{ meetPo.title }}
        </a-form-model-item>
        <a-form-model-item label="通知人员" prop="jkyUserId">
          <div>
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox :checked="checkAll" @change="onCheckAllChange">
                全选
              </a-checkbox>
            </div>
            <a-checkbox-group v-model="veJkyMeetRemindVo.userIds" @change="changeEvent">
              <a-checkbox :value="item.jkyUserId" v-for="item in userList" :key="item.id">
                {{ item.userName }}
              </a-checkbox>
            </a-checkbox-group>
          </div>
        </a-form-model-item>
        <a-form-model-item label="通知标题" prop="title" required>
          <a-input v-model="veJkyMeetRemindVo.title" :maxLength="255" placeholder="请输入主题" />
        </a-form-model-item>
        <a-form-model-item label="通知内容" prop="content" required>
          <a-textarea v-model="veJkyMeetRemindVo.content" :maxLength="500" placeholder="请输入内容" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetRemindApi from '@/api/research/rwork/veJkyMeetRemindApi';
import veJkyMeetApi from '@/api/research/rwork/veJkyMeetApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyMeetRemindVo: this.resetveJkyMeetRemindVo(),
      checkAll: false,
      textMap: {
        update: '编辑-会议提醒',
        create: '新增-会议提醒'
      },
      dialogStatus: 'create',
      veJkyMeetRemindRules: {},
      meetPo: {},
      userList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    onCheckAllChange(val) {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.veJkyMeetRemindVo.userIds.splice(0, this.veJkyMeetRemindVo.userIds.length);
        this.userList.forEach(user => {
          if (this.veJkyMeetRemindVo.userIds.indexOf(user.jkyUserId) < 0) {
            this.veJkyMeetRemindVo.userIds.push(user.jkyUserId);
          }
        });
      } else {
        this.veJkyMeetRemindVo.userIds.splice(0, this.veJkyMeetRemindVo.userIds.length);
      }
    },
    changeEvent() {
      if (this.veJkyMeetRemindVo.userIds.length == this.userList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    /**
     * @msg: 重置数据
     */
    resetveJkyMeetRemindVo() {
      return {
        userIds: [],
        meetId: '', // 会议id
        jkyUserId: '', // 纪要内容
        content: '', // 内容
        title: '', // 主题
        createTime: '' // 创建时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(meetPo) {
      this.meetPo = meetPo;
      this.viewType = 'create';
      this.veJkyMeetRemindVo = this.resetveJkyMeetRemindVo();
      veJkyMeetApi.findMeetUsers({ meetId: meetPo.id }).then(res => {
        this.userList = res.result;
      });
      this.$nextTick(() => {
        this.$refs.veJkyMeetRemindDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(meetPo, row) {
      this.meetPo = meetPo;
      veJkyMeetRemindApi.get(row.id).then(res => {
        this.veJkyMeetRemindVo = res.result;
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyMeetRemindDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyMeetRemindVo);
      tempData.meetId = this.meetPo.id;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyMeetRemindDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyMeetRemindApi.add(subData).then(res => {
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
      this.$refs.veJkyMeetRemindDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyMeetRemindApi.update(subData).then(() => {
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
