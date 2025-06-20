<template>
  <!-- @infinite-scroll="bottom()" -->
  <div class="table-box" :style="boxStyle">
    <!-- 编辑页 -->
    <edu-form title="导入" v-if="isShowImport" width="40%" top="200px" @ok="doImportFn(false)" @cancel="doImportFn()">
      <div>
        <a-form-model labelAlign="right">
          <a-form-model-item label="附近">
            <uploadFiles :showFiles="false" one :url="importUrl" :getParams="doImport" serviceType="upload"
              v-if="doImport" :showMsg="false" @upload="doImportFn" uploadBtnClass="success" uploadBtnName="选择文件"
              style="display: inline-block;" />
          </a-form-model-item>
          <a-form-model-item label="说明" prop="hqUserId" required>
            <span>请按模板填写好要导入的数据</span>
			<!-- {{downUrl}} -->
            <a class="down-btn" :data-url="downUrl" @click="tempDownload">模板下载</a>
          </a-form-model-item>
        </a-form-model>
      </div>
    </edu-form>

    <div v-if="isShowTopBtn" class="sysBtn">
      <slot name="top_bef_btn"></slot>
      <slot name="top_btn">
        <edu-pms v-if="doAdd != null" :code="code + '-btn-add'" type="primary" ext="add" iconfont="plus" name="添加"
          @click="doAdd"></edu-pms>
        <edu-pms :code="code + '-btn-add'" v-if="sconfig.open" ext="success" iconfont="iconqiyong"
          :name="sconfig.openText" @click="doUpdateStatus(1)"></edu-pms>
        <edu-pms :code="code + '-btn-add'" v-if="sconfig.close" ext="delete" iconfont="iconguanbi"
          :name="sconfig.closeText" @click="doUpdateStatus(0)"></edu-pms>

        <edu-pms :code="code + '-btn-add'" ext="success" v-if="doImport" iconfont="icondaoru" name="批量导入"
          @click="isShowImport = true"></edu-pms>

        <edu-pms :code="code + '-btn-add'" ext="success" v-if="doExport || exportConfig != null" iconfont="icondaochu"
          name="导出" @click="doExportFn"></edu-pms>
      </slot>
      <slot name="top_af_btn"></slot>
      <edu-pms :code="code + '-btn-refresh'" iconfont="icon-refresh" ext="reload" name="刷新" @click="doReload"></edu-pms>
      <edu-pms v-if="sconfig.delete && sconfig.bdelete" :code="code + '-btn-delete'" ext="delete" type="danger"
        iconfont="iconshanchu" name="批量删除" @click="doDeleteMul"></edu-pms>
    </div>
    <slot name="btn_af_div"></slot>
    <div class="table-useful">
      <a-table ref="eltable" :loading="isLoading" :rowKey="rowKey" :data-source="allList" :pagination="false"
        :scroll="tableScroll" :row-selection="sconfig.checkBox
            ? {
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              type: sconfig.checkType
            }
            : null
          ">
        <slot name="af_xh"></slot>
        <a-table-column v-if="sconfig.showNo" title="序号" width="70px" align="center">
          <template slot-scope="text, record, index">
            {{ getNo(index) }}
          </template>
        </a-table-column>
        <slot></slot>
        <!--        -->
        <a-table-column title="状态" width="70px" v-if="sconfig.status" align="center" dataIndex="status">
          <template slot-scope="status">
            <edu-dict-text code="status" :class="'status' + status" :value="status"></edu-dict-text>
          </template>
        </a-table-column>
        <slot name="autobtn"></slot>

        <a-table-column v-if="isAutoBtn == false" title="操作" :fixed="tfixed" align="center" dataIndex="id"
          :width="opWidth">
          <template slot-scope="text, row">
            <div class="opt-btn">
              <slot name="bef_btn" :row="row"></slot>
              <edu-pms v-if="toDetail != null && rowBtnShowCallback('detail', row)" :code="code + '-btn-detail'"
                name="查看" type="success" ext="tdetail" size="mini" @click="toDetail(row)">
              </edu-pms>
              <edu-pms v-if="toUpdate != null && rowBtnShowCallback('update', row)" :code="code + '-btn-edit'" name="编辑"
                type="primary" ext="tedit" size="mini" @click="toUpdate(row)">
              </edu-pms>
              <edu-pms v-if="sconfig.delete && rowBtnShowCallback('delete', row)" :code="code + '-btn-delete'" name="删除"
                size="mini" ext="tdelete" type="primary" @click="handleDelete(row)">
              </edu-pms>
              <slot name="af_btn" :row="row"></slot>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <pagination v-if="sconfig.pagination" :total="total" :pager-count="pagerCount" :pagination-class="paginationClass"
      :page.sync="pageParam.pageNum" :page-sizes="pageSizes" show-size-changer :limit.sync="pageParam.limit"
      :layout="layout" @pagination="changePage" />
  </div>
