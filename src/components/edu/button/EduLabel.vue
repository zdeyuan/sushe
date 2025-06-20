<template>
  <span :class="getClassByType()">{{title}}</span>
</template>

<script>
  export default {
    name: 'EduLabel',
    props: {
      type: String,
      title: "",
    },
    methods: {
      getClassByType() {
        if (this.type != null && this.type != '') {
          return "button_default color_" + this.type;
        }
        return 'button_default '
      }
    }
  }
</script>

<style scoped>
  .button_default{
    font-family: Microsoft YaHei;
    /*text-decoration: underline;*/
    font-weight: bold;
  }

  /*.button_default:focus,.button_default:active:focus,.button_default.active:focus,.button_default.focus,.button_default:active.focus,.button_default.active.focus {*/
  /*  outline: none;*/
  /*  border-color: transparent;*/
  /*  box-shadow:none;*/
  /*}*/

  /*.button_default:hover{*/
  /*  opacity: 0.7;*/
  /*}*/

</style>