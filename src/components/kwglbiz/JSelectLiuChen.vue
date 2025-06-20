<template>
    <j-select-biz-component
        :value="value"
        :width="900"
        name="流程"
        queryParamCode="name"
        :lableKey="lableKey"
        :returnKeys="returnKeys"
        :returnId="returnId"
        :listUrl="url.list"
        :columns="columns"
        :canBatch="canBatch"
        queryParamText="流程选择"
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
            returnKeys: ['id', 'name'],
            url: { list: '/sys/processType/select' },
            columns: [
              { title: '流程类型名称', dataIndex: 'name', align: 'center', width: 120 },
            ]
          }
        }
      }
    </script>
    
    <style lang="less" scoped></style>