<template>
  <div :id="ztreeId" class="ztree"></div>
</template>

<script>
import $ from 'jquery';
if (!window.jQuery) {
  window.jQuery = $;
}

require('@/utils/libs/ztree/jquery.ztree.min.js');
require('@/utils/libs/ztree/jquery.ztree.exhide.js');

export default {
  props: {
    setting: {
      type: Object,
      require: false,
      default: function() {
        return {};
      }
    },
    beforeAsync: {
      type: Function,
      default: null
    },
    nodes: {
      type: Array,
      require: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
    const data = {
      ztreeId: 'ztree_' + parseInt(Math.random() * 1e10),
      ztreeObj: null,
      list: [],
      ztreeSetting: {
        view: {
          showIcon: false // default to hide icon
        },
        callback: {
          onAsyncError: (...arg) => {
            this.$emit('onAsyncError', ...arg);
          },
          onAsyncSuccess: (...arg) => {
            this.$emit('onAsyncSuccess', ...arg);
          },
          onCheck: (...arg) => {
            this.$emit('onCheck', ...arg);
          },
          onClick: (...arg) => {
            this.$emit('onClick', ...arg);
          },
          onCollapse: (...arg) => {
            this.$emit('onCollapse', ...arg);
          },
          onDblClick: (...arg) => {
            this.$emit('onDblClick', ...arg);
          },
          onDrag: (...arg) => {
            this.$emit('onDrag', ...arg);
          },
          onDragMove: (...arg) => {
            this.$emit('onDragMove', ...arg);
          },
          onDrop: (...arg) => {
            this.$emit('onDrop', ...arg);
          },
          onExpand: (...arg) => {
            this.$emit('onExpand', ...arg);
          },
          onMouseDown: (...arg) => {
            this.$emit('onMouseDown', ...arg);
          },
          onMouseUp: (...arg) => {
            this.$emit('onMouseUp', ...arg);
          },
          onRemove: (...arg) => {
            this.$emit('onRemove', ...arg);
          },
          onRename: (...arg) => {
            this.$emit('onRename', ...arg);
          },
          onRightClick: (...arg) => {
            this.$emit('onRightClick', ...arg);
          }
        }
      }
    };

    if (this.beforeAsync) {
      data.ztreeSetting.callback.beforeAsync = this.beforeAsync;
    }
    return data;
  },
  watch: {
    nodes: {
      handler: function(nodes) {
        this.list = nodes;
        if (this.ztreeObj) {
          this.ztreeObj.destroy();
        }
        this.$nextTick(() => {
          /* eslint-disable */
          this.ztreeObj = $.fn.zTree.init($('#' + this.ztreeId), Object.assign({}, this.ztreeSetting, this.setting), this.list);
          this.$emit('onCreated', this.ztreeObj);
        });
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    if (this.ztreeObj) {
      $('#' + this.ztreeId).remove();
      this.ztreeObj.destroyEdu();
      this.ztreeObj = null;
    }
  }
};
</script>
