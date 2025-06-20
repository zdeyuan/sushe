<template>
<j-select-biz-component
    :value="value"
    :width="width"
    name="成绩类型"
	displayKey="name"
    queryParamCode="name"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="url.list"
    :columns="columns"
    :canBatch="canBatch"
    queryParamText="成绩类型"
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
        returnKeys: ['id', 'name', 'status_dictText'],
        url: { list: '/kwgl/veJwCjlx/list?status=1' },
        columns: [
          { title: '类型名称', dataIndex: 'name', align: 'center', width: 120 },
		  { title: '状态', dataIndex: 'status_dictText', align: 'center', width: 120 },
        ]
      }
    },
  }
</script>

<style lang="less" scoped></style>