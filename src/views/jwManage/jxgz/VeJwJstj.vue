<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->

    <div style="text-align: center;margin-bottom: 2.5rem;">
        <span>数字化校园教师数量统计</span>
    </div>
    <div v-if="!loading" style="display: flex;justify-content: center">
      <a-spin />
    </div>
    <div v-if="loading" style="display: flex;flex-wrap: wrap">
      <div class="man-lift" v-for="(item,index) in statisticsList" :key="index">
        <pieChart :dataSeries="item.dataSeriesPie" :chartId="'chartId'+index" :subtext="item.xqmc" title="" :height="420"></pieChart>
      </div>
    </div>

  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import Pie from '@/components/chart/Pie.vue'
import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
import pieChart from '@/components/chart/pieChart.vue'

export default {
  name: 'VeJwJstj',
  mixins: [EduListMixin],
  components: {
    Pie,
    pieChart
  },
  data() {
    return {
      loading:false,
      disableMixinCreated: true,
      statisticsList:[],
      dataSeriesPie:[
        {value: 40, name: 'rose 1'},
        {value: 33, name: 'rose 2'},
        {value: 28, name: 'rose 3'},
        {value: 22, name: 'rose 4'},
        {value: 20, name: 'rose 5'},
        {value: 15, name: 'rose 6'},
        {value: 12, name: 'rose 7'},
        {value: 20, name: 'rose 8'}
      ]
    }
  },
  methods:{
    statistics(){
      this.loading=false;
      getAction('/jxzy/jwJiaoshi/statistics').then(res=>{
        if(res.success){
          for (var i=0;i<res.result.length;i++){
            let dataSeriesPie=[];
            res.result[i].jslxsl.forEach(ret=>{
              dataSeriesPie.push({
                name:ret.name,
                value:ret.count
              })
            })
            res.result[i]['dataSeriesPie']=dataSeriesPie;
          }
          this.statisticsList=res.result;
          this.loading=true;
        }
      })
    }
  },
  created(){
    this.statistics();
  }
}
</script>

<style>
.man-lift {
  width: 46%;
  height: 650px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px #e9edf6;
  border-radius: 2px;
  padding: 15px 10px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 20px;
}
</style>
