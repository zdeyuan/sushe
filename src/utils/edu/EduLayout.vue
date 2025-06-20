<template>
  <div class="eve-layout">
    <a-row v-if="type == 'l_tree2_r_form'">
      <a-col :span="sLTree2RTable[0]">
        <div class="tree_layout" :style="treeStyle">
          <slot name="tree1"></slot>
        </div>
      </a-col>
      <a-col :span="sLTree2RTable[1]">
        <div class="tree_layout" :style="treeStyle">
          <slot name="tree2"></slot>
        </div>
      </a-col>
      <a-col :span="sLTree2RTable[2]">
        <div class="common-layout" :style="commonStyle">
          <slot name="from"></slot>
        </div>
      </a-col>
      <slot name="other"></slot>
    </a-row>
    <a-row v-if="type == 'l_tree_r_table'">
      <a-col :span="sLTreeRTable[0]">
        <div class="tree_layout" :style="treeStyle">
          <slot name="tree"></slot>
        </div>
      </a-col>
      <a-col :span="sLTreeRTable[1]">
        <div class="common-layout table-layout" :class="extClass" :style="commonStyle">
          <slot name="table"></slot>
        </div>
      </a-col>
      <slot name="other"></slot>
    </a-row>
    <a-row v-if="type == 'table'">
      <a-col :span="24">
        <div class="common-layout table-layout" :class="extClass" :style="commonStyle">
         <!-- <div class="top-tltle">
            <span class="topBaseTitle">{{ topBaseTitle }} > </span>
            <span class="title">{{ topName || topTitle }}</span>
          </div> -->
          <slot name="table"></slot>
        </div>
      </a-col>
      <slot name="other"></slot>
    </a-row>
    <a-row v-if="type == 'from'">
      <div class="common-layout" :style="commonStyle">
        <slot name="from"></slot>
      </div>
    </a-row>
    <!-- 不附加样式的 -->
    <a-row v-if="type == 'base'">
      <div class="common-layout" :style="{ maxHeight: commonStyle.maxHeight }">
        <slot name="base"></slot>
      </div>
    </a-row>
    <a-row v-if="type == 'l_tree_r_form'">
      <a-col :span="sLTreeRForm[0]">
        <div class="tree_layout" :style="treeStyle">
          <slot name="tree"></slot>
        </div>
      </a-col>
      <a-col :span="sLTreeRForm[1]">
        <div class="common-layout" :style="commonStyle">
          <slot name="from"></slot>
        </div>
      </a-col>
      <slot name="other"></slot>
    </a-row>

    <a-row v-if="type == 'left_right'">
      <a-col :span="sLeftRight[0]">
        <div class="common-layout" :style="commonStyle">
          <slot name="l"></slot>
        </div>
      </a-col>
      <a-col :span="sLeftRight[1]">
        <div class="common-layout" :style="commonStyle">
          <slot name="r"></slot>
        </div>
      </a-col>
      <slot name="other"></slot>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  props: {
    type: {
      type: String,
      required: true
    },
    extHeight: {
      type: Number,
      default: 0
    },
    extClass: {
      type: String,
      default: ''
    },
    topName: {
      type: String,
      default: null
    },
    sLTreeRTable: {
      type: Array,
      default: function() {
        return [5, 19];
      }
    },
    sLTree2RTable: {
      type: Array,
      default: function() {
        return [4, 5, 15];
      }
    },
    sLTreeRForm: {
      type: Array,
      default: function() {
        return [5, 19];
      }
    },
    sLeftRight: {
      type: Array,
      default: function() {
        return [5, 19];
      }
    }
  },
  data() {
    let topHeight = 145 + this.extHeight;

    const sssHeight = window.innerHeight - topHeight + 'px';
    return {
      topHeight: topHeight,
      treeStyle: {
        maxHeight: sssHeight,
        height: sssHeight
      },
      commonStyle: {
        maxHeight: sssHeight,
        height: sssHeight
      }
    };
  },
  computed: {
    topBaseTitle() {
      return this.$store.state.user.selectMenu ? this.$store.state.user.selectMenu.pname : '';
    },
    topTitle() {
      return this.$store.state.user.selectMenu ? this.$store.state.user.selectMenu.name : this.$route.name;
    }
  },
  mounted() {
    window.addEventListener('resize', this.resetHeight, false);
    this.resetHeight();
  },
  destroyed() {
    window.removeEventListener('resize', this.resetHeight, false);
  },
  methods: {
    resetHeight() {
      const sssHeight = window.innerHeight - this.topHeight + 'px';

      this.commonStyle.maxHeight = sssHeight;
      this.commonStyle.height = sssHeight;
      this.treeStyle.maxHeight = sssHeight;
      this.treeStyle.height = sssHeight;
    }
  }
};
</script>
<style lang="less" scoped>
.top-tltle {
  border-bottom: 2px solid #3779ca;
  padding-bottom: 5px;
  margin-bottom: 5px;
  .topBaseTitle {
    font-size: 14px;
    color: #999999;
  }
  .title {
    font-size: 16px;
    color: #666;
  }
}

