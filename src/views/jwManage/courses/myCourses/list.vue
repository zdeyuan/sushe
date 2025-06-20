<template>
  <a-card :bordered="false">
     
  </a-card>
</template>
<script>
import '@/assets/scss/generalStyle.less'
import {volun,volunList } from '@/api/kw/scheduling'
import {querySemesterList} from '@/api/base/common-veCommon.js'
export default {
  data() {
    return {
    }
  },
  created() {
	  this.search();
  },
  components: {
  },
  computed: {},
  methods: {
	  search(){
		  
	  }
  }
}
</script>
<style scoped>
</style>
