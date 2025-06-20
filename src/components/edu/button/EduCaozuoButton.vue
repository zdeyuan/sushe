<template>
  <button :class="getClassByType()" @click="$emit('click')">
    <a-icon v-if="icon!=null" :type="icon" style="margin-right: 4px"/>
    {{title}}
  </button>
</template>

<script>
  export default {
    name: 'EduCaozuoButton',
    props: {
      type: String,
      title: '',
      aIcon: null,
      icon: ''
    },
    methods: {
      getClassByType() {
        let value = ''
        if (this.type == 'primary') {
          value += 'color_1'
        } else if (this.type != null && this.type != '') {
          return 'button_default color_' + this.type
        }
        return 'button_default ' + value
      }
    }
  }
</script>

<style scoped>
  .button_default {
    font-family: Microsoft YaHei;
    font-size: 16px;
    width: 140px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    height: 46px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 16px;
  }

  .button_default:focus, .button_default:active:focus, .button_default.active:focus, .button_default.focus, .button_default:active.focus, .button_default.active.focus {
    outline: none;
    border-color: transparent;
    box-shadow: none;
  }

  .button_default:hover {
    opacity: 0.7;
  }

  .color_1 {
    color: #ffffff;
    background-color: #0098f8;
  }

  .color_2 {
    color: #ffffff;
    background-color: #00bad0;
  }

  .color_3 {
    color: #ffffff;
    background-color: #fc8950;
  }

  .color_4 {
    color: #ffffff;
    background-color: #4ecb8d;
  }

  .color_5 {
    color: #ffffff;
    background-color: #999999;
  }

  .color_6 {
    background-color: #ffffff;
    color: #999999;
    border: 2px solid #cccccc;
  }

  .color_11 {
    color: #ffffff;
    background-color: #0098f8;
    margin-right: 10px;
    margin-bottom: 0px;
    margin-right: 20px;
    height: 40px;
    min-width: 100px;
    width: 100px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }

  .color_15 {
    color: #ffffff;
    background-color: #999999;
    margin-left: 10px;
    margin-bottom: 0px;
    height: 40px;
    min-width: 100px;
    width: 100px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
</style>