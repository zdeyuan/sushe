<template>
  <div style="background:#E9EDF6; padding:30px">
	  <div class="content-title">
		  资产类别管理
	  </div>
		<div class="pageContentBox">
		  <div class="headTop">宿舍资产管理 > <span class="notTop">资产类别管理</span></div>
      <div class="content-head">
        <div>
          <a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="showModal">
            <icon-font type="icontianjia" style="color: #FFFFFF;" />
            添加
          </a-button>
          <a-modal title="添加" :visible="add" :confirm-loading="confirmLoading" @cancel="handleCancel" width="372px">
            <table class="scanTable">
              <tr>
                <td class="single">资产类型名称:</td>
                <td class="double">
                  <a-input class="small" placeholder="请输入资产名称" v-model="addTypeName" />
                </td>
              </tr>
            </table>
            <template slot="footer" class="floor-footer">
              <a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="handleOk()">确定</a-button>
              <a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="handleCancel()">取消</a-button>
            </template>
          </a-modal>

          <a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="patchDelete">
            <icon-font type="iconsousuo" style="color: #FFFFFF;" />
            删除
          </a-button>

          <a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:##3a3aff " @click="getAssetType">
            <icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
            刷新
          </a-button>
        </div>

        <div style="min-width: 320px;"></div>

        <div>
          <span class="head-span">类别名称</span>
          <a-input class="condition" placeholder="请输入名称" v-model="typeName" />
        </div>

        <div>

          <a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getAssetType()">
            <icon-font type="iconsousuo" style="color: #FFFFFF;" />
            搜索
          </a-button>

          <a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll()">
            <icon-font type="iconqingkong1" style="color: #FFFFFF;" />
            清空
          </a-button>
        </div>
      </div>
      <div>
        <a-table :columns="columns" :data-source="data" :row-selection="{ selectedRowKeys: selectId, onChange: onSelectChange}" :defaultCurrent="6" :pagination="pagination"
          @change="tableChange">
          <span slot="operator" slot-scope="text, record">
            <a slot="operator" style="font-size:18px;font-weigth:bold;border-bottom: 1px solid #66C3FD;" @click="editType(record.key)">编辑</a>
            <span>|</span>
            <a slot="operator" style="font-size:18px;font-weigth:bold;color:orange; border-bottom: 1px solid orange;" @click="deleteType(record)">删除</a>
          </span>
        </a-table>
      </div>
    </div>
    <a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel">
      <table class="scanTable">
        <tr>
          <td class="single">资产类型名称:</td>
          <td class="double">
            <a-input class="small" placeholder="请输入资产名称" v-model="editTypeName" />
          </td>
        </tr>
      </table>
      <template slot="footer" class="floor-footer">
        <a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="editOK()">确定</a-button>
        <a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="editCancel()">取消</a-button>
      </template>
    </a-modal>
  </div>


</template>

<script>
  import {
    Icon
  } from 'ant-design-vue';
  import {
    axios
  } from "@/utils/request"

  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
  });

  const columns = [{
      title: '类别名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      width: '70%',
    },
    {
      title: '操作',
      dataIndex: 'operator',
      width: '15%',
      key: 'operator',
      scopedSlots: {
        customRender: 'operator'
      },
    },
  ];

  let data = [];
  export default {
    data() {
      return {
        id: 0,
        add: false,
        edit: false,
        typeName: '',
        addTypeName: '',
        editTypeName: '',
        pagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['6', '10'],
          showTotal: (total, range) => {
            return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 1000
        },
        /* 表格数据 */
        data,
        columns,
		selectId:[],
        /* 按钮大小 */
        size: 'small',
        /* 添加-弹出框数据 */
        visible: false,
        confirmLoading: false,
      };
    },
    components: {
      IconFont,
    },
    mounted() {
      this.getAssetType();
    },
    methods: {
      /* 显示添加界面 */
      showModal() {
        this.add = true;
        this.addTypeName = '';
      },
	  onSelectChange(selectedRowKeys){
		 this.selectId = selectedRowKeys;  
	  },
      /* 显示编辑界面 */
      editType(id) {
        axios({
          url: 'dorm/assetType/queryById',
          method: 'post',
          params: {
            'id': id
          }
        }).then(res => {
          this.editTypeName = res.result.typeName;
          this.edit = true;
          this.id = id;
        }).catch(err => {
          this.$message.warning("获取该资产类型失败");
        })
      },
      /* 编辑界面取消 */
      editCancel() {
        this.edit = false;
      },
      /* 编辑界面确定 */
      editOK() {
        if (this.editTypeName.trim() == '') {
          this.$message.warning("请输入类型名称");
          return;
        }
        axios({
          url: 'dorm/assetType/edit',
          method: 'post',
          params: {
            'id': this.id,
            'typeName': this.editTypeName
          }
        }).then(res => {
          this.edit = false;
          this.$message.success(res.message);
          this.getAssetType();
        }).catch(err => {
          this.$message.warning("修改资产类型失败");
        })
      },
      /* 添加界面取消 */
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.add = false;
      },
      tableChange(pagination, filters, sorter) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
      },
      /* 获取数据 */
      getAssetType() {
		this.selectId = []
        axios({
          url: 'dorm/assetType/queryByName',
          method: 'post',
          params: {
            'assetName': this.typeName
          }
        }).then(res => {

          data.splice(0, data.length);
          for (let type of res.result) {
            data.push({
              key: type.id,
              name: type.typeName
            })
          }
          this.pagination.current = 1;
          this.pagination.total = res.result.length;
        }).catch(err => {
          this.$message.warning("获取资产类型列表失败");
        })
      },
      /* 确认增加 */
      handleOk(e) {
        this.confirmLoading = true;
        if (this.addTypeName.trim() == "") {
          this.$message.warning("请输入资产类型名称");
          return;
        }
        axios({
          url: 'dorm/assetType/add',
          method: 'post',
          params: {
            'typeName': this.addTypeName.trim()
          }
        }).then(res => {
          this.$message.success(res.message);
          this.add = false;
          this.confirmLoading = false;
          this.getAssetType();
        }).catch(err => {
          this.$message.warning("添加资产类型失败");
        })
      },
      /* 删除 */
      deleteType(res) {
        let re = confirm("确认删除?");
        if(re) {
          axios({
            url: 'dorm/assetType/delete',
            method: 'post',
            params: {
              'id': res.key
            }
          }).then(res => {
            this.$message.success(res.message);
            this.getAssetType();
          }).catch(err => {
            this.$message.warning("删除资产类型失败");
          })
        }
      },
      /* 清空 */
      resetAll() {
        this.typeName = '';
      },
      /* 批量删除 */
      patchDelete() {
        let ids = '';
        if (this.selectId.length == 0) {
          this.$message.warning("请选中要删除的列");
          return;
        }
		let re = confirm("确认删除?");
		if (re) {
        for (let i = 0; i < this.selectId.length; i++) {
          ids += this.selectId[i];
          if (i != this.selectId.length - 1) {
            ids += ',';
          }
        }
        console.log(ids);
        axios({
          url: 'dorm/assetType/deleteBatch',
          method: 'post',
          params: {
            'ids': ids
          }
        }).then(res => {
          this.$message.success(res.message);
          this.getAssetType();
        }).catch(err => {
          this.$message.warning("批量删除失败");
        })
      }
	  }
    },

    tipsCancel() {

    },
    tipsOK() {

    },
  };
</script>

<style>
</style>
