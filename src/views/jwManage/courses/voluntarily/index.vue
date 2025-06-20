<template>
  <a-card :bordered="false">
    <!--
    <div style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">
      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">排课管理</p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">自动排课</p>
    </div>-->
    <div style="background: #E9EDF6;width: 100%;height: 140px;padding: 20px;margin-bottom: 20px">
      <p class="v-text1">排课说明：</p>
      <p class="v-text1">1、排课只针对必修课程，选修课程请在创建教学班时安排上课老师、教室和节次。</p>
      <p class="v-text1">2、排课是多种资源的分配过程，排课过程中难免发生冲突，可能需要多次排课才能有结果。</p>
      <p class="v-text1">3、如果多次排课失败，请检查各教学任务及排课设置是否合理或超出学校资源的最大承载量</p>
    </div>

    <div style="margin-bottom:5px;">
      <p style="display:inline-block;margin-right: 10px">学期</p>
      <a-select style="display: inline-block;width: 143px;margin-right: 10px" @change='hqId'>
        <a-select-option v-for="(item,index) in semesterData" :key="index.id" :value="item.id">
          {{item.xqmc}}
        </a-select-option>
      </a-select>

      <a-button @click='zdpk' type="primary">
        点击自动排课
      </a-button>

    </div>

    <a-button @click='sx' type="primary">
      <IconFont style="font-weight: bold;" type="iconshuaxin" />
      刷新
    </a-button>
	<!-- <a-button type="primary" style="display: inline-block" @click="toResult">
	  查看排课结果
	</a-button> -->
    <div style="margin-top: 20px">
      <a-table :columns="columns" :data-source="listData">

      </a-table>
    </div>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico.js'
import '@/assets/scss/generalStyle.less'
import {volun,volunList } from '@/api/kw/scheduling'
import {querySemesterList} from '@/api/base/common-veCommon.js'
const columns = [
  {
    title: '学期',
    dataIndex: 'xqmc',
    key: 'xqmc',
  },
  {
    title: '课程数量',
    dataIndex: 'kcCount',
    key: 'kcCount',
  },
  {
    title: '排课状态',
    dataIndex: 'pkStatus',
    key: 'pkStatus',
  }
];
export default {
  data() {
    return {
      columns,
      semesterData:[],
      jkid:'09d5e1e7f9b049008eee645c783a1d67',
      pageNo:1,
      pageSize:10,
      listData:[],
      overWrite:'',
      semId:''
    }
  },
  created() {
    this.getSemeList()
    this.getVolun()
  },
  components: {
    IconFont
  },
  computed: {},
  methods: {
    //学期
    getSemeList(){
      querySemesterList(this.jkid).then((res) =>{
        // console.log(res)
        this.semesterData = res.result
        // console.log(res.result)
      })
    },
    hqId(value){
      console.log(value)
      this.semId = value
    },
    getVolun(){
      var pageNo = ''
      var pageSize = ''
      pageNo = this.pageNo
      pageSize = this.pageSize
      volunList(pageNo,pageSize).then((res) =>{
        console.log(res)
        this.listData = res.result.records
      })
    },
	toResult(){
			this.$router.push({
					path:'/tjcx/kbcx'
			})
	},
    onChange1(e){
      console.log(e)
      this.overWrite = e
    },
    sx(){
      this.getVolun()
    },
    zdpk(){
      var overWrite = ''
      var semId =''
      overWrite = 1
      semId = this.semId
      const item = this.semesterData.find(item=>item.id===this.semId)
      let params = {overWrite,semId}
      if(item) {
        params.xqmc=item.xqmc
        params.xqnj=item.xn
      }
      volun({...params}).then((res) =>{
        if(res.code==200){
          this.$message.success(res.message||res.result)
          this.getVolun()
        } else{
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.v-text1{
  margin-bottom: 0;
  font-size: 16px;
  font-weight: bold;
  color: #666666;
}
</style>
