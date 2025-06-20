<template>
  <div class="flex-row-center">
    <svg slot="prefix" class="size">
      <use :xlink:href="'#' + icon" style="color: white"></use>
    </svg>
    <slot />
  </div>
</template>
<script>
export default {
  name: "iconText",
  props: {
    icon: {
      default: '',
      type: String,
    },
  },
}
</script>
<style  scoped>
.size {
  width: 12px;
  height: 12px;
  margin-right: 8px;
  flex-shrink: 0;
}
</style>