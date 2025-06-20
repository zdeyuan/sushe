<template>

    
  <a-modal
        :title="title"
        :width="width"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        cancelText="关闭">
    <template slot="footer">
      <div style="text-align: center">
        <a-button @click="handleCancel"> 关闭</a-button>
      </div>
    </template>

        
    <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="showDataSource"
            :pagination="ipagination"
            :loading="loading"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            @change="handleTableChange"
          >

  <span slot="action" slot-scope="text, record">

            <a-popconfirm title="确定删除吗?" @confirm="() => doDelete(record.id)">
            <a>删除</a>
            </a-popconfirm>

        </span>
          
    </a-table>


      
  </a-modal>
</template>

<script>
  import {
    deleteAction,
    getAction,
    downFile,
    putAction,
    getFileAccessHttpUrl,
    getActionGradeById,
    getActionXueqiById,
    getActionZhuanyeById,
    getActionYuanxiById,
    getActionUserById,
    getActionXuezhiById,
    getActionTeacherById,
    getActionBanjiById,
    getActionStudentById,
    getActionCampusById
  } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'VeJwJingsaiGroupinfoModal',
    mixins: [EduListMixin],
    components: {},
    data() {
      return {
        hasChange:false,
        disableMixinCreated: true,
        form: this.$form.createForm(this),
        title: '团队成员名单',
        width: '70%',
        visible: false,
        studentObj: {},
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        description: '团队成员名单',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'stuidName'
          },
          {
            title: '学号',
            align: 'center',
            dataIndex: 'xh'
          },
          {
            title: '年级',
            align: 'center',
            dataIndex: 'gradeidName'
          },
          {
            title: '专业部',
            align: 'center',
            dataIndex: 'falidName'
          },
          {
            title: '专业',
            align: 'center',
            dataIndex: 'specidName'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/edu-schedule/jingsaiProject/veJwJingsaiBaoming/list',
          delete: '/edu-schedule/jingsaiProject/veJwJingsaiBaoming/delete'
        },
        isorter: []
      }
    },
    created() {
    },
    methods: {
      getDataInfo() {
        console.log('进入getDataInfo')
        for (let i = 0; i < this.dataSource.length; i++) {

          let item = this.dataSource[i]
          if (item.gradeid != null) {
            //年级
            item.gradeidName = ''
            if (item.gradeid != null && item.gradeid != '' && this.showItemObj.gradeid[item.gradeid] == null) {
              this.showItemObj.gradeid[item.gradeid] = ''
              getActionGradeById(item.gradeid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.gradeid[item.gradeid] = res.result.njmc
                  this.changeData()
                }
              })
            }
          } else {
            item.gradeid = ''
            item.specidName = ''
          }

          if (item.specid != null) {
            //专业
            item.specidName = ''
            if (item.specid != null && item.specid != '' && this.showItemObj.specid[item.specid] == null) {
              this.showItemObj.specid[item.specid] = ''
              getActionZhuanyeById(item.specid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.specid[item.specid] = res.result.zymc
                  this.changeData()
                }
              })
            }
          } else {
            item.specid = ''
            item.specidName = ''
          }

          if (item.falid != null) {
            //专业
            item.falidName = ''
            if (item.falid != null && item.falid != '' && this.showItemObj.falid[item.falid] == null) {
              this.showItemObj.falid[item.falid] = ''
              getActionYuanxiById(item.falid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.falid[item.falid] = res.result.yxmc
                  this.changeData()
                }
              })
            }
          } else {
            item.falid = ''
            item.falidName = ''
          }
          if (item.xh == null) {
            item.xh = ''
          }
          //学生
          item.stuidName = ''
          if (item.stuid != null && item.stuid != '' && this.studentObj[item.stuid] == null) {
            this.showItemObj.stuid[item.stuid] = ''
            this.studentObj[item.stuid] = {}
            getActionStudentById(item.stuid).then(res => {
              if (res.success && res.result != null) {
                this.studentObj[item.stuid] = res.result
                this.showItemObj.stuid[item.stuid] = res.result.xm
                item.falid = res.result.falId
                item.specid = res.result.specId
                item.gradeid = res.result.gradeId
                item.xh = res.result.xh
                this.getDataInfo()
                this.changeData()
              }
            })
          }

        }
        this.showDataSource = this.dataSource
      },
      select(record) {
        console.log('select', record)
        this.visible = true
        this.queryParam.groupid = record.id
        this.searchQuery()
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      setDefault() {
        for (let i = 0; i < this.dataSource.length; i++) {
          let item = this.dataSource[i]
          if (this.studentObj[item.stuid] != null) {
            let res = this.studentObj[item.stuid]
            item.falid = res.falId
            item.specid = res.specId
            item.gradeid = res.gradeId
            item.xh = res.xh
          }
        }
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
            this.dataSource = res.result.records || res.result
            this.setDefault()
            this.getDataInfo()
            this.changeData()
            console.log(this.showItemObj)
            if (res.result.total) {
              this.ipagination.total = res.result.total
            }
            //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      },
      // handleOk() {
      //   this.$emit('ok');
      //   this.close()
      // },
      doDelete(id){
        this.hasChange=true;
        this.handleDelete(id);
      },
      handleCancel() {
        if(this.hasChange) {
          this.hasChange=false;
          this.$emit('ok');
        }
        this.close()
      }
    }
  }
</script>