.eve-layout {
  padding-bottom: 0px;
  width: 100%;
  background: #eaebef;
  height: 100%;

  > .a-row {
    height: 100%;

    > .a-col {
      height: 100%;
    }
  }
  .tree_layout {
    overflow-y: auto;
    background: white;
    margin-right: 8px;
    border-radius: 6px;
  }
  .common-layout {
    height: 100%;
	padding:15px;
    &.bgno {
      background: #eaebef;
    }
    background: white;
    overflow-y: auto;
    border-radius: 6px;
  }
  .top-common-layout {
    background: white;
    overflow-y: auto;
    border-radius: 6px;
    margin-right: 8px;
  }
  .table-layout {
    position: relative;
    background: white;
    border-radius: 6px;
    &.pinherit {
      position: inherit;
    }
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

/* 架构部页面样式调整 */
.eve-layout.jgb-page {
  /deep/.a-dialog__wrapper {
    .a-form-item__content {
      .a-textarea {
        .a-textarea__inner {
          width: auto !important;
        }
      }
    }
  }
  /deep/.table-box {
    position: relative;
    .pagination-container {
      width: auto;
    }
    .table-useful {
      .a-table {
        height: 480px;
      }
    }
  }
  /deep/.a-button {
    padding-bottom: 0;
    padding-top: 0;
  }
  .a-col-5 {
    width: 16.66667% !important;
  }
  .a-col-6 {
    width: 16.66667% !important;
  }
  .a-col-15 {
    width: 66.66667% !important;
  }
  .a-col-18 {
    width: 83.33333% !important;
  }
  .a-col-19 {
    width: 83.33333% !important;
  }
  /deep/.tree_layout {
    .menu-tree {
      padding: 0 !important;

      .eve-tree {
        .tree-btns {
          margin: 10px 0 !important;
        }
      }
    }
    .data-authority__tree {
      padding: 0;
      .a-button {
        padding: 0;
      }
      .mt-10 {
        margin-bottom: 8px;
      }
    }
  }
  /deep/.common-layout {
    .right_from {
      height: 100%;
      .menu_form {
        height: 100%;
        min-height: auto;
        padding: 0.9375rem 0.9375rem 0;
        margin-bottom: 0;
      }
    }
    &.table-layout {
      > div {
        height: 100%;
        .eve-query-box.boder {
          padding-bottom: 0;
        }
        .table-box {
          position: relative;
          .table-useful {
            max-height: calc(100% - 2.75rem);
            .a-table {
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
      .data-authority__content {
        .a-button {
          padding-top: 0;
          padding-bottom: 0;
        }
        .data-authority__title {
          min-height: 500px;
        }
      }
      .url-config__right_from {
        .data-authority__form {
          .a-button {
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
