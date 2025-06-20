<template>
  <j-select-biz-component
    :value="value"

    name="时间段名称"
    displayKey="name"
    width="80%"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="时间段名称"
    queryParamCode="name"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectKaoshiShijianduan',
    components: { JSelectBizComponent },
    props: ['value','xmtype'],
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        returnKeys: ['id', 'name'],
        defaultUlr:'/kwgl/veJwKssjd/list',
        url: { list: '/kwgl/veJwKssjd/list' },
        columns: [
          { title: '时间段名称', dataIndex: 'name', align: 'center', width: 200 },
          { title: '开始时间', dataIndex: 'starttime', align: 'center', width: 120 },
          { title: '结束时间', dataIndex: 'endtime', align: 'center', width: 120 },
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