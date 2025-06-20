<!--/**
* Author: ganqz
* Date: 2021-06-05 17:45
* Desc: NumberSwitch
*/
-->
<template>
 <a-switch v-model="currentValue"></a-switch>
</template>

<script>
export default {
  name: 'NumberSwitch',
  props:{
      value:{
          type:[Boolean,Number],
          default:false
      },
  },
  model:{
      prop:'value',
      event:'change'
  },
  components: {},
  data () {
    return {}
  },
  computed: {
      currentValue:{
          get(){
              return this.value?true:false
          },
          set(val){
              console.log('switch',val)
              this.$emit('change',val?1:0)
          }
      }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>
