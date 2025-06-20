<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:59:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-10 22:08:06
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="mytable">
        <div class="detail_title">清空已离校的学生住宿信息</div>
        <div class="form-footer">
          <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
            清空学生宿舍
          </a-button>
        </div>
      </div>
      <!-- 编辑页 -->
    </div>
  </edu-layout>
</template>

<script>
import veStuIntroductionApi from '@/views/stuManage/jis/api/veStuIntroductionApi';

export default {
  components: {},
  data() {
    const data = {
      veStuIntroductionVo: {},
      showType: 'table'
    };
    data.veStuIntroductionTable = {
      api: veStuIntroductionApi
    };
    return data;
  },
  mounted() {},
  methods: {
    init() {
      const sub = {
        sorts: [{ column: 'list_sort', asc: true }]
      };
      veStuIntroductionApi.all(sub).then(res => {
        this.nowData = res.result;
      });
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.veStuIntroductionVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuIntroductionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuIntroductionApi.add(subData).then(res => {
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
      this.$notification.success({
        message: '成功',
        description: '清理了数据'
      });
      return;
      this.$refs.veStuIntroductionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuIntroductionApi.update(subData).then(() => {
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
.form-footer {
  padding: 15px;
  text-align: center;
}
.mytable {
  padding: 15px 15%;
}
</style>
