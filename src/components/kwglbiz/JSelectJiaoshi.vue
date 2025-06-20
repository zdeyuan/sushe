<template>
  <j-select-biz-component
    :value="value"
    name="教室名称"
    displayKey="jsmc"
    queryParamCode="jsmc"
    width="100%"
    :ellipsisLength="ellipsisLength"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="教室名称"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectJiaoshi',
    components: { JSelectBizComponent },
    props: ['value','jxrwid','multiple'],
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        // 过长裁剪长度，设置为 -1 代表不裁剪
        ellipsisLength:-1,
        returnKeys: ['id', 'jsmc'],
        defaultUlr:'/jxzy/jwJiaoshi/list',
        url: { list: '/jxzy/jwJiaoshi/list' },
        columns: [
          // { title: '校区', dataIndex: 'campusidName', align: 'center', width: 150 },
          { title: '名称', dataIndex: 'jsmc', align: 'center' },
          { title: '教学楼', dataIndex: 'jzid_dictText', align: 'center', width: 200 },
        ]
      }
    },
    created() {
      if(this.jxrwid!=null){
        this.url.list = this.defaultUlr+'?jxrwid='+this.jxrwid;
      }
    }
  }
</script>

<style lang="less" scoped></style>