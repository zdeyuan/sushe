<template>
  <a-button :loading="loading" type="text" @click="toDownload">
    导出
  </a-button>
</template>
<script>
import {downFile} from '@/api/common/manage'
export default {
  name: 'ZmEnclosure',
  props: {
    params: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    columns:{
      type: [Object,Array],
      default: ()=>{
        return []
      }
    },
    url:{
       type: String,
      default: ''
    },
    fileName:{
       type: String,
      default: ''
    },
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
  },
  created () {},
  mounted () {},
  methods: {
    getQueryField() {
      //TODO 字段权限控制
      var str = "id,";
      this.columns.forEach(function (value) {
        str += "," + value.dataIndex;
      });
      return str;
    },
    async toDownload () {
      console.log('export',this.params)
      this.loading = true
      const params = {...this.params,filed:this.getQueryField()}
      try {
        let res = await downFile(
          this.url,
         params
        )
        console.log(res)
        this.loading = false
        this.downloadFile(res)
      } catch (error) {
        this.loading = false
      }
    },
    downloadFile (blob) {
      if (!blob) {
        return
      }
      let _blob = new Blob([blob])
      let url = window.URL.createObjectURL(_blob)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', this.fileName+'.xls' || '下载.xls')
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
      }, 20000)
    }
  }
}
</script>
