<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 10:55:02
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14 18:04:12
-->
<template>
  <userSelectFrom ref="userSelectFrom" v-if="showFrom" @select="createData" @cancel="handelCancel"></userSelectFrom>
</template>

<script>
import veJkyAdminApi from '@/api/research/rbase/veJkyAdminApi';
import userSelectFrom from '@/components/kqManageComponent/userSelectFrom';

export default {
  components: { userSelectFrom },
  data() {
    var data = {
      showFrom: true
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化新增
     */
    doCreate() {},
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData(selectUser) {
      const subData = {
        userId: '', // 用户id(公共数据表)
        name: '', // 姓名
        phone: '', // 电话
        workNum: '', // 工号
        depart: '', // 部门
        posts: '' // 职务
      };
      veJkyAdminApi.add(subData).then(res => {
        this.$notification.success({
          message: '数据新增成功',
          description: '新增了一条数据'
        });
        this.$emit('onOk');
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
