<template>
  <j-select-biz-component
    :value="value"

    name="考试名称"
    displayKey="name"
    queryParamCode="name"
    width="80%"
    :ellipsisLength="ellipsisLength"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="考试名称"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectKaoshi',
    components: { JSelectBizComponent },
    props: ['value','jxrwid'],
    data() {
      return {
        returnId:true,
        multiple:false,
        isorter: [],
        // 过长裁剪长度，设置为 -1 代表不裁剪
        ellipsisLength:-1,
        returnKeys: ['id', 'name'],
        defaultUlr:'/kwgl/veJwKaoshi/list',
        url: { list: '/kwgl/veJwKaoshi/list' },
        columns: [
          { title: '考试名称', dataIndex: 'name', align: 'center' },
          // { title: '院系', dataIndex: 'falidName', align: 'center', width: 150 },
          // { title: '专业', dataIndex: 'specidName', align: 'center', width: 200 },
          // { title: '年级', dataIndex: 'gradeidName', align: 'center', width: 80 },
          // { title: '学期', dataIndex: 'semidName', align: 'center', width: 80 },
          // { title: '学制', dataIndex: 'xzidName', align: 'center', width: 60 }
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