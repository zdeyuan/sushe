<template>
  <a-card :bordered="false">
    <div v-show="false" style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">
      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">排课管理</p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">排课节设置</p>
    </div>
    <div style="margin-bottom: 20px">
      <a-button @click="nodeBtn" type="primary">
        <IconFont style="font-weight: bold;" type="iconqiyong" />
        可排课
      </a-button>
      <a-button @click="noNodeBtn" type="danger">
        <IconFont style="font-weight: bold;" type="iconguanbi" />
        不排课
      </a-button>
      <a-button @click="ss" type="primary">
        <IconFont style="font-weight: bold;" type="iconshuaxin" />
        刷新
      </a-button>
    </div>
    <div>
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="listData"
        :row-selection="rowSelection"
        :loading="loading"
      >
           <span slot="stataction" slot-scope="text">
             <span v-if="text=='1'">启用</span>
             <span v-else style="color:#FC8950">禁用</span>
           </span>
          <span slot="action" slot-scope="text, record">
            <a @click="compile(record)" style="color:#0098F8">编辑</a>
          </span>
      </a-table>
    </div>
    <compile-model ref="compileModel" @editSuccess="editSuccess"></compile-model>
  </a-card>
</template>
<script>
import '@/assets/courses/courses.less'
import '@/assets/scss/generalStyle.less'
import compileModel from './modules/compileModel'
import { IconFont } from '@/cas/ico.js'
import { nodeSet,noNode,node } from '@/api/kw/scheduling'
export default {
  data() {
    return {
      EnableId:[],
      listData:[],
      columns :[
        {
          title: '节',
          dataIndex: 'section',
          key:'section'
        },
        {
          title: '开始时间',
          dataIndex: 'kssj',
          key:'kssj'
        },
        {
          title: '结束时间',
          dataIndex: 'jssj',
          key:'jssj'
        },
        {
          title: '是否排课',
          dataIndex: 'status',
          key:'status',
          scopedSlots: { customRender: 'stataction' },
        },
		{
		  title: '不排课',
		  dataIndex: 'kcmc',
		  key:'kcmc'
		},
        {
          title: '操作',
          dataIndex: 'address',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loading:true,
    }
  },
  components: {
    IconFont,
    compileModel
  },

  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // this.selectedRowKeys = selectedRows
          var arr=[]
          var obj={}
          selectedRows.forEach(item=>{
            obj = item.id
            arr.push(obj)
          })
          this.EnableId = arr
          console.log(this.EnableId)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  created() {
    this.getList()
  },
  methods: {
    compile(record){
      var cId = ''
      cId = record.id
      this.$refs.compileModel.compile(cId)
      this.$refs.compileModel.title="编辑";
    },
    editSuccess(){
      this.getList()
    },
    getList(){
      this.loading = true
      nodeSet().then((res)=>{
        // console.log(res)
        this.listData = res.result.records
        this.loading = false
      })
    },
    ss(){
      this.getList()
    },
    nodeBtn(){
      console.log(this.EnableId)
      if (this.EnableId.length <= 0) {
        this.$message.warning('请选择一条记录！')
      } else {
        var ids = ''
        ids = this.EnableId.join(",")
        console.log(ids)
        node(ids).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.getList();
          } else {
            this.$message.warning(res.message);
          }
        });
      }
    },
    noNodeBtn(){
      console.log(this.EnableId)
      if (this.EnableId.length <= 0) {
        this.$message.warning('请选择一条记录！')
      } else {
        var ids = ''
        ids = this.EnableId.join(",")
        console.log(ids)
        noNode(ids).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.getList();

          } else {
            this.$message.warning(res.message);
          }
        });
      }
    }
  }
}
</script>
<style scoped>

</style>
