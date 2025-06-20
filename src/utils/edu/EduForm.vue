<template>
  <div class="edu-form-size" :class="size">
    <div v-if="type == 'dialog'" class="dialog">
      <div class="edu-mask"></div>
      <div class="dialog-form" :style="{ width: width, top: top }">
        <div class="form_title">
          <span class="title" v-if="title">{{ title }}</span>
          <span @click="cancel" class="close-icon">
			  <svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor"  focusable="false" class=""><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
		  </span>
        </div>
        <div class="form-content">
          <slot> </slot>
        </div>
        <div v-if="isShowBtn" class="form-footer">
          <a-button v-if="isShowBtnSure" style="padding: 0 25px;margin-right: 15px;" type="primary" class="search-button btn-style" @click="ok">
            {{ sureText }}
          </a-button>
          <a-button v-if="isShowBtnCancel" class="search-button btn-style btn-cancle" @click="cancel">
            {{ cancelText }}
          </a-button>
        </div>
      </div>
    </div>

    <div v-if="type == 'view'" class="view">
      <div class="view-form">
        <div class="form_view_title">
          <a-row>
            <a-col :span="16">
              <div class="title" v-if="title">
                {{ title }}
              </div>
            </a-col>
            <a-col :span="8">
              <div v-if="isShowBtn" class="form-footer" align="right">
                <a-button v-if="isShowBtnSure" style="padding: 0 25px;margin-right: 15px;" type="primary" @click="ok">
                  {{ sureText }}
                </a-button>
                <a-button v-if="isShowBtnCancel"  style="padding: 0 25px;" @click="cancel">
                  {{ cancelText }}
                </a-button>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="form-content">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'dialog'
    },
    size: {
      type: String,
      default: 'normal'
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '800px'
    },
    top: {
      type: String,
      default: '100px'
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    isShowBtnSure: {
      type: Boolean,
      default: true
    },
    /* 是否填满页面 */
    fillView: {
      type: Boolean,
      default: true
    },
    isShowBtnCancel: {
      type: Boolean,
      default: true
    },
    draft: {
      type: Function,
      default: null
    },
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    const data = {
      showDialog: false,
      formStatus: '',
      distData: {}
    };
    return data;
  },
  created() {
    if (this.type == '') {
      //  this.type="view";
    }
  },
  destroyed() {
    if (this.type == 'dialog') {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  mounted() {
    if (this.type == 'dialog')
      this.$nextTick(() => {
        const body = document.querySelector('body');
        if (body.append) {
          body.append(this.$el);
        } else {
          body.appendChild(this.$el);
        }
      });
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    ok() {
      this.$emit('ok');
    }
  }
};
</script>
<style lang="less">
	.form-content{
		 max-height: calc(100vh - 280px)!important; // 根据屏幕高度动态调整
		 overflow-y: auto;
	}
</style>
