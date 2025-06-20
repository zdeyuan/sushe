<!--/**
* Author: ganqz
* Date: 2021-06-06 16:13
* Desc: RangeTime
*/
-->
<template>
  <a-range-picker
    v-model="currentValue"
    :format="format"
    :value-format="valueFormat"
    :placeholder="['开始时间', '结束时间']"
  />
    <!-- @change="onChange" -->
</template>

<script>
export default {
  name: 'RangeTime',
  components: {},
  props: {
    target: {
      type: Object,
      default: () => {
        return {}
      }
    },
    valueFormat:{
        type:String,
        default:'YYYY-MM-DD HH:mm:ss'
    },
    format:{
        type:String,
        default:'YYYY-MM-DD HH:mm:ss'
    },
    startKey: {
      type: String,
      default: 'startTime'
    },
    endKey: {
      type: String,
      default: 'endTime'
    }
  },
  data() {
    return {}
  },
  computed: {
    currentValue: {
      get() {
        const target = this.target
        return target[this.startKey] ? [target[this.startKey], target[this.endKey]] : []
      },
      set(value) {
        const target = this.target
        target[this.startKey] = value.length ? value[0] : ''
        target[this.endKey] = value.length ? value[1] : ''
        this.$emit('change', {
          [this.startKey]: value.length ? value[0] : '',
          [this.endKey]: value.length ? value[1] : ''
        })
      }
    }
  },
  watch: {},
  created() {
      this.$set(this.target,this.startKey,this.target[this.startKey] || '')
      this.$set(this.target,this.endKey,this.target[this.endKey] || '')
  },
  methods: {
  }
}
</script>
