<template>
  <a-card :bordered="false">
    <!-- 用户管理 -->
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" v-if="this.importNum==0">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="3" :sm="4">
            <a-form-item label="" style="width:140px;height:34px;">
              <a-select v-model="queryParam.sex" placeholder="全部角色">
                <a-select-option value="">请选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="4">
            <a-form-item label="" style="width:140px;height:34px;">
              <a-select v-model="queryParam.sex" placeholder="全部身份">
                <a-select-option value="">请选择</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template>
            <a-col :md="3" :sm="4">
              <a-form-item label="" style="width:140px;height:34px;">
                <a-select v-model="queryParam.sex" placeholder="全部专业">
                  <a-select-option value="">请选择</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="4">
              <a-form-item label="" style="width:140px;height:34px;">
                <a-select v-model="queryParam.sex" placeholder="请先选择专业">
                  <a-select-option value="">请选择</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="4" style="width:140px;height:34px;">
              <a-form-item label="">
                <a-select v-model="queryParam.sex" placeholder="全部机构">
                  <a-select-option value="">请选择</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="4" style="margin-left:170px">
            <a-form-item label="">
              <a-input placeholder="请输入关键词" v-model="queryParam.realname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="2">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-bottom: 30px;" v-if="this.importNum==0">
      <div style="display:flex;">
        <div @click="handleAdd">
          <img src="../../assets/Usercenter/add.png" />
        </div>
        <div style="margin-left:20px" @click="handImport(1)">
          <img src="../../assets/Usercenter/Import.png" />
        </div>
        <div style="margin-left:20px">
          <img src="../../assets/Usercenter/Enable.png" />
        </div>
        <div style="margin-left:20px">
          <img src="../../assets/Usercenter/Disable.png" />
        </div>
      </div>
      <!-- <a-button style="background-color:#00BAD0;border-color:#00BAD0" @click="handleAdd" type="primary" icon="plus">添加</a-button>
      <a-button style="background-color:#00BAD0;border-color:#00BAD0;margin-left:20px" type="primary" @click="handImport(1)" icon="import">导入</a-button>
      <a-button style="background-color:#00D09D; border-color:#00D09D;margin-left:20px" @click="handleAdd" type="primary" icon="check-circle">启用</a-button>
      <a-button style="background-color:#FC8950;border-color:#FC8950;margin-left:20px" @click="handleAdd" type="primary" icon="close-circle">禁用</a-button> -->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel"/>
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock" @click="batchFrozen('2')"/>
            冻结
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="unlock" @click="batchFrozen('1')"/>
            解冻
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div v-if="this.importNum==0">
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="datas"
        :pagination="ipagination"
        :loading="loading"
        :rowClassName="rowClassName"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" style="color:#0098F8">编辑</a>

          <a-divider type="vertical"/>
          <a @click="authorization(2)" style="color:#FC8950">管理授权</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
    <edit-modal ref="modal" @ok="modalFormOk"></edit-modal>
    <password-modal ref="passwordmodal"></password-modal>
    
    <!-- 导入页面 -->
    <div v-if="this.importNum==1">
    <div style="background-color:#fff;height:500px">
      <div class="imaportBack">
        <div class="imaportants">
          <div style="width:10px; height:30px; background-color:#0098F8"></div>
          <div style="color:#666666;font-size:20px;margin-left: 10px;">导入</div>
        </div>
      </div>
      <div class="fileClass">
        <div style="font-size:22px;color:#666666">文件:</div>
        <div style="color:#666666;font-size:20px;margin-left: 20px;">
          <div class="choice">选择文件</div>
        </div>
      </div>
      <div style="color:#999999;font-size:18px;margin-left: 208px;">请下载模版文件，并根据模版文件编写</div>
      <div style="display:flex;margin-left: 98px;margin-top: 30px;">
        <div style="font-size:22px;color:#666666;">模版文件:</div>
        <div style="color:#666666;font-size:22px;margin-left: 20px; color: #0098F8;">
          点击下载
        </div>
      </div>
      <div style="display:flex;margin-top: 30px;">
        <div class="buttonclass">确定</div>
        <div class="buttonback" @click="handReturn">返回</div>
      </div>
    </div>
    </div>
    <!-- 管理授权 -->
    <div v-if="this.importNum==2">
      <div class="imaportBack">
        <div class="imaportants">
          <div style="width:10px; height:30px; background-color:#0098F8"></div>
          <div style="color:#666666;font-size:20px;margin-left: 10px;">管理授权</div>
        </div>
      </div>
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="用户">
          <a-input style="width:800px;height: 34px;" placeholder="门户管理员"
            v-decorator="['note', { rules: [{ required: true, message: '请输入门户管理员' }] }]"
          />
        </a-form-item>
        <a-form-item label="权限">
          <a-tree
            v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" style="width:100px;height:40px">
            确定
          </a-button>
          <a-button  class="buttonback"  @click="handReturn">
            返回
          </a-button>
        </a-form-item>
        
      </a-form>  
    </div>
  </a-card>
  

</template>

