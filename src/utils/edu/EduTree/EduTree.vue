<template>
  <div class="eve-tree">
    <div v-if="isShowSearch" ref="cursor" class="search-box">
      <div class="search-div">
        <a-input
          id="fuzzyInput"
          v-model="queryData.name"
          :placeholder="searchPlaceholder"
          class="input-with-select"
          @keyup.enter.native="searchTree"
          clearable
          @clear="searchTree"
        >
          <a-button slot="append" icon="a-icon-search" @click.native="searchTree"></a-button>
        </a-input>
        <span class="add-new">
          <slot name="addNew"></slot>
        </span>
      </div>
    </div>
    <slot name="btns"></slot>

    <div v-if="needLoading && loading" style="text-align: center; font-size: 14px">
      正在加载中...
    </div>
    <base-ztree
      :style="treeStyle"
      :nodes="nodes"
      :setting="defalutSetting"
      :before-async="beforeAsync"
      @onCreated="onTreeCreate"
      @onClick="onClick"
      @onAsyncError="onAsyncError"
      @onAsyncSuccess="onAsyncSuccess"
      @onCheck="onCheck"
      @onCollapse="onCollapse"
      @onDblClick="onDblClick"
      @onDrag="onDrag"
      @onDragMove="onDragMove"
      @onDrop="onDrop"
      @onExpand="onExpand"
      @onMouseDown="onMouseDown"
      @onMouseUp="onMouseUp"
      @onRemove="onRemove"
      @onRename="onRename"
      @onRightClick="onRightClick"
    ></base-ztree>
  </div>
</template>
<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"
import baseZtree from './BaseZtree';
import { getToken } from '@/utils/auth'; // get token from cookie
import $ from 'jquery';

