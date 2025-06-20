<template>
<j-select-biz-component
    :value="value"
    :width="900"
    name="年级"
    queryParamCode="xzbmc"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="url.list"
    :columns="columns"
    :canBatch="canBatch"
    queryParamText="年级名称"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectBizComponent'

  export default {
    name: 'JSelectBanji',
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
	  width:{
	    type: String,
	    default: 'xzbmc'
	  },
      lableKey:{
        type: String,
        default: 'xzbmc'
      },
    },
    data() {
      return {
        canBatch:false,
        returnKeys: ['id', 'xzbmc'],
        url: { list: '/common/veBase/getSemesterPageList' },
        columns: [
          { title: '年级名称', dataIndex: 'xzbmc', align: 'center', width: 120 },
          { title: '年级代码', dataIndex: 'njmc', align: 'center', width: 120 },

        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>