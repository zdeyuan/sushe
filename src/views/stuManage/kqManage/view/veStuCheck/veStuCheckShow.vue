<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-09 09:28:49
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-11 23:25:45
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="考勤信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCheckDataForm" labelAlign="right">
        <a-form-model-item label="学生姓名">
          {{ veStuCheckVo.xm }}
        </a-form-model-item>
        <a-form-model-item label="学生学号">
          {{ veStuCheckVo.xh }}
        </a-form-model-item>
        <a-form-model-item label="班级名称">
          {{ veStuCheckVo.bjText }}
        </a-form-model-item>
        <a-form-model-item label="考勤类型">
          {{ veStuCheckVo.typeName }}
        </a-form-model-item>
		<a-form-model-item label="第几周">
		  第{{ veStuCheckVo.week }}周
		</a-form-model-item>
        <a-form-model-item label="异常时间">
          {{ veStuCheckVo.checkTime }}
        </a-form-model-item>
		<a-form-model-item label="第几节">
			<edu-dict-text code="checkName"  :value="veStuCheckVo.section"></edu-dict-text>
		</a-form-model-item>
        <a-form-model-item label="备注">
          {{ veStuCheckVo.content }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckApi from '../../api/veStuCheckApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCheckVo = Object.assign({}, row);
      //    veStuCheckApi.get(row.id).then((res) => {
      //      this.veStuCheckVo = res.result
      // });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
