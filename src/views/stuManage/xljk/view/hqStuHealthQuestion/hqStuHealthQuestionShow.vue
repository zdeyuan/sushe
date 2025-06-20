<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 15:05:03
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-08 23:20:24
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理健康测试详情" :isShowBtnSure="false" @cancel="handelCancel">
      <div class="stitle">
        {{ hqStuHealthQuestionVo.title }}
      </div>
      <div class="timu-info">
        <div class="timu-box" v-for="(item, index) in timuList">
          <div class="title-box">
            <span class="num"> 第{{ index + 1 }}题:</span>
            <span class="title">{{ item.title }}</span>
            <span class="title-type">(<edu-dict-text code="timuType" :value="item.type"></edu-dict-text>)</span>
          </div>
        </div>
      </div>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthQuestionApi from '../../api/hqStuHealthQuestionApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthQuestionVo: {},
      timuList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuHealthQuestionVo = Object.assign({}, row);
      this.timuList = JSON.parse(row.analysis);
      //    hqStuHealthQuestionApi.get(row.id).then((res) => {
      //      this.hqStuHealthQuestionVo = res.result
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
<style lang="less" scoped>
.stitle {
  padding: 15px;
  text-align: center;
  color: #1890ff;
  font-weight: 700;
  font-size: 18px;
}
.title-box {
  padding: 15px;
}
.num {
  font-size: 16px;
}
.title {
  font-size: 16px;
}
.title-type {
  color: #ababab;
  font-size: 12px;
  display: inline-block;
  padding-left: 20px;
}
</style>
