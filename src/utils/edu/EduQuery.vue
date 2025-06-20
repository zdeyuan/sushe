<template>
  <div class="eve-query-box" :class="needBoorder ? 'boder' : ''">
    <div :id="'query' + queryId" class="query_div" :class="isShow ? 'high' : ''">
      <div class="flex-box">
        <div v-if="vtype == 't_l_r'" class="" >
          <template v-if="ext.indexOf('boxZybmbj') > -1">
            <boxZybmbj
              :line="line"
              :bjStart="bjStart"
              cls2
              @changeBj="changeBj"
              :nianji="nianji"
			  :banji="banji"
			  :showZybAndnj="showZybAndnj"
              :showZybTitle="!nianji"
              ref="boxZybmbj"
              style="margin-right: 15px;display:inline-block;margin-bottom:10px;"
            ></boxZybmbj>
          </template>
          <slot name="search">
            <div class="flex-list more-option" style="display:inline-block;"></div>
          </slot>
          <slot v-if="isShow" name="hide"></slot>
          <div class="flex-btn">
            <slot name="left_btn"></slot>
            <a-button v-if="doFilter != null && isFilter" type="primary" @click="doFilter">
              <i class="basefont iconsousuo" style="margin-right: 4px;font-size: 14px;"></i>
              搜索
            </a-button>
            <a-button type="danger" v-if="isRefresh" @click="doTempRefresh" class="delete">
              <i class="basefont iconshanchu" style="margin-right: 4px;font-size: 14px;"></i>
              清空
            </a-button>
            <slot name="btn_bf_hige"></slot>
            <a-button v-if="isShowHigh" class="toggle-show" @click="toggleShow">
              {{ textShow }}<i :class="iconfont" class="a-icon--right"></i>
            </a-button>
            <slot name="otherbtn"></slot>
          </div>
        </div>
      </div>
      <div v-if="isShowBtn" class="query-btns-box">
        <div class="query-btns">
          <slot name="bef_btn"></slot>
          <slot name="btn">
            <eve-pms v-if="doAdd != null" :code="code + '-btn-add'" type="primary" name="新建" @click="doAdd"></eve-pms>
          </slot>
          <slot name="af_btn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boxZybmbj from '@/components/kqManageComponent/boxZybmbj';