export default {
  components: { baseZtree },
  props: {
    /* ztree的方法 判断是否执行异步请求 */
    beforeAsync: {
      type: Function,
      default: null
    },
    pmsCode: {
      type: String,
      default: ''
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    addFn: {
      type: Function,
      default: null
    },
    editFn: {
      type: Function,
      default: null
    },
    deleteFn: {
      type: Function,
      default: null
    },
    upFn: {
      type: Function,
      default: null
    },
    downFn: {
      type: Function,
      default: null
    },
    extBtns: {
      // code: icon name
      type: Array,
      default: null
    },
    showFn: {
      type: Function,
      default: null
    },
    searchPlaceholder: {
      type: String,
      default: '请输入'
    },
    height: {
      type: Number,
      default: 0
    },
    nodes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    check: {
      type: Boolean,
      require: false
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
    addHoverDomFn: {
      type: Function,
      default: null
    },
    removeHoverDomFn: {
      type: Function,
      default: null
    },
    dataParam: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dataRender: {
      type: Function,
      default: null
    },
    needLoading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      // fuzzyShow:false,
      fuzzyChecked: false,
      treeObj: null,
      tempIds: [],
      queryData: {},
      defalutSetting: {
        async: {
          type: 'get',
          contentType: 'application/json',
          dataType: 'json',
          dataFilter: function(treeId, parentNode, responseData) {
            return responseData.data;
          },
          autoParam: ['id=parentId']
        },
        view: {
          fontCss: function(treeId, treeNode) {
            return treeNode.highlight
              ? {
                  color: '#166fdc',
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
        enable: true
      };
    }

    Object.assign(data.defalutSetting, this.setting);

    if (data.defalutSetting.async) {
      const token =Vue.ls.get(ACCESS_TOKEN);
      const headers = {
        Authorization: 'bearer ' + token.access_token,
        expires_in: '',
        refresh_token: '',
        client_id: '20180901 '
      };
      data.defalutSetting.async.headers = headers;
    }
    const that = this;
    if (this.addFn || this.editFn || this.deleteFn || this.upFn || this.downFn || this.extBtns) {
      if (!this.pmsCode) {
        console.error('如果用了 cwTree的 新增 修改 删除 按钮 需要添加 权限编码');
      }
      data.defalutSetting.view.addHoverDom = function(treeId, treeNode) {
        that.addHoverDom(treeId, treeNode);
      };
      data.defalutSetting.view.removeHoverDom = function(treeId, treeNode) {
        that.removeHoverDom(treeId, treeNode);
      };
    }
    if (this.addHoverDomFn) {
      data.defalutSetting.view.addHoverDom = function(treeId, treeNode) {
        that.addHoverDomFn(treeId, treeNode);
      };
    }
    if (this.removeHoverDomFn) {
      data.defalutSetting.view.removeHoverDom = function(treeId, treeNode) {
        that.removeHoverDomFn(treeId, treeNode);
      };
    }
    return data;
  },
  created() {},
  mounted() {
    // this.reload();
    // document.addEventListener('click',this.handleOtherClick)
  },
  destroyed() {
    // document.addEventListener('click',this.handleOtherClick)
  },
  methods: {
    setLoading(flag) {},
    clickFrist() {
      setTimeout(() => {
        const node = this.treeObj.getNodes();
        if (node && node.length > 0) {
          this.treeObj.selectNode(node[0]);
          this.$emit('onClick', null, null, node[0]);
        }
      }, 0);
    },
    addHoverDom(treeId, treeNode) {
      const that = this;
      const treeDom = $('#' + treeNode.tId + '_span');
      let showArr = null;
      if (this.showFn) {
        showArr = this.showFn(treeNode);
      }

      if (this.downFn && this.$utils.hasPermission(this.pmsCode + '-down-tree') && (showArr == null || showArr.indexOf('down') > -1)) {
        this.doConsole('-down-tree', '树下移');
        const dStr =
          "<span class='tree_ext_span tree" +
          treeNode.tId +
          "' id='downBtn_" +
          treeNode.tId +
          "' title='下移' onfocus='this.blur();'><i class='a-icon-bottom'></i></span>"; //定义添加按钮
        if (!$('#downBtn_' + treeNode.tId)[0]) {
          treeDom.after(dStr);
          $('#downBtn_' + treeNode.tId)
            .unbind()
            .click(function() {
              event.stopPropagation();
              event.preventDefault();
              that.doDown(treeId, treeNode);
            });
        }
      }

      if (this.upFn && this.$utils.hasPermission(this.pmsCode + '-up-tree') && (showArr == null || showArr.indexOf('up') > -1)) {
        this.doConsole('-up-tree', '树上移');
        const dStr =
          "<span class='tree_ext_span tree" +
          treeNode.tId +
          "' id='upBtn_" +
          treeNode.tId +
          "' title='上移' onfocus='this.blur();'><i class='a-icon-top'></i></span>"; //定义添加按钮
        if (!$('#upBtn_' + treeNode.tId)[0]) {
          treeDom.after(dStr);
          $('#upBtn_' + treeNode.tId)
            .unbind()
            .click(function() {
              event.stopPropagation();
              event.preventDefault();
              that.doUp(treeId, treeNode);
            });
        }
      }

      if (this.extBtns) {
        this.extBtns.forEach(ext => {
          if (this.$utils.hasPermission(this.pmsCode + '-' + ext.code + '-tree') && (showArr == null || showArr.indexOf(ext.code) > -1)) {
            this.doConsole('-' + ext.code + '-tree', '树' + ext.name);
            const dStr =
              "<span class='tree_ext_span tree" +
              treeNode.tId +
              "' id='" +
              ext.code +
              'Btn_' +
              treeNode.tId +
              "' title='" +
              ext.name +
              "' onfocus='this.blur();'><i class='" +
              ext.icon +
              "'></i></span>"; //定义添加按钮
            if (!$('#' + ext.code + 'Btn_' + treeNode.tId)[0]) {
              treeDom.after(dStr);
              $('#' + ext.code + 'Btn_' + treeNode.tId)
                .unbind()
                .click(function() {
                  event.stopPropagation();
                  event.preventDefault();
                  that.$emit('extBtnCall', ext.code, treeId, treeNode);
                });
            }
          }
        });
      }

      if (this.deleteFn && this.$utils.hasPermission(this.pmsCode + '-delete-tree') && (showArr == null || showArr.indexOf('delete') > -1)) {
        this.doConsole('-delete-tree', '树删除');
        const deleteStr =
          "<span class='button remove tree" + treeNode.tId + "' id='deleteBtn_" + treeNode.tId + "' title='删除' onfocus='this.blur();'></span>"; //定义添加按钮
        if (!$('#deleteBtn_' + treeNode.tId)[0]) {
          treeDom.after(deleteStr);
          $('#deleteBtn_' + treeNode.tId)
            .unbind()
            .click(function() {
              event.stopPropagation();
              event.preventDefault();
              that.doDelete(treeId, treeNode);
            });
        }
      }

      if (this.editFn && this.$utils.hasPermission(this.pmsCode + '-edit-tree') && (showArr == null || showArr.indexOf('edit') > -1)) {
        this.doConsole('-edit-tree', '树编辑');
        const editStr =
          "<span class='button edit tree" + treeNode.tId + "' id='editBtn_" + treeNode.tId + "' title='编辑' onfocus='this.blur();'></span>"; //定义添加按钮
        if (!$('#editBtn_' + treeNode.tId)[0]) {
          treeDom.after(editStr);
          $('#editBtn_' + treeNode.tId)
            .unbind()
            .click(function() {
              event.stopPropagation();
              event.preventDefault();
              that.doEdit(treeId, treeNode);
            });
        }
      }

      if (this.addFn && this.$utils.hasPermission(this.pmsCode + '-add-tree') && (showArr == null || showArr.indexOf('add') > -1)) {
        this.doConsole('-add-tree', '树新增');
        const addStr =
          "<span class='button add tree" + treeNode.tId + "' id='addBtn_" + treeNode.tId + "' title='新增' onfocus='this.blur();'></span>"; //定义添加按钮
        if (!$('#addBtn_' + treeNode.tId)[0]) {
          treeDom.after(addStr);
          $('#addBtn_' + treeNode.tId)
            .unbind()
            .click(function() {
              event.stopPropagation();
              event.preventDefault();
              that.doAdd(treeId, treeNode);
            });
        }
      }
    },
    doConsole(type, name) {
      if (process.env.NODE_ENV === 'development') {
        if (this.pmsCode) {
          //  this.doConsoleOut(this.pmsCode + type, name);
        }
      }
    },
    doConsoleOut(code, name) {
      const sspath = this.$route.path.substring(1);
      const distCode = 'eve-pms' + sspath + '_' + code;
      sessionStorage.setItem(distCode, 1);

      setTimeout(() => {
        if (sessionStorage.getItem(distCode)) {
          sessionStorage.removeItem(distCode);
          const ssuuid = this.$utils.uuid().substring(4);
          const outSql = `INSERT INTO "UPMS_CENTER"."PRIVILEGE" ("ID", "GMT_TENANT", "GMT_CREATE", "GMT_MODIFIED", "GMT_MFYNAME", "CODE", "NAME", "URL", "METHOD", "CLASSIFY", "TYPE", "BONAME", "SERVICE_COMP", "APP_ID", "GMT_CREATOR", "GMT_CRTNAME", "GMT_MODIFIEDBY", "GMT_STATUS", "URL_RESOURCE_OBJ_ID", "ACTION", "REMARK") select '${ssuuid}', 'master', TO_DATE('2020-08-10 10:56:45', 'SYYYY-MM-DD HH24:MI:SS'), TO_DATE('2020-08-10 10:56:45', 'SYYYY-MM-DD HH24:MI:SS'), 'fjs_yjxxfbzx', '${code}', '${name}', NULL, NULL, '0', '1', '00', '14', '5f10c1d27ea048f2a0a38edb37933ff3', 'A970614C03A44C4ABE3CD0912E3EAF9C', 'fjs_yjxxfbzx', 'A970614C03A44C4ABE3CD0912E3EAF9C', '0', aaa.id, '1', NULL  from URL_RESOURCE_OBJ  aaa where path = '${sspath}';`;
          console.error('按钮权限输出>>>>     页面: ', this.$route.name, '    编码: ' + code + '   名称: ' + name, '   >>>>>>>>> 插入sql:');
          console.log(outSql);
        }
      }, 1500);
    },
    removeHoverDom(treeId, treeNode) {
      $('.tree' + treeNode.tId)
        .unbind()
        .remove();
    },
    doAdd(treeId, treeNode) {
      if (this.addFn) {
        this.addFn(treeNode, treeId);
      }
    },
    getValue() {
      const nodes = this.treeObj.getNodesByParam('checked', true, null);
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];
        ids.push(element.id);
      }
      for (let i = 0; i < this.tempIds.length; i++) {
        const element = this.tempIds[i];
        ids.push(element);
      }
      return ids;
    },
    //获取所选中的值，包括name，pid等等
    getAllValue() {
      const nodes = this.treeObj.getNodesByParam('checked', true, null);
      return nodes;
    },
    //取消所有选中
    cancelSelectedNode() {
      const nodes = this.treeObj.checkAllNodes(false);
    },
    /**
     * @name: Erik zhang
     * @msg:
     * @param {ids}
     * @return {isCheck} 是否需要 级联选中
     */
    setValue(ids, isCheck) {
      //吧ids 放到缓存里面
      this.tempIds = ids;

      const nodes = this.treeObj.getNodesByParamFuzzy('tId', 'ztree', null);
      if (isCheck) {
        for (let i = 0; i < nodes.length; i++) {
          const element = nodes[i];
          const index = this.tempIds.indexOf(element.id);
          if (index > -1) {
            this.treeObj.checkNode(element, true, true);
            this.tempIds.splice(index, 1);
          }
        }
      } else {
        this.dealNodes(nodes);
      }
    },

    dealNodes(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const element = nodes[i];

        const index = this.tempIds.indexOf(element.id);
        if (index > -1) {
          //如果有 把他给 显示一些
          element.checked = true;
          this.treeObj.updateNode(element);
          this.tempIds.splice(index, 1);
        }
      }
    },
    doEdit(treeId, treeNode) {
      if (this.editFn) {
        this.editFn(treeNode, treeId);
      }
    },
    doDelete(treeId, treeNode) {
      if (this.deleteFn) {
        this.msgUtil.confirm('确定删除【' + treeNode.name + '】?', '删除提示', isOk => {
          if (isOk) {
            this.deleteFn(treeNode, treeId);
          }
        });
      }
    },
    doDown(treeId, treeNode) {
      if (this.downFn) {
        this.downFn(treeNode, treeId);
      }
    },
    doUp(treeId, treeNode) {
      if (this.upFn) {
        this.upFn(treeNode, treeId);
      }
    },
    onTreeCreate(treeObj) {
      this.treeObj = treeObj;
      this.$emit('onCreated', treeObj);
    },
    getTreeObj() {
      return this.treeObj;
    },
    onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
      this.$emit('onAsyncError', event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown);
    },
    onAsyncSuccess(event, treeId, treeNode, msg) {
      if (this.check && this.tempIds.length > 0) {
        //
        const that = this;
        setTimeout(() => {
          const nodes = that.treeObj.getNodesByParam('pid', treeNode.id, treeNode);
          that.dealNodes(nodes);
        }, 0);
      }
      this.$emit('onAsyncSuccess', event, treeId, treeNode, msg);
    },
    onCheck(event, treeId, treeNode) {
      this.$emit('onCheck', event, treeId, treeNode);
    },
    onClick(event, treeId, treeNode) {
      event.preventDefault();
      this.$emit('onClick', event, treeId, treeNode);
    },
    onCollapse(event, treeId, treeNode) {
      this.$emit('onCollapse', event, treeId, treeNode);
    },
    onDblClick(event, treeId, treeNode) {
      this.$emit('onDblClick', event, treeId, treeNode);
    },
    onDrag(event, treeId, treeNode) {
      this.$emit('onDrag', event, treeId, treeNode);
    },
    onDragMove(event, treeId, treeNode) {
      this.$emit('onDragMove', event, treeId, treeNode);
    },
    onDrop(event, treeId, treeNode) {
      this.$emit('onDrop', event, treeId, treeNode);
    },
    onExpand(event, treeId, treeNode) {
      this.$emit('onExpand', event, treeId, treeNode);
    },
    onMouseDown(event, treeId, treeNode) {
      this.$emit('onMouseDown', event, treeId, treeNode);
    },
    onMouseUp(event, treeId, treeNode) {
      this.$emit('onMouseUp', event, treeId, treeNode);
    },
    onRemove(event, treeId, treeNode) {
      this.$emit('onRemove', event, treeId, treeNode);
    },
    onRename(event, treeId, treeNode, isCancel) {
      this.$emit('onRename', event, treeId, treeNode, isCancel);
    },
    onRightClick(event, treeId, treeNode) {
      this.$emit('onRightClick', event, treeId, treeNode);
    },
    searchTree(searchVal, fuzzyChecked) {
      const text = this.queryData.name;
      let value = text;
      if (searchVal && typeof searchVal == 'string') {
        value = searchVal;
      }
      let treeNode, parentNode;
      const hiddenNodes = [];

      if (this.fuzzyChecked === true || fuzzyChecked === true) {
        searchZtree(this.treeObj, value);
      } else {
        const allNode = this.treeObj.transformToArray(this.treeObj.getNodes());
        this.treeObj.showNodes(allNode);
      }
      // searchZtree(this.treeObj,value)

      function searchZtree(ztreeObj, value) {
        // 查找节点
        function filterFunc(node) {
          if (node.name.indexOf(value) != -1) {
            return true;
          } else {
            return false;
          }
        }

        let nodeList;
        // 查找父级
        function findParent(ztreeObj, node) {
          ztreeObj.expandNode(node, true, false, false);
          const pNode = node.getParentNode();
          if (pNode != null) {
            nodeList.push(pNode);
            findParent(ztreeObj, pNode);
          }
        }

        const allNode = ztreeObj.transformToArray(ztreeObj.getNodes());
        // 隐藏所有节点
        ztreeObj.hideNodes(allNode);

        // 根据关键词搜索
        if (value) {
          nodeList = ztreeObj.getNodesByFilter(filterFunc);
          nodeList = ztreeObj.transformToArray(nodeList);
          for (let n in nodeList) {
            if (nodeList.hasOwnProperty(n)) {
              findParent(ztreeObj, nodeList[n]);
            }
          }
          ztreeObj.showNodes(nodeList);
        } else {
          // 搜索关键词为空时展示所有节点且收起所有节点
          ztreeObj.showNodes(allNode);
          ztreeObj.expandAll(false);
        }
      }

      //处理历史高亮
      const highlightNodes = this.treeObj.getNodesByParam('highlight', true); //getNodesByParam根据节点数据的属性精确搜索满足条件的的JSON 数据对象,如果有多个同样属性值的节点，则只返回第一个找到的节点。
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
        this.$emit('afterSearch', false);
        return;
      }

      //添加高亮
      const nodes = this.treeObj.getNodesByParamFuzzy('name', value);
      this.treeObj.showNodes(nodes);
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
      this.$emit('afterSearch', true);
    }

    /* focus:function() {
      this.fuzzyShow = true;
    },
    handleOtherClick(e){
      if(this.$refs.cursor.contains(e.target)){
        return;
      }else{
        this.fuzzyShow = false;
      }
    } */
  }
};
</script>
<style lang="less" scoped>
@import './ztreeIcon.css';
.search-box {
  position: relative;
}
.search-div {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  display: -webkit-flex;
  // overflow-y: hidden;
  -webkit-transition: all linear 0.2s;
  -moz-transition: all linear 0.2s;
  -o-transition: all linear 0.2s;
  transition: all linear 0.2s;

  /deep/.a-input-group {
    display: flex;

    .a-input__inner {
      flex: 1;
    }
    .a-input-group__append {
      width: 30px;
      padding: 0;
      text-align: center;

      button.a-button {
        margin-top: 0;
        padding: 0;
      }
    }
  }
  .add-new {
    /deep/.a-button {
      padding: 0 8px;
      margin-left: 6px;
    }
  }
}
.fuzzy-search {
  position: absolute;
  width: 100%;
  height: 26px;
  line-height: 26px;
  bottom: -26px;
  left: 0;
  z-index: 0;
  font-size: 10px;
  padding: 0;
  // background-color: #f2f2f2;
  color: #000a26;
  // border: 1px solid #DCDFE6;
  // border-bottom: none;
  border-radius: 0;
  // border-right: 1px #C0C4CC solid;
  outline: none;
  // border-top-left-radius: 4px;
  // border-top-right-radius: 4px;
  transform: translateY(-0%);
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -moz-transition: all linear 0.3s;
  -o-transition: all 0.3s ease-in-out;
  /deep/.a-checkbox {
    color: #999;
    .a-checkbox__label {
      font-size: 12px;
    }
  }
}
</style>
