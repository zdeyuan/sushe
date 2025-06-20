<template>
  <a :class="getClassByType()" @click="$emit('click')">{{title}}</a>
</template>

<script>
  export default {
    name: 'EduLabelButton',
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

  .button_default:focus,.button_default:active:focus,.button_default.active:focus,.button_default.focus,.button_default:active.focus,.button_default.active.focus {
    outline: none;
    border-color: transparent;
    box-shadow:none;
  }

  .button_default:hover{
    opacity: 0.7;
  }

</style>