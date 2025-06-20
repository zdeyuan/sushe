<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:49:27
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-28 22:24:29
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="ant-table-body">
        <table class="my_table">
          <tbody>
              <tr>
                <td>
                  学生最大选课数量
                </td>
                <td>
					<a-input-number  v-model="xkData.num" :min="0"  />
                 &nbsp;<span class="red">0为不限制</span>
                </td>
              </tr>
              <tr >
                <td>
                  选课开始时间
                </td>
                <td>
					<DatePickByCN v-model="xkData.startTime"  displayFormat="YYYY-MM-DD HH:mm:ss"  placeholder="选课开始时间" />
                </td>
              </tr>
              <tr >
                <td>
                  选课结束时间
                </td>
                <td>
                  <DatePickByCN v-model="xkData.endTime"  displayFormat="YYYY-MM-DD HH:mm:ss"  placeholder="选课结束时间" />
                </td>
              </tr>
          </tbody>
        </table>
        <div class="form-footer">
          <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
            提交
          </a-button>
        </div>
      </div>
    </div>
  </edu-layout>
</template>

<script>
import veStuGraduationAuditConfigApi from '@/views/stuManage/biye/api/veStuGraduationAuditConfigApi';

export default {
  components: {},
  data() {
    const data = {
      xkData: {}
    };
    return data;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
        veStuGraduationAuditConfigApi.update(this.dataList[0]).then(() => {
          this.$notification.success({
            message: '数据修改成功',
            description: '修改了一条数据'
          });
          this.$emit('onOk');
        });
    }
   
  }
};
</script>
<style lang="less" scoped>
.ant-table-body {
  padding: 15px 10%;
}

.my_table {
  width: 100%;

  th,
  td {
    text-align: center;
    padding: 8px;
    border: 1px solid #f2f2f2;
  }
}
.form-footer {
  padding: 15px;
  text-align: center;
}
.red{
	color:red
}
</style>
