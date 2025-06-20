<template>
  <j-select-biz-component
    :value="value"
    name="学生姓名"
    displayKey="xm"
    width="80%"
    :returnId="returnId"
    :returnKeys="returnKeys"
    :listUrl="url.list"
    :columns="columns"
    queryParamText="学生姓名"
    queryParamCode="xm"
    :multiple="multiple"
    v-on="$listeners"
    v-bind="$attrs"
  />
</template>

<script>
  import JSelectBizComponent from './JSelectJwBiz'

  export default {
    name: 'JSelectBukaoXuesheng',
    components: { JSelectBizComponent },
    props: ['value','xmtype'],
    data() {
      return {
        returnId:true,
        multiple:true,
        isorter: [],
        returnKeys: ['id', 'xm'],
        defaultUlr:'/kwgl/veJwBkXuesheng/list',
        url: { list: '/kwgl/veJwBkXuesheng/list' },
        columns: [
          { title: '学生', dataIndex: 'xm', align: 'center', width: 150 },
          { title: '学号', dataIndex: 'xh', align: 'center', width: 150 },
          // { title: '年级', dataIndex: 'gradeidName', align: 'center', width: 150 },
          // { title: '学期', dataIndex: 'semidName', align: 'center', width: 150 },
          // { title: '院系', dataIndex: 'falidName', align: 'center', width: 150 },
          // { title: '专业', dataIndex: 'specidName', align: 'center', width: 150 },
          // { title: '补考考试', dataIndex: 'bkid', align: 'center', width: 60,
          //   customRender: (value, row, index) => {
          //     return value!=null && value!=0 ? "已安排":"未安排";
          //   }}
        ]
      }
    },
    created() {
      if(this.xmtype!=null){
        this.url.list = this.defaultUlr+'?xmtype='+this.xmtype;
      }
    }
  }
</script>

<style lang="less" scoped></style>