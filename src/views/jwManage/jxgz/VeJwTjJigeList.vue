<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
			<a-row :gutter="24">
			  <a-col :md="7" :sm="24">
			    <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
			  	<JSelectGrade v-model="queryParam.gradeId" placeholder="请选择年级"></JSelectGrade>
			    </a-form-item>
			  </a-col>
			  <a-col :md="7" :sm="24">
			    <a-form-item label="专业部" :labelCol="labelCol" :wrapperCol="wrapperCol">
			      <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falId" @input="zybChange"></j-select-zyb>
			    </a-form-item>
			  </a-col>
			  
			  <a-col :md="7" :sm="24">
			    <a-form-item  label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
			      <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specId" @input="zyChange"></j-select-zy-by-zyb>
			    </a-form-item>
			  </a-col>
			  <a-col :md="7" :sm="24">
			    <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
			  	<JSelectXueqi v-model="queryParam.semId" placeholder="请选择学期"></JSelectXueqi>
			    </a-form-item>
			  </a-col>
			  <a-col :md="7" :sm="24"  >
			    <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
			      <j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择班级"
			                            v-model="queryParam.xzbId"></j-select-banji-by-zy>
			    </a-form-item>
			  </a-col>
            <a-col   :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button @click="searchQuery" type="primary" icon="search"
                	style="margin-right: 10px;">搜索</a-button>
                <a-button @click="searchReset" type="danger" icon="delete"
                	style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <BarMultid title="及格率统计图" v-if="loading" :dataSource="dataSource" :height="420" :fields="fields" />
  </a-card>
</template>

<script>
import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
import BarMultid from '@/components/chart/BarMultid'
import { EduListMixin } from '@/mixins/EduListMixin'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
export default {
  name: 'VeJwTjJigeList',
  mixins: [EduListMixin],
  components: {
    BarMultid,
	JSelectZyb,
	JSelectZyByZyb,
	JSelectXueqi,
	JSelectBanjiByZy,
	JSelectGrade
  },
  data() {
    return {
		queryParam:{},
      description: 've_jw_tj_jige管理页面',
      disableMixinCreated: true,
      fields: ['计算机学院', '机械工程学院', '电子信息学院', '旅游与服务学院', '经济管理学院', '商务职业学院'],
      dataSource: [],
	  loading:false,
	  labelCol: {
	    xs: { span: 24 },
	    sm: { span: 5 },
	  },
	  wrapperCol: {
	    xs: { span: 24 },
	    sm: { span: 16 },
	  },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  created() {
    this.searchQuery();
  },
  methods: {
	  searchReset(){
		this.queryParam={}  
	  },
	  zybChange(code) {
	    if (this.$refs.zyByZyb != null) {
	      this.$refs.zyByZyb.initDictData(code)
	    }
	  },
	  zyChange() {
	    if (this.$refs.banjiByZy != null) {
	      this.$refs.banjiByZy.initDictData(this.queryParam.specid)
	    }
	  },
    transformData(apiData) {
      const result = [];
      const groupedData = {};
    
      apiData.forEach(item => {
        if (!groupedData[item.yxmc]) {
          groupedData[item.yxmc] = { name: item.yxmc, data: {} };
        }
        groupedData[item.yxmc].data[item.itemText] = item.passRate;
      });
    
      for (const key in groupedData) {
        result.push(groupedData[key]);
      }
    
      return result;
    },
	searchQuery(){
	      this.loading=false;
	      getAction('/kwgl/veJwChengji/passRateStatistics',this.queryParam).then(res=>{
	        if(res.success){
						if(res.result.length>0){
							this.fields=res.result.map(item => item.yxmc);
							let source=res.result.reduce((acc, item) => {
							    acc[item.yxmc] = item.passRate;
							    return acc;
							}, { type: '及格率%' });
							this.dataSource.push(source)
							this.loading = true;
						}else{
							this.dataSource=[];
							this.fields=[];
						}
						
	               
	        }
	      })
	},
  },
}
</script>
<style scoped>

</style>