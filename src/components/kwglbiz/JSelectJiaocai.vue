<template>
  <j-select-biz-component
    :value="value"
    name="教材名次"
    displayKey="jcmc"
    queryParamCode="jcmc"
    width="80%"
    :ellipsisLength="ellipsisLength"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="教材名称"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectJiaocai',
    components: { JSelectBizComponent },
    props: ['value'],
    data() {
      return {
        returnId: true,
        multiple: false,
        isorter: [],
        // 过长裁剪长度，设置为 -1 代表不裁剪
        ellipsisLength: -1,
        returnKeys: ['id', 'id'],
        defaultUlr: '/jxzy/jwJiaocai/list',
        url: { list: '/jxzy/jwJiaocai/list' },
        columns: [
          { title: '教材名称', dataIndex: 'jcmc', align: 'center' },
          { title: '教材代码', dataIndex: 'jcdm', align: 'center' },
          {
            title: '教材类别', dataIndex: 'jclb', align: 'center',
            customRender: function(t, r, index) {
              return t == null || t == 0 ? '' : t == 1 ? '校本教材' : '通用教材'
            }
          }
        ]
      }
    },
    created() {
    }
  }
</script>

<style lang="less" scoped></style>