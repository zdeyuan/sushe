<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-07-14 18:24:00
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 12:01:17
-->
<template>
  <span v-if="hasPermission()">
    <slot>
      <!-- <a-button :type="type" :style="btnStyle" :icon="icon" :size="size" style="margin: 5px;" @click="handleClick"> -->
      <a-button :type="type" :style="btnStyle" :class="ext" @click="handleClick">
        <template v-if="iconfont">
          <i v-if="iconfont.indexOf('icon-') > -1" class="iconfont" :class="iconfont"></i>
          <i v-else-if="iconfont.indexOf('icon') > -1" class="basefont" :class="iconfont"></i>
          <a-icon v-else :type="iconfont" class="acion" />
        </template>
        {{ name }}
      </a-button>
    </slot>
  </span>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true
    },
    btnStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    type: {
      type: String,
      default: 'primary'
    },
    iconsize: {
      type: String,
      default: ''
    },
    ext: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    name: {
      type: String,
      default: '未定义name'
    },
    iconfont: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    hasPermission() {
      return true; //this.$utils.hasPermission(this.code);
    }
  }
};
</script>
<style lang="less" scoped>
.acion {
  //margin-right: 5px;
}
.iconfont {
  margin-right: 5px;
}
.basefont {
  margin-right: 5px;
  &.mini {
    font-size: 10px;
    position: relative;
    top: -1px;
  }
}
.main-btn {
  display: inline-block;
  margin: 5px;
  font-size: 14px;
  line-height: 36px;
  padding: 0 12px;

  i.iconfont {
    float: left;
    margin-right: 5px;
    font-size: 14px;
  }
}
</style>
