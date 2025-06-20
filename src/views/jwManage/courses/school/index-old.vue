<template>
  <a-card :bordered="false">
    <div v-show="false" style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">
      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">排课管理</p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">全校不排课时间</p>
    </div>
    <div style="margin-bottom: 20px">
      <a-button @click="bcBut" style="background-color: #0098F8;color: #FFFFFF;margin-right: 20px">保存</a-button>
      <a-button style=" background-color: #66C3FD;color: #FFFFFF;margin-right: 20px">
        <IconFont style="font-weight: bold;" type="iconshuaxin" />
        刷新
      </a-button>
    </div>

    <a-table :columns="columns" :data-source="seectionSData">
      <span slot="zy" slot-scope="text,record,index">
          <a-checkbox  @change="onChange(text,record,index=1)">
        </a-checkbox>
      </span>
      <span slot="ze" slot-scope="text,record,index">
            <a-checkbox  @change="onChange(text,record,index=2)">
        </a-checkbox>
      </span>
      <span slot="zs" slot-scope="text,record,index">
         <a-checkbox  @change="onChange(text,record,index=3)">
        </a-checkbox>
      </span>
      <span slot="zsS" slot-scope="text,record,index">
         <a-checkbox  @change="onChange(text,record,index=4)">
        </a-checkbox>
      </span>
      <span slot="zw" slot-scope="text,record,index">
          <a-checkbox  @change="onChange(text,record,index=5)">
        </a-checkbox>
      </span>
      <span slot="zl" slot-scope="text,record,index">
         <a-checkbox  @change="onChange(text,record,index=6)">
        </a-checkbox>
      </span>
      <span slot="zr" slot-scope="text,record,index">
          <a-checkbox  @change="onChange(text,record,index=7)">
        </a-checkbox>
      </span>
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
      columns:[
        {
          title: '',
          align: 'center',
          dataIndex: 'section',
        },
        {
          title: '周一',
          align: 'center',
          scopedSlots: { customRender: 'zy' }
        },
        {
          title: '周二',
          align: 'center',
          scopedSlots: { customRender: 'ze' }
        },
        {
          title: '周三',
          align: 'center',
          scopedSlots: { customRender: 'zs' }
        },
        {
          title: '周四',
          align: 'center',
          scopedSlots: { customRender: 'zsS' }
        },
        {
          title: '周五',
          align: 'center',
          scopedSlots: { customRender: 'zw' }
        },
        {
          title: '周六',
          align: 'center',
          scopedSlots: { customRender: 'zl' }
        },
        {
          title: '周日',
          align: 'center',
          scopedSlots: { customRender: 'zr' }
        },
      ],
      seectionData:[],
      seectionSData:[],
      sjData:[],
      seteList:[
        { se:false },
        { se:true },
        { se:true },
        { se:false },
        { se:true },
        { se:true },
        { se:true },
        { se:true },
        { se:false }
      ]
    }
  },
  created() {
    this.getSeection()
    this.getList()
  },
  components:{
    IconFont
  },
  computed: {},
  methods: {
    getSeection(){
      nodeSet().then((res)=>{
        console.log(res)
        this.seectionData = res.result.records
        console.log(this.seectionData.filter(item => item.status == 1))
        this.seectionSData = this.seectionData.filter(item => item.status == 1)
      })
    },
    getList(){
      wholeSchool().then((res) =>{

      })
    },

    onChange(text,record,index) {
      console.log(index)
      let fsData = {}
      fsData.week = index
      fsData.section = record.id
      fsData.terminalid = record.terminalid
      this.sjData.push(fsData)
      console.log(this.sjData)
    },
    bcBut(){
      console.log(this.sjData)
      wholeSchoolBC(this.sjData).then((res)=>{
        console.log(res)
        if(res.code==200){
          this.$message.success('保存成功');
        }else {

        }
      })
    }
  }
}
</script>
<style scoped>

</style>
