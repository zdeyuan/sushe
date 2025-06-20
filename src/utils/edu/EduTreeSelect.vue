<template>
  <div placement="bottom" style="width: 100%" trigger="click">
    <div class="ant-select ant-select-enabled">
      <div
        @mouseenter="inputHovering = true"
        @mouseleave="inputHovering = false"
        class="ant-select-selection ant-select-selection--single"
        @click="visible = !visible"
        :style="{ width: width }"
      >
        <div class="ant-select-selection__rendered">
          <div unselectable="on" class="ant-select-selection__placeholder" v-if="selectList.length == 0">请选择</div>
          <div v-else class="ant-select-selection-selected-value" style="display: block; opacity: 1;"> {{ selectText }} </div>
        </div>
        <span unselectable="on" class="ant-select-arrow" style="user-select: none;">
          <a-icon @click="doClear()" class="close-btn" v-if="showClose" type="close" />
          <a-icon v-else :type="visible ? 'up' : 'down'" />
        </span>
      </div>
    </div>
    <div ref="popper" v-show="visible" class="select-tree" :class="{ ab: ab }" :transformOrigin="false">
      <div v-if="isShowSearch" class="search-div">
        <a-input
          v-model="queryData.name"
          :placeholder="searchPlaceholder"
          class="input-with-select"
          @input="searchTree"
          @keyup.enter.native="searchTree"
        >
          <a-button slot="append" icon="a-icon-search" @click.native="searchTree"></a-button>
        </a-input>
      </div>
      <div class="tree-div">
        <base-ztree
          :style="treeStyle"
          :nodes="nodes"
          :setting="defalutSetting"
          @onCreated="onTreeCreate"
          @onAsyncSuccess="onAsyncSuccess"
          @onClick="onClick"
          @onCheck="onCheck"
        ></base-ztree>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import baseZtree from './EduTree/BaseZtree';
import {
  ACCESS_TOKEN,
  TENANT_ID
} from '@/store/mutation-types'
import { getToken } from '@/utils/auth'; // get token from cookie
import $ from 'jquery';

