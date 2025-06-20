<template>
  <span style="font-size: 16px;font-family: Microsoft YaHei;color: #666666;"><a-icon type="delete" />{{title}}
    <a-modal
      :visible="visible"
      :closable="false"
      width="478px"
      @cancel="visible=true"
      :dialog-style="{ top: '30%' }"
      :footer="null"
    >
      <p style="position: absolute;height: 60px;background-color: rgb(54,139,219);width: 478px;margin-left: -24px;margin-top: -24px;
      font-size: 24px;font-family: Microsoft YaHei;font-weight: 400;
      border-top-right-radius: 3px;border-top-left-radius: 3px;color:white;line-height: 60px;padding:0 10px 0 20px;">
        提示
        <img style="float: right;width: 30px;margin-top: 22px;cursor:pointer;" @click="visible=false" src="@/assets/icon/icon_del.png" />
      </p>
      <div style="height: 90px;width: 100%;text-align: center;margin-top: 60px;">
        <div style="width: 71px;height: 71px;display: inline-block;background: linear-gradient(180deg, rgba(255, 99, 103, 0.99), rgba(254, 172, 136, 0.99));border-radius: 50%;">
          <img src="@/assets/icon/del.png" style="width: 39px;height: 39px;margin-top: 16px"/>
        </div>
      </div>
      <p style="text-align: center;font-size: 18px;font-family: Microsoft YaHei;font-weight: bold;;color: #666666">确定执行删除？</p>
      <div style="text-align: center;border: 0px">
<!--        -->
        <edu-caozuo-button type="11" @click="visible=false;$emit('del')" title="确定" ></edu-caozuo-button>
        <edu-caozuo-button type="15" @click="visible=false" title="取消" ></edu-caozuo-button>
      </div>
    </a-modal>
  </span>
</template>

<script>
  import EduCaozuoButton from './EduCaozuoButton'
  export default {
    name: 'EduBatchDeleteButton',
    components: { EduCaozuoButton },
    props: {
      type: String,
      title: ''
    },
    data() {
      return {
        visible: false
      }
    },

    methods: {
      showConfirm(){
        this.visible = true;
      },
      getClassByType() {
        if (this.type != null && this.type != '') {
          return 'a_default a_color_' + this.type
        }
        return 'a_default '
      }
    }
  }
</script>

<style scoped>

</style>