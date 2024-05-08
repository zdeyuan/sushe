<template>
    <!-- <a-card :bordered="false" > -->
      <div>
         <!--  <div>
          <div class="table-operator" style="display:flex;align-items:center">
            <a-button @click="recovery()" style="background-color:#00D09D;color:#fff" icon="check-circle">恢复</a-button>
            <a-button @click="handleRefresh()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>
            <div>
            <a-form layout="inline" @keyup.enter.native="searchQuery" >
              <a-row :gutter="24" style="display:flex;margin-left: 570px;margin-top:-10px;align-items:center">
                <a-col>
                  <a-form-item label="">
                    <a-select v-model="queryParam.sex" placeholder="课程分类" style="width:140px;height:34px;">
                      <a-select-option value="">请选择</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col>
                  <a-form-item label="">
                    <a-input placeholder="请输入课程名" v-model="queryParam.code" style="width:140px;height:34px;"></a-input>
                  </a-form-item>
                </a-col>
                <a-col>
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button @click="searchQuery" type="primary">搜索</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          </div> -->
          <div class="table-operator" style="height: 30px;display: inline-block;">
            <a-button @click="recovery()" style="background-color:#00D09D;color:#fff" icon="check-circle">恢复</a-button>
            <a-button @click="handleRefresh()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>

            <div class='components-input-demo-size' style='display: inline-block;position:absolute;right: 0'>
              <a-select default-value="lucy" style="display: inline-block;width: 203px;height: 34px;margin-right: 20px">
                <a-select-option value="lucy">课程分类</a-select-option>
              </a-select>
              <a-input style='display: inline-block;width: 182px;height: 34px;margin-right: 20px' placeholder="课程名" />
              <div class="table-operator" style="height: 30px;display: inline-block">
                <a-button @click=" " type="primary" style='background-color: #0098F8;border: none;width: 100px;height: 46px;margin-right: 20px;display: inline-block'>搜索</a-button>
              </div>
            </div>
        </div>
        <a-table
            style="height:500px"
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns1"
            :dataSource="recoveryData"
            :pagination="ipagination"
            :loading="loading"
            @change="handleTableChange"
            :rowSelection="{onChange: onSelectChange}"
            >
        </a-table>
      </div>    
  <!-- </a-card> -->
</template>
<script>
import '@/assets/less/usercolor.less'
import { reList,reNewCourse } from'@/api/professional.js'
export default {
    //回收站
    name:'recycleBin',
    data() {
      return {
        queryParam:{
          pageNo: 1,//第几页
          pageSize: 10,//每页中显示数据的条数
        },
        EnableId:[],
        ipagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
        },
        columns1:[{
          title: '课程名称',
          align: 'center',
          dataIndex: 'coursename',
          width: 80
          },
          {
            title: '课程分类',
            align: 'center',
            width: 100,
            dataIndex: 'type'
          },
          {
            title: '主讲教师',
            align: 'center',
            width: 120,
            dataIndex: 'teachername',
          },
          {
            title: '删除时间',
            align: 'center',
            width: 130,
            dataIndex: 'delatetime'
          },],
          recoveryData:[{
            name:'轮机电气学',
            type:'室内设计',
            id:'1',
            teacher:'李老师',
            delatetime:'2020-12-28'
          },{
            name:'汽车美容',
            type:'室内设计',
            id:2,
            teacher:'李老师',
            delatetime:'2020-12-28'
          },{
            name:'插画',
            type:'平面设计',
            id:3,
            teacher:'李老师',
            delatetime:'2020-12-28'
          }]
        }
    },
    created() {
      this.getList()
    },
    methods: {
      searchQuery(){

      },
      getList(){
        console.log(123)
        this.loading = true
        this.queryParam = {
          pageNo: 1,
          pageSize: 10,
          b:{
            isDelete: 1
          }
        }
        reList(this.queryParam).then((res)=>{
          console.log(res)
          this.recoveryData = res.result.records
          this.loading = false
        })    
      },
      handleRefresh(){
        this.getList()
      },
      handleTableChange(ipagination) {
        console.log(ipagination)
      },
      onSelectChange(record){
        console.log(record)
        // var recordId = []
        // var obj={}
        // record.forEach(item=>{
        //   obj = item.id
        //   recordId.push(obj)
        // })
        this.EnableId = record
        console.log(this.EnableId)
      },
      recovery(){
        if(this.EnableId.length==0){
          this.$message.info("还没选择表格中的一项");
        }
        
        let params = {
          status: status,
          ids:this.EnableId,
        }
        reNewCourse(params).then((res)=>{
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getList();
          }
        })
      }
    },
}
</script>
<style scoped>

</style>