<template>
    <div class="index-container-ty">
    <a-spin :spinning="loading">
      <a-row type="flex" justify="start" :gutter="3">
        <a-col :sm="24" :lg="24">
          <a-card>
            <div class="carBack"></div>
          </a-card>
        </a-col>

      </a-row>
    </a-spin>

  </div>    
</template>
<script>
export default {
  name: "IndexBlank",
  components:{

  },
  data() {
    return {
      loading:false
    }
  },
}
</script>
<style scoped>
  .carBack{
    /* width:100%; */
    height:700px;
    background-color:#fff;
  }
</style>