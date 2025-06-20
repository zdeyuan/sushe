<template>
<j-select-biz-component
    :value="value"
    width="80%"
    name="学生"
    queryParamCode="xm"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :canBatch="canBatch"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="姓名"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectBizComponent'

  export default {
    name: 'JSelectStudent',
    components: { JSelectBizComponent },
    props: {
      value: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      returnId: {
        type: Boolean,
        default: true
      },
      lableKey:{
        type: String,
        default: 'xm'
      },
    },
    data() {
      return {
        canBatch:false,
        returnKeys: ['id', 'xm'],
        url: { list: '/common/veCommon/getStudentPageList' },
        columns: [
          { title: '姓名', dataIndex: 'xm', align: 'center', width: 120 },
          { title: '学号', dataIndex: 'xh', align: 'center', width: 120 },
          { title: '年级', dataIndex: 'njmc', align: 'center', width: 120 },
          { title: '院系', dataIndex: 'yxmc', align: 'center', width: 150 },
          { title: '行政班', dataIndex: 'xzbmc', align: 'center', width: 220 },

        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>