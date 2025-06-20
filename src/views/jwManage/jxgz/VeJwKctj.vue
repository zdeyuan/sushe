<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="专业部">
                <j-select-zyb placeholder="请选择所属院系" v-model="falid" @input="zybChange"></j-select-zyb>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="课程性质">
                <j-dict-select-tag
                  v-model="kcxz"
                  placeholder="课程性质"
                  dictCode="course_type"
                ></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="7" :lg="6" :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
				<a-button @click="jwKecheng()" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="(kcxz=''),(falid='')" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div v-if="!loading" style="display: flex;justify-content: center">
      <a-spin />
    </div>

    <BarStack v-if="loading" :stackType="true" title="课程统计" :dataSeries="dataSeries" chartId="chartId1" :height="420" :axisLabelType="true" />
  </a-card>
</template>

<script>
import Bar from '@/components/chart/Bar'
import { EduListMixin } from '@/mixins/EduListMixin'
import BarMultid from '@/components/chart/BarMultid'
import BarStack from '@/components/chart/BarStack'
import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
import {  getActionForBase } from '@/api/common/manage'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import ACol from 'ant-design-vue/es/grid/Col'

export default {
  name: 'VeJwKctj',
  mixins: [EduListMixin],
  components: {
    ACol,
    Bar,
    BarMultid,
    BarStack,
    JDictSelectTag,
    JSelectZyb
  },
  data() {
    return {
      loading:false,
      disableMixinCreated: true,
      dataSeries:[],
      deps:{},
      falid:'',
      kcxz:''
    }
  },
  methods:{
    // 数据改造函数
    transformData(apiData) {
      const result = [];
      const groupedData = {};
	
      apiData.forEach(item => {
        if (!groupedData[item.yxmc]) {
          groupedData[item.yxmc] = { name: item.yxmc, data: {} };
        }
        groupedData[item.yxmc].data[item.itemText] = item.count;
      });

      for (const key in groupedData) {
        result.push(groupedData[key]);
      }

      return result;
    },
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
    depSelect(value) {
      console.log(value)
      this.falid=value;
      this.jwKecheng();
    },
    jwKecheng(){
          let data={
            falid:this.falid,
            kcxz:this.kcxz
          }
          this.loading=false;
          getAction('/jxzy/jwKecheng/statistics',data).then(res=>{
            if(res.success){
						this.dataSeries = this.transformData(res.result);
						this.loading = true;
                   
            }
          })
    },
  },
  created() {
    this.jwKecheng();
  }
}
</script>

<style></style>
