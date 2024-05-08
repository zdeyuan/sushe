<template>
  <div class="teamItem">
    <div class="teamcolor" v-for="(item,index) in  sexList" :key="index" :class="sexcur==index?'teamBack':''" @click="select(index)">
      <div class="woldsize">{{item}}</div>
    </div>
    <div v-if="sexcur==0" style="background-color: #0c8fcf;">
      <cDynamic></cDynamic>
    </div>
  </div>
</template>

<script>
import '@/assets/less/cont.less'
import cDynamic from '@views/gateway/cont/modules/cProfess/cDynamic'
export default {
  name: 'index',
  components: {
    cDynamic,
  },
  data() {
    return {
      sexcur:0,
      sexList:['建设动态','政策研究'],
    }
  },
  computed: {
  },

  methods: {
    select(index){
      this.sexcur=index
      console.log(this.sexcur)
    }
  },
}
</script>

<style scoped>

</style>