export default {
  components: { boxZybmbj },
  props: {
    ext: {
      type: String,
      default: ''
    },
    bjStart: {
      type: String,
      default: ''
    },
    /* 编码 */
    vtype: {
      type: String,
      default: 't_l_r' //t_l_r 顶部 左边 右边  t_l_l  顶部 中介 中间
    },
    doFilter: {
      type: Function,
      default: null
    },
    doRefresh: {
      type: Function,
      default: null
    },
    doAdd: {
      type: Function,
      default: null
    },
    isFilter: {
      type: Boolean,
      default: true
    },
    isRefresh: {
      type: Boolean,
      default: true
    },
    line: {
      type: Boolean,
      default: false
    },
    banji: {
      type: Boolean,
      default: true
    },
    nianji: {
      type: Boolean,
      default: true
    },
	showZybAndnj:{
		type: Boolean,
		default: true
	},
    code: {
      type: String,
      default: 'view' //新建按钮编码
    },
    needBoorder: {
      type: Boolean,
      default: true
    },
	width:{
		type:String,
		default:'100%'
	},
    doFilterFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const data = {
      queryId: this.$utils.uuid(),
      //搜索栏
      textShow: '高级查询',
      iconfont: 'a-icon-caret-bottom',
      isShow: false,
      isShowHigh: false,
      isShowBtn: false
    };
    data.isJgb = this.$route.meta ? this.$route.meta.isJgb : false;
    // data.showList = [];
    return data;
  },
  beforeDestroy() {
    this.$off('pushItem');
  },
  mounted() {
    this.$on('pushItem', this.pushItem); // 在mounted生命周期注册事件

    const af_btn = this.$slots.af_btn || [];
    const bef_btn = this.$slots.bef_btn || [];
    if (af_btn.length > 0 || bef_btn.length > 0 || this.doAdd != null) {
      this.isShowBtn = true;
    }
    const nodes2 = this.$slots.hide;
    if (!nodes2 || nodes2.length == 0) {
      this.isShowHigh = false;
      const nodes = this.$slots.search;
      for (let i = 0; i < nodes && nodes.length; i++) {
        const node = nodes[i];
        if (node.componentOptions && node.componentOptions.propsData) {
          /*      this.showList.push({
            id: node.componentOptions.propsData.pname,
            text: node.componentOptions.propsData.title
          }); */
          if (node.componentOptions.propsData.hide !== undefined && node.componentOptions.propsData.hide !== false) {
            this.isShowHigh = true;
            break;
          }
        }
      }
    } else {
      this.isShowHigh = true;
    }
  },
  methods: {
    changeBj() {
      this.$emit('changeBj');
    },
    itemChange() {
      this.doFilter();
    },
    /* 查询列表显示更多 */
    toggleShow: function() {
      this.$store.dispatch('event/changeTableHeight');
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.textShow = '收起';
        this.iconfont = 'a-icon-caret-top ';
      } else {
        this.textShow = '高级查询';
        this.iconfont = 'a-icon-caret-bottom ';
      }
    },
    doTempRefresh() {
      if (this.ext.indexOf('boxZybmbj') > -1) {
        this.$refs.boxZybmbj.restValue();
      }

      if (this.doRefresh) {
        this.doRefresh();
        return;
      }

      const nodes = this.$slots.search;
      this.dealNodeRefer(nodes);

      const nodes2 = this.$slots.hide;
      this.dealNodeRefer(nodes2);

      this.$emit('refreshBack');
      if (this.doFilter && this.doFilterFlag) {
        setTimeout(() => {
          this.doFilter();
        }, 100);
      }
    },
    dealNodeRefer(nodes, isQueyItem) {
      if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.componentOptions && node.componentOptions.tag === 'edu-query-item') {
            if (node.componentOptions.children) {
              this.dealNodeRefer(node.componentOptions.children, true);
              continue;
            } else {
              node.componentInstance.restValue();
            }
            continue;
          }
          if (node.children) {
            this.dealNodeRefer(node.children, isQueyItem);
          }
          if (node.data && node.data.attrs && (node.data.attrs.pname || isQueyItem)) {
            if (node.data.model) {
              if (node.data.model.value instanceof Array) {
                node.data.model.value = [];
              } else {
                node.data.model.value = null;
              }
              node.data.model.callback();
            }
          } else if (
            node.componentInstance &&
            node.componentOptions &&
            node.componentOptions.propsData &&
            node.componentOptions.propsData.stype === 'custom'
          ) {
            // 如果有  定义 pname
            const children = node.componentInstance.$children;
          }
        }
      }
    },
    getQueryData(config) {
      if (!config) config = {};
      const params = {
        conditions: [],
        param: {}
      };
      const that = this;
      /*   $('#query'+this.queryId).find("[pname]").each(function(i,el){
          const dom = $(el);
          const pname = dom.attr("pname");
          const pop = dom.attr("pop");
          const value = null;
          if(dom.hasClass("a-input__inner")){
              value = dom.val();
          }
          if(value==null){
            return;
          }
          if(pop){
            that.$utils.addPageConditions(params,pname,pop,value);
          }else{
            params[pname] = value;
          }
      }); */
      const nodes = this.$slots.search;
      this.getNodesParam(nodes, params);

      const nodes2 = this.$slots.hide;
      this.getNodesParam(nodes2, params);

      if (this.ext.indexOf('boxZybmbj') > -1) {
        const tempData = {};
        this.$refs.boxZybmbj.getSetValue(tempData);
		if(this.showZybAndnj){
			if (tempData.njId) this.$utils.addPageConditions(params, this.bjStart + (config.base ? 'grade_id' : 'gradeId'), 'eq', tempData.njId);
			if (tempData.falId) this.$utils.addPageConditions(params, this.bjStart + (config.base ? 'fal_id' : 'falId'), 'eq', tempData.falId);
			if (tempData.specId) this.$utils.addPageConditions(params, this.bjStart + (config.base ? 'spec_id' : 'specId'), 'eq', tempData.specId);
		}
        if (tempData.bjId) this.$utils.addPageConditions(params, this.bjStart + (config.base ? 'bj_id' : 'bjId'), 'eq', tempData.bjId);
      }
      return params;
    },
    getQueryItem(node, params) {
      /* 如果是自定义的 */
      const propsData = node.componentOptions.propsData;
      if (node.componentOptions.children) {
        this.getNodesParam(node.componentOptions.children, params, propsData);
      } else {
        if (!node.componentInstance) {
          return;
        }
        const val = node.componentInstance.getValue();
        if (val != null && val !== '') {
          if (propsData.pop) {
            if (propsData.pop == 'between_date' || propsData.pop == 'between') {
              this.$utils.addPageBetweenValueConditions(params, propsData.pname, propsData.pop, val[0], val[1]);
            } else {
              this.$utils.addPageConditions(params, propsData.pname, propsData.pop, val);
            }
          } else {
            params[propsData.pname] = val;
          }
        }
      }
    },
    getNodesParam(nodes, params, propsData) {
      if (nodes) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.componentOptions && node.componentOptions.tag == 'edu-query-item' && node.componentOptions.propsData.pname) {
            //如果节点是 queryItem 就 单独处理
            this.getQueryItem(node, params);
            continue;
          }
          if (node.children) {
            this.getNodesParam(node.children, params);
          }

          if (node.data && node.data.attrs && (node.data.attrs.pname || propsData)) {
            //如果有  定义 pname
            let pname = node.data.attrs.pname;
            let pop = node.data.attrs.pop;
            if (propsData) {
              pname = propsData.pname;
              pop = propsData.pop;
            }
            let value = null;
            if (node.data.model) {
              value = node.data.model.value;
            } else {
              //如果是下拉树需要单独处理
              if (node.componentOptions && node.componentOptions.tag == 'eve-tree-select') {
                value = node.componentInstance.getValue();
                if (value.length == 0) {
                  value == null;
                }
              } else {
                //    console.error(pname + ' 对应的组件 没有绑定 v-model', node);
                continue;
              }
            }

            if (value) {
              if (node.componentOptions && node.componentOptions.tag == 'a-date-picker') {
                //如果是时间的要单独处理的
                if (value.length == 2) {
                  value = [this.$date.formatData(value[0], 'YYYY-MM-DD'), this.$date.formatData(value[1], 'YYYY-MM-DD')];
                } else {
                  //如果长度大于 1
                  if (value.length > 0) {
                    value = this.$date.formatData(value[0], 'YYYY-MM-DD HH:mm:SS');
                  } else if (value && !(value instanceof Array)) {
                    value = this.$date.formatData(value, 'YYYY-MM-DD HH:mm:SS');
                  }
                }
              }

              if (pop) {
                if (pop == 'between_date' || pop == 'between') {
                  this.$utils.addPageBetweenValueConditions(params, pname, pop, value[0], value[1]);
                } else {
                  if (pop == 'in') {
                    value = value.join(',');
                  }
                  if (value) {
                    if (value instanceof Array) {
                      if (value.length > 0) {
                        this.$utils.addPageConditions(params, pname, pop, value.join(','));
                      }
                    } else {
                      this.$utils.addPageConditions(params, pname, pop, value);
                    }
                  }
                }
              } else {
                if (value instanceof Array) {
                  if (value.length > 0) {
                    params[pname] = value;
                  }
                } else {
                  params[pname] = value;
                }
              }
            }
          } else if (
            node.componentInstance &&
            node.componentOptions &&
            node.componentOptions.propsData &&
            node.componentOptions.propsData.stype == 'custom'
          ) {
            //如果有  定义 pname
            const children = node.componentInstance.$children;
            if (children.length > 0) {
              const pname = children[0].$attrs.pname;
              const pop = children[0].$attrs.pop;
              let value = children[0].value;
              if (pname && value) {
                if (pop) {
                  if (pop == 'in') {
                    value = value.join(',');
                  }
                  if (value) {
                    if (value instanceof Array) {
                      if (value.length > 0) {
                        const ids = value.join(',');
                        if (ids) {
                          this.$utils.addPageConditions(params, pname, pop, value.join(','));
                        }
                      }
                    } else {
                      this.$utils.addPageConditions(params, pname, pop, value);
                    }
                  }
                } else {
                  if (value instanceof Array) {
                    if (value.length > 0) {
                      params[pname] = value;
                    }
                  } else {
                    params[pname] = value;
                  }
                }
              }
            }
          } else if (node.componentInstance && node.componentInstance.$children) {
            this.getNodesParam(node.componentInstance.$children, params);
          } else if (node.$attrs && node.$attrs.pname) {
            let pname = node.$attrs.pname;
            let pop = node.$attrs.pop;
            let value = null;
            if (node.value) {
              value = node.value;
            } else {
              //如果是下拉树需要单独处理
              if (node.componentOptions && node.componentOptions.tag == 'eve-tree-select') {
                value = node.componentInstance.getValue();
                if (value.length == 0) {
                  value == null;
                }
              } else {
                //       console.error(pname + ' 对应的组件 没有绑定 v-model', node);
                continue;
              }
            }

            if (value) {
              if (node.componentOptions && node.componentOptions.tag == 'a-date-picker') {
                //如果是时间的要单独处理的
                if (value.length == 2) {
                  value = [this.$date.formatData(value[0], 'YYYY-MM-DD'), this.$date.formatData(value[1], 'YYYY-MM-DD')];
                } else {
                  value = this.$date.formatData(value[0], 'YYYY-MM-DD HH:mm:SS');
                }
              }

              if (pop) {
                if (pop == 'between_date' || pop == 'between') {
                  this.$utils.addPageBetweenValueConditions(params, pname, pop, value[0], value[1]);
                } else {
                  if (pop == 'in') {
                    value = value.join(',');
                  }
                  if (value) {
                    if (value instanceof Array) {
                      if (value.length > 0) {
                        this.$utils.addPageConditions(params, pname, pop, value.join(','));
                      }
                    } else {
                      this.$utils.addPageConditions(params, pname, pop, value);
                    }
                  }
                }
              } else {
                if (value instanceof Array) {
                  if (value.length > 0) {
                    params[pname] = value;
                  }
                } else {
                  params[pname] = value;
                }
              }
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search-div {
  text-align: right;
  padding-right: 15px;
}
.search-div-left {
  margin-bottom: 8px;
}
.btns {
  padding: 15px 15px 0;
}

/deep/.a-cascader__tags {
  span {
    &:last-child {
      display: none;
    }
  }
}
.flex-btn{
	display:inline-block;
	margin-left:10px;
}
.delete{
	margin-left:10px;
}

</style>