<script>
  import UserModal from './modules/UserModal'
  import EditModal from './modules/EditModal'
  import PasswordModal from './modules/PasswordModal'
  import {putAction,getFileAccessHttpUrl} from '@/api/manage';
  import {frozenBatch} from '@/api/api'
  import {EduListMixin} from '@/mixins/EduListMixin'
  import SysUserAgentModal from "./modules/SysUserAgentModal";
  import JInput from '@/components/edu/JInput'
  import UserRecycleBinModal from './modules/UserRecycleBinModal'
  // import JSuperQuery from '@/components/edu/JSuperQuery'
  const treeData = [
    {
        title: '所属角色',
        key: '0-0',
        children: [
            {
                title: '所属角色管理',
                key: '0-0-0',
                children: [
                    { title: '系统管理员', key: '0-0-0-0' },
                    { title: '课程管理员', key: '0-0-0-1' },
                    { title: '资源管理员', key: '0-0-0-2' },
                    { title: '演示管理员', key: '0-0-0-3' },
                ],
            },
            // {
            //     title: '0-0-1',
            //     key: '0-0-1',
            //     children: [
            //         { title: '0-0-1-0', key: '0-0-1-0' },
            //         { title: '0-0-1-1', key: '0-0-1-1' },
            //         { title: '0-0-1-2', key: '0-0-1-2' },
            //     ],
            // },
            // {
            //     title: '0-0-2',
            //     key: '0-0-2',
            // },
        ],
    },
  ];
  export default {
    name: "UserList",
    mixins: [EduListMixin],
    components: {
      SysUserAgentModal,
      UserModal,
      PasswordModal,
      JInput,
      UserRecycleBinModal,
      EditModal
      // JSuperQuery
    },
    data() {
      return {
        description: '这是用户管理页面',
        queryParam: {},
        recycleBinVisible: false,
        importNum:0,
        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0-0','0-0-0-1'],
        selectedKeys: [],
        treeData,
        columns: [
          /*{
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },*/
          {
            title: '用户名',
            align: "center",
            dataIndex: 'username',
            width: 150,
            // sorter: true
          },
          {
            title: '姓名',
            align: "center",
            width: 150,
            dataIndex: 'realname',
          },
          // {
          //   title: '头像',
          //   align: "center",
          //   width: 120,
          //   dataIndex: 'avatar',
          //   scopedSlots: {customRender: "avatarslot"}
          // },
          {
            title: '邮箱',
            align: "center",
            width: 150,
            dataIndex: 'mailbox'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 150,
            align:"center",
          },
          {
            title: '状态',
            align: "center",
            width: 80,
            dataIndex: 'status',
            // customRender:function(status){
            //   if(status=='禁用'){
            //     return style="color:#FC8950"
            //   }
            // }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }

        ],
        superQueryFieldList: [
          { type: 'input', value: 'username', text: '用户账号', },
          { type: 'input', value: 'realname', text: '用户姓名', },
          { type: 'select', value: 'sex', text: '性别', dictCode: 'sex' },
        ],
        datas:[{
          username:'yyy23',
          realname:'门户管理员',
          mailbox:'546452@qq.com',
          createTime:'2020-12-30',
          status:'启用',
        },{
          username:'gdfdhd',
          realname:'何晓晓',
          mailbox:'546452@qq.com',
          createTime:'2020-2-30',
          status:'禁用',
        },{
          username:'ssss',
          realname:'企业用户',
          mailbox:'546452@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'cxxxx',
          realname:'李德华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'禁用',
        },{
          username:'gggggss',
          realname:'郭晓涵',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'gggggss',
          realname:'郭涵',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'禁用',
        },{
          username:'cxxxx',
          realname:'李华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'cxxxx',
          realname:'李华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'cxxxx',
          realname:'李华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'cxxxx',
          realname:'李华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },{
          username:'cxxxx',
          realname:'李华',
          mailbox:'266666@qq.com',
          createTime:'2021-1-28',
          status:'启用',
        },],
        url: {
          syncUser: "/act/process/extActProcess/doSyncUser",
          list: "/sys/user/list",
          delete: "/sys/user/delete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "sys/user/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
    methods: {
      //隔行
      rowClassName(record,index) {
        let className = "light-row";
        if (index % 2 === 1) className = "dark-row";
        return className;
        
      },
      //导入
      handImport(item){
        console.log(item)
        this.importNum = item
        console.log(this.importNum)
      },
      authorization(item){
        this.importNum = item
      },
      //返回
      handReturn(){
        this.importNum=0
      },
      handleEdit(record){
        console.log(record)
        this.$refs.modal.edit(record)
        this.$refs.modal.title="编辑"
      },
      getAvatarView: function (avatar) {
        return getFileAccessHttpUrl(avatar)
      },

      batchFrozen: function (status) {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.warning('请选择一条记录！');
          return false;
        } else {
          let ids = "";
          let that = this;
          let isAdmin = false;
          that.selectionRows.forEach(function (row) {
            if (row.username == 'admin') {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            that.$message.warning('管理员账号不允许此操作,请重新选择！');
            return;
          }
          that.selectedRowKeys.forEach(function (val) {
            ids += val + ",";
          });
          that.$confirm({
            title: "确认操作",
            content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
            onOk: function () {
              frozenBatch({ids: ids, status: status}).then((res) => {
                if (res.success) {
                  that.$message.success(res.message);
                  that.loadData();
                  that.onClearSelected();
                } else {
                  that.$message.warning(res.message);
                }
              });
            }
          });
        }
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        } else if (e.key == 2) {
          this.batchFrozen(2);
        } else if (e.key == 3) {
          this.batchFrozen(1);
        }
      },
      handleFrozen: function (id, status, username) {
        let that = this;
        //TODO 后台校验管理员角色
        if ('admin' == username) {
          that.$message.warning('管理员账号不允许此操作！');
          return;
        }
        frozenBatch({ids: id, status: status}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      handleChangePassword(username) {
        this.$refs.passwordmodal.show(username);
      },
      //确定
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      //树形
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
      },
      onSelect(selectedKeys, info) {
        console.log('onSelect', info);
        this.selectedKeys = selectedKeys;
      },
    }

  }
</script>
<style scoped>
  @import '~@assets/less/usercolor.less'
</style>