<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-09-22 15:24:48
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-13 23:40:36
-->
<template>
  <span>
    <slot>
      <template v-for="(item, index) in options">
        <span v-if="item[idKey] == value" :key="index" class="eve-dict-text">{{
          item[textKey]
        }}</span>
      </template>
    </slot>
  </span>
</template>

<script>
import dist from "@/utils/kq/dist";
import constant from "@/config/constant";
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    dtype: {
      type: String,
      default: "constant",
    },
    idKey: {
      type: String,
      default: "id",
    },
    textKey: {
      type: String,
      default: "value",
    },
    reqUrl: {
      type: String,
      default: null,
    },
    reqMethod: {
      type: String,
      default: "get",
    },
  },
  data() {
    const data = {
      options: [],
    };
    return data;
  },
  mounted() {
    if (this.code == "http") {
      this.initAjax();
    } else if (this.dtype == "constant") {
      this.initConstant();
    } else {
		console.log(3)
      this.initData();
    }
  },
  methods: {
    initAjax() {
      const params = this.reqParams;
      const options = this.$db.sessionGetObj(this.reqUrl);
      if (options != null) {
        this.options = options;
        return;
      }
      if (this.reqUrl == null) {
        console.log("reqUrl  没有配置");
      }
      this.$http[this.reqMethod](this.reqUrl, params).then((res) => {
        if (res.code == 0) {
          //如果没有穿参数 给他做一个缓冲
          this.$db.sessionSetObj(this.reqUrl, res.data);
          this.options = res.data;
        }
      });
    },
    initData() {
      const that = this;
      dist.getList(this.code).then((list) => {
		  console.log("获取数据",list)
        this.options = list;
      });
    },
    initConstant() {
      const list = constant[this.code];
      if (list) {
        this.options = list;
      } else {
        console.error("constant.js 未定义 " + this.code);
      }
    },
  },
};
</script>
