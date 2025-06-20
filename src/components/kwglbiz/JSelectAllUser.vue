<template>
<j-select-biz-component
    :value="value"
    name="人员"
	displayKey="realName"
    queryParamCode="realName"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="url.list"
    :columns="columns"
    :canBatch="canBatch"
	:width="width"
    queryParamText="人员"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectGoyinshang',
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
	    default: '150'
	  },
      lableKey:{
        type: String,
        default: 'name'
      },
    },
    data() {
      return {
        canBatch:false,
        returnKeys: ['userId', 'realName'],
        url: { list: '/common/veCommon/getAllAppUser' },
        columns: [
          { title: '人员名称', dataIndex: 'realName', align: 'center', width: 120 },
        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>