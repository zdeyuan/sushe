<template>
  <a :class="getClassByType()" @click="visible=true">{{title}}

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
        <edu-caozuo-button type="11" @click="visible=false;$emit('click')" title="确定" ></edu-caozuo-button>
        <edu-caozuo-button type="15" @click="visible=false" title="取消" ></edu-caozuo-button>
      </div>
    </a-modal>
  </a>
</template>

<script>
  import EduCaozuoButton from './EduCaozuoButton'
  export default {
    name: 'EduDeleteButton',
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
      getClassByType() {
        return 'a_default '
      }
    }
  }
</script>

<style scoped>

  .a_default:focus, .a_default:active:focus, .a_default.active:focus, .a_default.focus, .a_default:active.focus, .a_default.active.focus {
    outline: none;
    border-color: transparent;
    box-shadow: none;
  }

  .a_default:hover {
    opacity: 0.7;
  }

  .a_color_1 {
    color: #00bad0;
  }

  .a_color_2 {
    color: #00d09d;
  }

  .a_color_3 {
    color: #0098f8;
  }

  .a_color_4 {
    color: #fc8950;
  }

  .a_color_5 {
    color: #fc9d50;
  }


  /*#deleteModal.ant-modal-content{*/
  /*  background-color: red;*/
  /*}*/

  .ant-modal-title{
    background: red;
  }
</style>