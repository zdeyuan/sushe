<template>
<j-select-biz-component
    :value="value"
    :width="200"
    name="课程"
	displayKey="kcmc"
    queryParamCode="kcmc"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="url.list"
    :columns="columns"
    :canBatch="canBatch"
    queryParamText="课程"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectKeCen',
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
	    default: 'kcmc'
	  },
      lableKey:{
        type: String,
        default: 'kcmc'
      },
    },
    data() {
      return {
        canBatch:false,
        returnKeys: ['id', 'kch', 'kcmc'],
        url: { list: '/jxzy/jwKecheng/list?status=1' },
        columns: [
          { title: '课程号', dataIndex: 'kch', align: 'center', width: 120 },
		  { title: '课程名称', dataIndex: 'kcmc', align: 'center', width: 120 },
        ]
      }
    }
  }
</script>

<style lang="less" scoped></style>