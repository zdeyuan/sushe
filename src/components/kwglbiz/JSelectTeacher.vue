<template>
<j-select-biz-component
    :value="value"
    width="80%"
    name="教师"
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
    name: 'JSelectTeacher',
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
        url: { list: '/common/veCommon/getTeacherPageList' },
        columns: [
          { title: '姓名', dataIndex: 'xm', align: 'center', width: 120 },
          { title: '教研组', dataIndex: 'jyz_name', align: 'center', width: 320 },
          { title: '部门', dataIndex: 'dep_name', align: 'center', width: 120 },

        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>