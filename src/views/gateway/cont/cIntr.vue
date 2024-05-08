<template>
  <a-card :bordered="false" >
    <div style="margin: 0 auto;position: relative;height: 700px">

      <div class="teamItem2">
        <div class="teamcolor2" v-for="(item,index) in  sexList" :key="index" :class="sexcur==index?'teamBack2':''" @click="select(index)">
          <div class="woldsize2">{{item}}</div>
        </div>
      </div>
      <div style="padding-top: 50px;margin: 0 auto;width: 1200px">
        <div>
          <p style="display: inline-block">摘要：</p>
          <a-input style="display: inline-block;width: 800px" placeholder="汽车制造与检修"></a-input>
        </div>
        <div style="margin-top: 20px;height: 300px">
          <p style="display: inline-block">内容：</p>
          <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 75%;'></vue-editor>
        </div>
        <div class="table-operator" style="margin-left: 40px">
          <a-button style="height: 40px;width: 100px;" @click=" " type="primary">保存</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import '@/assets/less/cont.less'
export default {
  name: 'cIntr',
  components: {
    VueEditor,
  },
  data() {
    return {
      sexcur:0,
      sexList:['汽车制造与检修专业'],
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