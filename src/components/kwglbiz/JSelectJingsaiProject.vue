<template>
  <j-select-biz-component
    :value="value"

    name="竞赛项目"
    displayKey="name"
    queryParamCode="name"
    width="80%"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="项目名称"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectJingsaiProject',
    components: { JSelectBizComponent },
    props: ['value','xmtype'],
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        returnKeys: ['id', 'name'],
        defaultUlr:'/edu-schedule/jingsaiProject/veJwJingsaiProject/list',
        url: { list: '/edu-schedule/jingsaiProject/veJwJingsaiProject/list' },
        columns: [
          { title: '项目名称', dataIndex: 'name', align: 'center', width: 200 },
          { title: '举办单位', dataIndex: 'jbdw', align: 'center', width: 200 },
          { title: '竞赛类别', dataIndex: 'jslb_dictText', align: 'center', width: 80 },
          { title: '竞赛级别', dataIndex: 'jsjb_dictText', align: 'center', width: 80 },
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