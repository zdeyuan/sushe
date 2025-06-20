<template>
<j-select-biz-component
    :value="value"
    :width="900"
    name="班级"
    queryParamCode="xzbmc"
    :lableKey="lableKey"
    :returnKeys="returnKeys"
    :returnId="returnId"
    :listUrl="curUrl"
    :columns="columns"
    :canBatch="canBatch"
    queryParamText="班级名称"
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
        url: { list: '/common/veCommon/queryBanJiPageList' },
        columns: [
          { title: '班级名称', dataIndex: 'xzbmc', align: 'center', width: 120 },
          { title: '年级', dataIndex: 'njmc', align: 'center', width: 120 },
          { title: '专业', dataIndex: 'spec_name', align: 'center', width: 120 },

        ]
      }
    },
	computed:{
		curUrl(){
			if(this.$hasPer(['bzr'])){
				return '/stu/veBaseTeacher/teacherAllbanjin'
			}else{
				return '/common/veCommon/queryBanJiPageList'
			}
		}
	}
  }
</script>

<style lang="less" scoped></style>