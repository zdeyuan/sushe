<template>
  <a-card :bordered="false">
    <div  v-show="false"  style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">
      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">排课管理</p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">全校不排课时间</p>
    </div>
    <div style="margin-bottom: 20px">
      <a-button @click="save" type="primary">保存</a-button>
      <a-button @click="init" type="primary">
        <IconFont style="font-weight: bold;" type="iconshuaxin" />
        刷新
      </a-button>
    </div>

    <a-table rowKey="id" :columns="columns" :dataSource="tableData" :loading="tableLoading">
      <template slot="Monday" slot-scope="text,record">
          <a-checkbox v-model="record[1]">
          </a-checkbox>
      </template>
      <template slot="Tuesday" slot-scope="text,record">
          <a-checkbox v-model="record[2]">
          </a-checkbox>
      </template>
      <template slot="Wednesday" slot-scope="text,record">
          <a-checkbox v-model="record[3]">
          </a-checkbox>
      </template>
      <template slot="Thursday" slot-scope="text,record">
          <a-checkbox v-model="record[4]">
          </a-checkbox>
      </template>
      <template slot="Friday" slot-scope="text,record">
          <a-checkbox v-model="record[5]">
          </a-checkbox>
      </template>
      <template slot="Saturday" slot-scope="text,record">
          <a-checkbox v-model="record[6]">
          </a-checkbox>
      </template>
      <template slot="Sunday" slot-scope="text,record">
          <a-checkbox v-model="record[7]">
          </a-checkbox>
      </template>
    </a-table>

  </a-card>
</template>
<script>
import '@/assets/courses/courses.less'
import '@/assets/scss/generalStyle.less'
import { IconFont } from '@/cas/ico.js'
import { nodeSet,wholeSchool,wholeSchoolBC } from '@/api/kw/scheduling'
export default {
  data() {
    return {
      tableLoading: true,
      tableData:[],
      dataToSave:[],
      columns:[
        {
          key:'sectionName',
          title: '',
          align: 'center',
          dataIndex: 'sectionName',
        },
        {
          key:1,
          title: '周一',
          align: 'center',
          dataIndex: 1,
          scopedSlots: { customRender: 'Monday' }
        },
        {
          key:2,
          title: '周二',
          align: 'center',
          dataIndex: 2,
          scopedSlots: { customRender: 'Tuesday' }
        },
        {
          key:3,
          title: '周三',
          align: 'center',
          dataIndex: 3,
          scopedSlots: { customRender: 'Wednesday' }
        },
        {
          key:4,
          title: '周四',
          align: 'center',
          dataIndex: 4,
          scopedSlots: { customRender: 'Thursday' }
        },
        {
          key:5,
          title: '周五',
          align: 'center',
          dataIndex: 5,
          scopedSlots: { customRender: 'Friday' }
        },
        {
          key:6,
          title: '周六',
          align: 'center',
          dataIndex: 6,
          scopedSlots: { customRender: 'Saturday' }
        },
        {
          key:7,
          title: '周日',
          align: 'center',
          dataIndex: 7,
          scopedSlots: { customRender: 'Sunday' }
        },
      ]
    }
  },
  created() {
    this.init()
  },
  components:{
    IconFont
  },
  computed: {},
  methods: {
    async init() {
      const _this = this
      _this.tableLoading = true
      // 数据置空
      _this.tableData = []
      _this.dataToSave = []
      const res1 = await nodeSet()
      const res2 = await wholeSchool()
      // 获取所有排课
      const seectionData = res1.result.records.filter(item => item.status == 1);
      // 不排课打勾的数据
      const selectedDataByDB = res2.result.records
      // 拼凑表格数组
	  const sectionDataMap = {};
      seectionData.forEach(function(item, index , array){
       sectionDataMap[item.id] = {
               id: item.id,
               terminalid: item.terminalid,
               sectionName: item.section,
               1: false,
               2: false,
               3: false,
               4: false,
               5: false,
               6: false,
               7: false
           };
        // _this.tableData.push(tempObj);
      });
	  _this.tableData = Object.values(sectionDataMap);

      // 回显数据赋值
      selectedDataByDB.forEach(function(item, index , array){
		  const targetRecord = _this.tableData.find(record => record.sectionName.indexOf(item.section)!=-1);
		      if (targetRecord) {
		          targetRecord[item.week] = true;
		      }
        // _this.tableData[item.section-1][item.week] = true
      });
      _this.tableLoading = false
    },
    save(){
      const _this = this
      _this.tableLoading = true
      // 遍历tableData，取出true的数据
      _this.tableData.forEach(function(item, index , array){
        for(var i = 1 ; i <= 7 ; i++){
          if(true == item[i]){
            let tempObj = {
              week: i,
              section: item.id,
              terminalid: item.terminalid
            }
            _this.dataToSave.push(tempObj)
          }
        }
      });
      wholeSchoolBC(_this.dataToSave).then((res)=>{
        if(res.code==200){
          _this.$message.success('保存成功');
          _this.init()
        }else {
          _this.$message.error('保存失败');
          _this.tableLoading = false
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
