<template>
<j-select-biz-component
    :value="value"
    name="角色"
	displayKey="text"
    queryParamCode="text"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="url.list"
    :columns="columns"
    :canBatch="canBatch"
	width="150px"
    queryParamText="角色"
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
	    default: 'name'
	  },
      lableKey:{
        type: String,
        default: 'name'
      },
    },
    data() {
      return {
        canBatch:false,
        returnKeys: ['id', 'text'],
        url: { list: '/common/veCommon/querySysRoleList' },
        columns: [
          { title: '角色名称', dataIndex: 'text', align: 'center', width: 120 },
        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>