export default {
  componentName: 'EduTreeSelect',
  components: { baseZtree },
  props: {
    isShowSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: '请输入'
    },
    inputPlaceholder: {
      type: String,
      default: '请选择'
    },
    width: {
      type: String,
      default: '300px'
    },
    nodes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    idKey: {
      type: String,
      default: 'id'
    },
    textKey: {
      type: String,
      default: 'name'
    },
    check: {
      type: Boolean,
      default: true
    },
    ab: {
      type: Boolean,
      default: false
    },
    tagHeight: {
      type: Number,
      default: 0
    },
    radio: {
      type: Boolean,
      default: false
    },
    setting: {
      type: Object,
      require: false,
      default: function() {
        return {};
      }
    },
    treeStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    onlySelectFn: {
      type: Function,
      default: null
    },
    onlySelectParent: {
      type: Boolean,
      default: false
    },
    onlySelectParentRender: {
      type: Function,
      default: null
    },
    extArgs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dataFn: {
      type: Function,
      default: null
    },
    dataParam: {
      type: Object,
      default: function() {
        return {};
      }
    },
    /* 需要放回的扩展数据 */
    extArgFn: {
      type: Function,
      default: null
    },
    dataRender: {
      type: Function,
      default: null
    },
    /* 多远数量多的时候是否收缩起来 */
    collapseTags: {
      type: Boolean,
      default: true
    },
    /* 收缩起来是否 是 text */
    collapseText: {
      //是否自动填值
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //是否可以清空 单选的 true
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const data = {
      treeLoading: true,
      dataNodes: [],
      visible: false,
      treeObj: null,
      showCollapseText: '',
      queryData: {},
      treeData: [],
      tempDatas: [], // 这边做缓存
      selectList: [],
      isOnChange: false,
      inputHovering: false,
      time1: null,
      time2: null,
      time3: null,
      time4: null,
      defalutSetting: {
        async: {
          type: 'get',
          contentType: 'application/json',
          dataType: 'json',
          dataFilter: function(treeId, parentNode, responseData) {
            return responseData.data;
          },
          autoParam: ['id=parentId'],
          otherParam: ['access_token', Vue.ls.get(ACCESS_TOKEN)]
        },
        view: {
          fontCss: function(treeId, treeNode) {
            return treeNode.highlight
              ? {
                  color: '#1a96bf',
                  'font-weight': 'bold'
                }
              : {
                  color: '#555',
                  'font-weight': 'normal'
                };
          }
        },
        data: {
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'pid',
            rootPId: '1'
          }
        }
      }
    };
    if (this.check) {
      data.defalutSetting.check = {
        enable: true,
        autoCheckTrigger: true
      };
      if (this.onlySelectParent) {
        data.defalutSetting.check = {
          enable: true,
          autoCheckTrigger: true,
          chkboxType: { Y: 's', N: 's' }
        };
      } else if (this.onlySelectFn) {
        data.defalutSetting.check = {
          enable: true,
          autoCheckTrigger: true,
          chkboxType: { Y: 's', N: 's' }
        };
      }
    }
    if (this.radio) {
      data.defalutSetting.check = {
        enable: true,
        autoCheckTrigger: true,
        chkStyle: 'radio',
        chkboxType: { Y: '', N: '' }
      };
    }
    data.popClass = 'eduTreeSelect popClass' + this.$utils.randomNum(15);
    Object.assign(data.defalutSetting, this.setting);
    if (data.defalutSetting.async) {
      const headers = {
        Authorization: 'bearer ' + Vue.ls.get(ACCESS_TOKEN),
        expires_in:'',
        refresh_token:'',
        client_id: '20180901'
      };
      data.defalutSetting.async.headers = headers;
    }
    data.tagsStyle = {};
    if (this.tagHeight > 0) {
      data.tagsStyle = {
        maxHeight: this.tagHeight + 'px',
        overflowY: 'auto'
      };
    }
    /* 下面是缓存的IDs */
    data.tempIds = null;
    data.needChange = null;
    data.isShowBottom = false;
    data.inputHovering = false;
    return data;
  },
  computed: {
    selectText() {
      const nameList = this.selectList.map(select => {
        return select.value;
      });
      return nameList.join();
    },
    showClose() {
      let hasValue = this.check ? this.selectList.length > 0 : this.selectList.length > 0;
      let criteria = this.clearable && this.inputHovering && hasValue;
      return criteria;
    }
  },
  watch: {
    selectList() {
      const nameList = this.selectList.map(select => {
        return select.value;
      });
      this.showCollapseText = nameList.join();
      this.resetInputHeight();
    },

    nodes() {
      this.treeLoading = false;
      //如果有缓存的值了
      if (this.tempIds != null) {
        const tempIds = this.tempIds;
        this.tempIds = null;
        setTimeout(() => {
          this.setValue(tempIds, this.needChange);
        }, 0);
      }
      this.$emit('onLoaded');
    },
    dataNodes() {
      //如果有缓存的值了
      if (this.tempIds != null) {
        const tempIds = this.tempIds;
        this.tempIds = null;
        setTimeout(() => {
          this.setValue(tempIds, this.needChange);
        }, 0);
      }
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    document.addEventListener('click', this.clickDuct);

    const bottoms = this.$slots.bottom;
    if (bottoms && bottoms.length > 0) {
      this.isShowBottom = true;
    }
    this.reload();
    if (this.check == false) {
      // alert("单选 要传 radio!");
    }
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap['medium'];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }

    this.time1 = setTimeout(() => {
      this.treeLoading = false;
    }, 1500);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickDuct);
    if (this.time1 != null) {
      clearTimeout(this.time1);
    }
    if (this.time2 != null) {
      clearTimeout(this.time2);
    }
  },
  methods: {
    doClear() {
      this.setValue([]);
      this.$emit('onChange');
    },
    clickDuct(e) {
      if (!this.$el.contains(e.target)) {
        this.visible = false; //点击其他区域关闭
      } else {
        this.visible = true;
      }
    },
    handleHide() {
      this.$emit('hide');
    },
    setLoading(flag) {
      this.treeLoading = flag;
      if (flag) {
        if (this.time2 != null) {
          clearTimeout(this.time2);
        }
        this.time2 = setTimeout(() => {
          this.treeLoading = false;
        }, 10000);
      }
    },
    /**
     * 设置单选的值
     */
    setRadioValue(id, text) {
      this.selectList.splice(0, this.selectList.length);
      const node = this.treeObj.getNodeByParam('id', id, null);
      if (node) {
        const temp1 = {
          id: node[this.idKey],
          value: node.name
        };
        //如果不是要只选中父亲的 这里添加就好了
        if (!this.onlySelectParent) {
          /* 这里是补充 getValue 需要扩容的字段 */
          for (let i = 0; i < this.extArgs.length; i++) {
            const element = this.extArgs[i];
            temp1[element] = node[element];
          }
        }
        if (this.extArgFn) {
          this.extArgFn(temp1, node);
        }
        this.selectList.push(temp1);
      } else if (text) {
        const temp1 = {
          id: id,
          value: text
        };
        this.selectList.push(temp1);
      }
    },
    reload() {
      if (this.dataFn) {
        this.dataFn(this.dataParam).then(res => {
          let result = res;
          if (this.dataRender) {
            result = this.dataRender(res);
          }
          if (res.code == 0) {
            this.dataNodes = res.data;
          }
          this.$emit('onLoaded');
        });
      }
    },
    resetInputHeight() {
      //      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let input = this.$refs.reference;
        const tags = this.$refs.tags;
        const sizeInMap = 36;
        const inputHeight =
          this.selectList.length === 0 ? sizeInMap : Math.max(tags ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0) : 0, sizeInMap);
        input.style.height = inputHeight + 'px';

        //到不懂加了这个代码 干嘛 好像会导致 每次点击会变高
        // let popper = this.$refs.popper.$el;
        // const top = $('.' + this.popClass);
        //   top.css('top', inputHeight - 40 + parseInt(top.css('top')) + 'px');
      });
    },
    getValue() {
      const ids = [];
      const list = this.selectList.concat(this.tempDatas);
      for (let i = 0; i < list.length; i++) {
        const node = list[i];
        ids.push(node.id);
      }
      return ids;
    },
    //只获取叶节点
    getLeafValue() {
      let node;
      const ids = [];
      const nodes = this.treeObj.getCheckedNodes();
      for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];
        if (!node.isParent) {
          ids.push(node.id);
        }
      }
      return ids;
    },
    //只获取叶节点数据
    getLeafData(all) {
      let node;
      const list = [];
      const nodes = this.treeObj.getCheckedNodes();
      for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];
        if (!node.isParent) {
          if (all) {
            list.push(node);
          } else {
            const dd = { id: node.id, value: node.name };
            list.push(dd);
          }
        }
      }
      return list;
    },
    /**
     * @msg: 获取选中节点
     * @name: Erik zhang
     */
    getChecked() {
      return this.treeObj.getCheckedNodes();
    },
    getValueData() {
      return this.selectList.concat(this.tempDatas);
    },
    setValue(idArray, needChange, noNeedTemp) {
      this.selectList.splice(0, this.selectList.length);
      this.tempDatas.splice(0, this.tempDatas.length);
      this.treeObj.checkAllNodes(false, false);
      this.treeObj.cancelSelectedNode();
      for (let i = 0; i < idArray.length; i++) {
        const id = idArray[i];
        let needRetrun = false;
        let node = null;
        if (this.treeObj) {
          //如果没有数据
          node = this.treeObj.getNodeByParam('id', id, null);
          if (node == null) {
            needRetrun = true;
          }
        } else {
          needRetrun = true;
        }
        if (needRetrun) {
          //如果没有数据
          if (this.tempIds == null && noNeedTemp != true) {
            this.tempIds = idArray;
            this.needChange = needChange;
          }
          return;
        }
        node.checked = true;
        this.treeObj.updateNode(node);
        const temp1 = {
          id: node[this.idKey],
          value: node.name
        };
        //如果不是要只选中父亲的 这里添加就好了
        if (!this.onlySelectParent) {
          /* 这里是补充 getValue 需要扩容的字段 */
          for (let i = 0; i < this.extArgs.length; i++) {
            const element = this.extArgs[i];
            temp1[element] = node[element];
          }
        }
        if (this.extArgFn) {
          this.extArgFn(temp1, node);
        }
        this.selectList.push(temp1);

        if (this.onlySelectFn || this.onlySelectParent) {
          //如果选中了全部  处理一下 同层的原始
          const pNode = node.getParentNode();
          this.dealCliendList(pNode);
        }
        if (this.onlySelectParent) {
          this.checkAllClient(node);
          $('#' + node.tId + '_check')
            .removeClass('checkbox_true_part')
            .addClass('checkbox_true_full');
        }
        //获取 当前在缓存数组里面的id
        const inde = this.$utils.inArrIndex(this.tempDatas, 'id', id);
        if (inde > -1) {
          this.tempDatas.splice(inde, 1);
        }
      }
      //如果只显示最后的节点  最后处理
      if (this.onlySelectParent) {
        this.dealSelectList(needChange);
      } else if (needChange) {
        this.subOnChange();
      }
    },
    //选择所有的子节点
    checkAllClient(node) {
      //获取所有子节点
      const nodes = this.treeObj.getNodesByParam('pid', node.id, node);
      if (nodes && nodes.length > 0) {
        //如果有值得话
      } else {
        return;
      }
      for (let i = 0; i < nodes.length; i++) {
        const node222 = nodes[i];
        node222.checked = true;
        this.treeObj.updateNode(node222);
        this.checkAllClient(node222);
      }
    },
    dealSelectList(needOnChange) {
      const slist = [];
      this.dealSelectNode(slist, null);

      this.selectList.splice(0, this.selectList.length);
      for (let i = 0; i < slist.length; i++) {
        const element = slist[i];
        this.selectList.push(element);
      }
      if (needOnChange) {
        this.subOnChange();
      }
    },
    //解决 oncheck里面重复change的问题
    subOnChange() {
      //如果当前不是在 onchange里面 执行以下
      if (this.isOnChange) {
        return;
      } else {
        this.isOnChange = true;
        this.$emit('onChange');
        /* 300毫秒以后 打开限制 */
        setTimeout(() => {
          this.isOnChange = false;
        }, 300);
      }
    },
    dealSelectNode(slist, pNode) {
      let nodes = null;
      if (pNode == null) {
        nodes = this.treeObj.getNodes();
      } else {
        nodes = this.treeObj.getNodesByParam('pid', pNode.id, pNode);
      }
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        //如果选择了
        if (node.checked) {
          this.dealTemp(node);
          /* 这里是补充 getValue 需要扩容的字段 */
          const temp1 = {
            id: node[this.idKey],
            value: node.name
          };
          for (let i = 0; i < this.extArgs.length; i++) {
            const element = this.extArgs[i];
            temp1[element] = node[element];
          }
          if (this.extArgFn) {
            this.extArgFn(temp1, node);
          }
          if (this.onlySelectParentRender) {
            const temp2 = this.onlySelectParentRender(temp1);
            if (temp2 != null) {
              slist.push(temp1);
            }
          } else {
            slist.push(temp1);
          }
        } else {
          this.dealSelectNode(slist, node);
        }
      }
    },
    setValueObject(dataArray, idKey, needTemp, needChange) {
      if (!idKey) {
        idKey = 'id';
      }
      if (needTemp && this.check) {
        //先给他做一个缓存
        this.tempDatas = dataArray;
      }

      const ids = [];
      for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        ids.push(element[idKey]);
      }
      this.setValue(ids, needChange);
      /* 单选的缓处理 */
      if (needTemp && !this.check && dataArray.length == 1) {
        this.selectList.splice(0, this.selectList.length);
        const node = this.treeObj.getNodeByParam('id', dataArray[0][idKey], null);
        if (node) {
          const temp1 = {
            id: node[this.idKey],
            value: node.name
          };
          //如果不是要只选中父亲的 这里添加就好了
          if (!this.onlySelectParent) {
            /* 这里是补充 getValue 需要扩容的字段 */
            for (let i = 0; i < this.extArgs.length; i++) {
              const element = this.extArgs[i];
              temp1[element] = node[element];
            }
          }
          if (this.extArgFn) {
            this.extArgFn(temp1, node);
          }
          this.selectList.push(temp1);
        } else {
          const temp1 = {
            id: dataArray[0][idKey],
            value: dataArray[0].value
          };
          this.selectList.push(temp1);
        }
      }
    },
    onAsyncSuccess(event, treeId, treeNode, msg) {
      //如果有缓存 去加载 缓存里面的数据
      if (this.tempDatas.length > 0) {
        const that = this;
        setTimeout(() => {
          const nodes = that.treeObj.getNodesByParam('pid', treeNode.id, treeNode);
          that.dealNodes(nodes);
        }, 0);
      }
      this.$emit('onAsyncSuccess', event, treeId, treeNode, msg);
    },
    dealNodes(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        const inde = this.$utils.inArrIndex(this.tempDatas, 'id', element.id);
        if (inde > -1) {
          //如果有 把他给 显示一些
          element.checked = true;
          this.treeObj.updateNode(element);

          const temp1 = {
            id: element[this.idKey],
            value: element.name
          };
          /* 这里是补充 getValue 需要扩容的字段 */
          for (let i = 0; i < this.extArgs.length; i++) {
            const element = this.extArgs[i];
            temp1[element] = element[element];
          }
          if (this.extArgFn) {
            this.extArgFn(temp1, element);
          }
          this.selectList.push(temp1);
          this.subOnChange();

          this.tempDatas.splice(inde, 1);
        }
      }
    },
    doRemove(index) {
      const id = this.selectList[index].id;
      const node = this.treeObj.getNodeByParam('id', id, null);
      if (node) {
        this.treeObj.checkNode(node, false, true, true);
      }
    },
    doRemoveTemp(index) {
      this.tempDatas.splice(index, 1);
      this.subOnChange();
    },
    onTreeCreate(treeObj) {
      this.treeObj = treeObj;
      this.$emit('onCreated', treeObj);
    },
    getTreeObj() {
      return this.treeObj;
    },
    onCheck(event, treeId, treeNode) {
      event.stopPropagation();
      event.stopPropagation();
      event.preventDefault();
      event.preventDefault();
      //如果是默认0的
      if (this.onlySelectParent) {
        if (treeNode.checked) {
          //如果选中了全部 要把 子节点的所有处理到
          const pNode = treeNode.getParentNode();
          this.dealCliendList(pNode);
          this.dealSelectList(true);
        } else {
          //如果是取消选择  取消掉父亲节点的 选中转态
          let pNode = treeNode.getParentNode();
          while (pNode != null) {
            //pNode 也取消选择
            pNode.checked = false;
            this.treeObj.updateNode(pNode);
            pNode = pNode.getParentNode();
            //可能有bug 异步情况下
            this.dealTemp(treeNode);
          }
          //取消  就把数据里面的删了
          this.dealSelectList(true);
        }
      } else if (this.onlySelectFn == null) {
        if (treeNode.checked) {
          if (!this.$utils.isInArr(this.selectList, this.idKey, treeNode[this.idKey])) {
            if (this.radio) {
              this.selectList.splice(0, this.selectList.length);
            }
            const data = {
              id: treeNode[this.idKey],
              value: treeNode.name
            };
            /* 这里是补充 getValue 需要扩容的字段 */
            for (let i = 0; i < this.extArgs.length; i++) {
              const element = this.extArgs[i];
              data[element] = treeNode[element];
            }
            this.selectList.push(data);
            this.subOnChange();
          }
        } else {
          const index = this.$utils.inArrIndex(this.selectList, 'id', treeNode.id);
          if (index > -1) {
            this.selectList.splice(index, 1);
            this.subOnChange();
          }
        }
      } else {
        if (treeNode.checked) {
          //如果选中了全部  处理一下 同层的原始
          const pNode = treeNode.getParentNode();
          this.dealCliendList(pNode);

          //同时 处理一下
          if (!this.$utils.isInArr(this.selectList, this.idKey, treeNode[this.idKey])) {
            if (this.radio) {
              this.selectList.splice(0, this.selectList.length);
            }
            //如果基本是 onlySelectLevel 里面的 就选中它
            if (this.onlySelectFn(treeNode)) {
              const data = {
                id: treeNode[this.idKey],
                value: treeNode.name
              };
              /* 这里是补充 getValue 需要扩容的字段 */
              for (let i = 0; i < this.extArgs.length; i++) {
                const element = this.extArgs[i];
                data[element] = treeNode[element];
              }
              if (this.extArgFn) {
                this.extArgFn(data, treeNode);
              }
              this.selectList.push(data);
              this.subOnChange();
            }
          }
        } else {
          //如果是取消选择  取消掉父亲节点的 选中转态
          let pNode = treeNode.getParentNode();
          while (pNode != null) {
            //pNode 也取消选择
            pNode.checked = false;
            this.treeObj.updateNode(pNode);
            pNode = pNode.getParentNode();
            //可能有bug 异步情况下
            this.dealTemp(treeNode);
          }
          //取消  就把数据里面的删了
          const index = this.$utils.inArrIndex(this.selectList, 'id', treeNode.id);
          if (index > -1) {
            this.selectList.splice(index, 1);
            this.subOnChange();
          }
        }
      }

      this.$emit('onCheck', event, treeId, treeNode);
    },
    dealTemp() {},
    collapseTitleName() {
      const names = [];
      for (let i = 1; i < this.selectList.length; i++) {
        names.push(this.selectList[i].value);
      }
      let index = 0;
      if (this.selectList.length == 0) {
        index = 1;
      }
      for (let i = index; i < this.tempDatas.length; i++) {
        names.push(this.tempDatas[i].value);
      }
      return names.join();
    },
    dealCliendList(pNode) {
      if (!pNode) {
        return;
      }
      //处理子节点的列表  如果全部选中才把他添加到选中
      const nodes = this.treeObj.getNodesByParam('pid', pNode.id, pNode);
      if (nodes && nodes.length > 0) {
        //如果有值得haul
      } else {
        return;
      }
      let isAllSelect = true;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.checked != true) {
          isAllSelect = false;
        }
      }
      if (isAllSelect) {
        //如果全部选择了 吧父亲的也选择
        pNode.checked = true;
        this.treeObj.updateNode(pNode);
        //同时要判断一下 父亲的父亲
        this.dealCliendList(pNode.getParentNode());
      }
    },
    onClick(event, treeId, treeNode) {
      event.stopPropagation();
      event.stopPropagation();
      event.preventDefault();
      event.preventDefault();
      if (this.check) {
        this.treeObj.checkNode(treeNode, !treeNode.checked, true, true);
      } else {
        if (this.onlySelectFn == null || this.onlySelectFn(treeNode)) {
          const data = {
            id: treeNode[this.idKey],
            value: treeNode.name
          };
          for (let i = 0; i < this.extArgs.length; i++) {
            const element = this.extArgs[i];
            data[element] = treeNode[element];
          }
          this.selectList.splice(0, this.selectList.length, data);
          this.subOnChange();
          this.visible = false;
        }
      }
      this.$emit('onClick', event, treeId, treeNode);
    },
    searchTree() {
      const text = this.queryData.name;
      const value = text;
      let treeNode, parentNode;
      //处理历史高亮
      const highlightNodes = this.treeObj.getNodesByParam('highlight', true);
      let i = 0;
      for (i = 0; i < highlightNodes.length; i++) {
        treeNode = highlightNodes[i];
        treeNode.highlight = false;
        for (parentNode = treeNode.getParentNode(); parentNode !== null; parentNode = parentNode.getParentNode()) {
          if (!parentNode.open) {
            this.treeObj.expandNode(parentNode, false);
          }
        }
        this.treeObj.updateNode(treeNode);
      }
      if (!value) {
        return;
      }

      //添加高亮
      const nodes = this.treeObj.getNodesByParamFuzzy('name', value);
      const needOpenNodes = [];
      if (nodes.length > 0) {
        for (i = 0; i < nodes.length; i++) {
          treeNode = nodes[i];
          treeNode.highlight = true;
          for (parentNode = treeNode.getParentNode(); parentNode !== null; parentNode = parentNode.getParentNode()) {
            if (needOpenNodes.indexOf(parentNode) === -1) {
              needOpenNodes.push(parentNode);
              if (!parentNode.open) {
                this.treeObj.expandNode(parentNode, true);
              }
            }
          }
          this.treeObj.updateNode(treeNode);
        }
      }

      //关闭没有高亮父节点
      const openNodes = this.treeObj.getNodesByParam('open', true);
      for (i = 0; i < openNodes.length; i++) {
        treeNode = openNodes[i];
        if (needOpenNodes.indexOf(treeNode) === -1) {
          this.treeObj.expandNode(treeNode, false);
        }
      }
    },

    /**
     * 清空
     */
    refreshSelectList() {
      this.selectList = [];
      this.treeObj.cancelSelectedNode();
      this.$emit('onChange');
    },
    initSearch() {
      this.queryData.name = '';
      this.searchTree();
    }
  }
};
</script>
<style lang="less" scoped>
.search-div {
  padding: 8px 15px;
  margin-bottom: 8px;
  margin-right: 8px;
}
.tree-div {
  padding: 0 15px;
  padding-bottom: 15px;
}
.select-tree {
  min-height: 300px;
  max-height: 300px;
  overflow-y: auto;
  min-width: 300px;

  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 2px 8px #a7a4a4;
  position: absolute;
  z-index: 9999;
  padding: 0;
}
.close-btn {
  background: #ebebbe;
  color: #777;
  border-radius: 50%;
}
.select-tree.ab {
  position: absolute !important;
}
.ext_div {
  text-align: right;
  padding-top: 8px;
}
</style>