</template>
<script>
import Pagination from './Pagination'; // secondary package based on a-pagination
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { Pagination, uploadFiles },
  props: {
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    config: {
      type: Object,
      default: null
    },
    boxStyle: {
      type: Object,
      default: function () {
        return {};
      }
    },
    //分页的样式  ab  fiexd
    paginationClass: {
      type: String,
      default: 'pagination-container'
    },
    code: {
      type: String,
      required: true
    },
    onLoad: {
      type: Function,
      default: null
    },
    renderData: {
      type: Function,
      default: null
    },
    api: {
      type: Object,
      required: true
    },
    toDetail: {
      type: Function,
      default: null
    },
    toUpdate: {
      type: Function,
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    getParams: {
      type: Function,
      default: null
    },
    rowBtnShowCallback: {
      type: Function,
      default: (type, row) => {
        return true;
      }
    },
    listName: {
      type: String,
      default: 'records'
    },
    mburl: {
      type: String,
      default: ''
    },
    pageName: {
      type: String,
      default: 'current'
    },
    sizeName: {
      type: String,
      default: 'size'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    opWidth: {
      type: Number,
      default: 230
    },
    check: {
      type: Boolean,
      default: true
    },
    isAutoBtn: {
      type: Boolean,
      default: false
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    sorts: {
      type: Array,
      default: function () {
        return [
          {
            column: 'id',
            asc: false
          }
        ];
      }
    },
    scrollWidth: {
      type: Number,
      default: 1400
    },
    isShowTopBtn: {
      type: Boolean,
      default: true
    },
    doAdd: {
      type: Function,
      default: null
    },
    doImport: {
      type: Function,
      default: null
    },
    doExport: {
      type: Function,
      default: null
    },
    exportConfig: {
      type: Object,
      default: null
    },
    /**
     * 是否显示分页
     */
    isShowPage: {
      type: Boolean,
      default: true
    },
    //初始化时是否加载分页
    init: {
      type: Boolean,
      default: true
    },
    //初始化时是否加载分页
    tableX: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 0
    }
  },
  data() {
    let data = {
      total: 0,
      isLoading: true,
      isShowImport: false,
      selectedRowKeys: []
    };
	data.downUrl='';
    data.pageParam = {
      limit: this.pageSize || 10, //每页展示的数目
      pageNum: 1 // 页码
    };
    data.allList = [];
    data.theight = null;
    if (!this.isShowPage) {
      data.theight = null;
    }
    data.tableScroll = {};
    data.tfixed = false;
    if (this.tableX > 0) {
      data.tableScroll = {
        x: this.tableX
      };
      data.tfixed = 'right';
    } else if (document.body.offsetWidth < 2000) {
      data.tableScroll = {
        x: this.scrollWidth
      };
      data.tfixed = 'right';
    }
    data.pageSizes = [data.pageParam.limit * 1, data.pageParam.limit * 2, data.pageParam.limit * 3, data.pageParam.limit * 4];
    data.sconfig = {
      delete: true,
      pageFn: 'page',
      pagination: true,
      showNo: true,
      open: true,
      close: true,
      status: true,
      checkType: 'checkbox',
      bdelete: true,
      checkBox: true,
      closeText: '禁用',
      openText: '启用'
    };
    setTimeout(() => {
      console.log("this.$http.service", this.$echarts)
    }, 500)

    if (this.config) Object.assign(data.sconfig, this.config);
    //   data.importUrl =
    //     process.env.VUE_APP_SYSTEM_NAME == '教科研管理系统'
    //       ? this.$http.service.jkl + 'veJklExcel/importExcel'
    //       : process.env.VUE_APP_SYSTEM_NAME == '学生管理系统'?
    // this.$http.service.stu + 'veBaseStudent/importExcel':this.$http.service.hq + 'veHqExcel/importExcel';
    //   if (process.env.VUE_APP_SYSTEM_NAME == '设备资产管理系统') {
    //     data.importUrl = this.$http.service.sbzc + 'veSbzcExcel/importExcel';
    //   }
    if (this.type == 'stu') {
      data.importUrl = this.$http.service.stu + 'veBaseStudent/importExcel'
    }
    else if (this.type == 'kq') {
      data.importUrl = this.$http.service.stu + 'veStuCheck/stuCheckImportExcel'
    }
    return data;
  },
  mounted() {
    if (this.init) {
      this.loadPageData(); // 获取数据
    }
    //dom生成后执行
    window.addEventListener('resize', this.resetHeight, false);
    this.resetHeight();

    if (this.drag) {
      this.rowDrop();
    }
  },
  activated() {
    if (this.isCreate) {
      this.isCreate = false;
      return;
    }
    this.resetHeight();
  },
  destroyed() {
    window.removeEventListener('resize', this.resetHeight, false);
  },
  methods: {
    doImportFn(type) {
      this.isShowImport = false;
      if (!type) {
        return;
      }
      this.loadPageData();
      this.$message.success('导入成功');

    },
    tempDownload() {
      const temp = this.doImport();
      let url = '';
	  let path=window.location.href.split('#')[0];
      if (this.type == 'kq') {
        url = `${path}/excel/${temp.tempName}.xlsx`; // 确保 URL 包含文件名
        this.downloadFile(url, temp.tempName + '.xlsx');
      } else if (this.type == 'stu') {
        url = `${path}/excel/${temp.tempName}.xls`; // 确保 URL 包含文件名
		this.downUrl=url;
        this.downloadFile(url, temp.tempName + '.xls');
      }
    },
    downloadFile(url, fileName) {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    doExportFn() {
      let _this = this;

      if (this.type == "kq") {
        if (this.getParams()) {
          let params = this.getParams();
          let conditions = params.conditions;
          let week = conditions.find(e => e.column == 'week');
          if (!week) {
            this.$message.warning("请填写要导出第几周!");
            return;
          }
        }
      }
      this.$confirm({
        title: '提示',
        content: '确定要导出' + _this.exportConfig.name + '吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this.doExportFnReal();
        },
        onCancel() {
          _this.isLoading = false;
        },
      });
    },
    doExportFnReal() {
      this.isLoading = true;
      const config = {
        service: 'hq',
        name: '导出',
        nameTime: true
      };
      if (process.env.VUE_APP_SYSTEM_NAME == '设备资产管理系统') {
        config.service = 'sbzc';
      } else if (process.env.VUE_APP_SYSTEM_NAME == '学生管理系统') {
        config.service = 'stu';
        if (this.exportConfig.project && this.exportConfig.project == 'sanming') {
          config.service = 'sanming';
        }
      } else if (process.env.VUE_APP_SYSTEM_NAME == '教科研管理系统') {
        config.service = 'jkl';
      }

      Object.assign(config, this.exportConfig);
      if (!config.url) {
        return;
      }
      if (config.nameTime) {
        config.name += this.$date.format() + '.xlsx';
      }
      //数据加载
      let reqData = {};
      /* 如果是自己的 */
      // reqData[this.sizeName] = 100000;
      // reqData[this.pageName] = 1;
      if (this.params) {
        Object.assign(reqData, this.params);
      }
      if (this.getParams) {
        Object.assign(reqData, this.getParams());
      }
      reqData.sorts = this.sorts;
      this.$http.exportExcel(this.$http.service[config.service] + config.url, reqData, 'post', {
        name: config.name
      }).then(() => {
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
    getNo(index) {
      return this.pageParam.limit * (this.pageParam.pageNum - 1) + index + 1;
    },
    resetHeight: function () {
      if (!this.isShowPage) {
        return;
      }
      let dHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (this.$refs.eltable) {
        const offsetTop = this.$refs.eltable.$el.getBoundingClientRect().top;
        const theight = dHeight - (offsetTop + 90);
        if (theight < 300) {
          this.theight = null;
        } else {
          this.theight = theight;
        }
      }
    },
    getSorts() {
      return this.sorts;
    },
    getSelectRowIds() {
      return this.selectedRowKeys;
    },
    getSelectRow(idKey = 'id') {
      return this.allList.filter(item => this.selectedRowKeys.indexOf(item[idKey]) > -1);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    getCreateStr(str) {
      return this.$date.getCreateStr(str);
    },
    doUpdateStatus(status) {
      const ids = this.getSelectRowIds();
      if (!ids || ids.length == 0) {
        this.$message.error('请选择一项');
        return;
      }

      this.api['updateStatus']({
        ids: ids,
        status: status
      })
        .then(res => {
          this.$notification.success({
            message: '数据操作成功',
            description: `成功${status == 1 ? '启用' : '禁用'} [${ids.length}]条数据`
          });
          this.reloadNow();
        })
        .catch(res => {
          console.error(res);
        });
    },
    doDeleteMul() {
      var that = this

      const ids = this.getSelectRowIds();
      if (!ids || ids.length == 0) {
        this.$message.error('请选择一项');
        return;
      }
      this.$confirm({
        title: '是否删除',
        content: '是否删除这条数据',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.api['delete'](ids.join()).then(res => {
            if (res.code == 200) {
              that.reloadNow();
            }

          }).catch(err => {
            that.$message.warning("数据删除失败!");
          })
        },
        onCancel() { },
      });
    },
    handleDelete(row) {
      var that = this
      this.$confirm({
        title: '是否删除',
        content: '是否删除这条数据',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.api['delete'](row.id).then(res => {
            that.selectedRowKeys = []
            if (res.code == 200) {
              that.reloadNow();
            }

          }).catch(err => {
            that.$message.warning("数据删除失败!");
          })
        },
        onCancel() { },
      });
    },
    doReload() {
      this.selectedRowKeys = [];
      this.$message.success('表格已刷新');
      this.reload();
    },
    reload() {
      this.pageParam.pageNum = 1;
      this.loadPageData();
    },
    reloadNow() {
      this.selectedRowKeys = [];
      this.loadPageData();
    },
    changePage(data) {
      this.pageParam.pageNum = data.page;
      this.loadPageData();
    },
    //加载分页数据
    loadPageData() {
      this.hasExpandRow = false;
      this.isLoading = true;
      //数据加载
      let reqData = {};
      /* 如果是自己的 */
      reqData[this.sizeName] = this.pageParam.limit;
      reqData[this.pageName] = this.pageParam.pageNum;
      if (this.params) {
        Object.assign(reqData, this.params);
      }
      if (this.getParams) {
        Object.assign(reqData, this.getParams());
      }
      reqData.sorts = this.sorts;
      this.api[this.sconfig.pageFn](reqData)
        .then(res => {
          let plist = [];
          if (res && res.result) {
            if (res.result instanceof Array) {
              plist = res.result;
              if (this.renderData) {
                plist = this.renderData(plist);
              }
            } else {
              this.total = parseInt(res.result.total);
              if (res.result[this.listName]) {
                plist = res.result[this.listName];
                if (this.renderData) {
                  plist = this.renderData(plist);
                }
              }
            }
          }
          this.allList = plist;
          if (this.onLoad) {
            this.onLoad(this.allList, res);
          }
          this.isLoading = false;
        })
        .catch(res => {
          console.error(res);
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.table-box {
  /deep/.ant-table-thead>tr>th {
    padding: 16px 8px;
  }

  /deep/.ant-table-tbody>tr>td {
    padding: 8px 8px;
    overflow-wrap: break-word;
    font-size: 14px;
  }

  .sysBtn {
    padding: 0 0 15px 0;

    /deep/ .ant-btn {
      margin-right: 15px;
    }
  }

  .table-useful {
    font-size: 14px;

    /deep/ .ant-table-thead>tr>th {
      background: #f2f2f2;
      font-size: 14px;
    }

    /deep/ .ant-table-tbody {
      tr:nth-child(even) {
        background: #f4f7f9;
      }
    }

    /deep/ .ant-btn {
      height: auto;
      border-radius: 0px;
      text-shadow: none;
      padding: 0 0;
      padding-top: 5px;
      font-size: 14px;
      border-width: 0;
      box-shadow: none !important;
      background-color: transparent;
      margin: 0 8px;
      color: #028be2;
      font-weight: normal;
      border-color: #028be2;
      //     border-right: solid 1px #999;
    }
  }
}

/deep/.a-icon-plus {
  font-weight: bold;
}

.status1 {
  color: #039471;
}

.status0 {
  color: rgb(212, 117, 117);
}
</style>