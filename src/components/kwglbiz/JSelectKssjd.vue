<template>
  <j-select-biz-component
    :value="value"
    name="考试时间段"
    displayKey="name"
    width="80%"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="考试时间段"
    queryParamCode="name"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectKssjd',
    components: { JSelectBizComponent },
    props: ['value'],
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        returnKeys: ['id', 'name'],
        url: { list: '/kwgl/veJwKssjd/list' },
        columns: [
          { title: '考试时间段', dataIndex: 'name', align: 'center', width: 200 },
          { title: '开始时间', dataIndex: 'starttime', align: 'center', width: 100 },
          { title: '结束时间', dataIndex: 'endtime', align: 'center', width: 100 },
          { title: '状态', dataIndex: 'status_dictText', align: 'center', width: 60 }
        ]
      }
    },
    created() {
    }
  }
</script>

<style lang="less" scoped></style>