<template>
  <j-select-biz-component
    :value="value"
	:width="width"
    name="课程名称"
    displayKey="kcmc"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="课程名称"
    queryParamCode="kcmc"
    :multiple="multi"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectJiaoxueKecheng',
    components: { JSelectBizComponent },
    props:{
		 value:String||Number,
		 xmtype:Number,
		 multi:Boolean,
		 width:{
			 type:String,
			 default:'80%'
		 },
	},
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        returnKeys: ['id', 'kcmc'],
        defaultUlr:'/jxzy/jwKecheng/list',
        url: { list: '/jxzy/jwKecheng/list' },
        columns: [
          { title: '课程名称', dataIndex: 'kcmc', align: 'center', width: 200 },
          { title: '课程号', dataIndex: 'kch', align: 'center', width: 200 },
          { title: '课程性质', dataIndex: 'kcxz_dictText', align: 'center', width: 80 },
          // { title: '专业组', dataIndex: 'jyzidName', align: 'center', width: 80 },
          { title: '项目类型', dataIndex: 'xmtype_dictText', align: 'center', width: 80 },
          { title: '状态', dataIndex: 'status_dictText', align: 'center', width: 60 }
        ]
      }
    },
    created() {
      if(this.xmtype!=null){
        this.url.list = this.defaultUlr+'?xmtype='+this.xmtype;
      }
    }
  }
</script>

<style lang="less" scoped></style>