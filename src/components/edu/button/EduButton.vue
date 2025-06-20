<template>
  <button :class="getClassByType()" @click="$emit('click')">
    <a-icon v-if="!rightIcon && icon!=null" :type="icon" style="margin-right: 4px"/>
    {{title}}
    <a-icon v-if="rightIcon && icon!=null" :type="icon" style="margin-left: 4px"/>
  </button>
</template>

<script>
  export default {
    name: 'EduButton',
    props: {
      type: String,
      title: '',
      aIcon:null,
      icon:"",
      rightIcon:false,
    },
    methods: {
      getClassByType() {
        let value = "";
        if(this.type == 'primary'){
          value += "color_3";
        }else if (this.type != null && this.type != '') {
          return "button_default color_" + this.type;
        }
        return 'button_default ' + value;
      }
    }
  }
</script>

<style scoped>
  .button_default{
    font-family: Microsoft YaHei;
    font-size: 12px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    height: 40px;
    padding: 0 16px;
    border:0px;
    min-width: 80px;
    border-radius:5px;
    cursor:pointer;
    margin:0 5px 16px 5px;
  }

  .button_default:focus,.button_default:active:focus,.button_default.active:focus,.button_default.focus,.button_default:active.focus,.button_default.active.focus {
    outline: none;
    border-color: transparent;
    box-shadow:none;
  }

  .button_default:hover{
    opacity: 0.7;
  }

  .color_1{
    background-color: #66c3fd;
  }
  

  .color_10{
    /*background-color: #ffffff;*/
    /*color:#999999;*/
    /*border: 2px solid #cccccc;*/

    background-color: #1890FF;
  }

  /*.color_10:hover{*/
  /*  opacity: 0.9;*/
  /*  color:#028be2;*/
  /*  border: 2px solid #028be2;*/
  /*}*/

  /*.color_10:focus,.color_10:active:focus,.color_10.active:focus,.color_10.focus,.color_10:active.focus,.color_10.active.focus {*/
  /*  outline: none;*/
  /*  color:#028be2;*/
  /*  border: 2px solid #028be2;*/
  /*  box-shadow:none;*/
  /*}*/

</style>