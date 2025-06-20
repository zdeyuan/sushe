<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-28 19:29:58
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-28 20:07:13
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="打印二维码" sureText="打印" width="350px" @ok="doPrint()" @cancel="handelCancel">
      <div class="p-div" id="printDiv">
        <div class="p-list" v-for="item in backList" :key="item.id">
          <div class="wup">{{ item.wpName }}</div>
          <div :id="'qrCode' + item.id" ref="qrCodeDiv"></div>
        </div>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veHqChurukuApi from '@/views/logistics/good/api/veHqChurukuApi';
import QRCode from 'qrcodejs2';
import $ from 'jquery';
export default {
  components: { QRCode },
  data() {
    const data = {
      backList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化新增
     */
    doCode(backList) {
      this.backList = this.$utils.copyObject(backList);
      setTimeout(() => {
        this.backList.forEach((row, index) => {
          console.log(this.$refs);
          const url = `${process.env.VUE_APP_API_BASE_URL}/logistics/#/detail?id=${row.id}`;
          new QRCode(this.$refs.qrCodeDiv[index], {
            text: url,
            width: 200,
            height: 200,
            colorDark: '#333333', //二维码颜色
            colorLight: '#ffffff', //二维码背景色
            correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
          });
        });
      }, 100);
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 调用Api创建数据  printDiv
     */
    doPrint() {
      var divToPrint = document.getElementById('printDiv');

      var newWin = window.open('', 'Print-Window');

      newWin.document.open();

      newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

      newWin.document.close();

      setTimeout(function() {
        newWin.close();
      }, 10);
    }
  }
};
</script>
<style lang="less" scoped>
.p-div {
  padding-left: 50px;
}
.p-list {
  text-align: center;
  padding-bottom: 15px;

  .wup {
    padding: 5px;
    color: #000;
    font-size: 16px;
  }
}
</style>
